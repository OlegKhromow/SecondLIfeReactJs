import {useState} from "react";
import {Link} from "react-router-dom";
import LoginForm from "./LoginForm";

const LoginPage = ({setUser}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <main className="login-page page">
            <div className="login-container">
                <h2>LOGIN</h2>
                <p>Please enter your login and password!</p>
                <LoginForm email={email}
                           setEmail={setEmail}
                           password={password}
                           setPassword={setPassword}
                           setUser={setUser}/>
                <p>Don`t have account? <Link to="/signup">Sign in</Link></p>
            </div>
        </main>
    )
}

export default LoginPage;