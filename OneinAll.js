
// import { useParams, Link } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';

// const BookDetailsFromAllBooks = () => {
//   const { title } = useParams();
//   const [selectedBook, setSelectedBook] = useState(null);
//   const bookList = useSelector((state) => state.allBooks || []);

//   useEffect(() => {
//     const result = bookList.find((book) => book.Title === title);
//     setSelectedBook(result);
//   }, [title, bookList]);

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
//       <h2 className='heading'>Book Details</h2>
//       {selectedBook ? (
//         <div className='bookDetails'>
//           <img className='image' src={selectedBook.Image} alt="Book Cover" />
//           <p>Title: {selectedBook.Title}</p>
//           <p>Author: {selectedBook.Author}</p>
//         </div>
//       ) : (
//         <div>
//           <p>Book not found</p>
//           <Link to="/all-books">Go back to All Books</Link>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BookDetailsFromAllBooks;
////////////////////////////////////////////////////////////////////////////
// BookDetailsFromAllBooks.jsx

import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import './styles.css';

const BookDetailsFromAllBooks = () => {
  const { title } = useParams();
  const [selectedBook, setSelectedBook] = useState(null);
  const bookList = useSelector((state) => state.allBooks || []);

  useEffect(() => {
    const result = bookList.find((book) => book.Title === title);
    setSelectedBook(result);
  }, [title, bookList]);

  return (
    <div className='SingleBook'>
      <h2 className='h2'>Book Details</h2>

      {selectedBook ? (
        <Card className='bookDetailsCard'>
          <CardMedia
            component="img"
            alt="Book Cover"
            height="240"
            image={selectedBook.Image}
            title={selectedBook.Title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {selectedBook.Title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Author: {selectedBook.Author}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <div>
          <p className='loadingMessage'>Book not found....</p>
          <Link className='link' to="/all-books">Go back to All Books</Link>
        </div>
      )}
    </div>
  );
};

export default BookDetailsFromAllBooks;




