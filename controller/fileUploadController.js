const uploadFileRoute = require("express").Router();
const multer = require("multer");
const bodyParser = require("body-parser");
const upload = multer({ dest: "uploads/" }).single("file");
const userFile = require("../models/userFileModel");
const pathModel = require("../models/pathSchemaModel");
const verifyToken = require("../middleware/authJWT");
const { splitPath } = require("../helper/splitPath");
uploadFileRoute.use(bodyParser.urlencoded({ extended: false }));
uploadFileRoute.use(bodyParser.json());

uploadFileRoute.post("/", verifyToken, (req, res) => {
  upload(req, res, function (err) {
    const diskFileName = req.file.filename
    const extension = req.file.originalname.split('.')[1]
    if (err instanceof multer.MulterError) {
      res.status(500).send({
        message: err.message,
      });
    } else if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      const { path, permission, metadata, isCurrentVersion, fileName, shared } =
        req.body;
      userFile
        .find({
          path: path,
          fileName: fileName,
        })
        .then((version) => {
          const usersFile = new userFile({
            userId: req.user._id.toString(),
            fileName: fileName,
            path: path,
            permission: permission,
            shared: shared,
            version: version.length + 1,
            isCurrentVersion: isCurrentVersion,
            metadata: metadata,
            diskFileName: diskFileName,
            extension: extension
          });
          const pathDocs = splitPath(path, req.user._id.toString());
          pathModel.bulkWrite(
            pathDocs.map((each) => ({
              updateOne: {
                filter: {
                  path: each.path,
                  parentPath: each.parentPath,
                  userId: each.userId,
                },
                update: { $set: each },
                upsert: true,
              },
            }))
          );

          usersFile
            .save()
            .then((data) => {
              res.status(200).send({
                message: "File uploaded successfully",
              });
            })
            .catch((err) => {
              res.status(500).send({
                message: err,
              });
            });
        });
    }
  });
});

module.exports = { uploadFileRoute };
