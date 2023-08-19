import React, { useEffect } from 'react';
import { Row, Col, Breadcrumb, Image, Button } from 'antd';
import new_bag from '../../images/new_bag.jpg';
import { Link, useHistory } from 'react-router-dom';
import './my_orders.css';

/* ---------------------component My_Orders starts------------------------*/
const My_Orders = (props) => {
    /* ----------------onload api's handler called in useEffect---------------- */

    useEffect(() => {
        props.title && (document.title = props.title);
    });

    const history = useHistory();

    const handleOrderDetails = () => {
        history.push("/order_detail")
    }

    return (
        <React.Fragment>
            <section className="breadcrumb">
                <div className="container">
                    <Breadcrumb>
                        <Breadcrumb.Item><Link to="#">My Account</Link></Breadcrumb.Item>
                        <Breadcrumb.Item><Link to="#">My Orders</Link></Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            </section>
            <section className="myorders-section">
                <div className="myorders-box">
                    <Row>
                        <Col span={24}>
                            <div className="myorders-info">
                                <ul>
                                    <li>
                                        <div className="myorder-header-1">
                                            <h4>ORDER ID: <span>#3</span></h4>
                                            <p>Placed on 28 Jul '21, 10:38 pm</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="myorder-header-1">
                                            <h4>TOTAL AMOUNT: <span>₹ 0</span></h4>
                                            <p>Total Item: <span>1</span></p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="myorder-header-2">
                                            <h4>ORDER</h4>
                                            <p>CANCELLED</p>
                                        </div>
                                    </li>
                                    <li>
                                        <Button className="details-btn" onClick={handleOrderDetails}>Details</Button>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <div className="myorder-details-view">
                            <ul>
                                <li>
                                    <div className="myorder-detail-cart-item">
                                        <Image src={new_bag} className="myorder-detail-cart-item-img" preview={false} />
                                        <p>Centenarian Brass Metal Bag</p>
                                    </div>
                                </li>
                                <li><h3>1 Qty</h3></li>
                                <li><h4>1 CANCELLED</h4></li>
                                <li><h1>₹ 1,999</h1></li>
                            </ul>
                        </div>
                    </Row>
                </div>
                <div className="myorders-box">
                    <Row>
                        <Col span={24}>
                            <div className="myorders-info">
                                <ul>
                                    <li>
                                        <div className="myorder-header-1">
                                            <h4>ORDER ID: <span>#3</span></h4>
                                            <p>Placed on 28 Jul '21, 10:38 pm</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="myorder-header-1">
                                            <h4>TOTAL AMOUNT: <span>₹ 0</span></h4>
                                            <p>Total Item: <span>1</span></p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="myorder-header-2">
                                            <h4>ORDER</h4>
                                            <p>CANCELLED</p>
                                        </div>
                                    </li>
                                    <li>
                                        <Button className="details-btn" onClick={handleOrderDetails}>Details</Button>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <div className="myorder-details-view">
                            <ul>
                                <li>
                                    <div className="myorder-detail-cart-item">
                                        <Image src={new_bag} className="myorder-detail-cart-item-img" preview={false} />
                                        <p>Centenarian Brass Metal Bag</p>
                                    </div>
                                </li>
                                <li><h3>1 Qty</h3></li>
                                <li><h4>1 CANCELLED</h4></li>
                                <li><h1>₹ 1,999</h1></li>
                            </ul>
                        </div>
                    </Row>
                </div>
            </section>
        </React.Fragment>
    )
}

/* ---------------------component My_Orders ends------------------------*/
export default My_Orders;