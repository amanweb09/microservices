const express = require("express")
const app = express()

app.get("/", (req, res) => {
    return res.status(200).send("I am a containerised nodejs application")
})

app.listen(8080, () => console.log("listening..."))