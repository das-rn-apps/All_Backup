// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import About from './pages/About';
import AdminPanel from './pages/AdminPanel';
import Drawer from './components/Drawer';

const App = () => (
    <Router>
        <div>
            <Drawer />
            <main style={{ padding: '1rem' }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/adminPanel" element={<AdminPanel />} />
                </Routes>
            </main>
        </div>
    </Router>
);

export default App;
