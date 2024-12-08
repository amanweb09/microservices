const express = require("express")
const app = express()
const axios = require("axios")

app.use(express.json())

app.post("/api/events", async (req, res) => {
    const { type, data } = req.body

    switch (type) {
        case "CommentCreated":
            const status = data.content.includes("orange") ? "rejected" : "approved"

            try {
                await axios.post("http://localhost:4005/api/events", {
                    type: "CommentModerated",
                    data: {
                        id: data.id,
                        postId: data.postId,
                        status,
                        content: data.content
                    }
                })
            } catch (error) {
                console.log(error);
                return res.status(500).send("Server error on moderation service")
            }
        break;
    }

    return res.status(200).send({})
})

app.listen(4003, () => console.log("moderation service running on port 4003..."))