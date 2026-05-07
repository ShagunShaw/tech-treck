// Dont forget to add logger in the end

import express from 'express'
import { apiResponse } from './utils/ApiResponse'
import 'dotenv/config'
import cookieParser from 'cookie-parser'

const PORT= process.env.PORT || 3000
const app= express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get("/", (req, res) => {
    return res.status(200)
              .json(new apiResponse(200, {health: "ok"}, "Server is healthy!"))
})


app.listen(PORT, () => {
    console.log(`Server is established at port -> ${PORT}`);
});