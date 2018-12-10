import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Card, CardImg, CardTitle, CardSubtitle, CardText, CardBody, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from "@fortawesome/free-solid-svg-icons"
import Tab from '../Tab/Tab'
import './Detailed.css'
import logo from './gif-maker.gif'

class Detailed extends Component {
    state = {
        loadedProduct: null,
        selectedImage: ''
    };

    componentDidMount() {
        if (this.props.match.params.id) {
            if (!this.state.loadedProduct || (this.state.loadedProduct && this.state.loadedProduct.id != this.props.match.params.id)) {
                const params = new URLSearchParams();
                params.append("ID", this.props.match.params.id);
                axios.post('http://localhost:5000/detail', params)
                    .then(response => {
                        this.setState({ loadedProduct: response.data });
                        this.setState({ selectedImage: this.state.loadedProduct.mini_figure_URL[0] });
                    });
            }
        }
    }
    myColor(position){
        if (this.state.selectedImage === this.state.loadedProduct.mini_figure_URL[position]) {
          return "black";
        }
        return "white";
      }
    
    SelectImage(Url) {
        console.log(Url)
        this.setState({ selectedImage: Url });
    }

    render() {
        let post = <p style={{ textAlign: 'center', fontSize: '50px', fontFamily: 'Georgia' }}>
        <img src={logo} alt="loading..." /> </p>;
        let previewSrc = <CardImg  style={{ height: '150px' }} src={this.state.selectedImage} />
        if (this.state.loadedProduct) {
            let mini_pic = [];
            for (let i = 0; i < this.state.loadedProduct.mini_figure_URL.length; i++) {
                mini_pic.push(<li><Card style={{borderColor: this.myColor(i), cursor:'pointer'}} 
                onClick={() => this.SelectImage(this.state.loadedProduct.mini_figure_URL[i])} >
                <a data-toggle="tab"><CardImg style={{ height: '66px'}}
                    src={this.state.loadedProduct.mini_figure_URL[i]} /></a>
                     </Card>
                </li>
                );
            }
            post = (
                <div>
                    <Card>
                        <Container fluid>
                            <Row>
                                <Col md='4'>

                                    <Card style={{ borderColor: 'white' }}>
                                        {previewSrc}
                                    </Card>

                                    
                                    <ul className="preview-thumbnail nav nav-tabs">
                                        {mini_pic}
                                    </ul>
                                    
                                    
                                </Col>
                                <Col className="details" md='6'>
                                    <h3 className="product-brand">{this.state.loadedProduct.brand}</h3>
                                    <span className="product-name">{this.state.loadedProduct.name}</span>
                                    <h5>Best Deal:
                                        $ {this.state.loadedProduct.price}
                                    </h5>
                                </Col>
                            </Row>
                        </Container>
                    </Card>
                    <Tab product={this.state.loadedProduct}></Tab>
                </div>
            );
        }
        return post;
    }
};

export default Detailed;
