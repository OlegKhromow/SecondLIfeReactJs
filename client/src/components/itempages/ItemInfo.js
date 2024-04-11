import React, {useEffect, useState} from "react";
import apiRequest from "../../utils/apiRequest";

const ItemInfo = ({item, handleBack}) => {
    const [category, setCategory] = useState({name: ""});
    const [volunteer, setVolunteer] = useState({name: "", surname: "", phoneNumber: ""});

    const formatDate = (str) => {
        const date = new Date(str);
        return date.toLocaleDateString("uk-UA");
    };

    useEffect(() => {
        getCategoryById(item.categoryId);
        getVolunteerById(item.volunteerId)
    }, [item]);

    const getCategoryById = async (id) => {
        const result = await apiRequest(`/category/one/${id}`);
        if (!result) {
            const cat = {name: "no category"};
            setCategory(cat);
        } else
            setCategory(result);
    }

    const getVolunteerById = async (id) => {
      const result = await apiRequest(`/volunteer/one/${id}`);
      if (!result) {
            const vol = {name: "no volunteer", phoneNumber: "no volunteer"};
            setVolunteer(vol);
        } else
            setVolunteer(result);
    }

    return (
        <main className="item-info-page">
            <table>
                <tbody>
                <tr>
                    <td className="label">Name:</td>
                    <td className="value">{item.name}</td>
                </tr>
                <tr>
                    <td className="label">Description:</td>
                    <td className="value">{item.description}</td>
                </tr>
                <tr>
                    <td className="label">Addition Date:</td>
                    <td className="value">{formatDate(item.addition_date)}</td>
                </tr>
                <tr>
                    <td className="label">Count:</td>
                    <td className="value">{item.count}</td>
                </tr>
                <tr>
                    <td className="label">Category:</td>
                    <td className="value">{category.name}</td>
                </tr>
                <tr>
                    <td className="label">Volunteer:</td>
                    <td className="value">{volunteer.name + ' ' + volunteer.surname}</td>
                </tr>
                <tr>
                    <td className="label">Phone:</td>
                    <td className="value">{volunteer.phoneNumber}</td>
                </tr>
                </tbody>
            </table>
            <button onClick={handleBack}>
                ←back
            </button>
        </main>
    )
}

export default ItemInfo;