import React, { useState } from 'react';
import Login from '../Login/Login';
import Register from '../Register/Register';
import LayOut from '../../Components/LayOut/LayOut';
import classes from './auth.module.css';

function Auth() {
    const [isLogin, setIsLogin] = useState(true);

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <LayOut>
            <section className={classes.container}>
                <div className={classes.auth_container}>
                    <div className={classes.auth_form}>
                        {isLogin ? (
                            <Login toggleForm={toggleForm} />
                        ) : (
                            <Register toggleForm={toggleForm} />
                        )}
                    </div>
                    <div className={classes.auth_page_container}>
                        <div className={classes.auth_page}>
                            <span>About</span>
                            <h1>Evangadi Networks</h1>
                            <p>No matter what stage of life you are in, whether you’re just starting elementary school or being promoted to CEO of a Fortune 500 company, you have much to offer to those who are trying to follow in your footsteps.</p>
                            <p>Whether you are willing to share your knowledge or you are just looking to meet mentors of your own, please start by joining the network here.</p>
                            <br />
                            <button className={classes.btn_btn}>How it works</button>
                        </div>
                    </div>
                </div>
            </section>
        </LayOut>
    );
}



export default Auth;
