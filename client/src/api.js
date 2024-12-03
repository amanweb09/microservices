import axios from "axios"

const postApi = axios.create({
    baseURL: "http://localhost:4000",
    withCredentials: true
})

const commentApi = axios.create({
    baseURL: "http://localhost:4001",
    withCredentials: true
})

export const getPosts = async () => await postApi.get("/api/posts")
export const createPost = async (title) => await postApi.post("/api/posts", { title })

export const getComments = async (postId) => await commentApi.get(`/api/comments`)
export const createComment = async (postId, content) => await commentApi.post(`/api/comments/${postId}`, { content })