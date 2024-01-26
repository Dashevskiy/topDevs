import React, { useEffect, useState } from "react";
import { Book } from "../book/Book";
import Sort from '../../assets/icon-sort.svg';
import {mockData, data} from '../../mockData/mock';
import './index.css';
import { Loader } from "../loader/Loader";
import Dropdown from "../dropdown/Dropdown";

export const Books = () => {
    const [books, setBooks] = useState([]);
    const [sortLowToHigh, setSort] = useState(true);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState(localStorage.getItem('sortByField') || 'title');

    useEffect(()=>{
        localStorage.setItem('sortLowToHigh', true);
        const storeBooks = localStorage.getItem("books");
        if (storeBooks) {
            setBooks(JSON.parse(storeBooks).slice(0, 10));
        } else {
            setBooks(mockData(10))
        }
    }, [])

    useEffect(()=>{
        if (localStorage.getItem("books") === null) {
            localStorage.setItem('books', JSON.stringify(mockData(10)));
          }
    },[books])

    useEffect(()=>{
        document.addEventListener('scroll', scrollHandler);
     
        return function() {
            document.removeEventListener('scroll', scrollHandler);
        }
    }, [])

    const handlSort = () => {
        const sortLowToHigh = JSON.parse(localStorage.getItem('sortLowToHigh'));
        localStorage.setItem('sortLowToHigh', !sortLowToHigh);

        setSort(sortLowToHigh)

        const sortByField = localStorage.getItem('sortByField'); 
        const books = JSON.parse(localStorage.getItem('books')); 

        const type = !sortLowToHigh ? mockData(data.length).sort((a, b) => a[sortByField] > b[sortByField] ? 1 : -1) : mockData(data.length).sort((a, b) => a[sortByField] < b[sortByField] ? 1 : -1);
   
        setBooks(type.slice(0, books.length))
        localStorage.setItem('books', JSON.stringify(type.slice(0, books.length)))
    }

    const handleChange = (value) => {
        setSelected(value)
        const sortBooks = mockData(data.length).sort((a, b) => a[value] > b[value] ? 1 : -1);
        setBooks(sortBooks.slice(0, 10))
        localStorage.setItem('sortByField', value)
        localStorage.setItem('books', JSON.stringify(sortBooks.slice(0, 10)));
    }

    const scrollHandler = (e) => {
        if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 1){
            setLoading((true));
            setTimeout(() => {
                setLoading(false);
                const sortByField = localStorage.getItem('sortByField'); 
                const sortLowToHigh = JSON.parse(localStorage.getItem('sortLowToHigh'));
            
                const type = sortLowToHigh ? mockData(data.length).sort((a, b) => a[sortByField] > b[sortByField] ? 1 : -1) : mockData(data.length).sort((a, b) => a[sortByField] < b[sortByField] ? 1 : -1);
                
                setBooks((prev)=> type.slice(0, prev.length + 10));
                
                const booksFromStorage = JSON.parse(localStorage.getItem('books'));
                localStorage.setItem('books', JSON.stringify(type.slice(0, booksFromStorage.length + 10)));
            }, 3000);
        }
    }

    const onClickByBook = (item) => {
        const prevStateBooks = JSON.parse(localStorage.getItem('books'));

        const newPosts = prevStateBooks.map((book) => (
            book.id === item.id
              ? { ...book, status: true }
              : book
          ));

        localStorage.setItem('books', JSON.stringify(newPosts));    
        localStorage.setItem('active_page', JSON.stringify(item));    
    }

    return (
        <div className="wrapper">
            <div className="books-header">
                <div className="books-counter">{`${data.length} books`}</div>

                <div className="sort-container">
                    <div className="sort" onClick={handlSort}><img src={Sort}/><span className="sort-txt">Sort by</span></div>
                    <div>
                        <Dropdown selected={selected} setSelected={setSelected} handleChange={(value)=>handleChange(value)}/>
                    </div>
                </div>
            
            </div>
            
            <div className="books-container">
                {
                    books.map((item)=><Book key={String(item.id)} item={item} handleClick={(el)=>onClickByBook(el)} />)
                }
                <div className={`${books.length < data.length ? 'loader-wrapper' : 'none'}`}>
                    { loading && books.length < data.length ? <Loader/> : null }
                </div>
            </div>
            
        </div>
    )
}