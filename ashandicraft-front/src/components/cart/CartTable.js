import React from 'react';
import { Select, Table, Image } from 'antd';
import {
    HeartOutlined, CloseOutlined
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { http } from '../../utils/http';
import ApiPath from '../../utils/apiPath';
import { cartDataAction } from '../../redux/actions';

/* ------------------------constants defined-------------------------*/
const { Option } = Select;

const columns = [
    {
        title: 'Item(s) Details',
        dataIndex: 'item',
        key: 'item',
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
    },
];

export const CartTable = (props) => {
    const state = useSelector((state) => state); // Access data from Redux state
    const dispatch = useDispatch(); // Get dispatch function

    const handleQuantity = (e, id) => {
        const obj = { quantity: e };
        http.post(ApiPath.cartCreate + `/${state?.authPage.id}/cart/products/${id}`, obj)
            .then((response) => {
                dispatch(cartDataAction(!state.cartPage.quantity_change));
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const addKey = props.data?.products?.map(v => { return { ...v, key: v.id }; });
    const dataSource = addKey?.map(v => {
        if (v.CartItem && v.CartItem.quantity !== 0) {
            return {
                ...v,
                item:
                    <div className="cart-item">
                        <Image src={`data:image/png;base64,${Buffer.from(v.image[0].data).toString('base64')}`} className="cart-item-img" preview={false} />
                        <ul>
                            <li><p>{v.name} {v.category.name}</p></li>
                            <li><h1>₹ {v.CartItem.amount}</h1></li>
                            <li>
                                <div className="cart-item-action">
                                    <h2><HeartOutlined /> MOVE TO WISHLIST</h2>
                                    <span><h2 onClick={() => handleQuantity(0, v.id)}><CloseOutlined /> REMOVE</h2></span>
                                </div>
                            </li>
                        </ul>
                    </div>
                ,
                quantity:
                    <div>
                        <Select defaultValue={v.CartItem.quantity} className="cart-select" onChange={(e) => handleQuantity(e, v.id)}>
                            <Option value="1">1</Option>
                            <Option value="2">2</Option>
                            <Option value="3">3</Option>
                            <Option value="4">4</Option>
                        </Select>
                    </div>
                ,
                amount: <h1>₹ {v.CartItem.amount}</h1>,
            };
        }
    });
    return (
        <div>
            <Table dataSource={dataSource} columns={columns} />
        </div>
    );
};
