import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import Carousel from 'react-bootstrap/Carousel';
import AddBook from './AddBook'


class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      search: "",
      showAddModal: false
    }
  }
  showModal = () => {
    this.setState({ showAddModal: true })
  }

  hideModal = () => {
    this.setState({ showAddModal: false })
  }

  handelAddModal = async (book) => {

    const addResult = await axios.post(process.env.REACT_APP_SERVER_URL + '/books', {
      title: book.title,
      description: book.description,
      status: book.status
    })

    this.setState({ books: [...this.state.books, addResult.data] })
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
  handleAddBook = () => { }

  render() {

    return (
      <>
        <input onChange={this.handleChange} type="text" />
        <button onClick={() => this.fetchBooks(this.state.search)}>Search</button>
        <AddBook
          show={this.state.showAddModal}
          hideModal={this.hideModal}
          handelAddModal={this.handelAddModal} />

        <button onClick={this.showModal}>Add a book</button>
        <div class="carousel slide mx-auto" style={{ height: '50%', width: '50%' }}>
          {this.state.books.length
            ? <Carousel showBooks={this.state.books.length}>
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

                );
              })}
            </Carousel>
            : <p>There are no books</p>}
        </div>
      </>
    )
  }
}

export default BestBooks;