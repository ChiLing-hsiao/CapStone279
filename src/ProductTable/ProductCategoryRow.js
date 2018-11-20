import React,{Component} from 'react';//引入react
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

export default class ProductCategoryRow extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    /**
     * <Col sm="2" >
     <Card body style={{ borderColor: 'white' }} className="text-center">
     <CardImg style={{ height: '120px', width: '120px' }} src='https://www.sephora.com//productimages/sku/s2137230-main-grid.jpg' />
     <CardBody>
     <CardTitle style={{ fontSize: '14px' }} class='project__cardTitle'>TOM FORD </CardTitle>
     <CardSubtitle style={{ height: '45px', fontSize: '10px' }}>
     Obsessions Eyeshadow Palette
     </CardSubtitle>
     <CardText style={{ height: '3px',  fontSize: '10px' }}>
     $27.00
     </CardText>
     <CardText style={{ height: '5px' ,  fontSize: '10px'}}>
     4.39/5.0
     </CardText>
     </CardBody>
     </Card>
     </Col>
     * @returns {*}
     */
    render(){
        return(
            <Col sm="6" lg="4">
                <Card body style={{ borderColor: 'white' }} className="text-center">
                    <CardImg className="img-fluid d-block mx-auto" style={{ height: '120px', width: '120px' }} src={this.props.product.url} />
                    <CardBody>
                        <CardTitle style={{ fontSize: '14px' }} className='project__cardTitle'>{this.props.product.category}</CardTitle>
                        <CardSubtitle style={{ height: '45px', fontSize: '10px' }}>
                            {this.props.product.name}
                        </CardSubtitle>
                        <CardText style={{ height: '3px',  fontSize: '10px' }}>
                            {this.props.product.price}
                        </CardText>
                        <CardText style={{ height: '5px' ,  fontSize: '10px'}}>
                            {this.props.product.star}
                        </CardText>
                    </CardBody>
                </Card>
            </Col>
            // <tr><th colSpan="2">{this.props.category}</th></tr>
        )
    }
}