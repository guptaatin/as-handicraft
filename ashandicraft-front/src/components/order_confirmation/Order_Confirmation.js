import React, { useEffect } from 'react';
import { Row, Col, Breadcrumb, Button, Table, Image } from 'antd';
import new_bag from '../../images/new_bag.jpg';
import cart from '../../images/cart.png';
import { Link, useHistory } from 'react-router-dom';
import "./order_confirmation.css";
import {
    EnvironmentOutlined, ScheduleOutlined, CreditCardOutlined
} from '@ant-design/icons';

/* ------------------------constants defined-------------------------*/

const dataSource = [
    {
        key: '1',
        item:
            <div className="review-item">
                <Image src={new_bag} className="review-item-img" preview={false} />
                <ul>
                    <li><p>Centenarian Brass Metal Bag</p></li>
                    <li><h1>₹ 1,999</h1></li>
                </ul>
            </div>
        ,
        quantity: <h1>1 Qty</h1>
        ,
        amount: <h1>₹ 1,999</h1>,
    },
];

const columns = [
    {
        title: 'Item(s) Details',
        dataIndex: 'item',
        key: 'item',
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
    },
];
/* ---------------------component Order_Confirmation starts------------------------*/

const Order_Confirmation = (props) => {
    /* ----------------onload api's handler called in useEffect---------------- */

    useEffect(() => {
        props.title && (document.title = props.title);
    })

    const history = useHistory()
    const handleContinue = () => {
        history.push("/handicrafts")
    }

    return (
        <React.Fragment>
            <section className="breadcrumb">
                <div className="container">
                    <Breadcrumb>
                        <Breadcrumb.Item><a href="/">Home</a></Breadcrumb.Item>
                        <Breadcrumb.Item>Order Confirmation</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            </section>
            <section className="order-section">
                <Row>
                    <Col xs={24} sm={18} md={18} lg={18}>
                        <Row>
                            <div className="order-box-1">
                                <ul>
                                    <li><Image src={cart} preview={false} className="order-cart-img" /></li>
                                    <li><p>Your Order has been Successfully Placed</p></li>
                                </ul>
                            </div>
                        </Row>
                        <Row>
                            <div className="order-box-2">
                                <Col xs={24} sm={8} md={8} lg={8}>
                                    <div className="order">
                                        <ul>
                                            <li><EnvironmentOutlined /></li>
                                            <li>
                                                <div className="order-info">
                                                    <ul>
                                                        <li><h1>Delivery Address</h1></li>
                                                        <li><h5>Other</h5></li>
                                                        <li><h5>Harsh Gupta</h5></li>
                                                        <li><p>Agricultural College, 208002</p></li>
                                                    </ul>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </Col>
                                <Col xs={24} sm={8} md={8} lg={8}>
                                    <div className="order">
                                        <ul>
                                            <li><ScheduleOutlined /></li>
                                            <li>
                                                <div className="order-info">
                                                    <ul>
                                                        <li><h1>Delivery Schedule</h1></li>
                                                        <li><h4>02 Aug'21, Monday</h4></li>
                                                        <li><p>9 AM</p></li>
                                                    </ul>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </Col>
                                <Col xs={24} sm={8} md={8} lg={8}>
                                    <div className="order">
                                        <ul>
                                            <li><CreditCardOutlined /></li>
                                            <li>
                                                <div className="order-info">
                                                    <ul>
                                                        <li><h1>Payment Method</h1></li>
                                                        <li><p>Cash on Delivery</p></li>
                                                    </ul>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </Col>
                            </div>
                        </Row>
                        <Row>
                            <div className="order-box-3">
                                <Col span={24}>
                                    <h1>REVIEW ORDER</h1>
                                    <Table dataSource={dataSource} columns={columns} />
                                </Col>
                            </div>
                        </Row>
                    </Col>
                    <Col xs={24} sm={6} md={6} lg={6}>
                        <div className="order-checkout">
                            <div className="order-checkout-info">
                                <ul>
                                    <li><h1>Item(s) Total</h1></li>
                                    <li><h1>₹ 1,999</h1></li>
                                </ul>
                                <ul>
                                    <li><h2>Delivery Charge</h2></li>
                                    <li><p>Free</p></li>
                                </ul>
                            </div>
                            <div className="order-checkout-amount">
                                <ul>
                                    <li><h1>Amount Payable</h1></li>
                                    <li><h1>₹ 1,999</h1></li>
                                </ul>
                                <p>INCLUSIVE OF ALL TAXES</p>
                                <Button className="order-checkout-btn" onClick={handleContinue}>Continue Shopping</Button>
                                <Link to="/my_orders" className="go-to-order">GO TO MY ORDER</Link>
                            </div>
                        </div>
                    </Col>
                </Row>
            </section>
        </React.Fragment>
    );
}
/* ---------------------component Order_Confirmation ends------------------------*/

export default Order_Confirmation;