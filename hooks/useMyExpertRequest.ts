import { useQuery } from "@tanstack/react-query";
import { myExpertRequest } from "@/apis/expert.api";

export const useMyExpertRequest = () => {
    return useQuery({
        queryKey: ["myRequest"],
        queryFn: myExpertRequest,
      });
}
