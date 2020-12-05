import React from 'react';
import Map from '../components/Map';
import SearchBox from '../components/searchbox'
import { Link } from 'react-router-dom';

const Findchurch = () => (
    <div>
        <div className='addchurch-link'>
            <Link id='addchurchlink' to="/addchurch">Don't see your church?</Link>
        </div>

        <Map />

        <SearchBox></SearchBox>

    </div>
);

export default Findchurch;