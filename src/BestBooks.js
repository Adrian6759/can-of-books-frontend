import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Carousel, Button } from 'react-bootstrap/';
import AddBook from './AddBook'
import UpdateBook from './UpdateBooks'



class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      search: "",
      showAddModal: false,
      selectedBook: null,
      showUpdateModal: false
    }
  }
  showModal = () => {
    this.setState({ showAddModal: true })
  }

  hideModal = () => {
    this.setState({ showAddModal: false })
  }

  hideUpdateModal = () => this.setState({showUpdateModal:false})

  handelAddModal = async (book) => {
    console.log('adding book', book);
    const addResult = await axios.post(process.env.REACT_APP_SERVER_URL + '/books', book)
    console.log(addResult.data);
    this.setState({ books: [...this.state.books, addResult.data] })
  }
  updateRequest = async (book) => {
    console.log(book);
    let response = await axios.put(process.env.REACT_APP_SERVER_URL + `/books/${book._id}`, {
      title: book.title,
      description: book.description,
      status: book.status
    });
    let updatedBook = response.data;
    console.log(this.state.books, updatedBook);
    this.fetchBooks();
  }
  deleteBook = async id => {
    try {
      let url = `${process.env.REACT_APP_SERVER_URL}/books/${id}`
      await axios.delete(url)
      let deletedBooks = this.state.books.filter(book => book._id !== id)
      this.setState({
        books: deletedBooks
      })
    } catch (err) {
      console.log('An error has occured ', err)
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
      books: response.data
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
        <div className="carousel slide mx-auto" style={{ height: '50%', width: '50%' }}>
          {this.state.books.length
            ? <Carousel showbooks={this.state.books.length}>
              {this.state.books.map(book => {
                return (
                  <Carousel.Item key={book._id}>
                    <img
                      className="d-block w-100"
                      src="https://via.placeholder.com/100x100"
                      alt={book.title}
                    />
                    <Carousel.Caption>
                      <h3>{book.title}</h3>
                      <p>{book.description}</p>
                      <p>{book.status}</p>
                      <Button variant="danger"
                        onClick={() => this.deleteBook(book._id)}>
                        Delete This Book
                      </Button>
                      <Button onClick={() => this.setState({ selectedBook: book, showUpdateModal: true })}>Update This Book</Button>

                    </Carousel.Caption>
                  </Carousel.Item>
);
})}
            </Carousel>
            : <p>There are no books</p>
          }
        </div >
        {this.state.showUpdateModal
          ? <UpdateBook
          book={this.state.selectedBook}
          handleUpdate={this.updateRequest}
          showModal = {this.state.showUpdateModal}
          hideUpdateModal ={this.hideUpdateModal}
          />
          : null
        }
      </>
    )
  }
}

export default BestBooks;