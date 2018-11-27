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
            if (!this.state.loadedProduct || (this.state.loadedProduct && this.state.loadedProduct.uid != this.props.match.params.id)) {
                // axios.get('https://jsonplaceholder.typicode.com/posts/' + this.props.match.params.id)
                //     .then(response => {
                //         // this.setState({loadedProduct: response.data});
                //         console.log(this.props.match.params.id);
                //     });
                const PRODUCT = {
                    uid: "1",
                    name: "1The Luminous Lifting Cushion Foundation SPF 20",
                    price: "$120.00",
                    product_URL: "https://www.bloomingdales.com/shop/product/la-mer-the-luminous-lifting-cushion-foundation-spf-20?ID=3144067&CategoryID=2921",
                    figure_URL: "https://images.bloomingdalesassets.com/is/image/BLM/products/4/optimized/10067624_fpx.tif?$2014_BROWSE_FASHION$&hei=350&wid=280",
                    brand: "La Mer",
                    review_score: "0"
                };
                this.setState({loadedProduct: PRODUCT});
            }
        }

    }

    render() {
        let post = <p style={{textAlign: 'center'}}>Please select a Product!</p>;
        if (this.props.match.params.id) {
            post = <p style={{textAlign: 'center'}}>Loading...!</p>;
        }
        if (this.state.loadedProduct) {
            post = (
                <div>
                    <Card>

                        <Container fluid>
                            <Row className='wrapper'>
                                <Col className="preview" md='6'>
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
                                <Col className="details" md='6'>
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
