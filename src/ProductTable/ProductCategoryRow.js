import React, {Component} from 'react';//引入react


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

    render() {
        return (
            <Col sm="6" lg="4">
                <Link to={{ pathname: '/detail/' + this.props.product.id }}>
                    <Card body style={{borderColor: 'white'}} className="text-center">
                        <CardImg className="img-fluid d-block mx-auto" style={{height: '120px', width: '120px'}}
                                 src={this.props.product.figure_URL}/>
                        <CardBody>
                            <CardTitle style={{fontSize: '14px'}}
                                       className='project__cardTitle'>
                                {this.props.product.name}
                                </CardTitle>
                            <CardSubtitle style={{height: '45px', fontSize: '10px'}}>
                                {this.props.product.brand}
                            </CardSubtitle>
                            <CardText style={{height: '3px', fontSize: '10px'}}>
                                {this.props.product.price}
                            </CardText>
                            <CardText style={{height: '5px', fontSize: '10px'}}>
                                {this.props.product.review_score}
                            </CardText>
                        </CardBody>
                    </Card>
                </Link>
            </Col>
        );
    }
}