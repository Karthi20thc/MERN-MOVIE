import React from "react";
import Navbar from "../Components/Navbar";
import OrderComp from "../Components/OrderComp";

const Orders = () => {
	return (
		<div>
			<Navbar />
			<div className='orders'></div>
			<OrderComp />
		</div>
	);
};

export default Orders;
