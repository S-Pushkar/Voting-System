import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Signup({ log, setLog }) {
    // useState to store name, email, password and confirm as states
    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [confirm, setConfirm] = useState("");
    let navigate = useNavigate();

    // if user is already logged in, redirect to home page
    if (log) {
        navigate("/");
    }

    // function to handle signup
    async function handleSubmit(e) {
        e.preventDefault();
        // check if name, email, password and confirm are empty
        if (name == "" || email == "" || password == "" || confirm == "") {
            alert("Please enter inputs.");
            setName("");
            setEmail("");
            setPassword("");
            setConfirm("");
            return;
        }
        // check if password and confirm are same
        if (password !== confirm) {
            alert("Password and confirmation password do not match.");
            setName("");
            setEmail("");
            setPassword("");
            setConfirm("");
            return;
        }
        // fetch request to signup
        const response = await fetch("http://localhost:8080/sign-up", {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        });
        console.log(response);
        // if response is ok, update the jsonwebtoken in localStorage and set log to true and redirect to home page
        if (response.ok) {
            const { token } = await response.json();
            localStorage.setItem("token", token);
            setLog(true);
            navigate("/");
        }
        else {
            alert("Please try again");
        }
    }
    return (
        <div className="flex flex-col items-center px-8 lg:px-20 md:text-base text-xs lg:text-base">
            <div className="lg:w-1/3 sm:w-1/2 bg-[#646464] rounded-xl mb-8 p-8">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <div className="mr-2 text-xs lg:text-lg">
                                Name : 
                        </div>
                        <input className="rounded p-1 mt-4 mb-4 lg:w-1/2" type="text" name="name" placeholder="Username" value={name} onChange={(e) => {
                            setName(e.target.value);
                        }} required autoFocus/>
                    </div>
                    <div>
                        <div className="mr-2 text-xs lg:text-lg" >
                            Email : 
                        </div>
                        <input className="rounded p-1 mt-4 mb-4 lg:w-1/2" type="email" name="email" placeholder="example@gmail.com" value={email} onChange={(e) => {
                            setEmail(e.target.value);
                        }} required/>
                    </div>
					<div>
                        <div className="mr-2 text-xs lg:text-lg">
                            Password : 
                        </div>
                        <input className="rounded p-1 mt-4 mb-4 lg:w-1/2" type="password" name="password1" value={password} onChange={(e) => {
                            setPassword(e.target.value);
                        }} required/>
                    </div>
					<div>
                        <div className="mr-2 text-xs lg:text-lg">
                            Confirm Password : 
                        </div>
                        <input className="rounded p-1 mt-4 mb-4 lg:w-1/2" type="password" name="password2" value={confirm} onChange={(e) => {
                            setConfirm(e.target.value);
                        }} required/>
                    </div>
					<div>
                    <button className="bg-[rgb(227,223,223)] m-2 shadow-md text-black px-2 py-1 hover:bg-gray" type="submit">Submit</button>
                    <button className="bg-[rgb(227,223,223)] m-2 shadow-md text-black px-2 py-1 hover:bg-gray" type="reset" onClick={() => {
                        setName("");
                        setEmail("");
                        setPassword("");
                        setConfirm("");
                    }}>Reset</button>
					</div>
					<div>
						<h4 style={{ fontSize: '16px' }}>Already have an account?</h4>
					</div>
					<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
						<h4 style={{ fontSize: '16px' }}>Click&nbsp;</h4>
                        <Link to="/log-in" style={{ fontSize: '16px' }}>Here</Link>
						<h4 style={{ fontSize: '16px' }}>&nbsp;to login</h4>
					</div>
                </form>
            </div>
        </div>
    );
}