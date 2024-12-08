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
        console.log("post created");
    }

    else if (type === "CommentCreated") {
        const { id, content, postId } = data

        posts[postId].comments.push({ id, content })
        console.log("comment created");
    }

    console.log(posts);
    return res.status(200).send({ status: "OK" })
})

app.get("/api/posts", (req, res) => {
    return res.status(200).send({ posts })
})

app.listen(4002, () => console.log("query service running on port 4002..."))