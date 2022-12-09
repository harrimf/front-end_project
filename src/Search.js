import React, { Component } from 'react';
import {Navbar, Nav, Button, Container, Row, Col, Image, Form} from 'react-bootstrap'
import { Link, Element } from 'react-scroll'
import { Link as RouterLink} from "react-router-dom";
import fetch from 'node-fetch';
import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

//Code to Browse Artifacts


class Search extends Component {

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

  loadData = async () => {

      const response = await fetch(`http://ec2-35-92-179-216.us-west-2.compute.amazonaws.com:8080/api/artifact`);
      const dataJSON = await response.json();
      console.log(dataJSON)

      this.setState({data: dataJSON})


  } 

 

  handleSubmit = async (e) => {
    e.preventDefault()
    this.setState({submitPress: true})
    if(this.state.name !== "") {

      const response = await fetch(`http://ec2-35-92-179-216.us-west-2.compute.amazonaws.com:8080/api/search?` + new URLSearchParams({
        query: this.state.name,
    }));
      const dataJSON = await response.json();
      console.log(dataJSON)

      this.setState({data: dataJSON})

      this.setState({submitted:  true});
    } else {
      console.log("Not all fields filled in")
    }

  };

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      id: "",
      name: "",
      description: "",
      country: "",
      submitPress: false
    }

    console.log("Constructor called")

    this.loadData()

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
              <h2 className='valueH2'>Search Artifacts</h2>
              <p className='valueP'>Browse the existing artifact </p>

              <Form>
              <Form.Group className='museForm' controlId="formBasicEmail">
                  <Form.Label className='museLabel'>Search Term</Form.Label>
                  <Form.Control className="input" name="name" type="name" isInvalid={this.state.name === "" && this.state.submitPress} onChange={(e) => { this.handleFormChange(e)}}/>
                  <Form.Control.Feedback type='invalid'>
                      This field cannot be empty
                  </Form.Control.Feedback>
                </Form.Group>


                <Row>
                  <Col className="museForm">
                    <button className="titleBtn" variant="primary" type="submit" size="me" onClick={(e) => {this.handleSubmit(e); }}>
                      <span className="titleSpan">Search Artifacts</span> 
                    </button>
                  </Col>
                </Row>

                <p className='valueH3'>Results</p>
                {
                    this.state.data.map((item, key) => {
                      return  <Row className='museRow'>
                                <Col>
                                  <h3 className='valueP quote'>{item.name}</h3>
                                  <h3 className='valueP'>{item.description}</h3>
                                  <h3 className='valueP'>{item.country}</h3>
                                  <h3 className='valueP'>{item.rfidTag.id}</h3>
                                  <h3 className='valueP'>{item.rfidTag.storageCoordinates}</h3>
                                  <p className='valueP'>{item.id}</p>
                                </Col>
                                <Col>
                                  <Image className='museImage'src={item.imageURL} alt="new" />
                                </Col>
                              </Row>

                    })
                }
                
              </Form>
            </Col>
          </Row>
          
        </Container>
      </Element>


    </div>
  );
  }
}

export default Search;
