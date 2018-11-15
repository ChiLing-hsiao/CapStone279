import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
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
import ProductCategoryRow from "./ProductCategoryRow";
import ProductRow from "./ProductRow";


class ProductTable extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){
        let rows=[];
        var cnt = 0;
        var N_ROW = 4;
        this.props.products.forEach((product)=>{

            // rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
            // /**
            //  * 插入列表
            //  * @type {Object}
            //  */
            cnt = cnt + 1;
            if((cnt % 4) === 0){
                rows.push(<ProductCategoryRow product={product} key={product.name} />);
            }else{
                rows.push(<ProductCategoryRow product={product} key={product.name} />);
            }
        });

        // alert();

        return(
            <div>
                <Container>
                    <Row>
                    {rows}
                    </Row>
                </Container>
            </div>
        )
    }
};

export default ProductTable;
