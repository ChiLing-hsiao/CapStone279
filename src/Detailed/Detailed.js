import React, {Component} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import {Container, Card, CardImg, CardTitle, CardSubtitle, CardText, CardBody, Row, Col} from 'reactstrap';
import Tab from '../Tab/Tab'
import './Detailed.css'


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
                        this.setState({loadedProduct: response.data});
                        console.log(this.props.match.params.id);
                        console.log(response.data);
                        console.log(this.state.loadedProduct.mini_figure_URL.length);
                    });
            }
        }
    }


    render() {
        let post = <p style={{textAlign: 'center'}}>Loading...!</p>;
        // if (!this.props.match.params.id) {
        //     post = <p style={{textAlign: 'center'}}>Loading...!</p>;
        // }
        if (this.state.loadedProduct) {
            let mini_pic = [];
            for(let i = 0; i < this.state.loadedProduct.mini_figure_URL.length; i++){
                mini_pic.push(<li className="active"><a data-target={"#pic-" + (i + 1).toString()} data-toggle="tab"><img
                    src={this.state.loadedProduct.mini_figure_URL[i]}/></a>
                </li>
                );
            }
            post = (
                <div>
                    <Card>
                        <Container fluid>
                            <Row className='wrapper'>
                                <Col className="preview" md='4'>
                                    <div className="preview-pic tab-content">
                                        <div className="tab-pane active" id="pic-1">
                                            <img src={this.state.loadedProduct.figure_URL}/>
                                        </div>
                                    </div>
                                    <ul className="preview-thumbnail nav nav-tabs">
                                        {mini_pic}
                                    </ul>
                                </Col>
                                <Col className="details" md='6'>
                                    <h3 className="product-brand">{this.state.loadedProduct.brand}</h3>
                                    <span className="product-name">{this.state.loadedProduct.name}</span>
                                    <p className="product-description">SIZE 9 x 0.05 oz/ 1.3 g</p>
                                    <h5 className="colors">Best Deal:

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
