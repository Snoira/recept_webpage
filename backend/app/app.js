const Express = require('express');
const cors = require('cors');
// const { urlencoded } = require('express');
const authRouter = require('./routes/auth.route.js');
const recepieRouter = require('./routes/recepie.route.js');
const favoritesRouter = require('./routes/favorites.route.js');
const commentRouter = require('./routes/comment.route.js');


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


module.exports = app;