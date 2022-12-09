import React, { Component } from 'react';
import {Navbar, Nav, Button, Container, Row, Col, Image, Form} from 'react-bootstrap'
import { Link, Element } from 'react-scroll'
import { Link as RouterLink} from "react-router-dom";
import fetch from 'node-fetch';
import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

//Code to Update Artifacts


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
    if(this.state.id !== "" && this.state.name !== "" && this.state.description !== "" && this.state.country !== "" && this.state.image !== "") {

      var object = {id: this.state.id, name: this.state.name, description: this.state.description, country: this.state.country, imageURL: this.state.image};

      // const response = await fetch(`http://ec2-35-92-179-216.us-west-2.compute.amazonaws.com:8080/api/artifact/${this.state.id}`, {method: 'DELETE'});
      // //const data = await response.text();
      
      // const responsePost = await fetch(`http://ec2-35-92-179-216.us-west-2.compute.amazonaws.com:8080/api/artifact`, {method: 'POST', headers: new Headers({'content-type': 'application/json'}), body: JSON.stringify(object)});
      // const dataPost = await responsePost.json();
      // console.log(dataPost)

      const response = await fetch(`http://ec2-35-92-179-216.us-west-2.compute.amazonaws.com:8080/api/artifact`, {method: 'PUT', headers: new Headers({'content-type': 'application/json'}), body: JSON.stringify(object)});
      const data = await response.json();
      console.log(data)
      alert("Item " + this.state.name + " successfully updated");

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
      image: "",
      submitPress: false
    }

    console.log("Constructor called")

  }

  render() {
    return (
      <div className="App">

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
              <h2 className='valueH2'>Update an Artifact</h2>
              <p className='valueP'>Fill out the form, to update the details of an existing artifact in MUSE</p>

              <Form>
              <Form.Group className='museForm' controlId="formBasicEmail">
                  <Form.Label className='museLabel'>ID</Form.Label>
                  <Form.Control className="input" name="id" type="name" isInvalid={this.state.id === "" && this.state.submitPress} onChange={(e) => { this.handleFormChange(e)}}/>
                  <Form.Control.Feedback type='invalid'>
                      This field cannot be empty
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className='museForm' controlId="formBasicEmail">
                  <Form.Label className='museLabel'>Name</Form.Label>
                  <Form.Control className="input" name="name" type="name" isInvalid={this.state.name === "" && this.state.submitPress} onChange={(e) => { this.handleFormChange(e)}}/>
                  <Form.Control.Feedback type='invalid'>
                      This field cannot be empty
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className='museForm' controlId="formBasicEmail">
                  <Form.Label className='museLabel'>Description</Form.Label>
                  <Form.Control className="input" name="description" type="name" isInvalid={this.state.description === "" && this.state.submitPress} onChange={(e) => { this.handleFormChange(e)}}/>
                  <Form.Control.Feedback type='invalid'>
                      This field cannot be empty
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className='museForm' controlId="formBasicEmail">
                  <Form.Label className='museLabel'>Country of Origin</Form.Label>
                  <Form.Control className="input" name="country" type="email" isInvalid={this.state.country === ""  && this.state.submitPress} onChange={(e) => { this.handleFormChange(e)}}/>
                  <Form.Control.Feedback type='invalid'>
                    {this.state.email === "" ? "This field cannot be empty" : "Please enter country of origin"}
                      
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className='museForm' controlId="formBasicEmail">
                  <Form.Label className='museLabel'>Image URL</Form.Label>
                  <Form.Control className="input" name="image" type="name" isInvalid={this.state.image === ""  && this.state.submitPress} onChange={(e) => { this.handleFormChange(e)}}/>
                  <Form.Control.Feedback type='invalid'>
                    {this.state.image === "" ? "This field cannot be empty" : "Please enter a image URL"}
                      
                  </Form.Control.Feedback>
                </Form.Group>

                <Row>
                  <Col className="museForm">
                    
                    <button className="titleBtn" variant="primary" type="submit" size="me" onClick={(e) => {this.handleSubmit(e); }}>
                      <span className="titleSpan">Update Artifact</span> 
                    </button>
                    
                  </Col>
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
