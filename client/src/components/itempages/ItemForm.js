import React, {useEffect, useState, useRef} from "react";
import apiRequest from "../../utils/apiRequest";
import Select from "react-select";
import CreateCategory from "../categorydialog/CreateCategory";
import {useNavigate} from "react-router-dom";

const ItemForm = ({item, handleBack, setCategories = null}) => {
    useNavigate();
    const inputRef = useRef();
    const [name, setName] = useState(item.name);
    const [description, setDescription] = useState(item.description);
    const [addition_date, setAddition_date] = useState(item.addition_date);
    const [count, setCount] = useState(item.count);
    const [options, setOptions] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(item.categoryId);
    const [open, setOpen] = useState(false);


    useEffect(() => {
        loadCategories();
    }, [item]);

    const loadCategories = async () => {
        const response = await fetch('/category/');

        if (!response.ok) {
            const message = `An error occurred: ${response.statusText} `;
            window.alert(message);
            return;
        }
        const categories = await response.json();
        if (setCategories)
            setCategories(categories);
        const newOptions = [{
            value: "new",
            label: "Create new category"
        }];
        if (categories.length !== 0)
            categories.map(value => (newOptions.push({
                value: value._id,
                label: value.name
            })))
        setOptions(newOptions);
    };

    const handleSelectChange = (e) => {
        if (e.value === "new")
            setOpen(true);
        else
            setSelectedCategory(e.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const changes = {};
        if (name !== item.name)
            changes.name = name;
        if (description !== item.description)
            changes.description = description;
        if (addition_date !== item.addition_date)
            changes.addition_date = addition_date;
        if (count !== item.count)
            changes.count = count;
        if (selectedCategory === "") {
            window.alert("Choose category!")
            return;
        }
        if (selectedCategory !== item.categoryId)
            changes.categoryId = selectedCategory;
        if (item.volunteerId)
            changes.volunteerId = item.volunteerId;
        const changesJson = JSON.stringify(changes);
        if (changesJson === '{}')
            return;
        let method = '';
        if (item._id)
            method = 'PUT';
        else
            method = 'POST';

        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: changesJson
        }

        let result;
        if (item._id)
            result = await apiRequest(`/item/${item._id}`, options);
        else
            result = await apiRequest("/item/", options);

        if (!result)
            window.alert("Something went wrong. Reload the page or try later :(");
        else {
            item._id ? window.alert("Item is updated ;)") : window.alert("Item is added :)");
            handleBack(result);
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        // eslint-disable-next-line no-restricted-globals
        if (confirm("Are you sure you want to delete item?")) {
            const deleteOptions = {
                method: 'DELETE',
            }
            await apiRequest(`/item/${item._id}`, deleteOptions);
            handleBack();
        }
    }

    return (
        <>
            <form className="item-info-page" onSubmit={handleSubmit}>
                <table>
                    <tbody>
                    <tr>
                        <td className="label">Name:</td>
                        <td className="value">
                            <input
                                className="text-input"
                                autoFocus
                                ref={inputRef}
                                id='name'
                                type='text'
                                placeholder='Shoes'
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="label">Description:</td>
                        <td className="value">
                        <textarea
                            className="text-input width80"
                            style={{height: "100px"}}
                            ref={inputRef}
                            id='description'
                            placeholder='Crafted from premium full-grain leather, these boots offer durability and weather resistance, ensuring your feet stay dry and comfortable in any condition.'
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        </td>
                    </tr>
                    <tr>
                        <td className="label">Addition Date:</td>
                        <td className="value">
                            <input
                                className="text-input"
                                ref={inputRef}
                                id='date'
                                type='date'
                                required
                                value={addition_date.slice(0, 10)}
                                onChange={(e) => setAddition_date(e.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="label">Count:</td>
                        <td className="value">
                            <input
                                className="text-input"
                                ref={inputRef}
                                id='count'
                                type='number'
                                min="0"
                                required
                                value={count}
                                onChange={(e) => setCount(e.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="label">Category:</td>
                        <td className="value">
                            <Select
                                className="width80"
                                options={options}
                                value={options.filter(opt => opt.value === selectedCategory)}
                                onChange={handleSelectChange}/>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <button type="submit">
                    {item._id ? "update" : "save"}
                </button>
                {item._id ? (
                   <button onClick={handleDelete}>
                       Delete
                   </button>
                ): (<></>)}
                <br/>
                <button onClick={handleBack}>
                    ←back
                </button>
            </form>
            <CreateCategory
                open={open}
                setOpen={setOpen}
                loadCategories={loadCategories}
                setSelectedCategory={setSelectedCategory}/></>
    )
}

export default ItemForm;