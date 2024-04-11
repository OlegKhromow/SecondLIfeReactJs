import {useEffect, useState} from "react";
import CategoryList from "./CategoryList";
import ItemsContent from "../itempages/ItemsContent";

const Home = ({user}) => {
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');


    useEffect(() => {
        loadItems();
        loadCategories();
        setSelectedCategory('all');
    }, []);

    const loadItems = async () => {
        const response = await fetch('/item/');

        if (!response.ok) {
            const message = `An error occurred: ${response.statusText} `;
            window.alert(message);
            return;
        }
        const arr = await response.json();
        setItems(arr);
    };

    const loadCategories = async () => {
        const response = await fetch('/category/');

        if (!response.ok) {
            const message = `An error occurred: ${response.statusText} `;
            window.alert(message);
            return;
        }
        setCategories(await response.json());
    };

    return (
        <div className="homeContainer page">
            <CategoryList
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory} />
            <ItemsContent
                user={user}
                items={items}
                loadItems={loadItems}
                flag={selectedCategory}
                setCategories={setCategories}/>
        </div>
    );
};


export default Home;