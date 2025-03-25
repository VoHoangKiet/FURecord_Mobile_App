import { Course } from "@/apis/courses.api";
import { TopicCourse } from "@/apis/topic.api";

const titles = [
  "New and Noteworthy Courses on {Topic}",
  "Top-Rated Courses on {Topic}",
  "Must-Take {Topic} Courses for 2025",
  "Best Online Courses to Master {Topic}",
  "The Ultimate Guide to Learning {Topic}",
  "Highest-Rated {Topic} Courses You Should Try",
  "Trending {Topic} Courses You Can’t Miss",
  "Beginner to Advanced: Best {Topic} Courses for All Levels",
  "The Best {Topic} Courses Right Now",
  "Certified and Accredited {Topic} Courses to Enroll In",
];

export const getRandomTitle = (topic: TopicCourse) => {
  const randomIndex = Math.floor(Math.random() * titles.length);
  return titles[randomIndex].replace("{Topic}", topic.name);
};

export const getCoursesByTitle = (
  courses: Course[],
  topic: TopicCourse,
  title: string
) => {
  const filteredCourses = courses.filter(
    (course) => course.topicId === String(topic.id)
  );

  switch (title) {
    case "Top-Rated Courses on {Course}":
      return filteredCourses.sort((a, b) => {
        const avgRatingA =
          a.reviews.reduce((acc, review) => acc + review.rate, 0) /
            a.reviews.length || 0;
        const avgRatingB =
          b.reviews.reduce((acc, review) => acc + review.rate, 0) /
            b.reviews.length || 0;
        return avgRatingB - avgRatingA;
      });
    case "Must-Take {Course} Courses for 2025":
      return filteredCourses.filter(
        (course) => new Date(course.createdAt).getFullYear() === 2025
      );
    case "Best Online Courses to Master {Course}":
      return filteredCourses
        .filter((course) => course.state === "active")
        .sort((a, b) => a.price - b.price);
    case "The Ultimate Guide to Learning {Course}":
      return filteredCourses.sort(
        (a, b) => a.lessons.length - b.lessons.length
      );
    case "Highest-Rated {Course} Courses You Should Try":
      return filteredCourses.sort((a, b) => {
        const avgRatingA =
          a.reviews.reduce((acc, review) => acc + review.rate, 0) /
            a.reviews.length || 0;
        const avgRatingB =
          b.reviews.reduce((acc, review) => acc + review.rate, 0) /
            b.reviews.length || 0;
        return avgRatingB - avgRatingA;
      });
    case "Trending {Course} Courses You Can’t Miss":
      return filteredCourses.filter((course) => course.orders.length > 0);
    case "Beginner to Advanced: Best {Course} Courses for All Levels":
      return filteredCourses.sort(
        (a, b) => a.lessons.length - b.lessons.length
      );
    case "The Best {Course} Courses Right Now":
      return filteredCourses.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
    case "Certified and Accredited {Course} Courses to Enroll In":
      return filteredCourses
        .filter((course) => course.topicId !== "")
        .sort((a, b) => a.price - b.price);
    default:
      return filteredCourses;
  }
};
