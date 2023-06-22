import { useQuery } from "@apollo/client";
import { getCategories } from "../../graphql/Category";
import { ICategory } from "../../interfaces";



const CategoryFilter = () => {
    const { loading, data } = useQuery<{ categories: ICategory[] }>(
        getCategories
      );
    
    if (loading) return (<div>Loading...</div>);
    const categories = data ? data.categories : null;
    
    return (
        <div>
            <select className="custom-select">
                <option selected>Type de sport</option>
                {categories?.map((category) => (
                    <option value={category.id} className="selected-category">{category.name}</option>
                ))}
            </select>
        </div>
    )
};

export default CategoryFilter;
  