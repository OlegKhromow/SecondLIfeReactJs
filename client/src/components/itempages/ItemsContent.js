import {useEffect, useState} from "react";
import ItemsList from "./ItemsList";
import ItemInfo from "./ItemInfo";
import ItemForm from "./ItemForm";

const ItemsContent = ({user, items, loadItems, flag = "all", setCategories = null}) => {
    const [content, setContent] = useState(null);

    useEffect(() => {
        setContent(<ItemsList items={items} selectedCategory={flag} handleContent={handleContent}/>);
    }, [items, flag]);

    const handleContent = (item) => {
        const handleBack = (_item) => {
            loadItems();
            setContent(<ItemsList items={items} selectedCategory={flag} handleContent={handleContent}/>)
        };
        if (user)
            if (item.volunteerId === user._id) {
                setContent(<ItemForm item={item}
                                     handleBack={handleBack}
                                     setCategories={setCategories}/>);
                return;
            }

        setContent(<ItemInfo item={item} handleBack={handleBack}/>);
    };

    return (
        <>
            {content}
        </>
    )
};

export default ItemsContent;