import { ReviewCourse } from "@/apis/courses.api";

export const getTotalRating = (reviews: ReviewCourse[]): number => {
  let totalRate = 0;
  if (reviews.length > 0) {
    reviews.map((review) => {
      totalRate = totalRate + review.rate;
    });
    return totalRate / reviews.length;
  } else {
    return totalRate;
  }
};
