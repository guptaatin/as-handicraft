import React, { useEffect, useState } from 'react';
import { Row, Col, Select, Breadcrumb, Button, Table, Image, Modal, Input } from 'antd';
import coupon from '../../images/coupon.jpg';
import { Link, useHistory } from 'react-router-dom';
import "./cart.css";
import {
    EnvironmentTwoTone, RightOutlined, LeftOutlined
} from '@ant-design/icons';
import { CartTable } from './CartTable';
import { useSelector, useDispatch } from 'react-redux';
import { http } from '../../utils/http';
import ApiPath from '../../utils/apiPath';
import { cartDataAction } from '../../redux/actions';

/* ---------------------component Cart starts------------------------*/

const Cart = (props) => {
    /* ----------------onload api's handler called in useEffect---------------- */

    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const [cartItems, setCartItems] = useState();

    useEffect(() => {
        props.title && (document.title = props.title);
        const fetchCart = async () => {
            try {
                const cart = await http.get(ApiPath.getProductsAndCartOfUser + `/${state.authPage.id}/cart`);
                setCartItems(cart);
            } catch (err) {
                console.log(err);
            }
        };
        fetchCart();
    }, [state.cartPage.quantity_change]);

    const handleClearCart = () => {
        http.delete(ApiPath.clearCart + `/${cartItems?.id}`)
            .then((response) => {
                dispatch(cartDataAction(!state.cartPage.quantity_change));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const [isModalVisible, setIsModalVisible] = useState(false);
    const history = useHistory();

    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const handleCheckout = () => {
        history.push("/checkout_flow");
    };
    return (
        <React.Fragment>
            <section className="breadcrumb">
                <div className="container">
                    <Breadcrumb>
                        <Breadcrumb.Item><a href="/">Home</a></Breadcrumb.Item>
                        <Breadcrumb.Item>Cart</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            </section>
            <section className="cart-section">
                <Row>
                    <Col xs={24} sm={20} md={20} lg={20}>
                        <div className="cart-box">
                            <Row>
                                <div className="cart-header">
                                    <h1>My Cart</h1><span><h1>({cartItems?.cart_quantity} item)</h1></span>
                                    <h2><Link to="#" onClick={handleClearCart}>CLEAR CART</Link></h2>
                                    <h3><EnvironmentTwoTone /> Enter Delivery Pincode</h3>
                                    <Button className="add-btn" onClick={showModal}>ADD</Button>
                                    <Modal destroyOnClose={true} centered visible={isModalVisible} onCancel={handleCancel} footer={null} width={350}>
                                        <div className="cart-pincode-btn">
                                            <ul>
                                                <li><p>Enter Pincode to Check Availability & Delivery Options</p></li>
                                                <li><Input placeholder="Enter Pincode" className="cart-pincode" /></li>
                                                <li className="cart-apply"><Link to="#" className="apply-pincode">Apply</Link></li>
                                            </ul>
                                        </div>
                                    </Modal>
                                </div>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <CartTable data={cartItems} />
                                </Col>
                            </Row>
                            <Row>
                                <Button className="cart-shopping" onClick={() => history.push("/handicrafts")}><LeftOutlined />CONTINUE SHOPPING</Button>
                            </Row>
                        </div>
                    </Col>
                    <Col xs={24} sm={4} md={4} lg={4}>
                        <div className="cart-coupon">
                            <div className="coupon-box">
                                <Image src={coupon} className="coupon-img" preview={false} />
                                <h2>Apply Coupon</h2><span><RightOutlined /></span>
                            </div>
                        </div>
                        <div className="cart-checkout">
                            <div className="cart-checkout-info">
                                <ul>
                                    <li><h1>Item(s) Quantity</h1></li>
                                    <li><h1>{cartItems?.cart_quantity}</h1></li>
                                </ul>
                                <ul>
                                    <li><h1>Item(s) Total</h1></li>
                                    <li><h1>₹ {cartItems?.cart_amount}</h1></li>
                                </ul>
                                <ul>
                                    <li><h2>Delivery Charge</h2></li>
                                    <li><p>Free</p></li>
                                </ul>
                            </div>
                            <div className="cart-checkout-amount">
                                <ul>
                                    <li><h1>Amount Payable</h1></li>
                                    <li><h1>₹ {cartItems?.cart_amount}</h1></li>
                                </ul>
                                <p>INCLUSIVE OF ALL TAXES</p>
                                <Button className="cart-checkout-btn" onClick={handleCheckout}>CHECKOUT</Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </section>
        </React.Fragment>
    );
};
/* ---------------------component Cart ends------------------------*/

export default Cart;