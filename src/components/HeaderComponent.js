import React from 'react';
import "tailwindcss/tailwind.css";
import { Link } from 'react-router-dom';



// Nav libks for customer:
// All cars (see admin-web-react)
// Order car
// Update order (see seimilar stuff in admin-web-react)
// My orders


function HeaderComponent(props) {
    return (
        <div>

            <div className="navbar bg-base-200">

                <div className="navbar-start">
                    <div className="dropdown">
                        {/* Hamburger meny, for smaller screen: */}
                        <label tabIndex={0} className="btn lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {/* <li><a>My Profile</a></li> */}
                            <li><Link to="/myinfo">My Profile</Link></li>
                            <li>
                                <a>Cars</a>
                                <ul className="p-2">
                                    <li><Link to="/allcars">All Cars</Link></li>
                                    <li><a>Mini</a></li>
                                    <li><a>Sedan</a></li>
                                    <li><a>Sport</a></li>
                                    <li><a>Cab</a></li>
                                    <li><a>Suv</a></li>
                                    <li><a>Busss</a></li>
                                </ul>
                            </li>
                            <li><a>My Orders</a></li>
                        </ul>
                    </div>
                    <Link to="/" className="btn normal-case text-xl">Car Rental</Link>
                </div>

                {/* Top nav bar: */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {/* <li><a>My Profile</a></li> */}
                        <li><Link to="/myinfo">My Profile</Link></li>
                        <li tabIndex={0}>
                            <details>
                                <summary>Cars</summary>
                                <ul className="p-2">
                                    <li><Link to="/allcars">All Cars</Link></li>
                                    <li><a>Mini</a></li>
                                    <li><a>Sedan</a></li>
                                    <li><a>Sport</a></li>
                                    <li><a>Cab</a></li>
                                    <li><a>Suv</a></li>
                                    <li><a>Bus</a></li>
                                </ul>
                            </details>
                        </li>
                        <li><a>My Orders</a></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <a className="btn">Logout</a>
                </div>

            </div>

        </div>
    );
}

export default HeaderComponent;