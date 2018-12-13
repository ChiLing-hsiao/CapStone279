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
    myColor(position) {
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
        let previewSrc = <CardImg style={{ height: '100%' }} src={this.state.selectedImage} />
        if (this.state.loadedProduct) {
            let mini_pic = [];
            let starNum = this.state.loadedProduct.review_score;
            let star = [];
            for (let j = 0; j < starNum; j++) {
                star.push(<FontAwesomeIcon icon={Icons.faStar} />);
            }
            for (let i = 0; i < this.state.loadedProduct.mini_figure_URL.length && i < 2; i++) {
                mini_pic.push(<Card style={{ borderColor: this.myColor(i), cursor: 'pointer', width: '160px' }}
                    onClick={() => this.SelectImage(this.state.loadedProduct.mini_figure_URL[i])} >
                    <a data-toggle="tab"><CardImg
                        src={this.state.loadedProduct.mini_figure_URL[i]} /></a>
                </Card>

                );
            }
            post = (
                <div>
                    <Card>
                        <Container fluid>
                            <Row>
                                <Col md='3'>

                                    <Card style={{ borderColor: 'white', width:'400px' }}>
                                        {previewSrc}
                                    </Card>
                                </Col>
                                <Col md='2'>

                                    <ul className="preview-thumbnail nav nav-tabs">
                                        {mini_pic}
                                    </ul>
                                </Col>


                                <Col className="details" md='4'>
                                    <h3 className="product-brand">{this.state.loadedProduct.brand}</h3>
                                    <h5 className="product-name">{this.state.loadedProduct.name}</h5>
                                    <br/>
                                    <h5>
                                        Review Score: 
                                        {star}
                                    </h5>
                                    <h4>
                                        Best Deal:
                                        $ {this.state.loadedProduct.price}

                                    </h4>
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
