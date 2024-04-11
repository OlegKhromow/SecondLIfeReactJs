import {useEffect, useState} from "react";
import EditAccount from "./EditAccount";
import ItemsContent from "../itempages/ItemsContent";
import ItemForm from "../itempages/ItemForm";

const AccountPage = ({user, setUser}) => {
    const welcome = (
        <>
            <h1 className="title">Second Life UA</h1>
        </>
    );
    const [content, setContent] = useState(welcome);
    const [items, setItems] = useState([]);


    useEffect(() => {
        loadItems();
    }, []);

    const handleProfile = () => {
        setContent(
            <EditAccount user={user} setUser={setUser} handleCancel={handleCancel}/>
        );
    };

    const handleCancel = () => {
        setContent(welcome);
    }

    const handleItems = () => {
        setContent(<ItemsContent user={user}
                                 items={items}
                                 loadItems={loadItems}/>);
    }

    const handleNewItem = () => {
        const emptyItem = {
            _id: null,
            name: "",
            description: "",
            addition_date: "",
            count: null,
            volunteerId: user._id,
            categoryId: "",
        }
        setContent(<ItemForm item={emptyItem} handleBack={() => {
            loadItems();
            handleItems();
        }}/>);
    }

    const loadItems = async () => {
        const response = await fetch(`/item/volunteer/${user._id}`);

        if (!response.ok) {
            const message = `An error occurred: ${response.statusText} `;
            window.alert(message);
            return [];
        }
        const arr = await response.json();
        setItems(arr);
    }

    return (
        <main className="page homeContainer">
            <div className="left-menu-container">
                <h4 className="special-text">{user.name} {user.surname}</h4>
                <button onClick={handleProfile}>My profile</button>
                <br/>
                <button onClick={handleItems}>My items</button>
                <br/>
                <button onClick={handleNewItem}>Add new item</button>
            </div>
            <div className="content-container">
                {content}
            </div>
        </main>
    )
}

export default AccountPage;