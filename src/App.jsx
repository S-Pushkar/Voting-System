import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import { useEffect, useState } from 'react';

function App() {
  
  let [log, setLog] = useState(false);
  let [isCandidate, setIsCandidate] = useState(false);
  let [candidates, setCandidates] = useState(new Array());
  useEffect(() => {
    let sock = new WebSocket("ws://localhost:8080/ws");
    sock.addEventListener('open', (event) => {
      console.log('WebSocket connection opened');
    });
    sock.addEventListener('message', (event) => {
      console.log('Received from server:', event.data);
      const data = JSON.parse(event.data);
      data.sort((a, b) => b.votes - a.votes);
      setCandidates(data);
    });
    sock.addEventListener('close', (event) => {
      console.log('WebSocket connection closed');
    });
    ////////////////////////////////////////////////////////////////////////////
    const token = localStorage.getItem('token');
    if (token) {
      setLog(true);
      let func = async () => {
        let resp = await fetch("http://localhost:8080/is-candidate", {
          method: "POST",
          headers: {'Content-Type': 'application/json',},
          body: JSON.stringify({
              token: token
          })
        });
        resp = await resp.json();
        resp.candidates.sort((a, b) => b.votes - a.votes);
        setCandidates(resp.candidates);
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
        </Routes>
      </main>
      <footer>
        
      </footer>
    </>
  );
}

export default App;