import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";
import AuthButtons from './auth/AuthButtons';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';



class Header extends React.Component {

  request = async () => {

    let res = await this.props.auth0.getIdTokenClaims();
    let token = res._raw;
    console.log(token);
  
    let request = {
  method: 'GET',
  url: 'http://localhost:3001/books',
  headers: {
    Authorization: `Bearer ${token}`
  }
}
let response = await axios(request);
console.log(token);
console.log(response.data);
}
render() {
  let auth0 = this.props.auth0;
  console.log(auth0);
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand>My Favorite Books</Navbar.Brand>
      <NavItem><Link to="/" className="nav-link">Home</Link></NavItem>
      
      <AuthButtons />
      {auth0.isAuthenticated 
      ? <button onClick={this.request}>Make Request</button>
      :null
    }
    </Navbar>
  )
}
}


export default withAuth0(Header);
