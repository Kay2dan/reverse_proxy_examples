const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.set("port", 1111);
app.use(bodyParser.json()); // for parsing application/json
app.use("/", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.options("/d/*", (req, res) => {
  res.sendStatus(200);
});

app.all("/d/*", (req, res) => {
  const { body, method } = req;
  const config = {
    headers: {
      "cv-auth":
        'AuthToken ApiKey="abcabcabc", TokenDigest="oK6IbfNdosmpBhpb4X7YQitP9PvVVk=", Nonce="f94e8f2447e627", Created="2018-03-20T14:39:32+00:00", Username="abc@abc.com", Password="BwYJB2RRQQYABg=="',
      "Content-Type": "application/json"
    },
    method,
    uri: `https://api.sandbox.crowdvalley.com/v1/hello${req.url.substring(
      2
    )}`,
    json: body
  };
  request(config, (err, response, callbackBody) => {
    console.log(
      !err || (response.statusCode > 199 && response.statusCode < 300)
    );
    if (!err || (response.statusCode > 199 && response.statusCode < 300)) {
      res.status(response.statusCode).json(callbackBody);
    } else {
      console.log("rpServer error...", err);
      res.status(response.statusCode).send("An error occurred");
    }
  });
});

app.listen(app.get("port"), () =>
  console.log(`Server instance on http://localhost:${app.get("port")}`)
);

module.exports = app;
