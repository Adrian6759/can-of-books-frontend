import React from 'react';
import axios from 'axios';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      search: ""
    }
  }

  componentDidMount = () => {
    this.fetchBooks();
  }
  handleChange = (event) => {
    this.setState({ search: event.target.value })
  }
  fetchBooks = async (bookTitle) => {
    console.log('fetching book');
    console.log(bookTitle);
    let request = {
      method: 'GET',
      url: `${process.env.REACT_APP_SERVER_URL}/books`
    }
    if (bookTitle) {
      request.url += `?title=${bookTitle}`
    }
    let response = await axios(request);
    console.log(response);
    this.setState({
      books: response.data,
    });
  }

  /* TODO: Make a GET request to your API to fetch all the books from the database  */

  render() {
    // console.log(this.state);

    /* TODO: render all the books in a Carousel */

    return (
      <>
      <input onChange={this.handleChange} type="text"/>
      <button onClick={() => this.fetchBooks(this.state.search)}>Search</button>
      {this.state.books.map(book => {
        return(
          <div>
            <h3>{book.title}</h3>
            <p>{book.description}</p>
            <p>{book.status}</p>
          </div>
        )
      })
      }
        {/* <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length ? (
          <p>Book Carousel coming soon</p>
        ) : (
          <h3>No Books Found :(</h3>
        )} */}
      </>
    )
  }
}

export default BestBooks;
