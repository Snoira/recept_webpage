const app = require('./app/app.js');
const { connect } = require('./app/config/mongoose.js');

const port = process.env.PORT || 3000
//const DATABASE_PATH = process.env.DATABASE_PATH || 'mongodb://127.0.0.1:27017/notes'
// const MONGOOSE_LIVE_URI = process.env.MONGOOSE_LIVE_URI || 'mongodb+srv://webbkvalit23:pEppzmQXNLVVKCDh@hakims-webshop.jjmlmcj.mongodb.net/?retryWrites=true&w=majority&appName=hakims-webshop';

app.listen(port, () => {
    console.log("Server is running on port " + port);
    connect()
})

// async function run() {
//     //await connect(DATABASE_PATH)
//     await connect(MONGOOSE_LIVE_URI)
    
// }
