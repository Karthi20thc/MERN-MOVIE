import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import { popularProducts } from "../dummyData";
import Product from "./Product";
import axios from "axios";
import { BASE_URL } from "../axiosRequest";

const Container = styled.div`
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	justify-items: center;
	align-items: center;
	row-gap: 40px;
	margin: 40px;
`;

const Products = (props) => {
	const { category, filters, sort } = props; // receving from ProductPage

	// After receving data from the API, We are storing the data here.
	const [products, setProducts] = useState([]);

	// whenever the user changes the filter, we are going to updated this state, and show those states.
	const [filteredProducts, setFilteredProducts] = useState([]);

	// As my category changes, run this UseEffect
	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const getData = category
					? `${BASE_URL}products?category=${category}`
					: `${BASE_URL}products`;
				const response = await axios.get(getData);
				setProducts(response.data);
				console.log(response.data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchProducts();
	}, [category]);

	useEffect(() => {
		category &&
			setFilteredProducts(
				products.filter((item) =>
					Object.entries(filters).every(([key, value]) => item[key].includes(value))
				)
			);
	}, [products, category, filters]);

	useEffect(() => {
		// previous value are in the form of array of objects.
		if (sort === "latest") {
			setFilteredProducts((prev) =>
				[...prev].sort((a, b) => a.createdAt - b.createdAt)
			);
		} else if (sort === "asc") {
			setFilteredProducts((prev) => [...prev].sort((a, b) => a.price - b.price));
		} else {
			setFilteredProducts((prev) => [...prev].sort((a, b) => b.price - a.price));
		}
	}, [sort]);

	return (
		<div>
			<h1 style={{ margin: "10px", color: "#333" }}>Top Selling Movies</h1>
			<Container>
				{category
					? filteredProducts.map((item) => <Product item={item} key={item._id} />)
					: products.map((item) => <Product item={item} key={item._id} />)}
			</Container>
		</div>
	);
};

export default Products;
