import charity from "./charity.jpg"
import {useRef, useState} from "react";
import InputMask from 'react-input-mask';
import apiRequest from "../../utils/apiRequest";
import {useNavigate} from "react-router-dom";

const SignUpPage = ({setUser}) => {
    const navigate = useNavigate();
    const inputRef = useRef();
    const [errorMsg, setErrorMsg] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const validation = async () => {
        const volunteers = await apiRequest(`/volunteer/email/${email}`);
        if (volunteers.length !== 0)
            return "User with same email already exists.";
        const number = phoneNumber.replace(/[()]/g, "")
            .replace(/-/g, "").replace(/_/g, "");
        setPhoneNumber(number);
        if (number.length < 10)
            return "Invalid phone number!";
        if (password.length < 6)
            return "Password should be at least 6 characters long!";
        if (password !== password2)
            return "Repeated password is different!";
        return "";
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const error = await validation();
        if (error.length) {
            setErrorMsg(error);
            return;
        } else
            setErrorMsg("");

        const volunteer = JSON.stringify({
                "name": name,
                "surname": surname,
                "phoneNumber": phoneNumber,
                "registrationDate": new Date(),
                "email": email,
                "password": password
            }
        )
        const postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: volunteer
        }
        const result = await apiRequest('/volunteer/', postOptions);
        setUser(result);
        navigate("/");
    }

    const handleReset = () => {
        navigate("/");
    }

    return (
        <main className="page sign-up">
            <img src={charity} alt="Charity" className=""/>
            <form onSubmit={handleSubmit} onReset={handleReset}>
                <label htmlFor='name'>Enter name:</label>
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
                <label htmlFor='surname'>Enter surname:</label>
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
                <label htmlFor='phoneNumber'>Enter phone number:</label>
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
                <label htmlFor='password'>Make up a password:</label>
                <input
                    className="text-input"
                    ref={inputRef}
                    id='password'
                    type='password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br/>
                <label htmlFor='password2'>Repeat password:</label>
                <input
                    className="text-input"
                    ref={inputRef}
                    id='password2'
                    type='password'
                    required
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                />
                <br/>
                <h5 className="errorMsg">{errorMsg}</h5>
                <br/>
                <button type='submit'>
                    SIGN UP
                </button>
                <button type='reset'>
                    CANCEL
                </button>
            </form>
        </main>
    )
}

export default SignUpPage;