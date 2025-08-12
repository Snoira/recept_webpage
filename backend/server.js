import app from './app/app.js';
import { connect } from './app/config/mongoose.js';

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log("Server is running");
    connect()
})