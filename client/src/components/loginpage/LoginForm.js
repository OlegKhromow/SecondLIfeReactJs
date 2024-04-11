import {useRef, useState} from "react";
import apiRequest from "../../utils/apiRequest";
import {useNavigate} from "react-router-dom";

const LoginForm = ({email, setEmail, password, setPassword, setUser}) => {
    const inputRef = useRef();
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const volunteers = await apiRequest(`/volunteer/email/${email}`);
        let volunteer = {};
        if (volunteers.length !== 0) {
            volunteer = volunteers[0];
            setErrorMsg("");
        } else {
            setErrorMsg("No such user. Sign in!")
            return;
        }
        if (volunteer.password === password) {
            setUser(volunteer);
            navigate('/');
        }
        else setErrorMsg("Invalid password!")
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <input
                className="text-input"
                autoFocus
                ref={inputRef}
                id='enterEmail'
                type='email'
                placeholder='Email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>
            <br/>
            <input
                className="text-input"
                ref={inputRef}
                id='enterPassword'
                type='password'
                placeholder='Password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>
            <br/>
            <h5 className="errorMsg">{errorMsg}</h5>
            <br/>
            <button
                type='submit'
                onClick={() => inputRef.current.focus()}>
                LOGIN
            </button>
        </form>
    );
};

export default LoginForm;