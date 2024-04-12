import express from "express"
import apiRoute from "./routes/api.js"
import cors from 'cors';

const app = express()

app.use(cors());

app.use(express.json())
app.use("/api/", apiRoute)

app.listen(8800, () => {
    console.log("Connected!")
})