// Dont forget to add logger in the end

import express from 'express'
import { apiResponse } from './utils/ApiResponse'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
// no need to connect our db here, its already connected, so now just use it in any file you want
import UserRouter from "./routes/user.router"
import SuperAdminRouter from "./routes/super-admin.routes"

const PORT= process.env.PORT || 3000
const app= express()

add the field of 'updatedAt' also in each table, and see how it can be managed so that every time an update is done, 'updatedAt' field gets updated automatically (without needing to update it manually)

dont forget to add the super-admin record directly in our db, with status= 'approved'

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/v1", UserRouter)
app.use("/api/v1/super-admin", SuperAdminRouter)


app.get("/", (req, res) => {
    return res.status(200)
              .json(new apiResponse(200, {health: "ok"}, "Server is healthy!"))
})


app.listen(PORT, () => {
    console.log(`Server is established at port -> ${PORT}`);
});