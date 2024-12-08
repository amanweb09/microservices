const express = require("express")
const { randomBytes } = require("crypto")
const axios = require("axios")

const app = express()
app.use(require("cors")({
    origin: ["http://localhost:5173"],
    credentials: true
}))
app.use(express.json())

const comments = {}

app.post("/api/comments/:postId", async (req, res) => {

    const commentId = randomBytes(4).toString("hex")
    const comment = {
        id: commentId,
        content: req.body.content,
        status: "pending"
    }

    const postId = req.params.postId

    comments[postId] ? comments[postId].push(comment) : comments[postId] = [comment]

    try {
        await axios.post("http://localhost:4005/api/events", {
            type: "CommentCreated",
            data: {
                ...comment,
                postId
            }
        })
    } catch (error) {
        console.log(error.response.data);
        return res.status(500).send("Server error on comments service")
    }


    return res.status(201).send(comment);
})

// *** NO LONGER NEEDED ***
// app.get("/api/comments/:postId", (req, res) => {
//     return res.status(200).send(comments[req.params.postId])
// })

// *** NO LONGER NEEDED ***
// app.get("/api/comments", (req, res) => {
//     return res.status(200).send(comments)
// })

app.post("/api/events", async (req, res) => {

    const { type, data } = req.body

    if (type === "CommentModerated") {
        const { id, status, postId, content } = data

        const comment = comments[postId].find(c => c.id === id)

        if (!comment) return res.send({})

        comment.status = status

        try {
            await axios.post("http://localhost:4005/api/events", {
                type: "CommentUpdated",
                data: {
                    id,
                    postId,
                    status,
                    content
                }
            })
        } catch (error) {
            console.log(error.data.message);
            return res.status(500).send("Server error on moderation service")
        }
    }

    return res.status(200).send({})
})

app.listen(4001, () => console.log("comments service running on port 4001..."))