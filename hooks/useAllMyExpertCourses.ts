import { useQuery } from "@tanstack/react-query";
import { getAllMyExpertCourses } from "@/apis/courses.api";

export const useAllMyExpertCourses = () => {
    return useQuery({
        queryKey: ["myCourses"],
        queryFn: getAllMyExpertCourses,
      });
}

export const useMyCourseExpertById = (id: number) => {
  const { data: courses, isLoading, isFetching, error } = useAllMyExpertCourses();
  const course = courses?.find((course) => course.id === id);
  return {
    data: course,
    isLoading,
    isFetching,
    error,
  };
};