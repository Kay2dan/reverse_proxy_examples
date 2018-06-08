const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.set("port", 1111);
app.use("/", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.all("/d/*", (req, res) => {
  const { host, ...headers } = { ...req.headers };
  request(
    {
      // <<<<<<< HEAD
      //       url,

      //         method: 'POST',
      //         json: body,
      //         headers: {
      //           'cv-auth':
      //             'AuthToken ApiKey="testsatoshiltd-001", TokenDigest="oK6IbNompBhpb4X7YQitP9PvVVk=", Nonce="f9424934702242a732539e8f2447e627", Created="2018-03-20T14:39:32+00:00", Username="salman@satoshi.ltd", Password="BwYJB2RRQQYABg=="',
      //           'Content-Type': 'application/json'
      //         }
      // =======
      uri: `https://api.sandbox.crowdvalley.com/v1shi/${req.path.substring(2)}`,
      method: req.method,
      json: req.body,
      headers: {
        ...headers,
        "cv-auth":
          'AuthToken ApiKey="fjfhufhwfawf", TokenDigest="EUe9nWHqyVYMJhQ5t5A=", Nonce="73b872c1e59e5decdfe", Created="2018-03-28T13:52:35+01:00", Username="abc@abc.com", Password="RFVDV0cHAQg="'
        // >>>>>>> cb615971148ec3bda2b703bcdd69992cea5c57bb
      }
    },
    (err, response, body) => {
      // res.json(response.statusCode, body);
      console.log("statuscode", response.statusCode);
    }
  );
});

app.listen(app.get("port"), () =>
  console.log("Server running on http://localhost:1111")
);
