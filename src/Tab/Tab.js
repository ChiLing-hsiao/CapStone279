import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Table, Container } from 'reactstrap';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Tab.css';
import * as Icons from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom";
export default class Example extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1'
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    render() {
        return (
            <div>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => { this.toggle('1'); }}
                        >
                            Stores Information
            </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={() => { this.toggle('2'); }}
                        >
                            Comments
            </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <Container>
                            <div className="review-block">
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Website</th>
                                            <th>Price</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Sephora</td>
                                            <td>$100</td>
                                            <td><a href= "https://www.sephora.com/" target="_blank"><button>Buy <FontAwesomeIcon icon ={Icons.faHandPointRight}></FontAwesomeIcon></button></a></td>
                                            
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>Bloomindales</td>
                                            <td>$110</td>
                                            <td><a href= "https://www.bloomingdales.com/" target="_blank"><button>Buy <FontAwesomeIcon icon ={Icons.faHandPointRight}></FontAwesomeIcon></button></a></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td>Nordstrom</td>
                                            <td>$120</td>
                                            <td><a href= "https://shop.nordstrom.com/?origin=tab-logo" target="_blank"><button>Buy <FontAwesomeIcon icon ={Icons.faHandPointRight}></FontAwesomeIcon></button></a></td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </Container>
                    </TabPane>
                    <TabPane tabId="2">
                        <Container>
                            <div className="review-block">
                                <Row>
                                    <Col sm='3'>

                                        <div className="review-block-name">nktailor</div>
                                        <div className="review-block-source">Source:<a href="#">Sephora</a></div>
                                    </Col>
                                    <Col sm='9'>
                                        <div className="review-block-rate">
                                            <FontAwesomeIcon icon={Icons.faStar} />
                                            <FontAwesomeIcon icon={Icons.faStar} />
                                            <FontAwesomeIcon icon={Icons.faStar} />
                                            <FontAwesomeIcon icon={Icons.faStar} />
                                            <FontAwesomeIcon icon={Icons.faStar} />
                                        </div>
                                        <div className="review-block-title">this was nice in buy</div>
                                        <div className="review-block-description">this was nice in buy. this was nice in buy. this was nice in buy. this was nice in buy this was nice in buy this was nice in buy this was nice in buy this was nice in buy</div>
                                    </Col>
                                </Row>
                                <hr />
                                <Row>
                                    <Col sm='3'>
                                        <div className="review-block-name">nktailor</div>
                                        <div className="review-block-source">Source:<a href="#">Sephora</a></div>
                                    </Col>
                                    <Col sm='9'>
                                        <div className="review-block-rate">
                                            <FontAwesomeIcon icon={Icons.faStar} />
                                            <FontAwesomeIcon icon={Icons.faStar} />
                                            <FontAwesomeIcon icon={Icons.faStar} />
                                            <FontAwesomeIcon icon={Icons.faStar} />
                                            <FontAwesomeIcon icon={Icons.faStar} />
                                        </div>
                                        <div className="review-block-title">this was nice in buy</div>
                                        <div className="review-block-description">this was nice in buy. this was nice in buy. this was nice in buy. this was nice in buy this was nice in buy this was nice in buy this was nice in buy this was nice in buy</div>
                                    </Col>
                                </Row>
                                <hr />
                            </div>
                        </Container>
                    </TabPane>
                </TabContent>
            </div>
        );
    }
}