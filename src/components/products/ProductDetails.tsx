import { useMutation, useQuery } from "@apollo/client";
import { useContext, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getProduct } from "../../graphql/productQueries";
import { IProduct } from "../../interfaces";
import { MainContext } from "../../MainContexts";
import { CREATE_RESERVATION } from "../../graphql/reservation";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

export default function ProductDetails() {

  const Main = useContext(MainContext);
  const navigate = useNavigate();
  // on récupère l'id passé en paramètre de l'url
  const { productId } = useParams();
  // dateRange
  const [dateRange, setDateRange] = useState<[Date, Date]>([new Date(), new Date()]);
  const startDate = dateRange[0];
  const endDate = dateRange[1];
  const duration = (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24);
  // quantité
  const [quantity, setQuantity] = useState<number>();

  // query product
  const { loading, data } = useQuery<{ product: IProduct }>(
    getProduct, { variables: { "id": `${productId}`, "startDate": startDate, "endDate": endDate } }
  );
  // on récupère le produit 
  const product = data ? data.product : null;
  // mutation reservation
  // const [DoCreateReservation, { data: createdReservation }] = useMutation<{ reservation: IReservation }>(createReservation);
  const [CreateReservation, { data: createdReservationData }]
    = useMutation(CREATE_RESERVATION);

  // recherche des dates où quantité dispo nulle => à désactiver dans le calendrier
  const datesToExclude: Date[] = [];
  const computeAvailability = () => {
    if (data?.product?.availability) {
      for (const aDate of data?.product?.availability) {
        if (aDate.quantity === 0) {
          datesToExclude.push(new Date(aDate.date));
        }
      }
    }
  };
  computeAvailability();

  async function doCreateReservation(event: {
    preventDefault: () => void
  }) {
    event.preventDefault();
    try {
      await CreateReservation({
        variables: {
          data:
          {
            startDate: startDate,
            endDate: endDate,
            productId: productId,
            quantity: quantity
          }
        }
      });
    } catch {
      console.log("errorr rr r");
    }
  }
  // console.log(createdReservation?.reservation.cart.id);

  const reservation = createdReservationData ? createdReservationData.createReservation : null;
  if (reservation?.cart.id) {
    localStorage.setItem("cartId", reservation?.cart.id);
    // const redirectReservation = Main?.user?.id ? "/" : "../../../connection";
    // navigate(redirectReservation, { state: { cartId: reservation?.cart.id } });
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
              />
            </label>
          </div>
        </div>
        {startDate && endDate && quantity && productId && (
          <div>
            <h3>Résumé de la réservation</h3>
            <p>Produit : {product?.name}</p>
            <p>Quantité  : {quantity}</p>
            <p>Durée de la location : {Math.ceil(duration)} jours</p>
            <button className="add-to-cart" onClick={doCreateReservation}>
              Ajouter au panier</button>
            {/* {Main?.user?.id ? (
              <button className="add-to-cart" onClick={doCreateReservation}>Ajouter au panier</button>
            ) : (
              <div>
                <p>Vous devez être identifé pour confirmer la réservation</p>
                <Link to="../../../connection">Se connecter</Link>
              </div>
            )} */}
          </div>
        )}
      </div>
    </div>
  )
}