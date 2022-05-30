import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BASE_URL, userRequest } from "../axiosRequest";
import "./ordercomp.css";

const OrderComp = () => {
	const userState = useSelector((state) => {
		return state.user;
	});
	const TOKEN = userState.currentUser.accessToken;
	const [userOrdersFromApi, setUserOrdersFromApi] = useState([]);
	console.log(userOrdersFromApi);

	// Bring the users order items from the api
	useEffect(() => {
		const usersOrders = async () => {
			try {
				// const response = await userRequest.get(`/order/find/${userState._id}`);
				const instance = axios.create({
					baseURL: BASE_URL,
					headers: { token: `Bearer ${TOKEN}` },
				});
				const response = await instance.get(
					`/order/find/${userState.currentUser._id}`,
					{ user: { id: userState.currentUser._id } }
				);
				// console.log(response);
				setUserOrdersFromApi(response.data);
			} catch (error) {
				console.log(error);
			}
		};
		usersOrders();
	}, []);
	return (
		<div className='wrapper'>
			<h1>Your orders</h1>
			<div className='allorders'>
				{userOrdersFromApi.map((orderObj) => (
					<div className='order' key={orderObj._id}>
						<img className='orderimg' src={orderObj.productImg} alt='' />
						<div className='details'>
							<h2>{orderObj.productTitle}</h2>
							<h3>Order ID : {orderObj._id}</h3>
							<h3>Language : {orderObj.language}</h3>
							<h3>Quality : {orderObj.quality}</h3>
							<span>Ordered Time : {orderObj.createdAt}</span>
						</div>
						<div className='pricedetails'>
							<div className='pricedetail'>UnitPrice : ₹{orderObj.price}</div>
							<div className='pricedetail'>you Brought : {orderObj.quantity}</div>
							<div className='pricedetail'>Total amount : ₹{orderObj.totalAmount}</div>
						</div>
						<div className='shippingstatus'>
							<div className='ordersuccess'>Order Success</div>
							<div className='orderstatus'>Getting Ready To Ship</div>
						</div>
					</div>
				))}
				{/*  */}
			</div>
		</div>
	);
};

export default OrderComp;
