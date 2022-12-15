import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap'

class UpdateBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: props.book._id,
      title: props.book.title,
      description: props.book.description,
      status: props.book.status,
      
    }
  }

  handleTitle = e => {
    this.setState({ title: e.target.value });
  }
  handleDescription = e => {
    this.setState({ description: e.target.value });
  }
  handleStatus = e => {
    this.setState({ status: e.target.value });
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.handleUpdate(this.state);
    this.props.hideUpdateModal();
  }

  render() {
    return (
        <div>
        <Modal show={this.props.showModal} onHide={this.props.hideUpdateModal}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group className='mb-3'>
                <Form.Label>Book Title</Form.Label>
                <Form.Control
                  type='text'
                  name='title'
                  onChange={this.handleTitle}
                  value={this.state.title}
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Book Description</Form.Label>
                <Form.Control
                  type='text'
                  name='description'
                  onChange={this.handleDescription}
                  value={this.state.description}
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Book Status</Form.Label>
                <Form.Control
                  type='text'
                  name='status'
                  onChange={this.handleStatus}
                  value={this.state.status}
                />
              </Form.Group>

              <Button type='submit'>Click to Update :)</Button>

            </Form>
        </Modal>
      </div>
    )
  }
}

export default UpdateBook;