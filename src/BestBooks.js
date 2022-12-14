import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';


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


  render() {

    return (
      <>
        <input onChange={this.handleChange} type="text" />
        <button onClick={() => this.fetchBooks(this.state.search)}>Search</button>
        <div style={{ height: '50%', width: '50%' }}>
          <Carousel>
            {this.state.books.map(book => {
              return (
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://via.placeholder.com/100x100"
                    alt={book.title}
                  />
                  <Carousel.Caption>
                    <h3>{book.title}</h3>
                    <p>{book.description}</p>
                    <p>{book.status}</p>
                  </Carousel.Caption>
                </Carousel.Item>

              )
            })
            }
          </Carousel>
        </div>
      </>
    )
  }
}

export default BestBooks;