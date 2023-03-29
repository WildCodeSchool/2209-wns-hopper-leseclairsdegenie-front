import { useQuery } from "@apollo/client";
import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProduct } from "../../graphql/productQueries";
import { IProduct } from "../../interfaces";
import { MainContext } from "../../MainContexts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ProductDetails () {

    const { productId } = useParams();
    const { loading, data, refetch } = useQuery<{ product: IProduct }>(
        getProduct, {variables : { "id": `${productId}`}}
      );

    const Main = useContext(MainContext);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    if (loading) return (<div>Loading...</div>);
    const product = data ? data.product : null;
    
    return (
        <div key={product?.id} className="product-details">
            <img src={product?.image} alt={product?.description} />
            <div>
                <h2>{product?.name}</h2>
                <p> {product?.description} </p>
                <label>du : <span> </span> 
                    <DatePicker selected={startDate} onChange={(date) => {if(date !== null) setStartDate(date)}}/>
                </label>
                <label>au : <span></span> 
                    <DatePicker selected={endDate} onChange={(date) => {if(date !== null) setEndDate(date)}}/>
                </label>
                <div>
                    {Main?.user?.id ? (
                        <Link className="product-details-link" to={`/products/product-details/${product?.id}`}>+ Détails</Link> 
                    ) : (
                        <Link to="../../../connection">Connexion</Link>
                    )}
                </div>     
            </div>
        </div>
    )
}