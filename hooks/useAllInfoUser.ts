import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllUser } from "@/apis/auth.api";

export const useAllInfoUser = () => {
  const queryClient = useQueryClient();

  queryClient.prefetchQuery({
    queryKey: ["users"],
    queryFn: getAllUser,
  });
  return useQuery({
    queryKey: ["users"],
    queryFn: getAllUser,
    staleTime: 5 * 60 * 1000,
  });
};
