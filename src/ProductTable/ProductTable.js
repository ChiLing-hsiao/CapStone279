import React, { Component } from 'react';
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
        id: "1",
        name: "1The Luminous Lifting Cushion Foundation SPF 20",
        price: "$120.00",
        product_URL: "https://www.bloomingdales.com/shop/product/la-mer-the-luminous-lifting-cushion-foundation-spf-20?ID=3144067&CategoryID=2921",
        figure_URL: "https://images.bloomingdalesassets.com/is/image/BLM/products/4/optimized/10067624_fpx.tif?$2014_BROWSE_FASHION$&hei=350&wid=280",
        brand: "La Mer",
        review_score: "0"
    }, {
        id: "2",
        name: "The Luminous Lifting Cushion Foundation SPF 20",
        price: "$120.00",
        product_URL: "https://www.bloomingdales.com/shop/product/la-mer-the-luminous-lifting-cushion-foundation-spf-20?ID=3144067&CategoryID=2921",
        figure_URL: "https://images.bloomingdalesassets.com/is/image/BLM/products/4/optimized/10067624_fpx.tif?$2014_BROWSE_FASHION$&hei=350&wid=280",
        brand: "La Mer",
        review_score: "0"
    }, {
        id: "3",
        name: "3The Luminous Lifting Cushion Foundation SPF 20",
        price: "$120.00",
        product_URL: "https://www.bloomingdales.com/shop/product/la-mer-the-luminous-lifting-cushion-foundation-spf-20?ID=3144067&CategoryID=2921",
        figure_URL: "https://images.bloomingdalesassets.com/is/image/BLM/products/4/optimized/10067624_fpx.tif?$2014_BROWSE_FASHION$&hei=350&wid=280",
        brand: "La Mer",
        review_score: "0"
    }, {
        id: "4",
        name: "4The Luminous Lifting Cushion Foundation SPF 20",
        price: "$120.00",
        product_URL: "https://www.bloomingdales.com/shop/product/la-mer-the-luminous-lifting-cushion-foundation-spf-20?ID=3144067&CategoryID=2921",
        figure_URL: "https://images.bloomingdalesassets.com/is/image/BLM/products/4/optimized/10067624_fpx.tif?$2014_BROWSE_FASHION$&hei=350&wid=280",
        brand: "La Mer",
        review_score: "0"
    }, {
        id: "5",
        name: "5The Luminous Lifting Cushion Foundation SPF 20",
        price: "$120.00",
        product_URL: "https://www.bloomingdales.com/shop/product/la-mer-the-luminous-lifting-cushion-foundation-spf-20?ID=3144067&CategoryID=2921",
        figure_URL: "https://images.bloomingdalesassets.com/is/image/BLM/products/4/optimized/10067624_fpx.tif?$2014_BROWSE_FASHION$&hei=350&wid=280",
        brand: "La Mer",
        review_score: "0"
    }, {
        id: "6",
        name: "6The Luminous Lifting Cushion Foundation SPF 20",
        price: "$120.00",
        product_URL: "https://www.bloomingdales.com/shop/product/la-mer-the-luminous-lifting-cushion-foundation-spf-20?ID=3144067&CategoryID=2921",
        figure_URL: "https://images.bloomingdalesassets.com/is/image/BLM/products/4/optimized/10067624_fpx.tif?$2014_BROWSE_FASHION$&hei=350&wid=280",
        brand: "La Mer",
        review_score: "0"
    }, {
        id: "7",
        name: "7The Luminous Lifting Cushion Foundation SPF 20",
        price: "$120.00",
        product_URL: "https://www.bloomingdales.com/shop/product/la-mer-the-luminous-lifting-cushion-foundation-spf-20?ID=3144067&CategoryID=2921",
        figure_URL: "https://images.bloomingdalesassets.com/is/image/BLM/products/4/optimized/10067624_fpx.tif?$2014_BROWSE_FASHION$&hei=350&wid=280",
        brand: "La Mer",
        review_score: "0"
    }, {
        id: "8",
        name: "8The Luminous Lifting Cushion Foundation SPF 20",
        price: "$120.00",
        product_URL: "https://www.bloomingdales.com/shop/product/la-mer-the-luminous-lifting-cushion-foundation-spf-20?ID=3144067&CategoryID=2921",
        figure_URL: "https://images.bloomingdalesassets.com/is/image/BLM/products/4/optimized/10067624_fpx.tif?$2014_BROWSE_FASHION$&hei=350&wid=280",
        brand: "La Mer",
        review_score: "0"
    }, {
        id: "9",
        name: "9The Luminous Lifting Cushion Foundation SPF 20",
        price: "$120.00",
        product_URL: "https://www.bloomingdales.com/shop/product/la-mer-the-luminous-lifting-cushion-foundation-spf-20?ID=3144067&CategoryID=2921",
        figure_URL: "https://images.bloomingdalesassets.com/is/image/BLM/products/4/optimized/10067624_fpx.tif?$2014_BROWSE_FASHION$&hei=350&wid=280",
        brand: "La Mer",
        review_score: "0"
    }
];

class ProductTable extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        keyword: "",
        products: [],
        error: false
    };

    componentDidMount() {

        this.updateProduct();
    }

    componentDidUpdate() {
        if (this.props.match.params && this.props.match.params.tmpKey) {
            if (this.state.keyword != this.props.match.params.tmpKey) {
                this.updateProduct();
            }
        }
    }

    updateProduct() {
        let data = { KEY: "foundation" };
        if (this.props.match.params && this.props.match.params.tmpKey) {
            data.KEY = this.props.match.params.tmpKey;
            this.setState({ keyword: this.props.match.params.tmpKey });
        }
        const params = new URLSearchParams();
        params.append("KEY", data.KEY);
        axios.post('http://localhost:5000/', params)
            .then(response => {
                console.log(response);
                const products = response.data["Product"].map(product => {
                    return {
                        ...product,
                        author: 'Bicheng'
                    }
                });
                this.setState({ products: products });
            })
            .catch(error => {
                // console.log(error);
                this.setState({error: true});
            });
        // }
    }

    render() {
        let res = <p style={{ textAlign: 'center' }}>Loading...!</p>;
        if (this.state.products) {
            const products = this.state.products;
            console.log(products);
            if(this.state.error){
                return <h1 style={{textAlign: 'center', color:'black', fontFamily:'Tahoma', marginTop:'200px'}}>No results</h1>
            }
            let rows = [];
            let cnt = 0;
            const N_ROW = 4;
            products.forEach((product) => {
                cnt = cnt + 1;
                if ((cnt % 4) === 0) {
                    rows.push(<ProductCategoryRow product={product} key={product.id} />);
                } else {
                    rows.push(<ProductCategoryRow product={product} key={product.id} />);
                }
            });
            res = <div><Container><Row>{rows}</Row></Container></div>;
        }
        return res;
    }
}

export default ProductTable;
