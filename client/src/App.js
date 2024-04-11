import './App.css';
import {Route, Routes} from "react-router-dom"
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import LoginPage from "./components/loginpage/LoginPage";
import PrivateRoutes from "./components/PrivateRoutes";
import {useState} from "react";
import SignUpPage from "./components/singuppage/SignUpPage";
import AccountPage from "./components/accountpage/AccountPage";

function App() {
    const [user, setUser] = useState(null);

    return (
        <div className="App">
            <Navbar user={user}
                    setUser={setUser}/>
            <Routes>
                <Route path="/" element={<Home user={user}/>}/>
                <Route path="/login" element={<LoginPage setUser={setUser}/>}/>
                <Route path="/signup" element={<SignUpPage setUser={setUser}/>}/>
                <Route element={<PrivateRoutes user={user}/>}>
                    <Route path="/myaccount" element={<AccountPage user={user} setUser={setUser}/>}/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
