import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";
import { authOptions } from "./auth/[...nextauth]";
import prisma from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" && req.method !== "DELETE") {
    res.status(405).end();
  }

  try {
    //get postId from request body
    const { postId } = req.body;

    // get current user
    const { currentUser } = await serverAuth(req, res, authOptions);

    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid ID");
    }

    // find specific post
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new Error("Invalid ID");
    }

    // spread the post likedIds so we can manipulate depending on whether
    // the current user has liked or disliked the post
    let updatedLikedIds = [...(post.likedIds || [])];

    // id current user like the post, we push to the array of likedIds
    if (req.method === "POST") {
      updatedLikedIds.push(currentUser.id);
    }

    // id current user unlike the post, we filter and remove it id from the array of likedIds
    if (req.method === "DELETE") {
      updatedLikedIds = updatedLikedIds.filter(
        (likedId) => likedId !== currentUser.id
      );
    }

    // update the number of likes in the database
    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likedIds: updatedLikedIds,
      },
    });

    return res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
}
