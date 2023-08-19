import React, { useState } from "react";
import { Menu, Row, Col, Input, Modal, Form, Button } from "antd";
import { Link } from "react-router-dom";
import {
	TwitterOutlined,
	FacebookOutlined,
	PhoneOutlined,
	InstagramOutlined,
	DollarCircleOutlined,
	MailOutlined,
	LinkedinOutlined,
	UserOutlined,
	EnvironmentOutlined,
	ShopOutlined,
	UserAddOutlined,
} from "@ant-design/icons";
import "../../App.css";
import ApiPath from "../../utils/apiPath";
import { http } from "../../utils/http";

const { SubMenu } = Menu;
const layout = {
	labelCol: { span: 0 },
	wrapperCol: { span: 24 },
};

/* --------------component Header Starts-------------- */
const Header = () => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isModalVisibleSignUp, setIsModalVisibleSignUp] = useState(false);
	const [mobile, setMobile] = useState("");

	const showModal = () => {
		setIsModalVisible(true);
	};
	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const showModalSignUp = () => {
		setIsModalVisibleSignUp(true);
	};
	const handleCancelSignUp = () => {
		setIsModalVisibleSignUp(false);
	};

	const handleUserCreate = async (values) => {
		const obj = {
			mobile: mobile
		};
		http.post(ApiPath.createUser, obj)
			.then((response) => {
				if (response.status) {
					console.log(response);
				} else {
					console.log(response);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className="main-header">
			<section className="menu-section">
				<Row>
					<Col xs={24} sm={8} md={8} lg={8} xl={8}>
						<div className="socal-icons">
							<ul>
								<li>
									<a
										href="https://www.twitter.com/@Krishirishi1"
										target="_blank"
									>
										<PhoneOutlined />
									</a>
								</li>
								<li>
									<a
										href="https://www.twitter.com/@Krishirishi1"
										target="_blank"
									>
										<MailOutlined />
									</a>
								</li>
								<li>
									<a
										href="https://www.twitter.com/@Krishirishi1"
										target="_blank"
									>
										<LinkedinOutlined />
									</a>
								</li>
								<li>
									<a
										href="https://www.twitter.com/@Krishirishi1"
										target="_blank"
									>
										<TwitterOutlined />
									</a>
								</li>
								<li>
									<a
										href="https://www.instagram.com/krishirishi1"
										target="_blank"
									>
										<InstagramOutlined />
									</a>
								</li>
								<li>
									<a
										href="https://www.facebook.com/Krishirishi0"
										target="_blank"
									>
										<FacebookOutlined />
									</a>
								</li>
							</ul>
						</div>
					</Col>
					<Col xs={24} sm={4} md={4} lg={4} xl={4}>
						<div className="menu">
							<ul>
								<li>
									<a target="_blank">
										<PhoneOutlined />
										<span className="menu-icon">+91-7355442998</span>
									</a>
								</li>
								<li>
									<a target="_blank">
										<MailOutlined />
										<span className="menu-icon">gharsh929@gmail.com</span>
									</a>
								</li>
							</ul>
						</div>
					</Col>
					<Col xs={0} sm={8} md={8} lg={8} xl={8}>
						<div className="menu-first">
							<Menu mode="horizontal">
								<Menu.Item key="home">
									<Link to="#">
										<span className="menu-first-icon">
											<EnvironmentOutlined />
										</span>
										<span className="menu-first-text">
											Agricultural College
										</span>
									</Link>
								</Menu.Item>
								<Menu.Item key="inventory">
									<Link to="my_orders">
										<span className="menu-first-icon">
											<ShopOutlined />
										</span>
										<span className="menu-first-text">Track Order</span>
									</Link>
								</Menu.Item>
							</Menu>
						</div>
					</Col>
					<Col xs={0} sm={4} md={4} lg={4} xl={4}>
						<div className="menu-login">
							<ul>
								<li>
									<Link to="#" onClick={showModal}>
										<span className="menu-first-icon">
											<UserOutlined />
										</span>
										<span className="menu-first-text">Login</span>
									</Link>
									<Modal
										destroyOnClose={true}
										centered
										visible={isModalVisible}
										onCancel={handleCancel}
										footer={null}
										width={700}
									>
										<Row>
											<Col xs={24} sm={6} md={6} lg={6} xl={6}>
												<div className="modal-left">
													<div className="modal-name">H</div>
													<h1>Log In</h1>
													<p>
														Get access to your Orders, Wishlist and
														Recommendations.
													</p>
												</div>
											</Col>
											<div className="modal-vertical"></div>
											<Col xs={24} sm={18} md={18} lg={18} xl={18}>
												<Form
													{...layout}
													name="basic"
													// onFinish={onFinish}
												>
													<Form.Item
														name="mobile"
														rules={[
															{
																required: true,
																message: "Please input correct mobile number!",
																pattern: /^[6-9]\d{9}$/,
															},
														]}
														className="mobile"
													>
														<Input
															bordered={false}
															minLength="10"
															maxLength="10"
															placeholder="MOBILE NUMBER"
															prefix="+91"
														/>
													</Form.Item>
													<Form.Item
														name="password"
														rules={[
															{
																required: true,
																message: "Please input correct password!",
															},
														]}
														className="password"
													>
														<Input
															bordered={false}
															minLength="10"
															maxLength="10"
															placeholder="PASSWORD"
														/>
													</Form.Item>
													<Button
														type="green"
														htmlType="submit"
														className="login-btn"
													>
														Log In
													</Button>
												</Form>
												<ul>
													<li>
														<Link to="#" className="forgot">
															Forgot Password?
														</Link>
													</li>
													<li>
														<Link to="#" className="no-account">
															Don't have an account? SignUp
														</Link>
													</li>
												</ul>
											</Col>
										</Row>
									</Modal>
								</li>
								<li>
									<Link to="#" onClick={showModalSignUp}>
										<span className="menu-first-icon">
											<UserAddOutlined />
										</span>
										<span className="menu-first-text">SignUp</span>
									</Link>
									<Modal
										destroyOnClose={true}
										centered
										visible={isModalVisibleSignUp}
										onCancel={handleCancelSignUp}
										footer={null}
										width={700}
									>
										<Row>
											<Col xs={24} sm={6} md={6} lg={6} xl={6}>
												<div className="modal-left">
													<div className="modal-name">H</div>
													<h1>Sign Up</h1>
													<p>
														We do not share your personal details with anyone.
													</p>
												</div>
											</Col>
											<div className="modal-vertical"></div>
											<Col xs={24} sm={18} md={18} lg={18} xl={18}>
												<Form
													{...layout}
													name="basic"
													onFinish={handleUserCreate}
												>
													<Form.Item
														name="mobile"
														rules={[
															{
																required: true,
																message: "Please input correct mobile number!",
																pattern: /^[6-9]\d{9}$/,
															},
														]}
														className="mobile"
													>
														<Input
															bordered={false}
															minLength="10"
															maxLength="10"
															value={mobile}
															placeholder="MOBILE NUMBER"
															prefix="+91"
														/>
													</Form.Item>
													<Button
														type="green"
														htmlType="submit"
														className="login-btn"
													>
														Sign Up
													</Button>
												</Form>
												<ul>
													<li>
														<Link to="#" className="forgot">
															Existing User? Log In
														</Link>
													</li>
												</ul>
											</Col>
										</Row>
									</Modal>
								</li>
							</ul>
						</div>
					</Col>
				</Row>
			</section>
			<section className="top-header">
				<Row>
					<Col xs={24} sm={8} md={8} lg={8} xl={8}>
						<div className="logo">
							<Link to="#">
								<h1>
									<span className="aslogo">AS</span> Handi<span>Craft</span>
								</h1>
							</Link>
						</div>
					</Col>
					<Col xs={24} sm={12} md={12} lg={12} xl={12}>
						<div className="socal-icons-home">
							<Menu mode="horizontal">
								<Menu.Item key="home">
									<Link to="/">Home</Link>
								</Menu.Item>
								<Menu.Item key="inventory">
									<Link to="/handicrafts">Handicrafts</Link>
								</Menu.Item>
								<Menu.Item key="buy">
									<Link to="/wishlist">Deal of the Day</Link>
								</Menu.Item>
								<SubMenu key="SubMenu" title="More">
									<Menu.ItemGroup title="Item 1">
										<Menu.Item key="setting:1">Option 1</Menu.Item>
										<Menu.Item key="setting:2">Option 2</Menu.Item>
									</Menu.ItemGroup>
									<Menu.ItemGroup title="Item 2">
										<Menu.Item key="setting:3">Option 3</Menu.Item>
										<Menu.Item key="setting:4">Option 4</Menu.Item>
									</Menu.ItemGroup>
								</SubMenu>
							</Menu>
						</div>
					</Col>
					<Col xs={24} sm={4} md={4} lg={4} xl={4}>
						<Input placeholder="Search" className="search" />
						<DollarCircleOutlined className="shopping-icon" />
					</Col>
				</Row>
			</section>
		</div>
	);
};

export default Header;
