const express = require("express")
const { randomBytes } = require("crypto")
const axios= require("axios")

const app = express()
app.use(require("cors")({
    origin: ["http://localhost:5173"],
    credentials: true
}))
app.use(express.json())

const posts = {}

app.post("/api/posts", async (req, res) => {
    const postId = randomBytes(4).toString("hex")
    const post = {id: postId,title: req.body.title}
    posts[postId] = post

    try {
        await axios.post("http://localhost:4005/api/events", {
            type: "PostCreated",
            data: post
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send("Server error")
    }

    return res.status(201).send(post)
})

app.get("/api/posts", (req, res) => {
    return res.status(200).send(Object.values(posts))
})

app.post("/api/events", (req, res) => {
    console.log("received event: ", req.body.type);

    return res.status(200).send({})
})

app.listen(4000, () => console.log("post service running on port 4000..."))