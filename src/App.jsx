import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';

function App() {
  let [log, setLog] = useState(false);
  return (
    <>
      <header className='sticky top-0 bg-slate-900 w-full'>
        <div className='p-4'>
          <h1 className='text-center lg:text-4xl text-lg md:text-lg'>Voting System</h1>
          <Link to="/" className='lg:text-xl md:text-lg text-sm px-4'>Home</Link>
          <Link to="/log-in" className='lg:text-xl md:text-lg text-sm px-4'>Login</Link>
        </div>
        <hr />
      </header>
      <main className='text-center p-8'>
        <Routes>
          <Route path="/" element={<Home />} />   {/* This is the home page*/}
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