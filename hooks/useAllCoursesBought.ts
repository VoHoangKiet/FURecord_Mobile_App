import { useQuery } from "@tanstack/react-query";
import { getAllCoursesBought } from "@/apis/courses.api";

export const useAllCoursesBought = () => {
    return useQuery({
        queryKey: ["coursesBought"],
        queryFn: getAllCoursesBought,
      });
}

export const useCourseBoughtById = (id: number) => {
  const { data: courses, isLoading, isFetching, error } = useAllCoursesBought();
  const course = courses?.find((course) => course.id === id);
  return {
    data: course,
    isLoading,
    isFetching,
    error,
  };
};
