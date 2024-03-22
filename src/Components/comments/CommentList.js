// CommentsList.js
import React from 'react';
import Comment from './Comment';

const CommentsList = ({ comments, onUpdate, onDelete }) => {
  return (
    <div>
      {comments.map(comment => (
        <Comment key={comment._id} comment={comment} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default CommentsList;
