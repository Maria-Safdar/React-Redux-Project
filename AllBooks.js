
import React, { useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllBooks, incrementPage } from '../Redux/actions';
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import './styles.css';

const AllBooks = () => {
  const dispatch = useDispatch();
  const [bookCount, setBookCount] = useState(0);
  const bookList = useSelector((state) => state.allBooks || []);
  const currentPage = useSelector((state) => state.currentPage);
  const search = useSelector((state) => state.search);
  const isLoading = useSelector((state) => state.isLoading);

  const loadMoreBooks = () => {
    dispatch(incrementPage());
    dispatch(fetchAllBooks(currentPage + 1, search));
  };

  useEffect(() => {
    dispatch(fetchAllBooks(currentPage, search));
  }, [dispatch, currentPage, search]);

   useEffect(() => {
    setBookCount(bookList.length);
  }, [bookList]);

  return (
    <div className="allBooksContainer">
      <h2 className="allBooksHeading">All Books Component</h2>

      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          
          {bookList && bookList.length > 0 ? (
            bookList.map((book) => (
              <div key={book.id} className="bookItem">
                <Link to={`/book-details-from-all-books/${book.Title}`}>
                  <p className="bookTitle"> {book.Title}</p>
                </Link>
                <p className="bookAuthor">Author: {book.Author}</p>
              </div>
            ))
          ) : (
            <p>No books available</p>
          )}
          <button
            className="loadMoreButton"
            onClick={loadMoreBooks}
          >
            Load More
          </button>
          <p>Total Books: {bookCount}</p>
        </>
      )}
    </div>
  );
};

export default AllBooks;

