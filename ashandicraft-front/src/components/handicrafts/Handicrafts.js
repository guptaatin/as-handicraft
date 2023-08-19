import React, { useEffect } from 'react';
import { Row, Col, Select, Breadcrumb, Checkbox, Card } from 'antd';
import new_bag from '../../images/new_bag.jpg';
import pen from '../../images/pen.jpg';
import mens from '../../images/mens.jpg';
import pooja_deep from '../../images/pooja_deep.jpg';
import ganesh from '../../images/ganesh.jpg';
import toupchi from '../../images/toupchi.jpg';
import toup from '../../images/toup.jpg';
import ganesh_coin from '../../images/ganesh_coin.jpg';
import horse from '../../images/horse.jpg';
import camel from '../../images/camel.jpg';
import telescope from '../../images/telescope.jpg';
import wheel from '../../images/wheel.jpg';
import { Link } from 'react-router-dom';
import "./handicrafts.css";
import {
    UnorderedListOutlined, AppstoreOutlined
} from '@ant-design/icons';

/* ------------------------constants defined-------------------------*/

const { Option } = Select;
const { Meta } = Card;

/* ---------------------component Handicrafts starts------------------------*/
const Handicrafts = (props) => {
    /* ----------------onload api's handler called in useEffect---------------- */

    useEffect(() => {
        props.title && (document.title = props.title);
    })
    return (
        <React.Fragment>
            <section className="breadcrumb">
                <div className="container">
                    <Breadcrumb>
                        <Breadcrumb.Item><a href="/">Home</a></Breadcrumb.Item>
                        <Breadcrumb.Item>Marketplace</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            </section>
            <section className="trades-card">
                <Row>
                    <Col span={24}>
                        <h1 className="trad-title">AS Handicraft trading & Exchange-Spread</h1>
                    </Col>
                    <Col xs={24} sm={4} md={4} lg={4}>
                        <div className="filter-part">
                            <h3>Filter Auctions<span> (100 Results)</span></h3>
                            <div className="commodity-filter">
                                <h5>Type</h5>
                                <ul>
                                    <li><Checkbox>Basket</Checkbox></li>
                                    <li><Checkbox>Brass Handicrafts</Checkbox></li>
                                    <li><Checkbox>Crystal Handicrafts</Checkbox></li>
                                    <li><Checkbox>Dhokra Handicrafts</Checkbox></li>
                                    <li><Checkbox>Embroidery Handicrafts</Checkbox></li>
                                    <li><Checkbox>Foldable Fan</Checkbox></li>
                                </ul>
                            </div>
                            <div className="offer-filter">
                                <h5>Price</h5>
                                <ul>
                                    <li><Checkbox>Below ₹1000</Checkbox></li>
                                    <li><Checkbox>₹1001 - ₹2000</Checkbox></li>
                                    <li><Checkbox>₹2001 - ₹3000</Checkbox></li>
                                    <li><Checkbox>₹3001 - ₹4000</Checkbox></li>
                                    <li><Checkbox>Above ₹4000</Checkbox></li>
                                </ul>
                            </div>
                            <div className="offer-filter status-filter">
                                <h5>Pincode</h5>
                                <ul>
                                    <li><Checkbox>208001</Checkbox></li>
                                    <li><Checkbox>208002</Checkbox></li>
                                    <li><Checkbox>208003</Checkbox></li>
                                    <li><Checkbox>208004</Checkbox></li>
                                    <li><Checkbox>208005</Checkbox></li>
                                    <li><Checkbox>208006</Checkbox></li>
                                    <li><Checkbox>208007</Checkbox></li>
                                </ul>
                            </div>
                        </div>
                    </Col>
                    <Col xs={24} sm={19} md={19} lg={19}>
                        <div className="pro-box">
                            <Row>
                                <div className="sort">
                                    <h1>Handicraft Item</h1><span>(Showing 1 - 12 of 12 items)</span>
                                    <h2>Sort By</h2>
                                    <Select defaultValue="popularity" className="sort-select">
                                        <Option value="popularity">Popularity</Option>
                                        <Option value="newest">Newest</Option>
                                        <Option value="Price_Low_to_High">Price Low to High</Option>
                                        <Option value="Price_High_to_Low">Price High to Low</Option>
                                    </Select>
                                    <UnorderedListOutlined className="sort-icon" />
                                    <AppstoreOutlined className="sort-icon" />
                                </div>
                            </Row>
                                <Row className="cards-row">
                            <Link to="/handicraft_item">
                                    <Card
                                        hoverable
                                        style={{ width: 240, margin: '20px 2px', borderRadius: '10px' }}
                                        cover={<img alt="example" src={new_bag} className="items-img" />}
                                    >
                                        <Meta title="Centenarian Brass Metal Bag" description="₹ 1999" style={{fontSize:'2.0rem'}} />
                                    </Card>
                            </Link>
                            <Link to="/handicraft_item">
                                    <Card
                                        hoverable
                                        style={{ width: 240, margin: '20px 2px', borderRadius: '10px' }}
                                        cover={<img alt="example" src={pen} className="items-img" />}
                                    >
                                        <Meta title="Beautiful Hand Carved With Brass Design Walking Stick 22 Inch" description="₹ 1499" style={{fontSize:'2.0rem'}} />
                                    </Card></Link>
                                    <Link to="/handicraft_item">
                                    <Card
                                        hoverable
                                        style={{ width: 240, margin: '20px 2px', borderRadius: '10px' }}
                                        cover={<img alt="example" src={mens} className="items-img" />}
                                    >
                                        <Meta title="Brass Statue Tribal Men Figurine Set Of 3 Pcs Home Decorative Handicrafts Corporate Showpiece Christmas & New Year Gift" description="₹ 3606" style={{fontSize:'2.0rem'}} />
                                    </Card></Link>
                                    <Link to="/handicraft_item">
                                    <Card
                                        hoverable
                                        style={{ width: 240, margin: '20px 2px', borderRadius: '10px' }}
                                        cover={<img alt="example" src={pooja_deep} className="items-img" />}
                                    >
                                        <Meta title="Brass Pooja Deep" description="₹ 699" style={{fontSize:'2.0rem'}} />
                                    </Card></Link>
                                    <Link to="/handicraft_item">
                                    <Card
                                        hoverable
                                        style={{ width: 240, margin: '20px 2px', borderRadius: '10px' }}
                                        cover={<img alt="example" src={ganesh} className="items-img" />}
                                    >
                                        <Meta title="Decorative Shree Ganesha Face Brass Handicraft Wall Hanging Product" description="₹ 775" style={{fontSize:'2.0rem'}} />
                                    </Card></Link>
                                    <Link to="/handicraft_item">
                                    <Card
                                        hoverable
                                        style={{ width: 240, margin: '20px 2px', borderRadius: '10px' }}
                                        cover={<img alt="example" src={toupchi} className="items-img" />}
                                    >
                                        <Meta title="Brass Vintage Canon Tope Showpiece Product" description="₹ 789" style={{fontSize:'2.0rem'}} />
                                    </Card>
                                    </Link>
                                    <Link to="/handicraft_item">
                                    <Card
                                        hoverable
                                        style={{ width: 240, margin: '20px 2px', borderRadius: '10px' }}
                                        cover={<img alt="example" src={toup} className="items-img" />}
                                    >
                                        <Meta title="Brass Vintage Canon Tope Showpiece" description="₹ 789" style={{fontSize:'2.0rem'}} />
                                    </Card></Link>
                                    <Link to="/handicraft_item">
                                    <Card
                                        hoverable
                                        style={{ width: 240, margin: '20px 2px', borderRadius: '10px' }}
                                        cover={<img alt="example" src={ganesh_coin} className="items-img" />}
                                    >
                                        <Meta title="Decorative Brass Ganesh Face Wall Hanging Handicrafts Product" description="₹ 1580" style={{fontSize:'2.0rem'}} />
                                    </Card></Link>
                                    <Link to="/handicraft_item">
                                    <Card
                                        hoverable
                                        style={{ width: 240, margin: '20px 2px', borderRadius: '10px' }}
                                        cover={<img alt="example" src={horse} className="items-img" />}
                                    >
                                        <Meta title="Brass Handicraft Horse" description="₹ 650" style={{fontSize:'2.0rem'}} />
                                    </Card></Link>
                                    <Link to="/handicraft_item">
                                    <Card
                                        hoverable
                                        style={{ width: 240, margin: '20px 2px', borderRadius: '10px' }}
                                        cover={<img alt="example" src={camel} className="items-img" />}
                                    >
                                        <Meta title="Gemstone Studded Pure Brass Camel Handicraft" description="₹ 307" style={{fontSize:'2.0rem'}} />
                                    </Card></Link>
                                    <Link to="/handicraft_item">
                                    <Card
                                        hoverable
                                        style={{ width: 240, margin: '20px 2px', borderRadius: '10px' }}
                                        cover={<img alt="example" src={telescope} className="items-img" />}
                                    >
                                        <Meta title="Handcrafted Nautical Decor Floor Standing Admirals Brass/leather Binoculars 62 Brass By Handcrafted Model Ships" description="₹ 42787" style={{fontSize:'2.0rem'}} />
                                    </Card></Link>
                                    <Link to="/handicraft_item">
                                    <Card
                                        hoverable
                                        style={{ width: 240, margin: '20px 2px', borderRadius: '10px' }}
                                        cover={<img alt="example" src={wheel} className="items-img" />}
                                    >
                                        <Meta title="Deluxe Class Wood And Brass Decorative Ship Wheel 36 Nautical Home Decora" description="₹ 4000" style={{fontSize:'2.0rem'}} />
                                    </Card></Link>
                                </Row>
                        </div>
                    </Col>
                </Row>
            </section>
        </React.Fragment>
    );
}
/* ---------------------component Handicrafts ends------------------------*/

export default Handicrafts;