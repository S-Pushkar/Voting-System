import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import './App.css';
import Signup from './components/Signup';

function App() {
  return (
    <>
      <header>
        {/*We will have a navbar here*/}
        <h1 className='text-center'>Voting System</h1>
        {/* <LoginButton />
        <LogoutButton /> */}
      </header>
      <main className='text-center p-12'>
        <Routes>
          <Route path="/" element={<Home />} />   {/*This is the home page*/}
          <Route path="/log-in" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
        </Routes>
      </main>
      <footer>

      </footer>
    </>
  );
}

export default App;