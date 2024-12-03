const express = require("express")
const { randomBytes } = require("crypto")

const app = express()
app.use(require("cors")({
    origin: ["http://localhost:5173"],
    credentials: true
}))
app.use(express.json())

const comments = {}

app.post("/api/comments/:postId", (req, res) => {
    console.log("incoming request");
    const commentId = randomBytes(4).toString("hex")
    const comment = { id: commentId, content: req.body.content }

    if (comments[req.params.postId]) {
        comments[req.params.postId].push(comment)
        console.log(comments);
    }
    else {
        comments[req.params.postId] = [comment]
    }

    return res.status(201).send(comment)
})

app.get("/api/comments/:postId", (req, res) => {
    return res.status(200).send(comments[req.params.postId])
})

app.get("/api/comments", (req, res) => {
    return res.status(200).send(comments)
})

app.listen(4001, () => console.log("comments service running on port 4001..."))