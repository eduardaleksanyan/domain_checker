import React from 'react'
import { NavLink } from 'react-router-dom'

export const Header = () => {
    
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <NavLink to="/" className="nav-link" activeClassName="active">Upload</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/domains" className="nav-link" activeClassName="active">Domains</NavLink>
                    </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}
