import { useQuery } from "@tanstack/react-query";
import { getAllCourses } from "@/apis/courses.api";

export const useAllCourses = () => {
    return useQuery({
        queryKey: ["courses"],
        queryFn: getAllCourses,
      });
}

export const useCourseById = (id: number) => {
  const { data: courses, isLoading, isFetching, error } = useAllCourses();
  const course = courses?.find((course) => course.id === id);
  return {
    data: course,
    isLoading,
    isFetching,
    error,
  };
};