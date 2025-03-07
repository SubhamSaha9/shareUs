const connectDB = require('./config/db');
const File = require('./models/file');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
connectDB();

// Get all records older than 24 hours 
async function fetchData() {
    const files = await File.find({ createdAt: { $lt: new Date(Date.now() - 24 * 60 * 60 * 1000) } });
    if (files.length) {
        for (const file of files) {
            try {
                cloudinary.uploader
                    .destroy(file.filename)
                    .then(result => console.log(result));
                console.log(`successfully deleted ${file.filename}`);
                await File.deleteOne({ filename: file.filename });
            } catch (err) {
                console.log(`error while deleting file ${err} `);
            }
        }
    }
    console.log('Job done!');
}

// fetchData().then(process.exit);
module.exports = fetchData;