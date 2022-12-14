import React, { Component } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

export class AddBook extends Component {
  render() {
    return (
      <div>
        <Modal show={this.props.show} onHide={this.props.hideModal}>
          <Modal.Body>
            <Form onSubmit={this.props.handelAddModal}>
              <Form.Group className='mb-3'>
                <Form.Label>Book Title</Form.Label>
                <Form.Control
                  type='text'
                  name='title'
                  placeholder='Enter the title of the book'
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Book Description</Form.Label>
                <Form.Control
                  type='text'
                  name='description'
                  placeholder='Enter the Description of the Book'
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Book Status</Form.Label>
                <Form.Control
                  type='text'
                  name='status'
                  placeholder='Enter the status'
                />
              </Form.Group>

              <Button
                onClick={this.props.hideModal}
              >
                Close
              </Button>
              <Button
                style={{ marginLeft: 10 }}
                variant='primary'
                >
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