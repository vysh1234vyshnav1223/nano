import React from "react";
import './Header.css';
import { isLoggedIn } from "../../utilities/auth";
import { FaRegUserCircle } from "react-icons/fa";


const Header = () => {

    const userLoggedIn = isLoggedIn();

    return (
        <div>
            <header className="header">
                <div className="logo">                    
                    <svg xmlns="http://www.w3.org/2000/svg" height="32" width="36" viewBox="0 0 384 512"><path fill="#B197FC" d="M374.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-320 320c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l320-320zM128 128A64 64 0 1 0 0 128a64 64 0 1 0 128 0zM384 384a64 64 0 1 0 -128 0 64 64 0 1 0 128 0z" /></svg>
                   <a href="/"> <h1 className="logo-text">Nano</h1> </a>
                </div>
                <div className="header-options">
                    <a href="/beneficiaries">Add Beneficiaries</a>
                    <a href="/transfer-money">Transfer Money</a>
                    <a href="/transaction-history">Transaction History</a>
                </div>
                {userLoggedIn ?
                        <a href="/user-profile"><FaRegUserCircle className="logged-in-icon"/></a>
                    :
                    <div className="header-button">
                        <div herf="/signup">
                            <a href="/signup">  <button>Signup/Login</button></a>
                        </div>
                    </div>
                }
            </header>
        </div>

    )
}

export default Header;

