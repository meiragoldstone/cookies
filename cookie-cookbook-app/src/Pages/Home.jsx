import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
    return (
        <div className="container">
            <h1 className="text-center mt-5">Cookie Cookbook</h1>
            <p className="lead text-center">
                This is the home page of the cookie cookbook website. 
            </p>
            <div className="text-center">
                <h2 className="mt-5">Find Your Favorite Recipes!</h2>
                <img src="cookie.jpg" className="img-fluid" alt="cookie" style={{ maxWidth: '100%', height: 'auto' }} />
            </div>
        </div>
    );
}

export default Home;
