import React, { Component } from 'react';
import {Navbar, Nav, Button, Container, Row, Col, Image, Form} from 'react-bootstrap'
import { Link, Element } from 'react-scroll'
import { Link as RouterLink} from "react-router-dom";
import fetch from 'node-fetch';
import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

//Code to Delete Artifacts from Database


class Update extends Component {

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
    if(this.state.id !== "") {

      var object = {id: this.state.id};

      const response = await fetch(`http://ec2-35-92-179-216.us-west-2.compute.amazonaws.com:8080/api/artifact/${this.state.id}`, {method: 'DELETE'});
      const data = await response.text();
      console.log(data)
      alert("Item " + this.state.id + " successfully deleted");

      this.setState({submitted:  true});
    } else {
      console.log("Not all fields filled in")
    }

  };

  constructor(props) {
    super(props)
    this.state = {
      id: "",
      name: "",
      description: "",
      country: "",
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
              <h2 className='valueH2'>Delete an Artifact</h2>
              <p className='valueP'>Delete an existing artifact by selecting its ID in MUSE</p>

              <Form>
              <Form.Group className='museForm' controlId="formBasicEmail">
                  <Form.Label className='museLabel'>ID</Form.Label>
                  <Form.Control className="input" name="id" type="name" isInvalid={this.state.id === "" && this.state.submitPress} onChange={(e) => { this.handleFormChange(e)}}/>
                  <Form.Control.Feedback type='invalid'>
                      This field cannot be empty
                  </Form.Control.Feedback>
                </Form.Group>


                <Row>
                  <Col className="museForm">
                    
                    <button className="titleBtn" variant="primary" type="submit" size="me" onClick={(e) => {this.handleSubmit(e); }}>
                      <span className="titleSpan">Delete Artifact</span> 
                    </button>
                    
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

export default Update;
