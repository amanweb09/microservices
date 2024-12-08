const axios = require("axios")
const express = require("express")

const app = express()
app.use(require("cors")({
    origin: ["http://localhost:5173"],
    credentials: true
}))
app.use(express.json())

app.post("/api/events", async (req, res) => {

    const event = req.body

    try {
        await axios.post("http://localhost:4000/api/events", event)
        await axios.post("http://localhost:4001/api/events", event)
        await axios.post("http://localhost:4002/api/events", event)

        return res.status(200).send({ status: "OK" })

    } catch (error) {
        return res.status(500).send("server err on event bus")
    }
})

app.listen(4005, () => console.log("event bus running on port 4005..."))