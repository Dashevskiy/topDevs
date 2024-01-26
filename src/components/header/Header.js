import React from "react";
import { Link, useParams } from 'react-router-dom';
import Back from '../../assets/icon-back.svg';
import './index.css';

export const Header = () => {

    return (
        <div className="header">
            {Object.keys(useParams()).length == 0 ? 'Books read this month' : <Link to={'/'}><img src={Back} alt="Back"/></Link>}
        </div>
   )
}