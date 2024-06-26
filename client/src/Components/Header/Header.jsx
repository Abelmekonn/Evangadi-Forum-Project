import React from 'react';
import img from '../../assets/img/evangadi-logo-home.png';
import { Link, useNavigate } from 'react-router-dom';
import classes from './header.module.css';

function Header() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
        window.location.reload(); // Consider alternative ways to refresh if needed
    };

    const token = localStorage.getItem('token');

    return (
        <div className={classes.header_container}>
            <div className={classes.logo}>
                <img src={img} alt="Evangadi Logo" />
            </div>
            <div className={classes.navs}>
                <Link to="/" className={classes.link}>Home</Link>
                <Link to="/" className={classes.link}>How it works</Link>
                {token ? (
                    <button className={classes.btn} onClick={handleLogout}><span>Logout</span></button>
                ) : (
                    <button className={classes.btn}><span>Sign in</span></button>
                )}
            </div>
        </div>
    );
}

export default Header;
