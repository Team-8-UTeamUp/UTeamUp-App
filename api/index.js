import express from "express"
import apiRoute from "./routes/api.js"

const app = express()

app.use(express.json())
app.use("/api/", apiRoute)

app.listen(8800, () => {
    console.log("Connected!")
})