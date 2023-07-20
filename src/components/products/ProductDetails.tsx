import { useMutation, useQuery } from "@apollo/client";
import { useContext, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getProduct } from "../../graphql/productQueries";
import { IProduct } from "../../interfaces";
import { MainContext } from "../../MainContexts";
import { CREATE_RESERVATION } from "../../graphql/reservation";
import Calendar, { MonthView } from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { Notification } from "../Notification";

export default function ProductDetails() {

  const Main = useContext(MainContext);
  const navigate = useNavigate();
  // on récupère l'id passé en paramètre de l'url
  const { productId } = useParams();
  // dateRange
  const [dateRange, setDateRange] = useState<[Date, Date]>([new Date(), new Date()]);
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
  const duration = (new Date(dateRange[1]).getTime() - new Date(dateRange[0]).getTime()) / (1000 * 60 * 60 * 24);
  // quantité
  const [quantity, setQuantity] = useState<number>();

  // query product
  const { loading, data } = useQuery<{ product: IProduct }>(
    getProduct, { variables: { "id": `${productId}`, "month": currentMonth } }
  );
  // on récupère le produit 
  const product = data ? data.product : null;
  console.log("produit", productId);
  console.log("mois", currentMonth);
  // mutation reservation
  // const [DoCreateReservation, { data: createdReservation }] = useMutation<{ reservation: IReservation }>(createReservation);
  const [createReservation, { data: createdReservationData }] = useMutation(CREATE_RESERVATION);

  // recherche des dates où quantité dispo nulle => à désactiver dans le calendrier
  const datesToExclude: Date[] = [];
  const computeAvailability = () => {
    if (data?.product?.availability) {
      for (const aDate of data?.product?.availability) {
        if (aDate.quantity <= 0) {
          datesToExclude.push(new Date(aDate.date));
        }
      }
    }
  };
  console.log(data?.product?.availability);
  computeAvailability();

  const cartId = localStorage.getItem("cartId");

  async function doCreateReservation(event: {
    preventDefault: () => void
  }) {
    event.preventDefault();
    try {
      await createReservation({
        variables: {
          data:
          {
            startDate: dateRange[0],
            endDate: dateRange[1],
            productId: productId,
            quantity: quantity,
            cartId: cartId
          }
        }
      });
    } catch {
      console.log("errorr rr r");
    }
  }

  const reservation = createdReservationData ? createdReservationData.item : null;
  if (reservation?.cart.id) {
    localStorage.setItem("cartId", reservation?.cart.id);
  };

  if (loading) return (<div>Loading...</div>);

  return (
    <div key={product?.id} className="product-details">
      <img className="description" src={product?.image} alt={product?.description} />
      <div className="details-content">
        <div>
          <h2>{product?.name}</h2>
          <p> {product?.description} </p>
        </div>
        <div>
          <h3>Combien ?</h3>
          <input type="number"
            name="quantity"
            defaultValue="1"
            id=""
            onChange={event => setQuantity(event.target.valueAsNumber)}
            value={quantity} />
        </div>
        <div>
          <h3>Quand ?</h3>
          <div className="date">
            <label>Dates de réservation : <span></span>
              <Calendar
                returnValue="range"
                onChange={(value) => setDateRange(value as [Date, Date])}
                tileDisabled={({ date, view }) =>
                  (view === 'month') && // Block day tiles only
                  datesToExclude.some(dateToExclude =>
                    date.getFullYear() === dateToExclude.getFullYear() &&
                    date.getMonth() === dateToExclude.getMonth() &&
                    date.getDate() === dateToExclude.getDate()
                  )}
                value={dateRange}
                selectRange
                onActiveStartDateChange={({ activeStartDate }) => {
                  if (activeStartDate) {
                    setCurrentMonth(activeStartDate.getMonth());
                  }
                }
                }
              //activeStartDate={new Date(new Date().getFullYear(), currentMonth, 1)}
              />
            </label>
          </div>
        </div>
        {dateRange[0] && dateRange[1] && quantity && productId && (
          <div>
            <h3>Résumé de la réservation</h3>
            <p>Produit : {product?.name}</p>
            <p>Quantité  : {quantity}</p>
            <p>Durée de la location : {Math.ceil(duration)} jours</p>
            <button className="add-to-cart" onClick={doCreateReservation}>
              Ajouter au panier</button>
            {reservation?.cart.id ? (
              <Notification
                type="validation"
                icon="succes"
                message="Votre réservation a bien été ajoutée à votre panier"
                textButton="Ok" onValidate={() => navigate("/")}></Notification>
            ) : (
              <p></p>
            )
            }
          </div>
        )}
      </div>
    </div>
  )
}