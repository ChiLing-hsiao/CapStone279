import React from 'react';
import {
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Card,
    Button,
    CardTitle,
    CardText,
    Row,
    Col,
    Table,
    Container
} from 'reactstrap';
import classnames from 'classnames';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import './Tab.css';
import * as Icons from "@fortawesome/free-solid-svg-icons"
import {Link} from "react-router-dom";
import ProductCategoryRow from "../ProductTable/ProductCategoryRow";

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
        let content = [];
        let sourceLen = this.props.product.source.source.length;
        for (let i = 0; i < sourceLen; i++) {
            content.push(
                <div key={i}>
                    <Row>
                        <Col sm='3'>{i + 1}</Col>
                        <Col sm='3'>{this.props.product.source.source[i]}</Col>
                        <Col sm='3'>${this.props.product.source.original_price[i]}</Col>
                        <Col sm='3'>
                            <a href={this.props.product.source.product_URL[i]} target="_blank">
                                <button>Buy <FontAwesomeIcon icon={Icons.faHandPointRight}></FontAwesomeIcon></button>
                            </a>
                        </Col>
                    </Row>
                    <hr/>
                </div>
            );
        }

        let review = [];
        let reviewLen = this.props.product.comment.date.length;
        let tmpKey = 0;
        for (let i = 0; i < reviewLen; i++) {
            let starNum = this.props.product.comment.score[i];
            let star = [];
            for (let j = 0; j < starNum; j++) {
                star.push(<FontAwesomeIcon key = {tmpKey + j} icon={Icons.faStar}/>);
            }
            tmpKey += starNum;
            review.push(
                <div key={i}>
                    <Row>
                        <Col sm='3'>
                            <div className="review-block-source">Source:<a
                                href="#">{this.props.product.comment.date[i]}</a></div>
                        </Col>
                        <Col sm='9'>
                            <div className="review-block-rate">
                                {star}
                            </div>
                            <div className="review-block-title">{this.props.product.comment.title[i]}</div>
                            <div className="review-block-description">{this.props.product.comment.content[i]}
                            </div>
                        </Col>
                    </Row>
                    <hr/>
                </div>);
        }
        return (
            <div>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({active: this.state.activeTab === '1'})}
                            onClick={() => {
                                this.toggle('1');
                            }}
                        >
                            Stores Information
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({active: this.state.activeTab === '2'})}
                            onClick={() => {
                                this.toggle('2');
                            }}
                        >
                            Comments
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <Container>
                            <div className="review-block" key={1}>
                                <Row>
                                    <Col sm='3'>#</Col>
                                    <Col sm='3'>Website </Col>
                                    <Col sm='3'>Price</Col>
                                    <Col sm='3'>Link</Col>
                                </Row>
                                <hr/>
                                {content}
                            </div>
                        </Container>
                    </TabPane>
                    <TabPane tabId="2">
                        <Container>
                            <div className="review-block" key={2}>
                                {review}
                            </div>
                        </Container>
                    </TabPane>
                </TabContent>
            </div>
        );
    }
}