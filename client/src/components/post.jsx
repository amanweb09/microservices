import { useState } from "react"

const Post = ({ post, comments, addComment }) => {
    const [newComment, setNewComment] = useState("");

    const handleCommentChange = (e) => setNewComment(e.target.value);

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (newComment.trim() !== "") {
            addComment(post.id, newComment);
            setNewComment("")
        }
    };

    return (
        <div className="post">
            <h2>{post.title}</h2>
            <p>{post.body}</p>

            <div className="comments-section">
                <h3>Comments:</h3>
                {comments.length === 0 ? (
                    <p>No comments yet.</p>
                ) : (
                    <ul>
                        {comments.map((comment, index) => (
                            <li key={index}>{comment.content}</li>
                        ))}
                    </ul>
                )}
            </div>

            <form onSubmit={handleCommentSubmit}>
                <textarea
                    value={newComment}
                    onChange={handleCommentChange}
                    placeholder="Add a comment"
                />
                <button type="submit">Add Comment</button>
            </form>
        </div>
    );
};

export default Post