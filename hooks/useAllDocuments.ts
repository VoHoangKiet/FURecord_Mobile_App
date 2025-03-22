import { getAllDocuments } from "@/apis/document.api";
import { useQuery } from "@tanstack/react-query";
import { getDocumentById } from "@/apis/document.api";

export const useAllDocuments = () => {
    return useQuery({
        queryKey: ["documents"],
        queryFn: getAllDocuments,
      });
}

export const useDocumentById = (id: number) => {
  return useQuery({
    queryKey: ["document", id],
    queryFn: () => getDocumentById(id),
  });
};