import React, { Component } from 'react';
import './App.css';
import SearchBar from './SearchBar/SearchBar'
import Contain from './Contain/Contain'
import Sidebar from "react-sidebar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from "@fortawesome/free-solid-svg-icons"

const mql = window.matchMedia(`(min-width: 800px)`);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarDocked: false,
      sidebarOpen: false
    };

    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
  }

  componentWillUnmount() {
    mql.removeListener(this.mediaQueryChanged);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  mediaQueryChanged(open) {
    console.log(open);
    this.setState({ sidebarDocked: !open, sidebarOpen: false });
  }

  render() {
    return (
      <div>
      <Sidebar
        sidebar={
          <ul className='sidebar'>
            <li href="#about">MAKEUP</li >
            <li href="#services">SKINCARE</li>
            <li href="#clients">FRANGRANCE</li>
            <li href="#contact">HAIR</li>
            <li href="#">BATH BODY</li>
            <li href="">MEN</li>
          </ul>}
        overlayClassName="overlay"
        open={this.state.sidebarOpen}
        docked={this.state.sidebarDocked}
        onSetOpen={this.onSetSidebarOpen}
        styles={{ overlay: {  marginTop:"53px",  } }}
      >
      
          <button className='Button' onClick={() => this.mediaQueryChanged(this.state.sidebarDocked)} >
            Switch sidebar
            </button>
       
        <Contain></Contain>
      </Sidebar>
      
      </div>
    );
  }
}

export default App;