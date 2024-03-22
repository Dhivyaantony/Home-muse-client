import React, { useState } from 'react';
import AxiosInstance from '../../Constants/constants';

const CommentBox = ({ recipeId }) => {
    const [comment, setComment] = useState('');

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleCommentSubmit = async () => {
        try {
            // Ensure the comment is not empty
            if (!comment.trim()) {
                alert('Please enter a comment');
                return;
            }

            // Send a POST request to your backend API to add the comment for the recipe
            const response = await AxiosInstance.post(`/recipes/${recipeId}/comments`, { comment });
            console.log('Comment added successfully:', response.data);

            // Clear the comment input after submission
            setComment('');
        } catch (error) {
            console.error('Error adding comment:', error);
            // Handle any errors that occur during the comment submission
        }
    };

    return (
        <div className="comment-box">
            <textarea
                value={comment}
                onChange={handleCommentChange}
                placeholder="Write a comment..."
            />
            <button onClick={handleCommentSubmit}>Post</button>
        </div>
    );
};

export default CommentBox;
