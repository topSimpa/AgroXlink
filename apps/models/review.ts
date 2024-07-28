import { Timestamp } from "firebase/firestore";

export interface Review {
  id?: string;
  userId: string | void;       // User or product being reviewed
  reviewerId: string | void;   // User who is reviewing
  rating: number;
  comment: string;
  dateCreated?: Timestamp;
  dateUpdated?: Timestamp;
}

export interface ProductReview extends Review {
  productId: string;    // Specific to product reviews
}

export interface UserReview extends Review {
  reviewedUserId: string;  // Specific to user reviews
}