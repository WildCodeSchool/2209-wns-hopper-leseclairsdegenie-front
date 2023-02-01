import { useQuery } from "@apollo/client";
import { getCategories } from "../../graphql/Category";
import { ICategory } from "../../interfaces";



const CategoryFilter = () => {
    const { loading, data, refetch } = useQuery<{ categories: ICategory[] }>(
        getCategories
      );
    
    if (loading) return (<div>Loading...</div>);
    const categories = data ? data.categories : null;
    return (
        <select value="Choisis une catégorie de sport">
            {categories?.map((category) => (
                <option value={category.id}>{category.name}</option>
            ))}
        </select>
    )
};

export default CategoryFilter;
  