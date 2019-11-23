import React from 'react';
import logo from '../images/logo.png';
import Animate from 'react-smooth';

export const Home = () => {

    const first = [{
        style: {
            opacity: 0,
        },
        duration: 400,
    }, {
        style: {
            opacity: 1,
            transform: 'translate(10px, 0)',
        },
        duration: 1000,
    }];

    const second = [{
        style: {
            opacity: 0,
        },
        duration: 400,
    }, {
        style: {
            opacity: 1,
            transform: 'translate(-20px, 0)',
        },
        duration: 1000,
    }];

    return (
        <div className="home">
            <Animate steps={first}>
                <img src={logo} style={{ width: 400, marginLeft: '20%' }} />
            </Animate>
            <Animate steps={second}>
                <h1 className="headline">A React/Redux and .Net Core app</h1>
            </Animate>
        </div>
    )
}