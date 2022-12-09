import React, { Component } from 'react';
import {Navbar, Nav, Button, Container, Row, Col, Image, Form} from 'react-bootstrap'
import { Link, Element } from 'react-scroll'
import { Link as RouterLink} from "react-router-dom";
import fetch from 'node-fetch';
import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

//Code for staff menu


class Staff extends Component {

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



  

  constructor(props) {
    super(props)

   

    this.state = {
      name: "",
      description: "",
      country: "",
      submitPress: false
    }





  }

  render() {
    return (
      <div className="App fixHeight">

      <Element id='muse' name='muse' className='muse section'>
        <Container>
          <Row className='headerRow'>
            <Col className='museCol'>
              <h2 className='valueH2'>MUSE</h2>
              <p className='valueP'>A Museum Inventory Management Application</p>


                <Row>
                  <Col>
                      <button className="museBtn" variant="primary" type="submit" size="me" >
                        <RouterLink to="/search" className='museLink'>
                          <span className="titleSpan">Browse Artifacts</span> 
                        </RouterLink>
                      </button>
                  </Col>
                </Row>

            
            </Col>
          </Row>
        </Container>
      </Element>


    </div>
  );
  }
}

export default Staff;
