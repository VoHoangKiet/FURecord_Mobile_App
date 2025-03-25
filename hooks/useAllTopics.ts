import { useQuery } from "@tanstack/react-query";
import { getAllTopics } from "@/apis/topic.api";

export const useAllTopics = () => {
    return useQuery({
        queryKey: ["topics"],
        queryFn: getAllTopics,
      });
}

export const useCourseById = (id: number) => {
  const { data: topics, isLoading, isFetching, error } = useAllTopics();
  const topic = topics?.find((topic) => topic.id === id);
  return {
    data: topic,
    isLoading,
    isFetching,
    error,
  };
};