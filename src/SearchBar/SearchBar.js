import React, {Component} from 'react';
import './SearchBar.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import * as Icons from "@fortawesome/free-solid-svg-icons"
import { Navbar } from 'reactstrap';

class SearchBar extends Component {

    render() {
        return (
            <Navbar className='topnav'>
                <button  id="sidebarCollapse" onClick={this.props.clicked}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <a href="#home">Home</a>
                <div className="search-container">
                    <input type="text" placeholder="Search.." className="search" />
                    <button type="submit"><FontAwesomeIcon icon={Icons.faSearchPlus} size="2x" /></button>
                </div>

            </Navbar>
        );
    }
};

export default SearchBar;
