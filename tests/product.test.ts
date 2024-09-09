import {
	initializeTestEnvironment,
	RulesTestEnvironment,
	RulesTestContext,
} from "@firebase/rules-unit-testing";
import {
	getFirestore,
	collection,
	doc,
	getDoc,
	setDoc,
	deleteDoc,
} from "firebase/firestore";
import { readFileSync } from "fs";
import { join } from "path";
import ProductService from "../src/services/ProductService";
import { Product } from "../src/models/product";
import { devConfig } from "../src/utils/firebaseConfig";

let testEnv: RulesTestEnvironment;
let testFirestore: any;

beforeAll(async () => {
	const rules = readFileSync(join(__dirname, "../firestore.rules"), "utf8");

	testEnv = await initializeTestEnvironment({
		projectId: devConfig.projectId,
		firestore: {
			rules,
			host: "localhost",
			port: 8080,
		},
	});
});

afterAll(async () => {
	await testEnv.cleanup();
});

describe("ProductService", () => {
	let testContext: RulesTestContext;
	let productService: ProductService;

	beforeEach(async () => {
		testContext = testEnv.authenticatedContext("test-user");
		testFirestore = testContext.firestore();
		productService = new ProductService();
	});

	afterEach(async () => {
		await testEnv.clearFirestore();
	});

	test("should add a product", async () => {
		const productData: Product = {
			id: "product1",
			name: "Product One",
			type: "Type1",
			price: 100,
		};

		const productId = await productService.add(productData);
		const productDoc = await getDoc(doc(testFirestore, "products", productId));

		expect(productDoc.exists()).toBe(true);
		expect(productDoc.data()).toMatchObject(productData);
	});

	test("should update a product", async () => {
		const productData: Product = {
			id: "product1",
			name: "Product One",
			type: "Type1",
			price: 100,
		};

		await setDoc(doc(testFirestore, "products", "product1"), productData);

		const updatedData = { price: 150 };
		await productService.update("product1", updatedData);

		const productDoc = await getDoc(doc(testFirestore, "products", "product1"));
		expect(productDoc.data()).toMatchObject(updatedData);
	});

	test("should delete a product", async () => {
		const productData: Product = {
			id: "product1",
			name: "Product One",
			type: "Type1",
			price: 100,
		};

		await setDoc(doc(testFirestore, "products", "product1"), productData);
		await productService.delete("product1");

		const productDoc = await getDoc(doc(testFirestore, "products", "product1"));
		expect(productDoc.exists()).toBe(false);
	});
});
