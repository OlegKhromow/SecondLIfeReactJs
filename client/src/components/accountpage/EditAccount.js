import InputMask from "react-input-mask";
import {useRef, useState} from "react";
import apiRequest from "../../utils/apiRequest";
import {useNavigate} from "react-router-dom";

const EditAccount = ({user, setUser, handleCancel}) => {
    const navigate = useNavigate();
    const inputRef = useRef();
    const [errorMsg, setErrorMsg] = useState('');
    const [name, setName] = useState(user.name);
    const [surname, setSurname] = useState(user.surname);
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
    const [email, setEmail] = useState(user.email);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const changes = {};
        if (name !== user.name)
            changes.name = name;
        if (surname !== user.surname)
            changes.surname = surname;
        const number = phoneNumber.replace(/[()]/g, "").replace(/-/g, "").replace(/_/g, "");
        if (number !== user.phoneNumber) {
            if (number.length < 10) {
                setErrorMsg("Invalid phone number!");
                return;
            }
            changes.phoneNumber = number;
        }
        if (email !== user.email)
            changes.email = email;
        if (oldPassword.length !== 0) {
            if (oldPassword !== user.password) {
                setErrorMsg("Invalid old password");
                return;
            } else if (newPassword.length < 6) {
                setErrorMsg("New password should be at least 6 characters long!");
                return;
            } else
                changes.password = newPassword;
        }
        setErrorMsg("");
        const changesJson = JSON.stringify(changes);
        if (changesJson === '{}')
            return;
        const putOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: changesJson
        }
        const result = await apiRequest(`/volunteer/${user._id}`, putOptions);
        if (!result)
            window.alert("Something went wrong. Reload the page or try later.");
        else {
            setUser(result);
            setOldPassword("");
            setNewPassword("");
            window.alert("Your account was updated :)");
        }
    };

    const handleDelete = async () => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm("Are you sure you want to delete your account?")) {
            const deleteOptions = {
                method: 'DELETE',
            }
            await apiRequest(`/item/volunteer/${user._id}`, deleteOptions);
            await apiRequest(`/volunteer/${user._id}`, deleteOptions);
            setUser(null);
            navigate("/");
        }
    };

    const formatDate=(str)=>{
        const date = new Date(str);
        return date.toLocaleDateString("uk-UA");
    };

    return (
        <form className="user-form" onSubmit={handleSubmit} onReset={handleCancel}>
            <label htmlFor='name'>Your name:</label>
            <input
                className="text-input"
                autoFocus
                ref={inputRef}
                id='name'
                type='text'
                placeholder='Eren'
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <br/>
            <label htmlFor='surname'>Your surname:</label>
            <input
                className="text-input"
                ref={inputRef}
                id='surname'
                type='text'
                placeholder='Yeager'
                required
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
            />
            <br/>
            <label htmlFor='phoneNumber'>Your phone number:</label>
            <InputMask
                className="text-input"
                ref={inputRef}
                id="phoneNumber"
                mask="(099)-999-99-99"
                required
                placeholder='(099)-999-99-99'
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}/>
            <br/>
            <label htmlFor='registrationDate' style={{float: "left", margin:"0 80px"}}>Registration date:</label>
            <span id="registrationDate" style={{float: "left", color: "dimgray"}}>{formatDate(user.registrationDate)}</span>
            <br/>
            <label htmlFor='email'>Enter your email:</label>
            <input
                className="text-input"
                ref={inputRef}
                id='email'
                type='email'
                placeholder='shiganshina@gmail.com'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <br/>
            <h3>Change password:</h3>
            <label htmlFor='password'>Enter your old password:</label>
            <input
                className="text-input"
                ref={inputRef}
                id='password'
                type='password'
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
            />
            <br/>
            <label htmlFor='password2'>Enter new password:</label>
            <input
                className="text-input"
                ref={inputRef}
                id='password2'
                type='password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <br/>
            <h5 className="errorMsg">{errorMsg}</h5>
            <br/>
            <button type='submit'>
                UPDATE
            </button>
            <button type='reset'>
                CANCEL
            </button>
            <br/>
            <button type='button' onClick={handleDelete}>
                DELETE ACCOUNT
            </button>
        </form>
    );
};

export default EditAccount;