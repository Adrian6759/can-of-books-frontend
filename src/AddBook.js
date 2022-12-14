import React, { Component } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

export class AddBook extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      status: ''
    }
  }
  handleTitle = (e) => {
    this.setState({title:e.target.value})
  }

  handleDescription = (e) => {
    this.setState({decription:e.target.value})
  }

  handleStatus = (e) => {
    this.setState({status:e.target.value})
  }

handleSubmit = (e) => {
e.preventDefault();
this.props.handelAddModal(this.state);
this.props.hideModal();
}
  render() {
    console.log(this.state);
    return (
      <div>
        <Modal show={this.props.show} onHide={this.props.hideModal}>
          <Modal.Body>
            <Form onSubmit={this.props.handleSubmit}>
              <Form.Group className='mb-3'>
                <Form.Label>Book Title</Form.Label>
                <Form.Control
                  type='text'
                  name='title'
                  placeholder='Enter the title of the book'
                  onChange={this.handleTitle}
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Book Description</Form.Label>
                <Form.Control
                  type='text'
                  name='description'
                  placeholder='Enter the Description of the Book'
                  onChange={this.handleDescription}
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Book Status</Form.Label>
                <Form.Control
                  type='text'
                  name='status'
                  placeholder='Enter the status'
                  onChange={this.handleStatus}
                />
              </Form.Group>

              <Button onClick={this.props.hideModal}>
                Close</Button>
              <Button
                style={{ marginLeft: 10 }}
                variant='primary'
                type='submit'>
                Add your book!
              </Button>

            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default AddBook;