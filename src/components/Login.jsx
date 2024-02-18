import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login({ log, setLog, votedFor, setVotedFor, setUserEmail }) {
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let navigate = useNavigate();

    if (log) {
        navigate("/");
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (email == "" || password == "") {
            alert("Please enter a valid Email and Password");
            setEmail("");
            setPassword("");
        }
        const response = await fetch("http://localhost:8080/log-in", {
            method: "POST",
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        console.log(response);
        if (response.ok) {
            const { token } = await response.json();
            localStorage.setItem("token", token);
            setLog(true);
            // setVotedFor(candidatesVoted);
            setUserEmail(email);
            navigate("/");
        }
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