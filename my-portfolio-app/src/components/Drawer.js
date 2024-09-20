import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import Button from './Button'; // Adjust the path if necessary
import 'bootstrap/dist/css/bootstrap.min.css';

const Drawer = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <IconButton
                onClick={toggleDrawer}
                className={`position-fixed top-1 ${isOpen ? 'left-110' : 'left-1'}`}
                style={{
                    zIndex: 100,
                    marginLeft: isOpen ? '1rem' : '0',
                }}
            >
                {isOpen ? <KeyboardDoubleArrowLeftIcon style={{ color: '#ede8e8' }} /> : <MenuIcon style={{ color: '#2b0139' }} />}
            </IconButton>
            <div
                className={`position-fixed top-0 left-0 h-100 bg-dark text-white ${isOpen ? 'translate-x-0' : 'translate-x-n100'} transition-transform`}
                style={{
                    width: '150px',
                    height: '100%',
                    backgroundColor: '#3c0050',
                    color: '#fff',
                    transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
                    transition: 'transform 0.3s ease',
                    zIndex: 90,
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
                }}
            >
                <nav className="p-3" style={{ marginTop: '1rem' }}>
                    <ul className="list-unstyled">
                        <li><Button onClick={toggleDrawer} to="/">Home</Button></li>
                        <li><Button onClick={toggleDrawer} to="/profile">Profile</Button></li>
                        <li><Button onClick={toggleDrawer} to="/contact">Contact</Button></li>
                        <li><Button onClick={toggleDrawer} to="/about">About</Button></li>
                        <li><Button onClick={toggleDrawer} to="/adminPanel">Admin</Button></li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Drawer;
