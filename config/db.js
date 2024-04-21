require("dotenv").config();
const mongoose = require('mongoose');

const connectDB = () => {
    const dbUrl = process.env.ATLASDB_URL;

    main().then((res) => {
        console.log("connected");
    }).catch((err) => console.log(err));

    async function main() {
        await mongoose.connect(dbUrl);
    }
}
module.exports = connectDB;