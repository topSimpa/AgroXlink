import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseSetup";

export const uploadImage = async (
	fileOrUrl: File | string,
	directory: string,
	modelId: string
): Promise<string> => {
	try {
		let blob: Blob;

		// Check if the input is a File object (local file) or a string (URL)
		if (fileOrUrl instanceof File) {
			// If it's a File object (local file), directly use it
			blob = fileOrUrl;
		} else if (typeof fileOrUrl === "string") {
			// If it's a string (URL), fetch the image data and convert to blob
			const response = await fetch(fileOrUrl);
			blob = await response.blob();
		} else {
			throw new Error(
				"Unsupported input type. Please provide a File object or a URL string."
			);
		}

		// Create a reference to the storage location
		const storageRef = ref(storage, `${directory}/${modelId}.jpg`);

		// Upload the image as a blob
		await uploadBytes(storageRef, blob);

		// Get and return the download URL
		const downloadUrl = await getDownloadURL(storageRef);
		return downloadUrl;
	} catch (error) {
		console.error("Error uploading image:", error);
		throw error;
	}
};
