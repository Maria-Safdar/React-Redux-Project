const initialState = {
    search: null,
    submittedValue: null,
    bookList:[],
    searchResults:[],
    bookDetails:[],
    selectedBookId:null,
    apiResponse: [],
    allBooks:[],
    currentPage: 1, 
    error: null,
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {

/////////////////////////////////////////Fetch search Results and qeury ////////////////////////////////////////////////////
  case 'SET_SEARCH_RESULTS':
  return {
    ...state,
    searchResults: action.payload,
    searchError: null,
  };

case 'SET_SEARCH_ERROR':
  console.error('Search error:', action.payload);
  return {
    ...state,
    searchResults: [],
    searchError: action.payload,
  };

      case 'SET_SEARCH_QUERY':
        return {
          ...state,
          search: action.payload,
        };




        /////////////////////////////////////////////////ON Submit////////////////////////////////////
      case 'ON_SUBMIT':
        console.log('Form submitted!');
        return {
          ...state,
          submittedValue: action.payload,
        };
        case 'SET_SELECTED_BOOK_ID':
          console.log('SET SELECTED ID',action.payload)
  return {
    ...state,
    selectedBookId: action.payload,

  };
      case 'HANDLE_API_RESPONSE':
        console.log('API Response:', action.payload);
  
        // Extract book names from the API response
        const searchResults = action.payload || [];
        const BookList = searchResults.map(book => ({
          id: book.id[0]._,
          title: book.best_book[0].title[0],
          author: book.best_book[0].author[0].name[0],
         Image: book.best_book[0].image_url[0],

        }));
        return {
          ...state,
          // apiResponse:searchResults,
          BookList: BookList,
          error: null,
        };
      case 'HANDLE_API_ERROR':
        console.error('API Error:', action.payload);
        return {
          ...state,
          error: action.payload,
        };



        ////////////////////////////////////////////For Single Book Component/////////////////////////////////////////////
        case 'FETCH_BOOK_DETAILS_SUCCESS':
          return {
            ...state,
            bookDetails: {
              ...state.bookDetails,
              [action.payload.id]: action.payload.data,
            },
            // Update BookList with details for the clicked book
            BookList: state.bookList.map(book => {
              if (book.id === action.payload.id) {
                return {
                  ...book,
                  details: action.payload.data,
                };
              }
              return book;
            }),
            error: null,
          };
        case 'FETCH_BOOK_DETAILS_FAILURE':
          return {
            ...state,
            error: action.payload,
          };
         ////////////////////////////////////////////////////////For All Books Component////////////////////////////////////////
          case 'INCREMENT_PAGE':
      return {
        ...state,
        currentPage: state.currentPage + 1,
      };
        case 'FETCH_ALL_BOOKS_SUCCESS':
  const newBooks = action.payload;
  const updatedBooks = state.currentPage === 1 ? newBooks : [...state.allBooks, ...newBooks];

  return {
    ...state,
    allBooks: updatedBooks,
    error: null,
  };
       case 'FETCH_ALL_BOOKS_FAILURE':
            console.error('Error fetching all books:', action.payload);
            return {
              ...state,
              error: action.payload,
            };
      default:
        return state;
    }
  };
  
  export default reducer;
  



     


  
  
  