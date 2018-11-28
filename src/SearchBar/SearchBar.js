import React, {Component} from 'react';
import axios from 'axios';
import './SearchBar.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import * as Icons from "@fortawesome/free-solid-svg-icons"
import {Navbar} from 'reactstrap';
import ProductTable from "../ProductTable/ProductTable";
import {Link} from "react-router-dom";
import Sidebar from "react-sidebar";

class SearchBar extends Component {
    state = {
        tmpKey: ""
    };

    render() {
        return (
            <Navbar className='topnav'>
                <button id="sidebarCollapse" onClick={this.props.clicked}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <Link to="/">
                    <button>Home</button>
                </Link>
                <div className="search-container">
                    <input type="text" placeholder="Search.." className="search"
                           onChange={(event) => this.setState({tmpKey :  event.target.value})} />
                    {/*<Link to={{ pathname : "/search" , state : { searchKey: this.state.tmpKey }}}>*/}
                        <Link to={`/search/${this.state.tmpKey}`}>
                        <FontAwesomeIcon icon={Icons.faSearchPlus} size="2x"/>
                    </Link>
                </div>
            </Navbar>
        );
    }
}

export default SearchBar;
