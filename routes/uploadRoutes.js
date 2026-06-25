const router = require("express").Router();
const multer = require("multer");

const {
    PutObjectCommand
} = require("@aws-sdk/client-s3");

const s3 = require("../services/s3Service");

const upload = multer({
    storage: multer.memoryStorage()
});

router.post(
    "/",
    upload.single("file"),
    async (req, res) => {

        const fileName =
            Date.now() + "-" + req.file.originalname;

        await s3.send(
            new PutObjectCommand({
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: fileName,
                Body: req.file.buffer,
                ContentType: req.file.mimetype
            })
        );

        const url =
            `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

        res.json({
            message: "Uploaded",
            url
        });
    }
);

module.exports = router;