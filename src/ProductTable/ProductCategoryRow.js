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
        // alert(this.props.product.id);
        return (
            <Col sm="3" >
                <Link to={{ pathname: '/detail/' + this.props.product.id }}>
                    <Card body style={{borderColor: 'white'}} className="text-center">
                        <CardImg className="img-fluid d-block mx-auto" style={{ width: '120px'}}
                                 src={this.props.product.figure_URL}/>
                        <CardBody>
                            <CardTitle style={{fontSize: '15px'}}
                                       className='project__cardTitle'>
                                {this.props.product.brand}
                                </CardTitle>
                            <CardSubtitle style={{ fontSize: '10px'}}>
                                {this.props.product.name}
                            </CardSubtitle>
                            <CardText style={{height:'3px', fontSize: '10px'}}>
                                {this.props.product.price}
                            </CardText>
                            <CardText style={{fontSize: '5px'}}>
                              {this.props.product.review_score}
                            </CardText>
                        </CardBody>
                    </Card>
                </Link>
            </Col>
        );
    }
}