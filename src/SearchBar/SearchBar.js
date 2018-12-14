import React, { Component } from 'react';
import axios from 'axios';
import './SearchBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from "@fortawesome/free-solid-svg-icons"
import { Navbar } from 'reactstrap';
import ProductTable from "../ProductTable/ProductTable";
import { Link } from "react-router-dom";
import Sidebar from "react-sidebar";

class SearchBar extends Component {
    state = {
        tmpKey: "",
    };
    constructor(props) {
        super(props);
        this.state = {
            openBar: false,
        };
        this.setSidebar = this.setSidebar.bind(this);
    }
    setSidebar() {
        console.log(this.state.openBar);
        this.setState({ openBar: !this.state.openBar });
        this.props.clicked()
    }
    handleSubmit(e) {
        if (e.key === 'Enter') {
            // TODO redirect user to '/movie'
            
            console.log(e.target.value);
           return <Link to={`/search/${e.target.value}`}/>
        }
        
    }
     
    render() {
        
        let but = <button id="sidebarCollapse" onClick={this.setSidebar}>
            <span></span><span></span><span></span>
        </button>
        if (this.state.openBar) {
            but = <button style={{background: 'black', border:'none'}} id="sidebarCollapse" onClick={this.setSidebar}>
                <FontAwesomeIcon icon={Icons.faWindowClose} size="lg" color="white"></FontAwesomeIcon>
            </button>
        }
       
        return (
            <Navbar className='topnav'>

                {but}
                <Link to="/">
                    <button className="home">Home</button>
                </Link>
                <h3 style={{textAlign: 'center', color:'white', fontFamily:'Tahoma'}}>Find Your Beauty</h3>
                <div className="side">
                    <div className="search-container">

                        <input type="text" placeholder="Search..." className="search"
                            onChange={(event) => this.setState({ tmpKey: event.target.value })} onKeyPress={this.handleSubmit}  />
                        
                        <Link to={`/search/${this.state.tmpKey}`}>
                            <button><FontAwesomeIcon icon={Icons.faSearchPlus} size="lg" color="white" /></button>
                        </Link>
                    </div>
                </div>
            </Navbar>
        );
    }
}

export default SearchBar;
