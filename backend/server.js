const app = require('./app/app.js');
const { connect } = require('./app/config/mongoose.js');

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log("Server is running");
    connect()
})

