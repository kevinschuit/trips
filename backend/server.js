const mongoose = require("mongoose");
const express = require("express");
const Post = require("./models/post");
const bodyParser = require("body-parser");

const API_PORT = 3001;
const app = express();
const router = express.Router();
let db = mongoose.connection;

const dbRoute = "mongodb://kevin:3Jdc9cGipFNt@ds253104.mlab.com:53104/trips";

mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

db.once("open", () => console.log("connected to the database"));
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.get("/trips", (req, res) => {
  Post.find((error, data) => {
    if (error) {
      return res.json({ succes: false, error: error });
    } else {
      return res.json({ success: true, data: data });
    }
  });
});

router.get("/trip", (req, res) => {
  Post.findById(req.query._id).exec((error, data) => {
    if (error) {
      return res.json({ succes: false, error: error, data });
    } else {
      return res.json({ success: true, data: data });
    }
  });
});


router.post("/trip", (req, res) => {
  Post.create(req.body, function (error, data) {
    if (error) {
      return res.json({ succes: false, error: error });
    } else {
      return res.json({ success: true, data: data });
    }
  });
});

router.put("/trip", (req, res) => {
  Post.findByIdAndUpdate({ _id: req.query.id }, req.body, { new: true }, function (error, data) {
    if (error) {
      return res.json({ succes: false, error: error });
    } else {
      return res.json({ success: true, data: data });
    }
  })
});

router.delete("/trip", (req, res) => {
  Post.findByIdAndDelete({ _id: req.query.id }, function (error, data) {
    if (error) {
      return res.json({ succes: false, error: error });
    } else {
      return res.json({ success: true, data: data });
    }
  });
})

router.get("/trip/perDay", (req, res) => {
  Post.aggregate([
    {
      $sort: {
        startKms: 1
      }
    },
    {
      $group: {
        _id: { date: "$date" },
        trips: {
          $push: {
            _id: "$_id",
            startZipcode: "$startZipcode",
            startNumber: "$startNumber",
            startKms: "$startKms",
            endZipcode: "$endZipcode",
            endNumber: "$endNumber",
            endKms: "$endKms",
            type: "$type",
            privateDetourKms: "$privateDetourKms",
            deviatingRoute: "$deviatingRoute"
          }
        }
      }
    },
    {
      $sort: {
        _id: 1
      }
    }
  ]).exec((error, data) => {
    if (error) {
      return res.json({ succes: false, error: error, data });
    } else {
      return res.json({ success: true, data: data });
    }
  });
});

router.get("/trips/fromTo", (req, res) => {
  let { greaterThan, lessThan } = req.query;
  Post.aggregate([
    {
      $match: {
        date: { $gte: new Date(greaterThan), $lte: new Date(lessThan) }
      }
    },
    {
      $sort: {
        startKms: 1
      }
    },
    {
      $group: {
        _id: { date: "$date" },
        trips: {
          $push: {
            _id: "$_id",
            startZipcode: "$startZipcode",
            startNumber: "$startNumber",
            startKms: "$startKms",
            endZipcode: "$endZipcode",
            endNumber: "$endNumber",
            endKms: "$endKms",
            type: "$type",
            privateDetourKms: "$privateDetourKms",
            deviatingRoute: "$deviatingRoute"
          }
        }
      }
    },
    {
      $sort: {
        _id: 1
      }
    }
  ]).exec((error, data) => {
    if (error) {
      return res.json({ succes: false, error: error, data });
    } else {
      return res.json({ success: true, data: data });
    }
  });
});

app.use("/api", router);
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
