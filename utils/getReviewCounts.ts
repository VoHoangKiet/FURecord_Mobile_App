import { Document } from "@/apis/document.api";

export const getReviewCounts = (document: Document) => {
    const reviewCounts = {
        helpful: 0,
        unhelpful: 0
    };
    document.reviews.forEach(review => {
        if (review.state === "helpful") {
            reviewCounts.helpful++;
        } else if (review.state === "unhelpful") {
            reviewCounts.unhelpful++;
        }
    });

    return reviewCounts;
};