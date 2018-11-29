import React, {Component} from 'react';
import './SideBar.css'

import Sidebar from "react-sidebar";
import SearchBar from '../SearchBar/SearchBar'
// import * as Icons from "@fortawesome/free-solid-svg-icons"
// import Contain from '../Contain/Contain'
import Detailed from '../Detailed/Detailed'
import ProductTable from '../ProductTable/ProductTable'

import {BrowserRouter as Router, Route} from 'react-router-dom';

// import { Router,Route,hashHistory} from 'react-router';
import axios from "axios";

const mql = window.matchMedia(`(min-width: 800px)`);

class SideBar extends Component {
    state = {
        searchKey: ""
    };

    transferSearchKey(searchKey) {
        this.setState({searchKey: searchKey});
    }

    constructor(props) {
        super(props);
        this.state = {
            sidebarDocked: false,
            sidebarOpen: false
        };
        this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    }

    onSetSidebarOpen(open) {
        this.setState({sidebarOpen: open});
    }

    mediaQueryChanged(open) {
        console.log(open);
        this.setState({sidebarDocked: !open, sidebarOpen: false});
    }

    componentWillMount() {
        mql.addListener(this.mediaQueryChanged);
    }

    componentWillUnmount() {
        mql.removeListener(this.mediaQueryChanged);
    }

    render() {
        return (
            <div>
                <Router>
                    <Sidebar
                        sidebar={
                            <div className='sideBack'>
                                <div className='bar'></div>
                                <ul className='sidebar'>
                                    <a href="http://localhost:3000/search/Makeup">MAKEUP</a>
                                    <a href="http://localhost:3000/search/SKINCARE">SKINCARE</a>
                                    <a href="http://localhost:3000/search/FRANGRANCE">FRANGRANCE</a>
                                    <a href="http://localhost:3000/search/hair">HAIR</a>
                                    <a href="http://localhost:3000/search/bathbody">BATH BODY</a>
                                    <a href="http://localhost:3000/search/man">MEN</a>
                                </ul>
                            </div>}
                        overlayClassName="overlay"
                        open={this.state.sidebarOpen}
                        docked={this.state.sidebarDocked}
                        onSetOpen={this.onSetSidebarOpen}
                        styles={{overlay: {marginTop: "53px",}}}
                    >
                        <SearchBar
                            clicked={() => this.mediaQueryChanged(this.state.sidebarDocked)}
                            transferSearchKey={searchKey => this.transferSearchKey(searchKey)}
                        />
                        <Route exact path="/search/:tmpKey" component={ProductTable}/>
                        <Route exact path={"/"} component={ProductTable}/>
                        <Route exact path="/detail/:id" component={Detailed}/>
                    </Sidebar>
                </Router>
            </div>
        );
    }
}

export default SideBar;