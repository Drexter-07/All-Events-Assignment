import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("user-info")) {
            navigate("/add");
        }
    }, [navigate]);

    async function login() {
        console.warn(email, password);
        let item = { email, password };
        let result = await fetch("http://localhost:8000/api/login", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(item),
        });
        result = await result.json();
        localStorage.setItem("user-info", JSON.stringify(result));
        navigate("/add");
    }

    async function handleGoogleLogin(response) {
        console.log(response);
        // Extract token and append it as a query parameter
        let googleToken = response.tokenId;
        try {
            let result = await fetch(`http://localhost:8000/api/auth/google/callback?token=${googleToken}`);
            result = await result.json();
            localStorage.setItem("user-info", JSON.stringify(result));
            navigate("/add");
        } catch (error) {
            console.error("Google login failed", error);
        }
    }

    return (
        <GoogleOAuthProvider clientId="97800462498-lfjitejce187ev2fdf3g3tggus8q8pvv.apps.googleusercontent.com">
            <div>
                <Header />
                <div className="col-sm-6 offset-sm-3">
                    <h1>Login Page</h1>
                    <br/>
                    <input type="text" placeholder="email" 
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control" />
                    <br />
                    <input
                        type="password"
                        placeholder="password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                    />
                    <br />
                    <button onClick={login} className="btn btn-primary">Login</button>
                    <br />
                    <div style={{ marginTop: "10px" }}>
                        <GoogleLogin
                            onSuccess={handleGoogleLogin}
                            onError={() => console.log('Login Failed')}
                        />
                    </div>
                </div>
            </div>
        </GoogleOAuthProvider>
    );
}

export default Login;
