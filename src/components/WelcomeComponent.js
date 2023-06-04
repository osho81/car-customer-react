import React from 'react';
import "tailwindcss/tailwind.css";
import { Link } from 'react-router-dom';

function WelcomeComponent(props) {
    return (
        <div>
            <h1 className="text-5xl mt-40 self-center">Welcome To Car Rentals</h1>{" "}

            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-10"> 
                <Link to="/allcars">All Cars</Link>
            </button>

        </div>
    );
}

export default WelcomeComponent;