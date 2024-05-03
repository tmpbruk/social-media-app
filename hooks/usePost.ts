import fetcher from "@/libs/fetcher";
import useSWR from "swr";

const usePost = (postId: string) => {
  const url = postId ? `/api/posts/${postId}` : null;
  const { data, isLoading, error, mutate } = useSWR(url, fetcher);

  return { data, isLoading, error, mutate };
};

export default usePost;
