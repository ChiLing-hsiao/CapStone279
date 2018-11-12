import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col, Jumbotron, Button, Card, CardImg, CardBlock, CardTitle, CardSubtitle, CardText, Badge, CardDeck, CardBody, Thumbnail } from 'reactstrap';
class Contain extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col sm="2" >
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

          <Col sm="2" >
            <Card body style={{ borderColor: 'white' }} className="text-center">
              <CardImg style={{ height: '120px', width: '120px' }} src='https://www.sephora.com/productimages/sku/s2154532-main-grid.jpg' />
              <CardBody>
                <CardTitle style={{ fontSize: '14px' }} class='project__cardTitle'>TOM FORD </CardTitle>
                <CardSubtitle style={{ height: '45px', fontSize: '10px' }}>
                  Eye Color Quad
</CardSubtitle>
                <CardText style={{  height: '3px',  fontSize: '10px' }}>
                  $88.00
</CardText >
                <CardSubtitle style={{ height: '5px' ,  fontSize: '10px' }}>
                  4.42/5.0
</CardSubtitle>
              </CardBody>
            </Card>
          </Col>
          <Col sm="2" >
            <Card body style={{ borderColor: 'white' }} className="text-center">
              <CardImg style={{ height: '120px', width: '120px' }} src='https://www.sephora.com/productimages/sku/s2138956-main-grid.jpg' />
              <CardBody>
                <CardTitle style={{ fontSize: '14px' }} class='project__cardTitle'>Charlotte Tilbury </CardTitle>
                <CardSubtitle style={{ height: '35px' }}>
                  Stars In Your Eyes Eyshadow Palette
</CardSubtitle>
                <CardText style={{ height: '15px' }}>
                  $75.00
</CardText >
                <CardSubtitle style={{ height: '15px' }}>
                  4.19/5.0
                </CardSubtitle>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
};

export default Contain;
