import axios from "axios"

const postApi = axios.create({
    baseURL: "http://localhost:4000",
    withCredentials: true
})

const commentApi = axios.create({
    baseURL: "http://localhost:4001",
    withCredentials: true
})

const queryApi = axios.create({
    baseURL: "http://localhost:4002",
    withCredentials: true
})

export const getPosts = async () => await queryApi.get("/api/posts")

export const createPost = async (title) => await postApi.post("/api/posts", { title })
export const createComment = async (postId, content) => await commentApi.post(`/api/comments/${postId}`, { content })