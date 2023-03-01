import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { getProduct } from "../../graphql/productQueries";
import { IProduct } from "../../interfaces";

export default function ProductDetails () {

    const { productId } = useParams();
    const { loading, data, refetch } = useQuery<{ product: IProduct }>(
        getProduct, {variables : { "id": `${productId}`}}
      );

    if (loading) return (<div>Loading...</div>);
    const product = data ? data.product : null;
    
    return (
        <div key={product?.id} className="product-details">
            <img src={product?.image} alt={product?.description} />
            <div>
                <h2>{product?.name}</h2>
                <p> {product?.description} </p>
                <label>du : <span> </span> 
                <input type="date" id="start"
                        value="2023-02-03"
                        min="2023-02-03" max="2024-02-03"/>
                </label>
                <label>au : <span></span> 
                <input type="date" id="end"
                        value="2023-02-03"
                        min="2023-02-03" max="2024-02-03"/>
            </label>     
            </div>
        </div>
    )
}