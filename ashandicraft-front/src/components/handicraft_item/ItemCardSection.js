import React, { Component } from 'react';
import ReactSlickExample from './ReactSlickExample';
import { Image, Popover } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import "./handicraft_item.css";
import './example.css';
import {
    EnvironmentOutlined, ShoppingCartOutlined, CaretRightOutlined, ShareAltOutlined, SafetyOutlined, ZoomInOutlined
} from '@ant-design/icons';
import facebook_icon from '../../images/facebook_icon.png';
import twitter_icon from '../../images/twitter_icon.png';
import email_icon from '../../images/email_icon.png';

/* ----------------------constant content is defined here------------------------*/
const content = (
    <div className="share-icons">
        <ul>
            <li><Link><Image src={facebook_icon} className="icons" preview={false} /></Link></li>
            <li><Link><Image src={twitter_icon} className="icons" preview={false} /></Link></li>
            <li><Link><Image src={email_icon} className="icons" preview={false} /></Link></li>
        </ul>
    </div>
);

/* --------------component ItemCardSection Starts-------------- */

const ItemCardSection = () => {
    const history = useHistory()
    const handleCart = () => {
        history.push("/cart")
    }
    const handleCheckout = () => {
        history.push("/checkout_flow")
    }
        return (
            <div className="fluid react-slick">
                <div className="fluid__image-container">
                    <ReactSlickExample {...{
                        rimProps: {
                            enlargedImagePortalId: 'portal',
                            enlargedImageContainerDimensions: {
                                width: '160%',
                                height: '138%'
                            }
                        }
                    }} />
                    <h1><ZoomInOutlined /> Hover to Zoom</h1>
                </div>
                <div className="fluid__instructions" style={{ position: 'relative' }}>
                    <div
                        id="portal"
                        className="portal"
                    />
                    <div className="item-name">
                        <ul>
                            <li><p>Centenarian</p></li>
                            <li>
                                <Popover placement="bottomRight" content={content} trigger="click">
                                    <ShareAltOutlined className="item-share" />
                                </Popover>
                            </li>
                        </ul>

                        <h2>Brass Metal Bag</h2>
                        <h1>₹ 1999</h1>
                    </div>
                    <div className="item-delivery">
                        <h1>Delivery</h1>
                        <ul>
                            <li><input placeholder="Enter Pincode" prefix={<EnvironmentOutlined />} className="delivery-input" /><button className="delivery-btn">CHECK</button></li>
                            <li><h2>Delivery by Jul 24, Saturday by 06:30 PM</h2></li>
                            <li><p>Cash on Delivery Available for this Location.</p></li>
                        </ul>
                    </div>
                    <div className="item-buttons">
                        <ul>
                            <li><button className="button" onClick={handleCart}><ShoppingCartOutlined /> GO TO CART</button></li>
                            <li><button className="button" onClick={handleCheckout}><CaretRightOutlined /> BUY NOW</button></li>
                        </ul>
                        <h2><SafetyOutlined />&nbsp;&nbsp;Safe and Secure payments.100% Authentic products</h2>
                    </div>
                    <div className="item-specifications">
                        <h2>Specifications</h2>
                        <ul>
                            <li><p>Type</p><h3>Brass Handicrafts</h3></li>
                            <li><p>Brand</p><h4>Centenarian</h4></li>
                            <li><p>Material</p><h5>Brass</h5></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
}

export default ItemCardSection

/* --------------component ItemCardSection Ends-------------- */