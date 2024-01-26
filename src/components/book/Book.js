import React from "react";
import './index.css';

import Viewed1 from '../../assets/icon-viewed-1.svg';
import Viewed2 from '../../assets/icon-viewed-2.svg';
import { Link } from "react-router-dom";

export const Book = ({item, handleClick}) => {
    const {id, title, author, cover, rate, status } = item;

    return (
        <div className="book-container">
            <Link to={`/book/${id}`} state={item} onMouseDown={()=>handleClick(item)}>
                <img loading="lazy" className="viewed" src={status ? Viewed2 : Viewed1} alt="viewed"/>
                <div className="cover-container">
                    <img loading="lazy" className="cover" src={cover} alt="cover"/>
                </div>
            </Link>
            <div className="book-title txt">{title}</div>
            <div className="txt">{author}</div>
            <div className="txt">{rate}/5</div>
            <div className="txt">{status}</div>
        </div>
    )
}