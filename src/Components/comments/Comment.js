// Comment.js
import React from 'react';

const Comment = ({ comment, onUpdate, onDelete }) => {
  return (
    <div>
      <p>{comment.text}</p>
      <button onClick={() => onUpdate(comment)}>Edit</button>
      <button onClick={() => onDelete(comment._id)}>Delete</button>
    </div>
  );
};

export default Comment;
