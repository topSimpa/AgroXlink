export interface Review {
	id: string; // Unique identifier for the review
	productId: string; // ID of the product being reviewed
	userId: string; // ID of the user who wrote the review
	rating: number; // Rating given by the user (e.g., 1 to 5 stars)
	text: string; // Content of the review
	dateCreated: Date; // Timestamp when the review was created
	dateUpdated?: Date; // Timestamp when the review was last updated (optional)
}
