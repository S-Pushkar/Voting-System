import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Unknown from './components/Unknown';
import { useEffect, useState } from 'react';

function App() {
  
  let [log, setLog] = useState(false);  // log is true if user is logged in
  let [isCandidate, setIsCandidate] = useState(false);  // isCandidate is true if user is a candidate
  let [candidates, setCandidates] = useState(new Array());  // candidates is an array of objects containing candidate details
  useEffect(() => {
    // WebSocket connection to get real-time updates
    let sock = new WebSocket("ws://localhost:8080/ws");
    sock.addEventListener('open', (event) => {
      console.log('WebSocket connection opened');
    });
    // add event listener to handle messages received from server
    sock.addEventListener('message', (event) => {
      // event.data contains the data sent by the server
      const data = JSON.parse(event.data);
      // sort the data based on the name of the candidate
      data.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      // update the state with the new data
      setCandidates(data);
    });
    sock.addEventListener('close', (event) => {
      console.log('WebSocket connection closed');
    });
    ////////////////////////////////////////////////////////////////////////////
    // check if user is logged in by checking if jsonwebtoken is present in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // if token is present, set log to true
      setLog(true);
      let func = async () => {
        // check if user is a candidate
        let resp = await fetch("http://localhost:8080/is-candidate", {
          method: "POST",
          headers: {'Content-Type': 'application/json',},
          body: JSON.stringify({
              token: token                // send the token to the server for verification
          })
        });
        resp = await resp.json();
        // if user is a candidate, set isCandidate to true
        if (resp.isCandidate) {
          setIsCandidate(true);
        }
        else {
          setIsCandidate(false);
        }};
      func();
    }
    ////////////////////////////////////////////////////////////////////////////////////
    return () => {
      // close the WebSocket connection when the component is unmounted
      sock.close();
    }
  }, []);
  return (
    <>
      <header className='sticky top-0 bg-slate-900 w-full z-10'>
        <div className='p-4'>
          <Link to="/" className="text-white hover:text-white"><h1 className='text-center lg:text-4xl text-lg md:text-lg'>VOTING SYSTEM</h1></Link>
          <Link to="/" className='lg:text-xl md:text-lg text-sm px-4'>Home</Link>
          {!log ? <Link to="/log-in" className='lg:text-xl md:text-lg text-sm px-4'>Login</Link> : <button onClick={() => {
            localStorage.removeItem('token');
            setLog(false);
            window.location.reload();
          }}>Logout</button>}
        </div>
        <hr />
      </header>
      <main className='text-center p-8'>
        <Routes>
          <Route path="/" element={<Home log={log} isCandidate={isCandidate} setIsCandidate={setIsCandidate} candidates={candidates} />} />
          <Route path="/log-in" element={<Login log={log} setLog={setLog} />} />
          <Route path="/sign-up" element={<Signup log={log} setLog={setLog} />} />
          <Route path="*" element={<Unknown />} />
        </Routes>
      </main>
      <footer>
        
      </footer>
    </>
  );
}

export default App;