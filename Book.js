
// import React, { useEffect,useState } from 'react';
// import { useSelector } from 'react-redux';
// import {useLocation} from 'react-router-dom';
// import './styles.css'


// const SingleBook = () => {
//   const location = useLocation();
//   const [selectedBook,setSelectedBook]=useState(null)
//   const bookList = useSelector((state) => state.searchResults); // Make sure it's 'bookList' instead of 'BookList'
//   useEffect(() => {
//    const result = bookList ? bookList.find((book) => book.id[0]._ === location?.state?.bookId) : null;
//    setSelectedBook(result)
//   }, [location?.state?.bookId, bookList]); // Update the dependency array

//   return (
//     <div className='SingleBook'>
//       <h2 style={{ fontSize: '1.5rem', marginBottom: '10px',textAlign:'center' }}>Book Details</h2>
//       {selectedBook ? (
//         <div className='bookDetails'>
//           <img className='image' src={selectedBook.best_book[0].image_url[0]} alt="Book Cover" />
//           <p>Title: {selectedBook.best_book[0]?.title}</p>
//           <p>Author: {selectedBook.best_book[0]?.author[0].name[0]}</p>
//           <p>ID: {selectedBook.id[0]._}</p>
//         </div>
//       ) : (
//         <p>Loading book details...</p>
//       )}
//     </div>
//   );
// };




// export default SingleBook;
///////////////////////////////////////////////////////////////////////////////////////////
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import './styles.css';

const SingleBook = () => {
  const location = useLocation();
  const [selectedBook, setSelectedBook] = useState(null);
  const bookList = useSelector((state) => state.searchResults);

  useEffect(() => {
    const result = bookList ? bookList.find((book) => book.id[0]._ === location?.state?.bookId) : null;
    setSelectedBook(result);
  }, [location?.state?.bookId, bookList]);

  return (
    <div className='SingleBook'>
      <h2 className='h2'>Book Details</h2>

      {selectedBook ? (
        <Card sx={{ maxWidth: 350 }} className='bookDetails'>
          <CardMedia
            component="img"
            alt="Book Cover"
            height="240"
            image={selectedBook.best_book[0].image_url[0]}
            title={selectedBook.best_book[0]?.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {selectedBook.best_book[0]?.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Author: {selectedBook.best_book[0]?.author[0].name[0]}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ID: {selectedBook.id[0]._}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <p className='loadingMessage'>Loading book details...</p>
      )}
    </div>
  );
};

export default SingleBook;








