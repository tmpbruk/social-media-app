import useSWR from "swr";
import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import usePost from "./usePost";
import usePosts from "./usePosts";
import toast from "react-hot-toast";
import axios from "axios";
import { useMemo } from "react";

const useLike = ({ postId, userId }: { postId: string; userId?: string }) => {
  // get current user
  const { data: currentUser } = useCurrentUser();
  // get individual post that are being liked or disliked
  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
  // get all posts to update their like status
  const { mutate: mutateFetchedPosts } = usePosts(userId);

  const loginModal = useLoginModal();

  const hasLiked = useMemo(() => {
    const list = fetchedPost?.likedIds || [];
    return list.includes(currentUser?.id);
  }, [currentUser?.id, fetchedPost?.likedIds]);

  const toggleLike = async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;
      let toastMessage;

      if (hasLiked) {
        request = () => axios.delete("api/like", { data: { postId } });
        toastMessage = "You unliked this post";
      } else {
        request = () => axios.post("/api/like", { postId });
        toastMessage = "You liked this post";
      }

      await request();

      mutateFetchedPosts();
      mutateFetchedPost();

      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return { hasLiked, toggleLike };
};

export default useLike;
