import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { getOneCategory } from "../graphql/Category";
import { ICategoryProps, IProduct } from "../interfaces";

const Category = () => {
  //const [products, setProducts] = useState<[IProduct]>();

  const { name } = useParams();

  const { data, loading, error } = useQuery(getOneCategory, {
    variables: { categoryName: name },
  });

  if (loading) return <p>LOADING ...</p>;
  else
    return <div>{<ProductCard products={data.getOneCategory.products} />}</div>;
};

export default Category;
