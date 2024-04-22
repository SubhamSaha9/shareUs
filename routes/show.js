const router = require("express").Router();
const cloudinary = require('cloudinary').v2;
const File = require("../models/file");

router.get("/:uuid", async (req, res) => {
    try {
        const file = await File.findOne({ uuid: req.params.uuid });
        if (!file) {
            return res.render("download", { error: "Link has been expired." });
        }
        const fileName = file.filename;
        const modifiedString = fileName.replace("uploads/", "");
        const url = cloudinary.image(file.filename, { flags: `attachment:${modifiedString}` });
        const regex = /src='([^']+)'/;
        const match = url.match(regex);
        console.log(match[1])
        const finalLink = match[1].replace("http:", "https:");
        console.log(finalLink);
        return res.render('download', { uuid: file.uuid, fileName: file.filename, fileSize: file.size, downloadLink: finalLink });
    } catch (err) {
        return res.render("download", { error: "Something went wrong!" });
    }
})
// `${process.env.APP_BASE_URL}/files/download/${file.uuid}`
module.exports = router;