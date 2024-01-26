
import './App.css';
import { BookPage } from './components/bookPage/BookPage';
import { Books } from './components/books/Books';
import { Header } from './components/header/Header';
import { Routes, Route } from 'react-router-dom';
import { NotFoundPage } from './components/notFoundPage/NotFoundPage';
import { Layout } from './components/layout/Layout';

function App() {
  return (
    <div className='container'>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Books/>}/>
          <Route path='book' element={<BookPage/>}/>
          <Route path='book/:title' element={<BookPage/> }/>
          <Route path='*' element={<NotFoundPage/>}/>
        </Route>
      </Routes>

    </div>
  );
}

export default App;
