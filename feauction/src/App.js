import './App.css';
import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Home from '../src/pages/Home/Home';
import Contact from '../src/pages/Contact/Contact';
import LoginForm from './pages/Login/Login';
import RegisterForm from './pages/RegisterForm/RegisterForm';
import Profile from './pages/Profile/Profile';
import NotFound from './pages/NotFound/NotFound';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/user/login" element={<LoginForm />} />
                <Route path="/user/signup" element={<RegisterForm />} />
                <Route path="/user/profile" element={<Profile />} />
                <Route path="/user" element={<Profile />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
