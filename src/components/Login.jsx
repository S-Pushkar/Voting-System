import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login({ log, setLog }) {
    // useState to store email and password as states
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let navigate = useNavigate();

    // if user is already logged in, redirect to home page
    if (log) {
        navigate("/");
    }

    // function to handle login
    async function handleSubmit(e) {
        e.preventDefault();
        // check if email and password are empty
        if (email == "" || password == "") {
            alert("Please enter a valid Email and Password");
            setEmail("");
            setPassword("");
        }
        // fetch request to login
        const response = await fetch("http://localhost:8080/log-in", {
            method: "POST",
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        // if response is ok, update the jsonwebtoken in localStorage and set log to true and redirect to home page
        if (response.ok) {
            const { token } = await response.json();
            localStorage.setItem("token", token);
            setLog(true);
            navigate("/");
        }
        // if response status is 400, alert the user with the message received from the server
        else {
            const { reason } = await response.json();
            alert(reason);
        }
    }

    return (
        <div className="flex flex-col items-center px-8 lg:px-20 md:text-base text-xs lg:text-base">
            <div className="lg:w-1/3 sm:w-1/2 bg-[#646464] rounded-xl mb-8 p-8">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <div className="mr-2 text-xs lg:text-lg">
                            Email : 
                        </div>
                        <input className="rounded p-1 mt-4 mb-8 lg:w-1/2" type="email" name="email" placeholder="example@gmail.com" value={email} onChange={(e) => {
                            setEmail(e.target.value);
                        }} required autoFocus/>
                    </div>
					<div>
                        <div className="mr-2 text-xs lg:text-lg">
                            Password : 
                        </div>
                        <input className="rounded p-1 mt-4 mb-8 lg:w-1/2" type="password" value={password} onChange={(e) => {
                            setPassword(e.target.value);
                        }} name="password"  required/>
                    </div>
					<div>
						<button className="bg-[rgb(227,223,223)] m-2 shadow-md text-black px-2 py-1 hover:bg-gray" type="submit" >Submit</button>
						<button className="bg-[rgb(227,223,223)] m-2 shadow-md text-black px-2 py-1 hover:bg-gray" type="reset" onClick={() => {
                            setEmail("");
                            setPassword("");
                        }}>Clear</button>
					</div>
					<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
						<h4 style={{ fontSize: '16px' }}>Click&nbsp;</h4>
                        <Link to="/sign-up" style={{ fontSize: '16px' }}>Here</Link>
						<h4 style={{ fontSize: '16px' }}>&nbsp;to signup</h4>
					</div>
                </form>
            </div>
        </div>
    );
}