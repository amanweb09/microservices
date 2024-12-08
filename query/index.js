const express = require("express")

const app = express()

app.use(require("cors")({
    origin: ["http://localhost:5173"],
    credentials: true
}))
app.use(express.json())

const posts = {}

app.post("/api/events", (req, res) => {

    const { type, data } = req.body

    if (type === "PostCreated") {
        const { id, title } = data

        posts[id] = { id, title, comments: [] }
    }

    else if (type === "CommentCreated") {
        const { id, content, postId, status } = data

        posts[postId].comments.push({ id, content, status })
    }

    else if (type === "CommentUpdated") {
        const { id, content, postId, status } = data

        const comment = posts[postId].comments.find(c => c.id === id)

        comment.status = status;
        comment.content = content;
    }

    return res.status(200).send({ status: "OK" })
})

app.get("/api/posts", (req, res) => {
    // Object.values(posts).map(p => {
    //     if (p.comments && p.comments.length) {
    //         console.log(p.comments);
    //     }
    // })
    return res.status(200).send({ posts })
})

app.listen(4002, () => console.log("query service running on port 4002..."))