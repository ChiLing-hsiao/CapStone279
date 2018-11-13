import React, { Component } from 'react';
import './SideBar.css'

import Sidebar from "react-sidebar";

import * as Icons from "@fortawesome/free-solid-svg-icons"
import Contain from '../Contain/Contain'


const mql = window.matchMedia(`(min-width: 800px)`);
class SideBar extends Component {
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
        this.setState({ sidebarOpen: open });
    }

    mediaQueryChanged(open) {
        console.log(open);
        this.setState({ sidebarDocked: !open, sidebarOpen: false });
    }

    componentWillMount() {
        mql.addListener(this.mediaQueryChanged);
    }

    componentWillUnmount() {
        mql.removeListener(this.mediaQueryChanged);
    }

    render() {
        return (
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
                styles={{ overlay: { marginTop: "53px", } }}
            >

                <button className='Button' onClick={() => this.mediaQueryChanged(this.state.sidebarDocked)} >
                    Switch sidebar
            </button>
                <Contain></Contain>

            </Sidebar>
        );
    }
}

export default SideBar;