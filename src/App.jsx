import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import './App.css';

function App() {
  return (
    <>
      <header>
        {/*We will have a navbar here*/}
        <h1 className='text-center'>Voting System</h1>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />   {/* This is the home page*/}
          <Route path="/log-in" element={<Login />} />
        </Routes>
      </main>
      <footer>

      </footer>
    </>
  );
}

export default App;