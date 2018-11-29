import React, {Component} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import {Container, Card, CardImg, CardTitle, CardSubtitle, CardText, CardBody, Row, Col} from 'reactstrap';
import Tab from '../Tab/Tab'
import './Detailed.css'


class Detailed extends Component {
    state = {
        loadedProduct: null
    };

    componentDidMount() {
        if (this.props.match.params.id) {
            if (!this.state.loadedProduct || (this.state.loadedProduct && this.state.loadedProduct.id != this.props.match.params.id)) {
                const params = new URLSearchParams();
                params.append("ID", this.props.match.params.id);
                axios.post('http://localhost:5000/detail', params)
                    .then(response => {
                        this.setState({loadedProduct: response.data});
                        console.log(this.props.match.params.id);
                    });
            }
        }
    }

    render() {
        let post = <p style={{textAlign: 'center'}}>Please select a Product!</p>;
        if (!this.props.match.params.id) {
            post = <p style={{textAlign: 'center'}}>Loading...!</p>;
        }
        if (this.state.loadedProduct) {
            post = (
                <div>
                    <Card>
                        <Container fluid>
                            <Row className='wrapper'>
                                <Col className="preview" md='5'>
                                    <div className="preview-pic tab-content">
                                        <div className="tab-pane active" id="pic-1">
                                            <img src={this.state.loadedProduct.figure_URL}/>
                                        </div>
                                    </div>
                                    <ul className="preview-thumbnail nav nav-tabs">
                                        <li className="active"><a data-target="#pic-1" data-toggle="tab"><img
                                            src={this.state.loadedProduct.figure_URL}/></a>
                                        </li>
                                        <li><a data-target="#pic-2" data-toggle="tab"><img
                                            src={this.state.loadedProduct.figure_URL}/></a>
                                        </li>
                                        <li><a data-target="#pic-3" data-toggle="tab"><img
                                            src={this.state.loadedProduct.figure_URL}/></a>
                                        </li>
                                        <li><a data-target="#pic-4" data-toggle="tab"><img
                                            src={this.state.loadedProduct.figure_URL}/></a>
                                        </li>
                                        <li><a data-target="#pic-5" data-toggle="tab"><img
                                            src={this.state.loadedProduct.figure_URL}/></a>
                                        </li>
                                    </ul>
                                </Col>
                                <Col className="details" md='5'>
                                    <h3 className="product-brand">{this.state.loadedProduct.brand}</h3>
                                    <span className="product-name">{this.state.loadedProduct.name}</span>
                                    <p className="product-description">SIZE 9 x 0.05 oz/ 1.3 g</p>
                                    <h5 className="colors">colors:
                                        <span className="color orange " data-toggle="tooltip"
                                              title="Not In store"></span>
                                        <span className="color green"></span>
                                        <span className="color blue"></span>
                                    </h5>
                                </Col>
                            </Row>
                        </Container>
                    </Card>
                    <Tab></Tab>
                </div>
            );
        }
        return post;
    }
};

export default Detailed;
