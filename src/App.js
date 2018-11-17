import React, { Component } from 'react';
import './App.css';
import SearchBar from './SearchBar/SearchBar'
import SideBar from './SideBar/SideBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from "@fortawesome/free-solid-svg-icons"



class App extends React.Component {
  render() {
    return (
      <div>
        
      <SideBar></SideBar>     
      
      </div>
    );
  }
}

export default App;