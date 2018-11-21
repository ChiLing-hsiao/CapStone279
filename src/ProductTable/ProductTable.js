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


var PRODUCTS = [
    {category: 'Sporting Goods1', price: '$49.99', star: "4/5", stocked: true, name: 'Football', url: 'https://www.sephora.com//productimages/sku/s2137230-main-grid.jpg'},
    {category: 'Sporting Goods2', price: '$9.99', star: "4/5", stocked: true, name: 'Baseball', url: 'https://www.sephora.com//productimages/sku/s2137230-main-grid.jpg'},
    {category: 'Sporting Goods3', price: '$29.99', star: "5/5", stocked: false, name: 'Basketball', url: 'https://www.sephora.com//productimages/sku/s2137230-main-grid.jpg'},
    {category: 'Electronics1', price: '$99.99', star: "3/5", stocked: true, name: 'iPod Touch', url: 'https://www.sephora.com//productimages/sku/s2137230-main-grid.jpg'},
    {category: 'Electronics2', price: '$399.99', star: "3/5", stocked: false, name: 'iPhone 5', url: 'https://www.sephora.com//productimages/sku/s2137230-main-grid.jpg'},
    {category: 'Electronics3', price: '$199.99', star: "5/5", stocked: true, name: 'Nexus 7', url: 'https://www.sephora.com//productimages/sku/s2137230-main-grid.jpg'},
    {category: 'Electronics1', price: '$99.99', star: "3/5", stocked: true, name: 'iPod Touch1', url: 'https://www.sephora.com//productimages/sku/s2137230-main-grid.jpg'},
    {category: 'Electronics2', price: '$399.99', star: "3/5", stocked: false, name: 'iPhone 51', url: 'https://www.sephora.com//productimages/sku/s2137230-main-grid.jpg'},
    {category: 'Electronics3', price: '$199.99', star: "5/5", stocked: true, name: 'Nexus 71', url: 'https://www.sephora.com//productimages/sku/s2137230-main-grid.jpg'},
    {category: 'Electronics1', price: '$99.99', star: "3/5", stocked: true, name: 'iPod Touch2', url: 'https://www.sephora.com//productimages/sku/s2137230-main-grid.jpg'},
    {category: 'Electronics2', price: '$399.99', star: "3/5", stocked: false, name: 'iPhone 52', url: 'https://www.sephora.com//productimages/sku/s2137230-main-grid.jpg'},
    {category: 'Electronics3', price: '$199.99', star: "5/5", stocked: true, name: 'Nexus 72', url: 'https://www.sephora.com//productimages/sku/s2137230-main-grid.jpg'}

];

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
        PRODUCTS.forEach((product)=>{

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
