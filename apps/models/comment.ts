export interface Comment {
	id: string; // Unique identifier for the comment
	postId: string; // ID of the post this comment belongs to
	userId: string; // ID of the user who made the comment
	text: string; // Content of the comment
	dateCreated: Date; // Timestamp when the comment was created
	dateUpdated?: Date; // Timestamp when the comment was last updated (optional)
}
