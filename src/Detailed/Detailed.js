import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Container, Card, CardImg, CardTitle, CardSubtitle, CardText, CardBody, Row, Col} from 'reactstrap';
import Tab from '../Tab/Tab'
import './Detailed.css'

class Detailed extends Component {
    render() {
        return (
            <div>
                <Card>
                    <Container>
                        <Container fluid>
                            <Row className='wrapper'>
                                <Col className="preview " md='6'>
                                    <div className="preview-pic tab-content">
                                        <div className="tab-pane active" id="pic-1"><img
                                            src="https://www.sephora.com/productimages/sku/s2137230-main-grid@2x.jp"/>
                                        </div>
                                    </div>
                                    <ul className="preview-thumbnail nav nav-tabs">
                                        <li className="active"><a data-target="#pic-1" data-toggle="tab"><img
                                            src="https://www.sephora.com//productimages/sku/s2137230-main-grid.jpg"/></a>
                                        </li>
                                        <li><a data-target="#pic-2" data-toggle="tab"><img
                                            src="https://www.sephora.com/productimages/sku/s2137230-main-grid.jpg"/></a>
                                        </li>
                                        <li><a data-target="#pic-3" data-toggle="tab"><img
                                            src="https://www.sephora.com/productimages/sku/s2137230-main-grid.jpg"/></a>
                                        </li>
                                        <li><a data-target="#pic-4" data-toggle="tab"><img
                                            src="https://www.sephora.com//productimages/sku/s2137230-main-grid.jpg"/></a>
                                        </li>
                                        <li><a data-target="#pic-5" data-toggle="tab"><img
                                            src="https://www.sephora.com//productimages/sku/s2137230-main-grid.jpg"/></a>
                                        </li>
                                    </ul>

                                </Col>
                                <Col className="details" md='6'>
                                    <h3 className="product-brand">HUDA BEAUTY</h3>
                                    <span className="product-name">Obsessions Eyeshadow Palette</span>
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
                    </Container>
                </Card>
                <Tab></Tab>
            </div>
        );
    }
};

export default Detailed;
