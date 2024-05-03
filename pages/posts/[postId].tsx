import usePost from "@/hooks/usePost";
import { useRouter } from "next/router";
import React from "react";
import UserView from "../users/[userId]";
import { UserHero } from "@/components/users/UserHero";
import { PostItem } from "@/components/posts/PostItem";
import { Header } from "@/components/Header";
import { ClipLoader } from "react-spinners";
import { Form } from "@/components/Form";
const PostView = () => {
  const router = useRouter();
  const { postId } = router.query;
  const { data: fetchedPost, isLoading } = usePost(postId as string);

  if (isLoading || !fetchedPost) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader size={80} color="lightblue" />
      </div>
    );
  }
  return (
    <div>
      <Header showBackArrow label="Tweet" />
      <PostItem data={fetchedPost} />
      <Form
        postId={postId as string}
        isComment
        placeholder="Tweet your reply"
      />
    </div>
  );
};

export default PostView;
