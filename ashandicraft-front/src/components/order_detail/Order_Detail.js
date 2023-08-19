import React, { useEffect, useState } from 'react';
import { Row, Col, Breadcrumb, Button, Image, Modal } from 'antd';
import new_bag from '../../images/new_bag.jpg';
import { Link, useHistory } from 'react-router-dom';
import "./order_detail.css";
import {
    CloseCircleFilled, CreditCardOutlined
} from '@ant-design/icons';

/* ------------------------constants defined-------------------------*/

/* ---------------------component Order_Detail starts------------------------*/

const Order_Detail = (props) => {
    /* ----------------onload api's handler called in useEffect---------------- */

    useEffect(() => {
        props.title && (document.title = props.title);
    })

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
    const [orderCancel, setOrderCancel] = useState(false);
    const history = useHistory()

    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const showCancelModal = () => {
        setIsCancelModalVisible(true);
    };
    const handleCancelOrder = () => {
        setIsCancelModalVisible(false);
        setOrderCancel(true);
    };

    const handleOrderAwaiting = () => {
        history.push("/order_confirmation")
    }

    return (
        <React.Fragment>
            <section className="breadcrumb order-breadcrumb">
                <div className="container">
                    <Breadcrumb>
                        <Breadcrumb.Item><Link to="#">My Account</Link></Breadcrumb.Item>
                        <Breadcrumb.Item><Link to="#">My Orders</Link></Breadcrumb.Item>
                        <Breadcrumb.Item>#1</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            </section>
            <section className="order-section">
                <Row>
                    <div className="order-detail-box-1">
                        <Row>
                            <Col span={24}>
                                <div className="order-awaiting">
                                    <ul>
                                        <li><p>ORDER ID: <span>#3</span> Placed on 28 Jul '21, 10:38 pm</p></li>
                                        <li onClick={handleOrderAwaiting}><h4>ORDER AWAITING CONFIRMATION</h4></li>
                                    </ul>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <div className="order-details">
                                <Col xs={24} sm={8} md={8} lg={8}>
                                    <div className="order-complete-info">
                                        <ul>
                                            <li><h1>Delivery Address</h1></li>
                                            <li><h3>Other</h3></li>
                                            <li><h4>Harsh Gupta</h4></li>
                                            <li><p>Agricultural College, 208002</p></li>
                                            <li><h4>Phone :</h4></li>
                                            <li><h4>Email :</h4>&nbsp;gharsh929@gmail.com</li>
                                        </ul>
                                    </div>
                                </Col>
                                <Col xs={24} sm={8} md={8} lg={8}>
                                    <div className="order-complete-info">
                                        <ul>
                                            <li><h1>Payment Method</h1></li>
                                            <li><h4>Cash On Delivery</h4></li>
                                            {orderCancel == false ?
                                                <>
                                                    <li><Button className="make-payment-btn" onClick={showModal}><CreditCardOutlined />Make Payment</Button></li>
                                                    <Modal destroyOnClose={true} centered visible={isModalVisible} onCancel={handleCancel} footer={null} width={350}>
                                                        <div className="make-payment-modal">
                                                            <ul>
                                                                <li><h2>Online Payments Unavailable</h2></li>
                                                                <li><p>Online payment is currently unavailable. Please contact us.</p></li>
                                                                <Link to="#"><li className="make-payment-okay" onClick={handleCancel}>Okay, Got It</li></Link>
                                                            </ul>
                                                        </div>
                                                    </Modal>
                                                    <li><Button className="cancel-order-btn" onClick={showCancelModal}><CloseCircleFilled />Cancel Order</Button></li>
                                                    <Modal destroyOnClose={true} centered visible={isCancelModalVisible} onCancel={handleCancelOrder} footer={null} width={350}>
                                                        <div className="make-payment-modal">
                                                            <ul>
                                                                <li><h2>Confirm Cancellation</h2></li>
                                                                <li><p>Are you sure you want to cancel Order #3?</p></li>
                                                                <Link to="#"><li className="make-payment-okay" onClick={handleCancelOrder}>Cancel Order</li></Link>
                                                            </ul>
                                                        </div>
                                                    </Modal>
                                                </>
                                                : null}
                                            <li><h1>Delivery Details</h1></li>
                                            <li><h4>Delivery Schedule :</h4>&nbsp;Mon, 02 Aug '21 | 9 AM</li>
                                        </ul>
                                    </div>
                                </Col>
                                <Col xs={24} sm={8} md={8} lg={8}>
                                    <div className="order-complete-info">
                                        <h1>Order Summary</h1>
                                        <div className="order-item-summary">
                                            <ul>
                                                <li><p>Item(s) Total</p></li>
                                                <li><p>₹ 1,999</p></li>
                                            </ul>
                                            <ul>
                                                <li><p>Delivery Charge</p></li>
                                                <li><p>FREE</p></li>
                                            </ul>
                                        </div>
                                        <div className="order-grand-total">
                                            <ul>
                                                <li><h1>Grand Total</h1></li>
                                                <li><h1>₹ 1,999</h1></li>
                                            </ul>
                                        </div>
                                    </div>
                                </Col>
                            </div>
                        </Row>
                    </div>
                </Row>
                <Row>
                    <div className="order-detail-box-2">
                        <Row>
                            <Col span={24}>
                                <div className="order-items-info">
                                    <ul>
                                        <li><p>ORDERED ITEMS</p></li>
                                        <li><h4>TOTAL ITEM(S): 1</h4></li>
                                    </ul>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <div className="order-details-view">
                                <div className="order-detail-cart-item">
                                    <Image src={new_bag} className="order-detail-cart-item-img" preview={false} />
                                    <p>Centenarian Brass Metal Bag</p>
                                </div>
                                <h3>1 Qty</h3>
                                <h1>₹ 1,999</h1>
                            </div>
                        </Row>
                    </div>
                </Row>
            </section>
        </React.Fragment>
    );
}
/* ---------------------component Order_Detail ends------------------------*/

export default Order_Detail;