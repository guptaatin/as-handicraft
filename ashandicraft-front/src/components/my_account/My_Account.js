import React, { useState, useEffect } from 'react';
import { Upload, Breadcrumb, Image, Form, Select, Checkbox, Space, Drawer, Input, DatePicker, Button, Radio, message, Row, Col } from 'antd';
import moment from 'moment';
import user_pic from '../../images/user_pic.jpg';
import back_profile_pic from '../../images/back_profile_pic.jpg';
import { Link } from 'react-router-dom';
import FloatLabel from '../checkout_flow/FloatLabel';
import { useSelector, useDispatch } from 'react-redux';
import { PlusOutlined, MinusCircleOutlined, ShopTwoTone, HeartTwoTone, IdcardTwoTone, EnvironmentTwoTone, ToolTwoTone } from '@ant-design/icons';
import './my_account.css';
import ApiPath from '../../utils/apiPath';
import { http } from '../../utils/http';
import { authDataAction } from '../../redux/actions';

const { Option } = Select;
/* ---------------------component My_Account starts------------------------*/
const My_Account = (props) => {
    /* ----------------onload api's handler called in useEffect---------------- */
    const state = useSelector(state => state.authPage);
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [states, setStates] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [selectedDate, setSelectedDate] = useState();
    const [imageUrlBack, setImageUrlBack] = useState("");
    const [loadingBack, setLoadingBack] = useState(false);
    const [imageUrlProfile, setImageUrlProfile] = useState("");
    const [loadingProfile, setLoadingProfile] = useState(false);
    const [visible, setVisible] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [visibleAddress, setVisibleAddress] = useState(false);
    const [childrenDrawer, setChildrenDrawer] = useState(false);
    const [childrenDrawerEdit, setChildrenDrawerEdit] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState();

    console.log("sfdsfd--->", state);

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select placeholder='Select' defaultValue={state.auth_data.prefixMobile} style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        </Form.Item>
    );

    useEffect(() => {
        props.title && (document.title = props.title);
        const fetchStates = async () => {
            try {
                const state = await http.get(ApiPath.fetchStates);
                if (state) {
                    setStates(state);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchStates();
    }, []);

    const onStateChange = async (state) => {
        const district = await http.get(ApiPath.fetchDistricts + `/${state}`);
        if (district) {
            console.log("awsdj===>", district);
            setDistricts(district);
        }
    };

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    const showDrawerAddress = () => {
        setVisibleAddress(true);
    };

    const onCloseAddress = () => {
        setVisibleAddress(false);
    };

    const showChildrenDrawer = () => {
        setSelectedAddress();
        setChildrenDrawer(true);
    };
    const onChildrenDrawerClose = () => {
        setChildrenDrawer(false);
    };
    const onChildrenDrawerEditClose = () => {
        setChildrenDrawerEdit(false);
    };
    function onChange(date, dateString) {
        setSelectedDate(dateString);
    }

    const onFinish = (values) => {
        console.log('Received values of form:', values);
        const obj = {
            recipient_name: values.recipient_name,
            recipient_email: values.recipient_email,
            alt_mobile: values.alt_mobile,
            house: values.house,
            street: values.street,
            landmark: values.landmark,
            city: values.city,
            pincode: values.pincode,
            state: values.state,
            district: values.district,
            save_as: values.save_as,
        };
        http.post(ApiPath.createUserAddress + `?userId=${state.id}`, obj)
            .then((response) => {
                http.get(ApiPath.findOneUser + `/${state.id}`)
                    .then((response) => {
                        console.log("sdeexx--->", response);
                        dispatch(authDataAction(state.id, state.email, state.roles, response, state.access_token, state.loginModelVisible, state.signupModelVisible));
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const onFinishEditAddress = (values) => {
        console.log('edit:', values, selectedAddress?.id);
        const obj = {
            recipient_name: values.recipient_name,
            recipient_email: values.recipient_email,
            alt_mobile: values.alt_mobile,
            house: values.house,
            street: values.street,
            landmark: values.landmark,
            city: values.city,
            pincode: values.pincode,
            state: values.state,
            district: values.district,
            save_as: values.save_as,
        };
        // http.post(ApiPath.createUserAddress + `?userId=${state.id}`, obj)
        //     .then((response) => {
        //         http.get(ApiPath.findOneUser + `/${state.id}`)
        //             .then((response) => {
        //                 console.log("sdeexx--->", response);
        //                 dispatch(authDataAction(state.id, state.email, state.roles, response, state.access_token, state.loginModelVisible, state.signupModelVisible));
        //             })
        //             .catch((err) => {
        //                 console.log(err);
        //             });
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
    };

    const handleChangeBack = info => {
        console.log("back--->", info.file);
        if (info.file.status === 'uploading') {
            setLoadingProfile(true);
            return;
        }
        if (info.file.status === 'done') {
            setLoadingProfile(false);
            message.success('Image uploaded successfully');
            dispatch(authDataAction(state.id, state.email, state.roles, info.file.response, state.access_token, state.loginModelVisible, state.signupModelVisible));
            setImageUrlProfile(info.file.response.data);
        }
        // Handle error cases
        if (info.file.status === 'error') {
            setLoadingProfile(false);
            message.error('Image upload failed');
        }
    };

    const beforeUpload = (file) => {
        // Perform validation or checks on the file if needed
        const isImage = file.type.startsWith('image/');
        if (!isImage) {
            message.error('You can only upload image files!');
        }
        return isImage;
    };

    const handleChangeProfile = info => {
        console.log("info--->", info.file);
        if (info.file.status === 'uploading') {
            setLoadingProfile(true);
            return;
        }
        if (info.file.status === 'done') {
            setLoadingProfile(false);
            message.success('Image uploaded successfully');
            dispatch(authDataAction(state.id, state.email, state.roles, info.file.response, state.access_token, state.loginModelVisible, state.signupModelVisible));
            setImageUrlProfile(info.file.response.data);
        }
        // Handle error cases
        if (info.file.status === 'error') {
            setLoadingProfile(false);
            message.error('Image upload failed');
        }
    };

    const handleUserUpdate = async (values) => {
        console.log("dsfcd---->", values);
        const obj = {
            firstName: values.firstname,
            lastName: values.lastname,
            email: values.email,
            mobile: values.mobile,
            prefixMobile: values.prefix,
            gender: values.gender,
            dateOfBirth: selectedDate,
        };
        const user = await http.post(ApiPath.updateUser + `/${state.id}`, obj);
        if (user) {
            console.log("efede---->", user);
            message.success('Profile updated successfully');
            dispatch(authDataAction(state.id, state.email, state.roles, user, state.access_token, state.loginModelVisible, state.signupModelVisible));
        }
    };
    return (
        <React.Fragment>
            <section className="breadcrumb">
                <div className="container">
                    <Breadcrumb>
                        <Breadcrumb.Item><Link to="#">My Account</Link></Breadcrumb.Item>
                        <Breadcrumb.Item><Link to="#">My Orders</Link></Breadcrumb.Item>
                        <Breadcrumb.Item>#1</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            </section>
            <section className="account-section">
                <div className="profile-box">
                    <Upload
                        name="file"
                        accept=".jpg, .jpeg, .png"
                        listType="picture-card"
                        className="back-avatar-uploader"
                        showUploadList={false}
                        action={`http://localhost:8080/api/user/updateProfileImage?userId=${state.id}&profile_type=cover`}
                        onChange={handleChangeBack}
                    >
                        {state.auth_data.cover_data ? <img src={`data:image/png;base64,${Buffer.from(state.auth_data.cover_data).toString('base64')}`} alt="File Uploaded" style={{ width: '100%', height: 'inherit' }} />
                            :
                            <Image src={back_profile_pic} preview={false} className="dummy-back-profile" />}
                    </Upload>
                    <Upload
                        name="file"
                        accept=".jpg, .jpeg, .png"
                        listType="picture-card"
                        className="profile-avatar-uploader"
                        showUploadList={false}
                        action={`http://localhost:8080/api/user/updateProfileImage?userId=${state.id}`}
                        onChange={handleChangeProfile}
                    >
                        {state.auth_data.data ? <img src={`data:image/png;base64,${Buffer.from(state.auth_data.data).toString('base64')}`} alt="File Uploaded" style={{ width: '100%' }} /> : <Image src={user_pic} preview={false} className="dummy-profile" />}
                    </Upload>
                    <h2>Harsh Gupta</h2>
                    <div className="options-boxes">
                        <Link to="#">
                            <div className="each-box">
                                <ul>
                                    <li><ShopTwoTone className="option-icon" /></li>
                                    <li>
                                        <div className="options-list">
                                            <ul>
                                                <li><h1>Orders</h1></li>
                                                <li><p>Track Your Orders, Return Products or Buy them again</p></li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </Link>
                        <Link to="#">
                            <div className="each-box">
                                <ul>
                                    <li><HeartTwoTone className="option-icon" /></li>
                                    <li>
                                        <div className="options-list">
                                            <ul>
                                                <li><h1>Wishlist</h1></li>
                                                <li><p>Here is the List of all Your Desired Products</p></li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </Link>
                        <Link to="#" onClick={showDrawer}>
                            <div className="each-box">
                                <ul>
                                    <li><IdcardTwoTone className="option-icon" /></li>
                                    <li>
                                        <div className="options-list">
                                            <ul>
                                                <li><h1>Profile</h1></li>
                                                <li><p>Add Profile Image, Edit Your Name and Email</p></li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </Link>
                        <Drawer
                            title={
                                <div
                                    style={{
                                        textAlign: 'center',
                                    }}
                                >
                                    <p>Profile Details</p>
                                </div>
                            }
                            width={320}
                            onClose={onClose}
                            visible={visible}
                            bodyStyle={{ paddingBottom: 80 }}
                        >
                            <Form
                                name="basic"
                                layout="vertical"
                                initialValues={{
                                    username: state.auth_data.userName,
                                    firstname: state.auth_data.firstName,
                                    lastname: state.auth_data.lastName,
                                    email: state.auth_data.email,
                                    mobile: state.auth_data.mobile,
                                    gender: state.auth_data.gender,
                                    dob: state.auth_data.dateOfBirth !== null ? moment(state.auth_data.dateOfBirth, 'DD/MM/YYYY') : null,
                                    prefix: state.auth_data.prefixMobile
                                }}
                                onFinish={handleUserUpdate}
                                onFinishFailed={(errorInfo) => console.log('Failed:', errorInfo)}
                                autoComplete="off"
                            >
                                <Form.Item
                                    name="profile_back_avatar"
                                >
                                    <Upload
                                        name="file"
                                        accept=".jpg, .jpeg, .png"
                                        listType="picture-card"
                                        className="profile-back-avatar-uploader"
                                        showUploadList={false}
                                        action={`http://localhost:8080/api/user/updateProfileImage?userId=${state.id}&profile_type=cover`}
                                        beforeUpload={beforeUpload}
                                        onChange={handleChangeBack}
                                    >
                                        {state.auth_data.cover_data ? <img src={`data:image/png;base64,${Buffer.from(state.auth_data.cover_data).toString('base64')}`} alt="File Uploaded" style={{ width: '100%' }} />
                                            :
                                            <div className="profile-back-dummy">
                                                <div></div>
                                            </div>}
                                    </Upload>
                                </Form.Item>
                                <Form.Item
                                    name="profile_front_avatar"
                                >
                                    <Upload
                                        name="file"
                                        accept=".jpg, .jpeg, .png"
                                        listType="picture-card"
                                        className="profile-front-avatar-uploader"
                                        showUploadList={false}
                                        action={`http://localhost:8080/api/user/updateProfileImage?userId=${state.id}`}
                                        beforeUpload={beforeUpload}
                                        onChange={handleChangeProfile}
                                    >
                                        {state.auth_data.data ? <img src={`data:image/png;base64,${Buffer.from(state.auth_data.data).toString('base64')}`} alt="File Uploaded" style={{ width: '100%' }} /> : <Image src={user_pic} preview={false} className="dummy-profile-front" />}
                                    </Upload>
                                </Form.Item>
                                <div className="more-profile-info">
                                    <ul>
                                        <li>
                                            <FloatLabel label="username" name="username" value={name}>
                                                <Form.Item
                                                    name="username"
                                                >
                                                    <Input className="profile-input" disabled />
                                                </Form.Item>
                                            </FloatLabel>
                                        </li>
                                        <li>
                                            <FloatLabel label="first name" name="firstname" value={name}>
                                                <Form.Item
                                                    name="firstname"
                                                    rules={[{ required: true, message: 'Please enter first name' }]}
                                                >
                                                    <Input className="profile-input" />
                                                </Form.Item>
                                            </FloatLabel>
                                        </li>
                                        <li>
                                            <FloatLabel label="last name" name="lastname" value={name}>
                                                <Form.Item
                                                    name="lastname"
                                                    rules={[{ required: true, message: 'Please enter last name' }]}
                                                >
                                                    <Input className="profile-input" />
                                                </Form.Item>
                                            </FloatLabel>
                                        </li>
                                        <li>
                                            <FloatLabel label="email" name="email" value={email}>
                                                <Form.Item
                                                    name="email"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please Enter Email'
                                                        },
                                                    ]}
                                                >
                                                    <Input className="profile-input" />
                                                </Form.Item>
                                            </FloatLabel>
                                        </li>
                                        <li>
                                            <h4>Mobile</h4>
                                        </li>
                                        <li>
                                            <Form.Item
                                                name="mobile"
                                            >
                                                <Input
                                                    minLength="10"
                                                    maxLength="10"
                                                    placeholder="Mobile"
                                                    addonBefore={prefixSelector}
                                                    className="profile-input"
                                                />
                                            </Form.Item>
                                        </li>
                                        <li>
                                            <h4>Gender</h4>
                                        </li>
                                        <li>
                                            <Form.Item
                                                name="gender"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please Enter Gender'
                                                    },
                                                ]}
                                            >
                                                <div className="gender">
                                                    <ul>
                                                        <li>
                                                            <Radio.Group defaultValue={state.auth_data.gender} buttonStyle="solid" >
                                                                <Radio.Button value="male" className="gender-radio">Male</Radio.Button>
                                                                <Radio.Button value="female" className="gender-radio">Female</Radio.Button>
                                                            </Radio.Group>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </Form.Item>
                                        </li>
                                        <li>
                                            <Form.Item
                                                name="dob"
                                            // rules={[
                                            //     {
                                            //         required: true,
                                            //         message: 'Please Enter dob'
                                            //     },
                                            // ]}
                                            >
                                                <DatePicker format={'DD/MM/YYYY'} className="profile-input" onChange={onChange} />
                                            </Form.Item>
                                        </li>
                                        <li>
                                            <Form.Item
                                            // wrapperCol={{
                                            //     offset: 8,
                                            //     span: 16,
                                            // }}
                                            >
                                                <Button type="primary" htmlType="submit" className="profile-save-btn">
                                                    Submit
                                                </Button>
                                            </Form.Item>
                                        </li>
                                    </ul>
                                </div>
                            </Form>
                        </Drawer>
                        <Link to="#" onClick={showDrawerAddress}>
                            <div className="each-box">
                                <ul>
                                    <li><EnvironmentTwoTone className="option-icon" /></li>
                                    <li>
                                        <div className="options-list">
                                            <ul>
                                                <li><h1>Addresses</h1></li>
                                                <li><p>Add or Edit Your Addresses</p></li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </Link>
                        <Drawer
                            title={
                                <div
                                    style={{
                                        textAlign: 'center',
                                    }}
                                >
                                    <p>Address Details</p>
                                </div>
                            }
                            width={520}
                            closable={false}
                            onClose={onCloseAddress}
                            visible={visibleAddress}
                        >
                            <Space style={{ display: 'block' }}>
                                <Button type="primary" onClick={showChildrenDrawer}>
                                    + Add a new address
                                </Button>
                                {state.auth_data.addresses.map(address => {
                                    return (
                                        <Row key={address.id} className="space-align-block" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                            <Col className="gutter-row" span={2}>
                                                <div style={{ padding: '8px 0' }}><Radio value="home"></Radio></div>
                                            </Col>
                                            <Col className="gutter-row" span={16}>
                                                <div style={{ padding: '8px 0' }}>
                                                    {/* <p>zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz</p> */}
                                                    <p>
                                                        {address.house}, {address.street},{address.landmark}, {address.city},
                                                        {address.district}, {address.state} - {address.pincode}
                                                        {address.alt_mobile} {address.recipient_email}
                                                    </p>
                                                </div>
                                            </Col>
                                            <Col className="gutter-row" span={6}>
                                                <div style={{ padding: '8px 0' }}>
                                                    <Button onClick={() => {
                                                        setSelectedAddress(address);
                                                        setChildrenDrawerEdit(true);
                                                    }}>
                                                        Edit
                                                    </Button><br /><br />
                                                    <Button>Delete</Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    );
                                })}
                            </Space>
                            <Drawer
                                title={
                                    <div
                                        style={{
                                            textAlign: 'center',
                                        }}
                                    >
                                        <p>Add Address</p>
                                    </div>
                                }
                                width={320}
                                closable={false}
                                onClose={onChildrenDrawerClose}
                                visible={childrenDrawer}
                            >
                                <Form
                                    name="basic"
                                    onFinish={onFinish}
                                    onFinishFailed={(errorInfo) => console.log('Failed:', errorInfo)}
                                    style={{
                                        maxWidth: 600,
                                    }}
                                    autoComplete="off"
                                >
                                    <Form.Item
                                        name='recipient_name'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Missing Name',
                                            },
                                        ]}

                                    >
                                        <Input placeholder="Name" />
                                    </Form.Item>
                                    <Form.Item
                                        name='recipient_email'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Missing Email',
                                            },
                                        ]}

                                    >
                                        <Input placeholder="Email" />
                                    </Form.Item>
                                    <Form.Item
                                        name='alt_mobile'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Missing Alternate Mobile',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Alternate Mobile" />
                                    </Form.Item>
                                    <Form.Item
                                        name='house'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Missing House/Flat/Block No./Building Name',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="House/Flat/Block No./Building Name" />
                                    </Form.Item>
                                    <Form.Item
                                        name='street'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Missing Street/Road/Colony Name',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Street/Road/Colony Name" />
                                    </Form.Item>
                                    <Form.Item
                                        name='landmark'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Missing Landmark',
                                            },
                                        ]}

                                    >
                                        <Input placeholder="Landmark" />
                                    </Form.Item>
                                    <Form.Item
                                        name='city'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Missing City/Town',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="City/Town" />
                                    </Form.Item>
                                    <Form.Item
                                        name='pincode'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Missing Pincode',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Pincode" />
                                    </Form.Item>
                                    <Form.Item
                                        name='state'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Missing State',
                                            },
                                        ]}

                                    >
                                        <Select
                                            placeholder="Select State"
                                            onChange={onStateChange}
                                        >
                                            {states.map((state, index) => {
                                                return <Option key={index} value={state}>{state}</Option>;
                                            })}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        name='district'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Missing District',
                                            },
                                        ]}
                                    >
                                        <Select
                                            placeholder="Select District"
                                        >
                                            {districts.map((district, index) => {
                                                return <Option key={index} value={district}>{district}</Option>;
                                            })}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        name='save_as'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Missing Save As',
                                            },
                                        ]}
                                    >
                                        <Radio.Group buttonStyle="solid">
                                            <Radio.Button value="home">Home</Radio.Button>
                                            <Radio.Button value="office">Office</Radio.Button>
                                            <Radio.Button value="others">Others</Radio.Button>
                                        </Radio.Group>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit">
                                            Submit
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Drawer>
                            <Drawer
                                title={
                                    <div
                                        style={{
                                            textAlign: 'center',
                                        }}
                                    >
                                        <p>Edit Address</p>
                                    </div>
                                }
                                width={320}
                                closable={false}
                                onClose={onChildrenDrawerEditClose}
                                visible={childrenDrawerEdit}
                            >
                                <Form
                                    name="basic"
                                    onFinish={onFinishEditAddress}
                                    onFinishFailed={(errorInfo) => console.log('Failed:', errorInfo)}
                                    style={{
                                        maxWidth: 600,
                                    }}
                                    initialValues={selectedAddress}
                                    autoComplete="off"
                                >
                                    <Form.Item
                                        name='recipient_name'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Missing Name',
                                            },
                                        ]}

                                    >
                                        <Input placeholder="Name" />
                                    </Form.Item>
                                    <Form.Item
                                        name='recipient_email'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Missing Email',
                                            },
                                        ]}

                                    >
                                        <Input placeholder="Email" />
                                    </Form.Item>
                                    <Form.Item
                                        name='alt_mobile'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Missing Alternate Mobile',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Alternate Mobile" />
                                    </Form.Item>
                                    <Form.Item
                                        name='house'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Missing House/Flat/Block No./Building Name',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="House/Flat/Block No./Building Name" />
                                    </Form.Item>
                                    <Form.Item
                                        name='street'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Missing Street/Road/Colony Name',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Street/Road/Colony Name" />
                                    </Form.Item>
                                    <Form.Item
                                        name='landmark'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Missing Landmark',
                                            },
                                        ]}

                                    >
                                        <Input placeholder="Landmark" />
                                    </Form.Item>
                                    <Form.Item
                                        name='city'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Missing City/Town',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="City/Town" />
                                    </Form.Item>
                                    <Form.Item
                                        name='pincode'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Missing Pincode',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Pincode" />
                                    </Form.Item>
                                    <Form.Item
                                        name='state'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Missing State',
                                            },
                                        ]}

                                    >
                                        <Select
                                            placeholder="Select State"
                                            onChange={onStateChange}
                                        >
                                            {states.map((state, index) => {
                                                return <Option key={index} value={state}>{state}</Option>;
                                            })}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        name='district'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Missing District',
                                            },
                                        ]}
                                    >
                                        <Select
                                            placeholder="Select District"
                                        >
                                            {districts.map((district, index) => {
                                                return <Option key={index} value={district}>{district}</Option>;
                                            })}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        name='save_as'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Missing Save As',
                                            },
                                        ]}
                                    >
                                        <Radio.Group buttonStyle="solid">
                                            <Radio.Button value="home">Home</Radio.Button>
                                            <Radio.Button value="office">Office</Radio.Button>
                                            <Radio.Button value="others">Others</Radio.Button>
                                        </Radio.Group>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit">
                                            Submit
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Drawer>
                        </Drawer>
                        <Link to="#">
                            <div className="each-box">
                                <ul>
                                    <li><ToolTwoTone className="option-icon" /></li>
                                    <li>
                                        <div className="options-list">
                                            <ul>
                                                <li><h1>Change Password</h1></li>
                                                <li><p>You can Change Your Password</p></li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
};

/* ---------------------component My_Account ends------------------------*/
export default My_Account;