import Express from 'express';
import cors from 'cors';
// const { urlencoded } = require('express');
import authRouter from './routes/auth.route.js';
import recepieRouter from './routes/recepie.route.js';
import favoritesRouter from './routes/favorites.route.js';
import commentRouter from './routes/comment.route.js';


const app = Express()

app.use(Express.json())
app.use(Express.urlencoded({ extended: true }))

app.use(
    cors({
        origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
        // credentials: true,
    })
)

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.use('/auth', authRouter)
app.use('/recepies', recepieRouter)
app.use('/favorites', favoritesRouter)
app.use('/comment', commentRouter)


export default app;