import React, {Component} from 'react';
import axios from 'axios';
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


const PRODUCTS = [
    {
        uid: "1",
        name: "1The Luminous Lifting Cushion Foundation SPF 20",
        price: "$120.00",
        product_URL: "https://www.bloomingdales.com/shop/product/la-mer-the-luminous-lifting-cushion-foundation-spf-20?ID=3144067&CategoryID=2921",
        figure_URL: "https://images.bloomingdalesassets.com/is/image/BLM/products/4/optimized/10067624_fpx.tif?$2014_BROWSE_FASHION$&hei=350&wid=280",
        brand: "La Mer",
        review_score: "0"
    },{
        uid: "2",
        name: "The Luminous Lifting Cushion Foundation SPF 20",
        price: "$120.00",
        product_URL: "https://www.bloomingdales.com/shop/product/la-mer-the-luminous-lifting-cushion-foundation-spf-20?ID=3144067&CategoryID=2921",
        figure_URL: "https://images.bloomingdalesassets.com/is/image/BLM/products/4/optimized/10067624_fpx.tif?$2014_BROWSE_FASHION$&hei=350&wid=280",
        brand: "La Mer",
        review_score: "0"
    },{
        uid: "3",
        name: "3The Luminous Lifting Cushion Foundation SPF 20",
        price: "$120.00",
        product_URL: "https://www.bloomingdales.com/shop/product/la-mer-the-luminous-lifting-cushion-foundation-spf-20?ID=3144067&CategoryID=2921",
        figure_URL: "https://images.bloomingdalesassets.com/is/image/BLM/products/4/optimized/10067624_fpx.tif?$2014_BROWSE_FASHION$&hei=350&wid=280",
        brand: "La Mer",
        review_score: "0"
    },{
        uid: "4",
        name: "4The Luminous Lifting Cushion Foundation SPF 20",
        price: "$120.00",
        product_URL: "https://www.bloomingdales.com/shop/product/la-mer-the-luminous-lifting-cushion-foundation-spf-20?ID=3144067&CategoryID=2921",
        figure_URL: "https://images.bloomingdalesassets.com/is/image/BLM/products/4/optimized/10067624_fpx.tif?$2014_BROWSE_FASHION$&hei=350&wid=280",
        brand: "La Mer",
        review_score: "0"
    },{
        uid: "5",
        name: "5The Luminous Lifting Cushion Foundation SPF 20",
        price: "$120.00",
        product_URL: "https://www.bloomingdales.com/shop/product/la-mer-the-luminous-lifting-cushion-foundation-spf-20?ID=3144067&CategoryID=2921",
        figure_URL: "https://images.bloomingdalesassets.com/is/image/BLM/products/4/optimized/10067624_fpx.tif?$2014_BROWSE_FASHION$&hei=350&wid=280",
        brand: "La Mer",
        review_score: "0"
    },{
        uid: "6",
        name: "6The Luminous Lifting Cushion Foundation SPF 20",
        price: "$120.00",
        product_URL: "https://www.bloomingdales.com/shop/product/la-mer-the-luminous-lifting-cushion-foundation-spf-20?ID=3144067&CategoryID=2921",
        figure_URL: "https://images.bloomingdalesassets.com/is/image/BLM/products/4/optimized/10067624_fpx.tif?$2014_BROWSE_FASHION$&hei=350&wid=280",
        brand: "La Mer",
        review_score: "0"
    },{
        uid: "7",
        name: "7The Luminous Lifting Cushion Foundation SPF 20",
        price: "$120.00",
        product_URL: "https://www.bloomingdales.com/shop/product/la-mer-the-luminous-lifting-cushion-foundation-spf-20?ID=3144067&CategoryID=2921",
        figure_URL: "https://images.bloomingdalesassets.com/is/image/BLM/products/4/optimized/10067624_fpx.tif?$2014_BROWSE_FASHION$&hei=350&wid=280",
        brand: "La Mer",
        review_score: "0"
    },{
        uid: "8",
        name: "8The Luminous Lifting Cushion Foundation SPF 20",
        price: "$120.00",
        product_URL: "https://www.bloomingdales.com/shop/product/la-mer-the-luminous-lifting-cushion-foundation-spf-20?ID=3144067&CategoryID=2921",
        figure_URL: "https://images.bloomingdalesassets.com/is/image/BLM/products/4/optimized/10067624_fpx.tif?$2014_BROWSE_FASHION$&hei=350&wid=280",
        brand: "La Mer",
        review_score: "0"
    },{
        uid: "9",
        name: "9The Luminous Lifting Cushion Foundation SPF 20",
        price: "$120.00",
        product_URL: "https://www.bloomingdales.com/shop/product/la-mer-the-luminous-lifting-cushion-foundation-spf-20?ID=3144067&CategoryID=2921",
        figure_URL: "https://images.bloomingdalesassets.com/is/image/BLM/products/4/optimized/10067624_fpx.tif?$2014_BROWSE_FASHION$&hei=350&wid=280",
        brand: "La Mer",
        review_score: "0"
    }
];

class ProductTable extends Component {

    state = {
        products: []
    };

    componentDidMount() {
        // axios.get('https://jsonplaceholder.typicode.com/posts')
        //     .then(response => {
        //         const products = response.data.slice(0, 9).map(product => {
        //             return {
        //                 ...product,
        //                 author: 'Bicheng'
        //             }
        //         });
        //         this.setState({products: products});
        //     });
        this.setState({products: PRODUCTS});
        // this.state.products =
    }

    render() {
        const products = this.state.products;
        let rows = [];
        let cnt = 0;
        const N_ROW = 4;
        products.forEach((product) => {
            cnt = cnt + 1;
            if ((cnt % 4) === 0) {
                rows.push(<ProductCategoryRow product={product} key={product.uid}/>);
            } else {
                rows.push(<ProductCategoryRow product={product} key={product.uid}/>);
            }
        });

        // alert();

        return (
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
