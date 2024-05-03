import usePosts from "@/hooks/usePosts";
import React from "react";
import { PostItem } from "./PostItem";

interface PostFeedProps {
  userId?: string;
}
export const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
  const { data: posts = [] } = usePosts(userId);
  console.log("AAAAAAA", posts);
  return (
    <>
      {posts.map((post: Record<string, any>) => (
        <PostItem userId={userId} key={post.id} data={post} />
      ))}
    </>
  );
};
