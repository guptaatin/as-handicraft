import React, { useEffect, useState } from 'react';
import { Row, Col, Select, Breadcrumb, Checkbox, Card, Slider } from 'antd';
import { Link } from 'react-router-dom';
import "./handicrafts.css";
import {
    UnorderedListOutlined, AppstoreOutlined
} from '@ant-design/icons';
import ApiPath from '../../utils/apiPath';
import { http } from '../../utils/http';

/* ------------------------constants defined-------------------------*/

const { Option } = Select;
const { Meta } = Card;

/* ---------------------component Handicrafts starts------------------------*/
const Handicrafts = (props) => {
    const [categories, setCategories] = useState([]);
    const [isInitialMount, setIsInitialMount] = useState(true);
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [values, setValues] = useState({
        categories: [],
        sort: 'newest',
        products: []
    });
    /* ----------------onload api's handler called in useEffect---------------- */
    useEffect(() => {
        props.title && (document.title = props.title);
        const fetchCategories = async () => {
            try {
                let categories = await http.get(ApiPath.findCategories);
                categories = categories.map(obj => { return { ...obj, label: obj.name, value: obj.id }; });
                setCategories(categories);
            } catch (err) {
                console.log(err);
            };
        };
        const fetchProducts = async () => {
            try {
                const products = await http.get(ApiPath.findAllProducts + `?sort=${values.sort}&categories=${(values.categories).join(',')}&minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}`);
                setValues({ ...values, products: products });
            } catch (err) {
                console.log(err);
            };
        };
        if (isInitialMount) {
            fetchCategories(); // Fetch categories only once on initial mount
            setIsInitialMount(false); // Set isInitialMount to false after initial fetch
        }
        fetchProducts();
    }, [values.sort, values.categories, priceRange]);

    const handleView = async (id) => {
        try {
            await http.post(ApiPath.addViewToProduct + `/${id}/view`);
        } catch (err) {
            console.log(err);
        }
    };
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
                            <h3>Filter Auctions<span> ({values.products.length} Results)</span></h3>
                            <div className="commodity-filter">
                                <h5>Type</h5>
                                <ul>
                                    <li><Checkbox.Group options={categories} onChange={e => setValues({ ...values, categories: e })} /></li>
                                </ul>
                            </div>
                            <div className="offer-filter">
                                <h5>Price</h5>
                                <ul>
                                    <Slider
                                        range
                                        max={1000}
                                        step={50}
                                        defaultValue={[0, 1000]}
                                        onChange={value => setPriceRange(value)}
                                    />
                                </ul>
                            </div>
                            {/* <div className="offer-filter status-filter">
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
                            </div> */}
                        </div>
                    </Col>
                    <Col xs={24} sm={19} md={19} lg={19}>
                        <div className="pro-box">
                            <Row>
                                <div className="sort">
                                    <h1>Handicraft Item</h1><span>(Showing 1 - 12 of 12 items)</span>
                                    <h2>Sort By</h2>
                                    <Select defaultValue="newest" className="sort-select" onChange={(e) => {
                                        setValues({ ...values, sort: e });
                                    }}>
                                        <Option value="popularity">Popularity</Option>
                                        <Option value="newest">Newest</Option>
                                        <Option value="priceLowToHigh">Price Low to High</Option>
                                        <Option value="priceHighToLow">Price High to Low</Option>
                                    </Select>
                                    <UnorderedListOutlined className="sort-icon" />
                                    <AppstoreOutlined className="sort-icon" />
                                </div>
                            </Row>
                            <Row className="cards-row">
                                {values.products.map(product => {
                                    return (<Link to={`/handicraft_item/${product.id}`} key={product.id} onClick={() => handleView(product.id)}>
                                        <Card
                                            hoverable
                                            style={{ width: 240, margin: '20px 2px', borderRadius: '10px' }}
                                            cover={<img alt="example" src={`data:image/png;base64,${Buffer.from(product.image[0].data).toString('base64')}`} className="items-img" />}
                                        >
                                            <Meta title={product.name} description={`₹ ${product.price}`} style={{ fontSize: '2.0rem' }} />
                                        </Card>
                                    </Link>);
                                })}
                            </Row>
                        </div>
                    </Col>
                </Row>
            </section>
        </React.Fragment>
    );
};
/* ---------------------component Handicrafts ends------------------------*/

export default Handicrafts;