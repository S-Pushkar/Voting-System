import React from "react";

export default function Home({ log, isCandidate, setIsCandidate, candidates }) {

    // function to handle voting
    async function handleVote(candidate) {
        // check if user is logged in by checking if jsonwebtoken is present in localStorage
        const token = localStorage.getItem('token');
        // fetch request to vote for a candidate
        const response = await fetch("http://localhost:8080/vote", {
            method: "POST",
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({
                token: token,
                candidate: candidate
            })
        });
        // if response is ok, update the jsonwebtoken in localStorage
        if (response.ok) {
            let resData = await response.json();
            localStorage.setItem('token', resData.token);
        }
        // if response status is 400, alert the user with the message received from the server
        else if (response.status == 400) {
            const resp = await response.json();
            alert(resp.message);
        }
    }

    // function to handle registering as a candidate
    async function handleRegister() {
        // If user is not logged in, alert the user to login
        if (!log) {
            return alert("Please login to register.");
        }
        const token = localStorage.getItem('token');
        // fetch request to register as a candidate
        const response = await fetch("http://localhost:8080/register", {
            method: "POST",
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({
                token: token
            })
        });
        // if response is ok, update the jsonwebtoken in localStorage and set isCandidate to true
        if (response.ok) {
            let resData = await response.json();
            localStorage.setItem('token', resData.token);
            setIsCandidate(true);
        }
        else {
            alert("Failed to register.");
        }
    }

    // function to handle unregistering as a candidate
    async function handleUnregister() {
        const token = localStorage.getItem('token');
        // fetch request to unregister as a candidate
        const response = await fetch("http://localhost:8080/unregister", {
            method: "POST",
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({
                token: token
            })
        });
        // if response is ok, update the jsonwebtoken in localStorage and set isCandidate to false
        if (response.ok) {
            let resData = await response.json();
            localStorage.setItem('token', resData.token);
            setIsCandidate(false);
        }
        else {
            alert("Failed to unregister.");
        }
    }

    return (
        <>
            <section className="flex flex-row flex-wrap justify-around text-center">
                {log && candidates && candidates.length > 0 ? candidates.map((candidate, index) => (
                    <div key={index} className='text-center lg:w-1/5 md:w-3/5 w-4/5 bg-opacity-10 text-white bg-white p-4 m-4 rounded-md'>
                        <p className="m-1 lg:text-lg md:text-base text-sm font-bold">{candidate.name.toUpperCase()}</p>
                        <p className="m-1">Votes: {candidate.votes}</p>
                        <button onClick={() => {handleVote(candidate)}} className="lg:text-base text-xs md:text-base w-2/5 hover:scale-105 active:scale-100">Vote</button>
                    </div>
                )) : <p>No candidates yet</p>}
            </section>
            <section>
                {isCandidate ? (
                    <div>
                        <p className="m-2">Wanna stop being a candidate?</p>
                        <button onClick={() => {handleUnregister()}} className="m-2 bg-red-500 hover:scale-105 active:scale-100">Unregister</button>
                    </div>
                ) : (
                    <div>
                        <p className="m-2">Wanna become a candidate?</p>
                        <button onClick={() => {handleRegister()}} className="m-2 bg-red-500 hover:scale-105 active:scale-100">Register</button>
                    </div>
                )}
            </section>
        </>
    );
}