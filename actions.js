
import { parseString } from 'xml2js'


/////////////////////////////////////////////////FechResults For AutoComplete////////////////////////////////////////////////////////////

export const fetchSearchResults = (query) => async (dispatch) => {
  try {
    const apiKey = 'rgMebNe9PaPTpob7TImEw';
    const response = await fetch(`https://www.goodreads.com/search/index.xml?key=${apiKey}&q=${query}`);
    console.log('Response',response)
    
    if (!response.ok) {
      throw new Error('Failed to fetch search results');
    }

    const xmlData = await response.text();
    parseString(xmlData, (err, result) => {
      const searchResults = result?.GoodreadsResponse?.search[0]?.results[0]?.work || [];
      dispatch({
        type: 'SET_SEARCH_RESULTS',
        payload: searchResults,
      });
    });
  } catch (error) {
    console.error('Error fetching search results:', error.message);
    dispatch({
      type: 'SET_SEARCH_ERROR',
      payload: error.message,
    });
  }
};
/////////////////////////////////////////////Search Result with Query////////////////////////////////////////////////
export const Search = (query) => (dispatch) => {
    console.log('Dispatching Search_Query action with payload:', query);
    console.log('Search Query in Redux Action:', query);
    dispatch({
      type: 'SET_SEARCH_QUERY',
      payload: query,
    });
    dispatch(fetchSearchResults(query));
  };

  ////////////////////////////////////////////////On Submit////////////////////////////////

  export const onSubmit = (inputValue) => async (dispatch) => {
  try {
    // Dispatch the initial action
    dispatch({
      type: 'ON_SUBMIT',
      payload: inputValue,
    });

    // console.log('Submitting query...', inputValue);
    const apiKey = 'rgMebNe9PaPTpob7TImEw';
    const response = await fetch(`https://www.goodreads.com/search/index.xml?key=${apiKey}&q=${inputValue}`);
    const xmlData = await response.text();
    parseString(xmlData, (err, result) => {
      const bookData = result?.GoodreadsResponse?.search?.[0]?.results?.[0]?.work;
      console.log('Book Data:', bookData);
      dispatch(Search(inputValue));// Dispatch the search query with the correct inputValue
      dispatch(fetchAllBooks());// Dispatch the fetchAllBooks action with the current page
       dispatch({
        type: 'HANDLE_API_RESPONSE',
        payload: bookData,
      });
    });
  } catch (error) {
    console.error('Error submitting query:', error.message);
    // Handle the error as needed
    dispatch({
      type: 'HANDLE_API_ERROR',
      payload: error.message,
    });
  }
};

//////////////////////////////////////BookId for calling books////////////////////////
  export const setSelectedBookId = (bookId) => ({
    type: 'SET_SELECTED_BOOK_ID',
    payload: bookId,
  });

  ////////////////////////////////////////SingleBookDetails////////////////////////////////////
   export const SingleBookDetails = (bookId) => (dispatch, getState) => {
    try {
      const state = getState();
      const bookDetails = state.BookList.find((book) => book.id === bookId);
      console.log('Booooooooooooooook',bookDetails)
  
      if (bookDetails) {
        // If book details are already available in BookList, dispatch the success action
        dispatch({
          type: 'FETCH_BOOK_DETAILS_SUCCESS',
          payload: { id: bookId, data: bookDetails },
        });
      } else {
        console.error('Book details not found in BookList.');
        dispatch({
          type: 'FETCH_BOOK_DETAILS_FAILURE',
          payload: 'Book details not found in BookList.',
        });
      }
    } catch (error) {
      console.error('Error fetching book details:', error.message);
      dispatch({
        type: 'FETCH_BOOK_DETAILS_FAILURE',
        payload: error.message,
      });
    }
  };
  
/////////////////////////////////////////// Add a new action to increment the page/////////////////////////////////////////////
export const incrementPage = () => ({
  type: 'INCREMENT_PAGE',
});

/////////////////////////////////////////////////////////////////////////Fetch All Books///////////////////////////////
export const fetchAllBooks = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const page = state.currentPage;
    console.log('page',page);
    const inputValue = state.search;
    // console.log('inputValueeeeeeeee', inputValue);

    const apiKey = 'rgMebNe9PaPTpob7TImEw';
    const response = await fetch(`https://www.goodreads.com/search/index.xml?key=${apiKey}&q=${inputValue}&page=${page}`);

    if (!response.ok) {
      throw new Error('Failed to fetch all books');
    }
    
    const xmlData = await response.text();
  
    parseString(xmlData, (err, result) => {
      // console.log('result11',result?.GoodreadsResponse)
      const allBooksData = result?.GoodreadsResponse?.search[0]?.results[0]?.work
      || [];
      // console.log('allBookdataaaaaaaa', allBooksData);
     
      const booksList = allBooksData.map((book) => ({
        id: book.id?.[0] || 'Unknown ID',
        Title:book.best_book[0].title[0] || 'Unknown ID',
        Author: book.best_book[0].author[0].name[0] || 'Unknown ID',
        Image:book.best_book[0].image_url[0]
      }));
      console.log('Array',booksList);

      dispatch({
        type: 'FETCH_ALL_BOOKS_SUCCESS',
        payload: booksList,
      });
    });
  } catch (error) {
    console.error('Error fetching all books:', error.message);
    dispatch({
      type: 'FETCH_ALL_BOOKS_FAILURE',
      payload: error.message,
    });
  }
};


  



  











  







  
  
  
  
  
  
  
  
  
  
  
  
  // actions with api calling
// import { fetchBooks as apiFetchBooks } from './Api.js';

// export const fetchBooks = (query) => async (dispatch) => {
//   try {
//     const books = await apiFetchBooks(query);
//     dispatch({
//       type: 'SET_BOOKS',
//       payload: books,
//     });
//   } catch (error) {
//     console.error('Error fetching books:', error);
//   }
// };

  
  