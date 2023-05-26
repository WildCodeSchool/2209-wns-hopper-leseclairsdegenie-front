import {useQuery} from "@apollo/client";
import {getProducts} from "../../graphql/productQueries";
import {ICategory, IProduct} from "../../interfaces";
import ProductCard from "./ProductCard";
import "./Products.css";
import {useState} from "react";
import {getCategories} from "../../graphql/Category";

export default function Products() {
    const {loading, data} = useQuery<{ products: IProduct[] }>(getProducts);
    const {loading: categoriesLoading, data: categories} = useQuery<{
        categories: ICategory[];
    }>(getCategories);
    const [filteredList, setFilteredList] = useState<IProduct[]>();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [selectedCategory, setSelectedCategory] = useState();

    const search = (event: any) => {
        const query = event.target.value;
        let updatedList = [...(products || [])];
        updatedList = updatedList.filter((item) => {
            return (
                item.name.toLowerCase().toLowerCase().includes(query) ||
                item.description.toLowerCase().toLowerCase().includes(query) ||
                item.category.name.toLowerCase().toLowerCase().includes(query)
            );
        });
        setFilteredList(updatedList);
    };

    //autre possibilite de recherche mais avec typescript on est trop limité
    //
    // const keys:(keyof IProduct)[] = ["name", "description", "category"];
    // const search = (products: IProduct[]) => {
    //   return products.filter((item) =>
    //     keys.some((key) => item[key].toLowerCase().includes(query))
    //   );
    // };

    function handleCategoryChange(event: any) {
        const selectedCategory = event.target.value;
        setSelectedCategory(selectedCategory);
        if (!selectedCategory) {
            setFilteredList(products || []);
        } else {
            const filteredList = products?.filter((item: IProduct) => item.category.name === selectedCategory
            );
            setFilteredList(filteredList);
        }
    }

    if (loading) return <div>Loading...</div>;
    if (categoriesLoading) return <div>Loading...</div>;

    const products = data ? data.products : null;
    const category = categories ? categories.categories : null;

    return (
        <div className="products-page">
            <header>
                <ul className="products-filters">
                    <li>
                        <p>Recherche :</p>
                        <input
                            type="text"
                            placeholder="recherche..."
                            className="search"
                            onChange={search}
                        />
                    </li>
                    <li>
                        <p>Filtre par catégories :</p>
                        <select
                            name="category-list"
                            id="category-list"
                            onChange={handleCategoryChange}
                        >
                            <option value="">Toutes categories</option>
                            {category?.map((item: ICategory) => (
                                <option key={item.id}>{item.name}</option>
                            ))}
                            ;
                        </select>
                    </li>
                </ul>
            </header>
            <main>
                <section className="card-row">
                    {filteredList ? (
                        filteredList.map((item) => (
                            <ProductCard key={item.id} item={item}/>
                        ))
                    ) : (
                        <section className="card-row">
                            {products?.map((product: IProduct) => {
                                return <ProductCard key={product.id} item={product}/>;
                            })}
                        </section>
                    )}
                </section>
            </main>
        </div>
    );
}
