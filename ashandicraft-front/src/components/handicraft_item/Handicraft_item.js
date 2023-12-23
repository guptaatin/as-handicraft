import React, { useEffect, useState } from 'react';
import { Row, Col, Breadcrumb, Card, } from 'antd';
import { Link } from 'react-router-dom';
import "./handicraft_item.css";
import './example.css';
import ItemCardSection from './ItemCardSection';
import { useParams } from 'react-router-dom';
import { http } from '../../utils/http';
import ApiPath from '../../utils/apiPath';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const { Meta } = Card;

/* --------------component Handicraft_item Starts-------------- */

const Handicraft_item = (props) => {

    /* ----------------onload api's handler called in useEffect---------------- */
    const { productId } = useParams();
    const [product, setProduct] = useState();
    const [similarProduct, setSimilarProduct] = useState();
    const history = useHistory();

    useEffect(() => {
        props.title && (document.title = props.title);
        const fetchProduct = async () => {
            try {
                let product = await http.get(ApiPath.findProduct + `/${productId}`);
                setProduct(product);
                if (product) {
                    try {
                        let products = await http.get(ApiPath.findAllProducts);
                        products = products.filter(v => v.id !== product?.id);
                        setSimilarProduct(products);
                    } catch (err) {
                        console.log(err);
                    }
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchProduct();
    }, []);

    const handleView = async (id) => {
        try {
            const view = await http.post(ApiPath.addViewToProduct + `/${id}/view`);
            if (view) {
                history.push(window.location.reload());
            }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <React.Fragment>
            <section className="breadcrumb">
                <div className="container">
                    <Breadcrumb>
                        <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                        <Breadcrumb.Item>Marketplace</Breadcrumb.Item>
                        <Breadcrumb.Item>Product Details</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            </section>
            <section className="item-card-section">
                <div className="container">
                    <ItemCardSection data={product} />
                </div>
            </section>
            <section className="item-card-section">
                <div className="container">
                    <Row>
                        <Col span={24}>
                            <h1 className="similar-product">Similar Product</h1>
                            {/* <Link to="#"> */}
                            <Row className="similar-cards-row">
                                {similarProduct?.map(product => {
                                    return (<Link to={`/handicraft_item/${product.id}`} key={product.id} onClick={() => handleView(product.id)}>
                                        <Card
                                            hoverable
                                            style={{ width: 225, margin: '20px 2px', borderRadius: '10px' }}
                                            cover={<img alt="example" src={`data:image/png;base64,${Buffer.from(product.image[0].data).toString('base64')}`} className="similar-items-img" />}
                                        >
                                            <Meta title={product.name} description={`₹ ${product.price}`} style={{ fontSize: '2.0rem' }} />
                                        </Card>
                                    </Link>);
                                })}
                                {/* <Card
                                    hoverable
                                    style={{ width: 225, margin: '20px 2px', borderRadius: '10px' }}
                                    cover={<img alt="example" src={mens} className="similar-items-img" />}
                                >
                                    <Meta title="Brass Statue Tribal Men Figurine Set Of 3 Pcs Home Decorative Handicrafts Corporate Showpiece Christmas & New Year Gift" description="₹ 3606" style={{ fontSize: '2.0rem' }} />
                                </Card>
                                <Card
                                    hoverable
                                    style={{ width: 225, margin: '20px 2px', borderRadius: '10px' }}
                                    cover={<img alt="example" src={pooja_deep} className="similar-items-img" />}
                                >
                                    <Meta title="Brass Pooja Deep" description="₹ 699" style={{ fontSize: '2.0rem' }} />
                                </Card>
                                <Card
                                    hoverable
                                    style={{ width: 225, margin: '20px 2px', borderRadius: '10px' }}
                                    cover={<img alt="example" src={ganesh} className="similar-items-img" />}
                                >
                                    <Meta title="Decorative Shree Ganesha Face Brass Handicraft Wall Hanging Product" description="₹ 775" style={{ fontSize: '2.0rem' }} />
                                </Card>
                                <Card
                                    hoverable
                                    style={{ width: 225, margin: '20px 2px', borderRadius: '10px' }}
                                    cover={<img alt="example" src={toupchi} className="similar-items-img" />}
                                >
                                    <Meta title="Brass Vintage Canon Tope Showpiece Product" description="₹ 789" style={{ fontSize: '2.0rem' }} />
                                </Card> */}
                            </Row>
                            {/* </Link> */}
                        </Col>
                    </Row>
                </div>
            </section>
        </React.Fragment>
    );
};

/* --------------component Handicraft_item Ends-------------- */

/* -------------component Handicraft_item exported------------------*/

export default Handicraft_item;