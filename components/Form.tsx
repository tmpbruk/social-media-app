import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import usePosts from "@/hooks/usePosts";
import useRegisterModal from "@/hooks/useRegisterModal";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "./Button";
import { Avatar } from "./Avatar";
import usePost from "@/hooks/usePost";

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

export const Form: React.FC<FormProps> = ({
  placeholder,
  isComment,
  postId,
}) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts();
  const { mutate: mutatePost } = usePost(postId as string);

  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      const url = isComment ? `/api/comments?postId=${postId}` : "/api/posts";

      await axios.post(url, { body });

      toast.success("Tweet created");
      setBody("");
      mutatePosts();
      mutatePost();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
      {currentUser ? (
        <div className="flex flex-grow gap-4">
          <div>
            <Avatar userId={currentUser?.id} />
          </div>
          <div className="w-full ">
            <textarea
              className="
              disabled:opacity-80
              peer
              resize-none
              mt-3
              w-full
              bg-black
              outline-none
              ring-0
              text-[20px]
              placeholder-neutral-500
              text-white
              "
              placeholder={placeholder}
              value={body}
              disabled={isLoading}
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
            <hr
              className="
                opacity-0
                peer-focus:opacity-100
                h-[1px]
                w-full
                border-neutral-800
                transition
                "
            />
            <div className="mt-4 flex flex-row justify-end">
              <Button
                label="Tweet"
                onClick={handleSubmit}
                disabled={isLoading || !body}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8">
          <h1 className="text-white text-2xl text-center mb-4 font-bold">
            Welcome to SM App
          </h1>
          <div className="flex flex-row items-center justify-center gap-4">
            <Button label="Login" onClick={loginModal.onOpen} />
            <Button label="Register" secondary onClick={registerModal.onOpen} />
          </div>
        </div>
      )}
    </div>
  );
};
