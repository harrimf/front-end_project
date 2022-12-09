import React, { Component } from 'react';
import {Navbar, Nav, Button, Container, Row, Col, Image, Form} from 'react-bootstrap'
import { Link, Element } from 'react-scroll'
import { Link as RouterLink} from "react-router-dom";
import fetch from 'node-fetch';
import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

//Code to Login as User to Database


class Login extends Component {

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  resize() {
    let currentHideNav = (window.innerWidth <= 760);
    if (currentHideNav !== this.state.isMobile) {
        this.setState({isMobile: currentHideNav});
    }
  }

  componentWillUnmount() {
      window.removeEventListener("resize", this.resize.bind(this));
  }

  handleFormChange = (e) => {
    this.setState({[e.target.name]: e.target.value.trim() })
  }

 

  handleSubmit = async (e) => {
    e.preventDefault()
    this.setState({submitPress: true})
    if(this.state.name !== "" && this.state.password !== "") {

      const response = await fetch(`http://ec2-35-92-179-216.us-west-2.compute.amazonaws.com:8080/api/authenticate?` + new URLSearchParams({
        email: this.state.name,
        password: this.state.password,
    }));
      const data = await response.text();

      if(data.includes("successful")) {
        this.setState({isSuccessful:  true});

      }

      if(data.includes("admin")) {
        this.setState({isAdmin:  true});

      }

      this.setState({submitted:  true});
      alert(data);

    } else {
      console.log("Not all fields filled in")
    }

  };

  constructor(props) {
    super(props)
    this.state = {
      name: "",
      password: "",
      isSuccessful: false,
      isAdmin: false,
      submitPress: false
    }

    console.log("Constructor called")

  }

  render() {
    return (
      <div className="App fixHeight">

      <div className="mainNavbar">
        <Container className="navContainer">
          <Row>
            <Col>
              <RouterLink className='routerH3' to="/main">
                <h3 className='valueH3'>MUSE</h3>
              </RouterLink>
            </Col>
          </Row>
        </Container>
      </div>

      <Element id='muse' name='muse' className='muse section'>
        <Container>
          <Row className='headerRow'>
            <Col className='museCol'>
              <h2 className='valueH2'>Login to MUSE</h2>
              <p className='valueP'>Fill in your Email and Password</p>

              <Form>
                <Form.Group className='museForm' controlId="formBasicEmail">
                  <Form.Label className='museLabel'>Email</Form.Label>
                  <Form.Control className="input" name="name" type="name" isInvalid={this.state.name === "" && this.state.submitPress} onChange={(e) => { this.handleFormChange(e)}}/>
                  <Form.Control.Feedback type='invalid'>
                      This field cannot be empty
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className='museForm' controlId="formBasicEmail">
                  <Form.Label className='museLabel'>Password</Form.Label>
                  <Form.Control className="input" name="password" type="password" isInvalid={this.state.password === "" && this.state.submitPress} onChange={(e) => { this.handleFormChange(e)}}/>
                  <Form.Control.Feedback type='invalid'>
                      This field cannot be empty
                  </Form.Control.Feedback>
                </Form.Group>


                <Row>
                  <Col className="museForm">

                  <button className="titleBtn" variant="primary" type="submit" size="me" onClick={(e) => {this.handleSubmit(e); }}>
                      <span className="titleSpan">Login</span> 
                  </button>

                  <br></br>

                  {this.state.isAdmin && this.state.submitted && this.state.isSuccessful ? 
                  <RouterLink to="/main" className='museLink'>
                    Proceed as Admin
                  </RouterLink>
                  : 
                  <br></br>
                  }

                  {!this.state.isAdmin && this.state.submitted && this.state.isSuccessful? 
                  <RouterLink to="/staff" className='museLink'>
                    Proceed as Staff
                  </RouterLink>
                  : 
                  <br></br>
                  }
                   
                    
                   
                  </Col>
                  {/* <Col>
                    <ReCAPTCHA className="captcha" sitekey="6Ld2VKofAAAAACTDV3SjzukLm_Yc7M5jYy6ChkWB" onChange={onChange}/>
                  </Col> */}
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
      </Element>


    </div>
  );
  }
}

export default Login;
