// const express = require("express");
const bodyParser = require("body-parser");
const https = require('https');
const express = require('express');
const app = express();
// const EmailAddress = require("email_address");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({
  extended: true
}));


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});


app.post("/", function(req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [{

      email_address: email,
      status: "subscribed",
      merge_fields: {

        FNAME: firstName,
        LNAME: lastName

      }

    }]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us6.api.mailchimp.com/3.0/lists/5df0281ecb";

  const options = {
    method: "POST",
    auth: "monika:0e4396f0252ab1ee2e7bf4cf0822f3d6-us6"
  }



  const request = https.request(url, options, function(response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function(data) {
      console.log(JSON.parse(data));
    });

});
    request.write(jsonData);
    request.end();

});





app.post("/failure", function(req, res) {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on port 3000.");
});



//api key
//0e4396f0252ab1ee2e7bf4cf0822f3d6-us6

//list audience
//5df0281ecb
