import { jest } from "@jest/globals";

export const mockCollectionRef = {
	collection: jest.fn(() => mockCollectionRef),
	doc: jest.fn(() => mockDocRef),
};

export const mockDocRef = {
	set: jest.fn(),
	get: jest.fn(),
};

export const mockSetDoc = mockDocRef.set;
export const mockGetDoc = mockDocRef.get;
