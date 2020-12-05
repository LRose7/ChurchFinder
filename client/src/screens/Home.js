import React from 'react';

const Home = () => (
    <div id='background-container'>
        <img id='home-background-img' src='background.jpg' alt='homepage-background'></img>
        <div className='home-text'>

            <h1 className='homepage-title'>Find Your Home Church</h1>
            <br></br>
            <div>
                <button onClick={e => window.location.href = '/Findchurch'}>Find A Church</button>

                <button onClick={e => window.location.href = '/Addchurch'}>Add Church</button>
            </div>
        </div>
    </div>
);

export default Home;