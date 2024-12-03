const express = require("express")
const { randomBytes } = require("crypto")

const app = express()
app.use(require("cors")({
    origin: ["http://localhost:5173"],
    credentials: true
}))
app.use(express.json())

const posts = {}

app.post("/api/posts", (req, res) => {
    const postId = randomBytes(4).toString("hex")
    const post = {id: postId,title: req.body.title}
    posts[postId] = post
    return res.status(201).send(post)
})

app.get("/api/posts", (req, res) => {
    return res.status(200).send(Object.values(posts))
})

app.listen(4000, () => console.log("post service running on port 4000..."))