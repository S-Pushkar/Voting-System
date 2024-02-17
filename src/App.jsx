import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import { useEffect, useState } from 'react';

function App() {
  let [log, setLog] = useState(false);
  let [isCandidate, setIsCandidate] = useState(false);
  let [votedFor, setVotedFor] = useState(new Array());
  let [candidates, setCandidates] = useState(new Array());
  let [userEmail, setUserEmail] = useState("");
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLog(true);
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
          }}>Logout</button>}
        </div>
        <hr />
      </header>
      <main className='text-center p-8'>
        <Routes>
          <Route path="/" element={<Home log={log} setLog={setLog} isCandidate={isCandidate} setIsCandidate={setIsCandidate} votedFor={votedFor} setVotedFor={setVotedFor} candidates={candidates} setCandidates={setCandidates} userEmail={userEmail} />} />
          <Route path="/log-in" element={<Login log={log} setLog={setLog} votedFor={votedFor} setVotedFor={setVotedFor} setUserEmail={setUserEmail} />} />
          <Route path="/sign-up" element={<Signup log={log} setLog={setLog} votedFor={votedFor} setVotedFor={setVotedFor} setUserEmail={setUserEmail} />} />
        </Routes>
      </main>
      <footer>
        
      </footer>
    </>
  );
}

export default App;
