const express = require("express")
const app = express()

const axios = require("axios")

app.use(require("cors")({
    origin: ["http://localhost:5173"],
    credentials: true
}))
app.use(express.json())

const posts = {}

const handleEvent = (type, data) => {

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

}

app.post("/api/events", (req, res) => {

    const { type, data } = req.body

    handleEvent(type, data)

    return res.status(200).send({ status: "OK" })
})

app.get("/api/posts", (req, res) => {
    return res.status(200).send({ posts })
})

app.listen(4002, async () => {
    console.log("query service running on port 4002...")

    const { data } = await axios.get("http://localhost:4005/api/events")
    console.log(data);

    data.forEach(event => {
        console.log("processing data", event.type);

        handleEvent(event.type, event.data)
    })
})