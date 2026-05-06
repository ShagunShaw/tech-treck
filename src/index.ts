import express from 'express'
import { apiResponse } from './utils/ApiResponse'
import 'dotenv/config'

const PORT= process.env.PORT || 3000
const app= express()

// abhi yha pe middlewares lagana h
// and apiError design krna h

app.get("/", (req, res) => {
    return res.status(200)
              .json(new apiResponse(200, {health: "ok"}, "Server is healthy!"))
})


app.listen(PORT, () => {
    console.log(`Server is established at port -> ${PORT}`);
});