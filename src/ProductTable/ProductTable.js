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
        category: 'Sporting Goods1',
        price: '$49.99',
        star: "4/5",
        stocked: true,
        name: 'Football',
        url: 'https://www.sephora.com//productimages/sku/s2137230-main-grid.jpg'
    },
    {
        category: 'Sporting Goods2',
        price: '$9.99',
        star: "4/5",
        stocked: true,
        name: 'Baseball',
        url: 'https://www.sephora.com//productimages/sku/s2137230-main-grid.jpg'
    },
    {
        category: 'Sporting Goods3',
        price: '$29.99',
        star: "5/5",
        stocked: false,
        name: 'Basketball',
        url: 'https://www.sephora.com//productimages/sku/s2137230-main-grid.jpg'
    },
    {
        category: 'Electronics1',
        price: '$99.99',
        star: "3/5",
        stocked: true,
        name: 'iPod Touch',
        url: 'https://www.sephora.com//productimages/sku/s2137230-main-grid.jpg'
    },
    {
        category: 'Electronics2',
        price: '$399.99',
        star: "3/5",
        stocked: false,
        name: 'iPhone 5',
        url: 'https://www.sephora.com//productimages/sku/s2137230-main-grid.jpg'
    },
    {
        category: 'Electronics3',
        price: '$199.99',
        star: "5/5",
        stocked: true,
        name: 'Nexus 7',
        url: 'https://www.sephora.com//productimages/sku/s2137230-main-grid.jpg'
    },
    {
        category: 'Electronics1',
        price: '$99.99',
        star: "3/5",
        stocked: true,
        name: 'iPod Touch1',
        url: 'https://www.sephora.com//productimages/sku/s2137230-main-grid.jpg'
    },
    {
        category: 'Electronics2',
        price: '$399.99',
        star: "3/5",
        stocked: false,
        name: 'iPhone 51',
        url: 'https://www.sephora.com//productimages/sku/s2137230-main-grid.jpg'
    },
    {
        category: 'Electronics3',
        price: '$199.99',
        star: "5/5",
        stocked: true,
        name: 'Nexus 71',
        url: 'https://www.sephora.com//productimages/sku/s2137230-main-grid.jpg'
    },
    {
        category: 'Electronics1',
        price: '$99.99',
        star: "3/5",
        stocked: true,
        name: 'iPod Touch2',
        url: 'https://www.sephora.com//productimages/sku/s2137230-main-grid.jpg'
    },
    {
        category: 'Electronics2',
        price: '$399.99',
        star: "3/5",
        stocked: false,
        name: 'iPhone 52',
        url: 'https://www.sephora.com//productimages/sku/s2137230-main-grid.jpg'
    },
    {
        category: 'Electronics3',
        price: '$199.99',
        star: "5/5",
        stocked: true,
        name: 'Nexus 72',
        url: 'https://www.sephora.com//productimages/sku/s2137230-main-grid.jpg'
    }

];

class ProductTable extends Component {

    state = {
        products: []
    };

    componentDidMount() {

        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Max'
                    }
                });
                this.setState({posts: updatedPosts});
                console.log(updatedPosts);
            });
        this.state.products = PRODUCTS.slice(0, 3);
    }

    render() {
        const products = this.state.products;
        let rows = [];
        let cnt = 0;
        const N_ROW = 4;
        products.forEach((product) => {
            cnt = cnt + 1;
            if ((cnt % 4) === 0) {
                rows.push(<ProductCategoryRow product={product} key={product.name}/>);
            } else {
                rows.push(<ProductCategoryRow product={product} key={product.name}/>);
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
