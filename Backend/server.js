import "dotenv/config"
import path from 'path'
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import connectDB from './config/db.js'
import authRouter from './routes/authRoutes.js'
import userRouter from './routes/userRoutes.js'
import apiRouter from './routes/apiRoutes.js'
import { apiResponseMiddleware, notFoundHandler, errorHandler } from './middlewares/apiResponse.js'

await connectDB();
const app = express();
const PORT = process.env.PORT || 8080
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"]

app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: allowedOrigins, credentials: true }))
app.use(apiResponseMiddleware)

app.get("/", (req, res) => {
    return res.apiSuccess(null, 'API Working', 'API_200', null)
})

app.use((req, res, next) => {
    if (req.path === '/index.html/') {
        return res.redirect(301, '/index.html');
    }
    next();
});

app.use(express.static(path.join(process.cwd(), 'public')))

app.use("/api", apiRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.use(notFoundHandler)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is running on PORT : ${PORT}`);
})
