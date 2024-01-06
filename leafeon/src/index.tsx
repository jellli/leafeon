import React from 'react';
import { Client } from '@notionhq/client';

interface Comment {
  commentID: number;
  parentCommentID?: number;
  UserID: number;
  ArticleID: number;
  commentText: string;
  createTime: string;
  replies?: Comment[];
}

function buildCommentTree(comments: Comment[]): Comment[] {
  const commentMap: { [commentID: number]: Comment } = {};

  // Create a map with commentID as key for efficient lookup
  comments.forEach((comment) => {
    commentMap[comment.commentID] = comment;
  });

  const commentTree: Comment[] = [];

  // Populate the tree by linking comments to their parent comments
  comments.forEach((comment) => {
    if (comment.parentCommentID !== undefined) {
      const parentComment = commentMap[comment.parentCommentID];
      if (parentComment) {
        if (!parentComment.replies) {
          parentComment.replies = [];
        }
        parentComment.replies.push(comment);
      }
    } else {
      // If there is no parent, it's a root comment
      commentTree.push(comment);
    }
  });

  return commentTree;
}

export default function Leafeon() {
  return <div></div>;
}
