import React, { useEffect, useState } from "react";
import './index.css';
import { useLocation } from "react-router-dom";

export const BookPage = () => {
    let { state } = useLocation();
    const active_page = JSON.parse(window.localStorage.getItem('active_page'));
    const [bookItem, setItem] = useState({});

    useEffect(()=> {
        state ? setItem(state) : setItem(active_page);
    }, [])

    const { title, author, cover, rate, downloads, description, reviews } = bookItem;

    return (
     <div className="page-container">
        <div>
            <img loading="lazy" className="cover-page" src={cover} alt="cover"/>
            <div className="pd-t-20"><span className="page-title">Downloads: </span>{downloads}</div>
        </div>
        <div className="pd-l-20 pd-t-5">
            <div className="page-item-block">
                <span className="page-title">Title: </span>
                {title}
            </div>
            <div className="page-item-block pd-t-20">
                <span className="page-title">Author: </span>
                {author}
            </div>
            <div className="page-item-block pd-t-20">
                <span className="page-title">Rating: </span>
                {rate}
            </div>
            <div className="page-item-block pd-t-20">
                <span className="page-title">Description: </span>
                {description}
            </div>
            <div className="page-item-block pd-t-20">
                <span className="page-title">Reader reviews: </span>
                <div className="reviews">
                    {reviews && reviews.map((review, i)=><p key={i}>{review}</p>)}
                </div>
            </div>
        </div>
     </div>
    )
}