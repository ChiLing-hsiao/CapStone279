import React, {Component} from 'react';
import './App.css';
import SearchBar from './SearchBar/SearchBar'
import SideBar from './SideBar/SideBar'


import ReactDOM from 'react-dom';

class App extends Component {
    render() {
        return (

            <div>
                <SideBar/>
            </div>

        );
    }
}

export default App;