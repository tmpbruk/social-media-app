import { useMemo } from "react";
import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import useUser from "./useUser";
import toast from "react-hot-toast";
import axios from "axios";

const useFollow = (userId: string) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(userId);
  const loginModal = useLoginModal();

  const isFollowing = useMemo(() => {
    const list = currentUser?.followingIds || [];
    return list.includes(userId);
  }, [userId, currentUser?.followingIds]);

  const toggleFollow = async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;
      let message;
      if (isFollowing) {
        request = () => axios.delete("/api/follow", { data: { userId } });
        message = "You have unfollowed this user";
      } else {
        request = () => axios.post("/api/follow", { userId });
        message = "You are following this user";
      }

      await request();

      mutateCurrentUser();
      mutateFetchedUser();

      toast.success(message);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return { isFollowing, toggleFollow };
};

export default useFollow;
