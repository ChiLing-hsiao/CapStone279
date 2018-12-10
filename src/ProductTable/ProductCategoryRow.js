import React, { Component } from 'react';//引入react
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from "@fortawesome/free-solid-svg-icons"

import { Link } from 'react-router-dom';

import {
    Container,
    Row,
    Col,
    Jumbotron,
    Button,
    Card,
    CardImg,
    CardBlock,
    CardTitle,
    CardSubtitle,
    CardText,
    Badge,
    CardDeck,
    CardBody,
    Thumbnail
} from 'reactstrap';

export default class ProductCategoryRow extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    generate_star(num){
        let res = [];
        for(let i = 0; i < num; i++){
            res.push(<FontAwesomeIcon icon={Icons.faStar} key={i}></FontAwesomeIcon>);
        }
        return res;
    }

    render() {
        // alert(this.props.product.id);
        return (
            <Col sm="3" >
                <Card body style={{ borderColor: 'white' }} className="text-center">
                    <Link to={{ pathname: '/detail/' + this.props.product.id }} style={{ textDecoration: 'none', color: 'black' }}>
                        <CardImg className="img-fluid d-block mx-auto" style={{ width: '120px' }}
                            src={this.props.product.figure_URL[0]} />
                    </Link>
                    <CardBody>
                        <Link to={{ pathname: '/detail/' + this.props.product.id }} style={{ color: 'black' }}>
                            <CardTitle style={{ fontSize: '15px' }}
                                className='project__cardTitle'>
                                {this.props.product.brand}
                            </CardTitle>
                            <CardSubtitle style={{ fontSize: '10px' }}>
                                {this.props.product.name}
                            </CardSubtitle>
                        </Link>
                        <Link to={{ pathname: '/detail/' + this.props.product.id }} style={{ textDecoration: 'none', color: 'black' }}>
                            <CardText style={{ height: '3px', fontSize: '10px' }}>
                                $ {this.props.product.price}
                            </CardText>
                            <CardText style={{ fontSize: '10px' }}>
                                {this.generate_star(this.props.product.review_score)}
                            </CardText>
                        </Link>
                    </CardBody>
                </Card>
            </Col>
        );
    }
}