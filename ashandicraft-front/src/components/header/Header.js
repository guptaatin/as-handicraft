import React, { useState } from "react";
import { Menu, Row, Col, Input, Modal, Form, Button, Select, Popover } from "antd";
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
	LockOutlined,
	LogoutOutlined
} from "@ant-design/icons";
import user_pic from '../../images/user_pic.jpg';
import "../../App.css";
import { useSelector, useDispatch } from 'react-redux';
import ApiPath from "../../utils/apiPath";
import { http } from "../../utils/http";
import { authDataAction } from "../../redux/actions";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const { SubMenu } = Menu;
const { Option } = Select;
const layout = {
	labelCol: { span: 0 },
	wrapperCol: { span: 24 },
};

/* --------------component Header Starts-------------- */
const Header = () => {
	const state = useSelector((state) => state.authPage); // Access data from Redux state
	const dispatch = useDispatch(); // Get dispatch function
	const [open, setOpen] = useState(false);
	const history = useHistory();

	const hide = () => {
		setOpen(false);
	};
	const handleOpenChange = (newOpen) => {
		setOpen(newOpen);
	};

	const handleLogout = () => {
		dispatch(authDataAction('', '', '', '', '', false, false));
		history.push("/");
	};

	const content = (
		<div className="customPopoverContent">
			<ul>
				<li><Link to="/my_account"><UserOutlined />&nbsp;&nbsp;&nbsp;Profile</Link></li>
				<li><Link to="#" onClick={handleLogout}><LogoutOutlined />&nbsp;&nbsp;&nbsp;Logout</Link></li>
			</ul>
		</div>
	);

	const showModal = () => {
		dispatch(authDataAction(state.id, state.email, state.roles, state.auth_data, state.access_token, true, false));
	};
	const handleCancel = () => {
		dispatch(authDataAction(state.id, state.email, state.roles, state.auth_data, state.access_token, false, state.signupModelVisible));
	};

	const showModalSignUp = () => {
		dispatch(authDataAction(state.id, state.email, state.roles, state.auth_data, state.access_token, false, true));
	};
	const handleCancelSignUp = () => {
		dispatch(authDataAction(state.id, state.email, state.roles, state.auth_data, state.access_token, state.loginModelVisible, false));
	};

	const prefixSelector = (
		<Form.Item name="prefix" noStyle>
			<Select placeholder='Select' style={{ width: 70 }}>
				<Option value="86">+86</Option>
				<Option value="87">+87</Option>
			</Select>
		</Form.Item>
	);

	const handleUserSignin = async (values) => {
		const obj = {
			mobile: values.mobile,
			prefixMobile: values.prefix,
			password: values.password,
		};
		http.post(ApiPath.signin, obj)
			.then((response) => {
				dispatch(authDataAction(response.id, response.email, 'user', response.user, response.accessToken, state.loginModelVisible, false));
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleUserCreate = async (values) => {
		const obj = {
			userName: values.email.split('@')[0],
			email: values.email,
			mobile: values.mobile,
			prefixMobile: values.prefix,
			password: values.password,
			roles: ["user"]
		};
		http.post(ApiPath.signup, obj)
			.then((response) => {
				const obj1 = {
					mobile: values.mobile,
					prefixMobile: values.prefix,
					password: values.password,
				};
				http.post(ApiPath.signin, obj1)
					.then((response) => {
						dispatch(authDataAction(response.id, response.email, 'user', response.user, response.accessToken, state.loginModelVisible, false));
					})
					.catch((err) => {
						console.log(err);
					});
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
					{state.access_token === '' ?
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
											visible={state.loginModelVisible}
											onCancel={handleCancel}
											footer={null}
											width={700}
										>
											<Row>
												<Col span={8}>
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
												<Col span={14} offset={2}>
													<Form
														name="basic"
														layout="vertical"
														labelCol={{
															span: 12,
														}}
														wrapperCol={{
															span: 24,
														}}
														style={{
															maxWidth: 600,
														}}
														onFinish={handleUserSignin}
														onFinishFailed={(errorInfo) => console.log('Failed:', errorInfo)}
														autoComplete="off"
													>
														<Form.Item
															label="Mobile"
															name="mobile"
															rules={[
																{
																	required: true,
																	message: "Please input correct mobile number!",
																	pattern: /^[6-9]\d{9}$/,
																},
															]}
														>
															<Input
																minLength="10"
																maxLength="10"
																style={{
																	width: '100%',
																}}
																placeholder="Mobile"
																addonBefore={prefixSelector}
															/>
														</Form.Item>

														<Form.Item
															label="Password"
															name="password"
															hasFeedback
															rules={[
																{
																	required: true,
																	message: 'Please input your password!',
																},
															]}
														>
															<Input.Password
																minLength="10"
																maxLength="10"
																prefix={<LockOutlined className="site-form-item-icon" />}
																placeholder="Password"
															/>
														</Form.Item>

														<Form.Item
															wrapperCol={{
																offset: 8,
																span: 16,
															}}
														>
															<Button type="green" htmlType="submit">
																Submit
															</Button>
														</Form.Item>
													</Form>
													<ul>
														<li>
															<Link to="#" className="forgot">
																Forgot Password?
															</Link>
														</li>
														<li>
															<Link to="#" className="no-account" onClick={showModalSignUp}>
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
											visible={state.signupModelVisible}
											onCancel={handleCancelSignUp}
											footer={null}
											width={700}
										>
											<Row>
												<Col span={8}>
													<div className="modal-left">
														<div className="modal-name">H</div>
														<h1>Sign Up</h1>
														<p>
															We do not share your personal details with anyone.
														</p>
													</div>
												</Col>
												<div className="modal-vertical"></div>
												<Col span={14} offset={2}>
													<Form
														name="basic"
														layout="vertical"
														labelCol={{
															span: 12,
														}}
														wrapperCol={{
															span: 24,
														}}
														style={{
															maxWidth: 600,
														}}
														onFinish={handleUserCreate}
														onFinishFailed={(errorInfo) => console.log('Failed:', errorInfo)}
														autoComplete="off"
													>
														<Form.Item
															name="email"
															label="Email"
															rules={[
																{
																	type: 'email',
																	message: 'The input is not valid E-mail!',
																},
																{
																	required: true,
																	message: 'Please input your E-mail!',
																},
															]}
														>
															<Input placeholder="Email" />
														</Form.Item>
														<Form.Item
															label="Mobile"
															name="mobile"
														>
															<Input
																minLength="10"
																maxLength="10"
																style={{
																	width: '100%',
																}}
																placeholder="Mobile"
																addonBefore={prefixSelector}
															/>
														</Form.Item>

														<Form.Item
															label="Password"
															name="password"
															hasFeedback
															rules={[
																{
																	required: true,
																	message: 'Please input your password!',
																},
															]}
														>
															<Input.Password
																minLength="10"
																maxLength="10"
																prefix={<LockOutlined className="site-form-item-icon" />}
																placeholder="Password"
															/>
														</Form.Item>

														<Form.Item
															label="Confirm Password"
															name="confirm_password"
															dependencies={['password']}
															hasFeedback
															rules={[
																{
																	required: true,
																	message: 'Please input your confirm password!',
																},
																({ getFieldValue }) => ({
																	validator(_, value) {
																		if (!value || getFieldValue('password') === value) {
																			return Promise.resolve();
																		}
																		return Promise.reject(new Error('The new password that you entered do not match!'));
																	},
																}),
															]}
														>
															<Input.Password
																minLength="10"
																maxLength="10"
																prefix={<LockOutlined className="site-form-item-icon" />}
																placeholder="Confirm Password"
															/>
														</Form.Item>

														<Form.Item
															wrapperCol={{
																offset: 8,
																span: 16,
															}}
														>
															<Button type="primary" htmlType="submit">
																Submit
															</Button>
														</Form.Item>
													</Form>
													<ul>
														<li>
															<Link to="#" className="forgot" onClick={showModal}>
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
						:
						<Col xs={0} sm={2} md={2} lg={2} xl={2} offset={2}>
							<Popover
								content={content}
								trigger="click"
								overlayClassName="customProfile"
								open={open}
								onOpenChange={handleOpenChange}
							>
								<img src={user_pic} style={{ width: '40px', height: '40px', borderRadius: '50%' }} onClick={hide} />
							</Popover>
						</Col>
					}
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
