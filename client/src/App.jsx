import React, { useEffect, useState } from "react";
import Post from "./components/post";
import { createComment, createPost, getComments, getPosts } from "./api"

const App = () => {

  const [title, setTitle] = useState("")

  const [posts, setPosts] = useState([]);

  const [comments, setComments] = useState({});

  const addComment = async (postId, content) => {
    try {
      const { data } = await createComment(postId, content)
      console.log(data);
      alert("comment added successfully")
    } catch (error) {
      alert("an error occured")
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const { data:postData } = await getPosts()
        const { data:commentData } = await getComments()
        setPosts(postData.reverse())
        setComments(commentData)
      } catch (error) {
        console.log(error);
        alert("could not fetch posts or comments")
      }
    })()
  }, [])

  const handlePostSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await createPost(title)
      console.log(res.data);
      alert("Wohoo.. post created successfully!");
    } catch (error) {
      console.log(error);
      alert("an error occured :(")
    }
  }

  return (
    <div className="app">
      <h1>All Posts</h1>

      {/* create post */}
      <form onSubmit={handlePostSubmit}>
        <textarea
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a post"
        />
        <button type="submit">Add Post</button>
      </form>

      {/* all posts */}
      <div className="posts">
        {posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            comments={comments[post.id] || []}
            addComment={addComment}
          />
        ))}
      </div>

    </div>
  );
};

export default App;
