import React from 'react';
import Navbar from './Navbar';
import {Outlet} from 'react-router-dom'
import Footer from './Footer';

const Root = () => {
    return (
        <div className='max-w-screen-xl mx-auto'>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;