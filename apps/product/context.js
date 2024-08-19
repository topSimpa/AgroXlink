import React, { createContext, useReducer, useContext, useEffect } from "react";
import ProductService from "../services/ProductService";
import { Product } from "../models/product";
import { User } from "../models/user";

// Action Types
const SET_PRODUCT = "SET_PRODUCT";
const SET_OWNER = "SET_OWNER";
const SET_LOADING = "SET_LOADING";
const SET_ERROR = "SET_ERROR";

// Reducer Function
const productReducer = (state, action) => {
	switch (action.type) {
		case SET_PRODUCT:
			return {
				...state,
				productData: action.payload,
				loading: false,
				error: null,
			};
		case SET_OWNER:
			return {
				...state,
				productOwner: action.payload,
				loading: false,
				error: null,
			};
		case SET_LOADING:
			return { ...state, loading: action.payload };
		case SET_ERROR:
			return { ...state, error: action.payload, loading: false };
		default:
			return state;
	}
};

// Create Context
const ProductContext = createContext();

// Custom Hook to use Product Context
export const useProduct = () => useContext(ProductContext);

// Initial State
const initialState = {
	productData: null,
	productOwner: null,
	loading: true,
	error: null,
};

// Create Services Instances
const productService = new ProductService();

// ProductProvider Component
export const ProductProvider = ({ children }) => {
	const [state, dispatch] = useReducer(productReducer, initialState);

	// Function to Fetch Product with Owner
	const fetchProductWithOwner = async (productId) => {
		dispatch({ type: SET_LOADING, payload: true });
		try {
			const { product, owner } = await productService.getProductWithOwner(
				productId
			);
			dispatch({ type: SET_PRODUCT, payload: product });
			dispatch({ type: SET_OWNER, payload: owner });
		} catch (error) {
			dispatch({ type: SET_ERROR, payload: error.message });
		}
	};

	// Function to Fetch Products by User ID
	const fetchProductsByUserId = async (userId) => {
		dispatch({ type: SET_LOADING, payload: true });
		try {
			const products = await productService.getByUserId(userId);
			dispatch({ type: SET_PRODUCT, payload: products });
		} catch (error) {
			dispatch({ type: SET_ERROR, payload: error.message });
		}
	};

	// Function to Fetch Products by Multiple Crop Types
	const fetchProductsByMultipleCropTypes = async (cropTypes) => {
		dispatch({ type: SET_LOADING, payload: true });
		try {
			const products = await productService.getByMultipleCropTypes(cropTypes);
			dispatch({ type: SET_PRODUCT, payload: products });
		} catch (error) {
			dispatch({ type: SET_ERROR, payload: error.message });
		}
	};

	// Function to Fetch All Products
	const fetchAllProducts = async () => {
		dispatch({ type: SET_LOADING, payload: true });
		try {
			const products = await productService.getAllProducts();
			dispatch({ type: SET_PRODUCT, payload: products });
		} catch (error) {
			dispatch({ type: SET_ERROR, payload: error.message });
		}
	};

	// Function to Fetch Products by Crop Type
	const fetchProductsByCropType = async (cropType) => {
		dispatch({ type: SET_LOADING, payload: true });
		try {
			const products = await productService.getByCropType(cropType);
			dispatch({ type: SET_PRODUCT, payload: products });
		} catch (error) {
			dispatch({ type: SET_ERROR, payload: error.message });
		}
	};

	return (
		<ProductContext.Provider
			value={{
				state,
				dispatch,
				fetchProductWithOwner,
				fetchProductsByUserId,
				fetchProductsByMultipleCropTypes,
				fetchAllProducts,
				fetchProductsByCropType,
			}}
		>
			{children}
		</ProductContext.Provider>
	);
};
