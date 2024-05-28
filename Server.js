const express = require("express");
const mysql = require('mysql');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

var nodemailer = require('nodemailer');
var transport = nodemailer.createTransport({
  host: "smtp.zeptomail.in",
  port: 587,
  auth: {
    user: "emailapikey",
    pass: "PHtE6r0KFrvujWMnoBQI4fCwFMPyNIgv9LxjKlMVttxGW/BSGk0EqtwolWOzohcrVfBGE/Oayt9ot+jP4LiMc2bvMz1NW2qyqK3sx/VYSPOZsbq6x00Zsl4ddETZXYDmdtJp0C3fvtjaNA=="
  }
});
const server = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "course",
});

app.post('/register', (request, response) => {
  const { name, email, password } = request.body;
  const sql = "INSERT INTO register (username, email, password) VALUES (?, ?, ?)";
  const values = [name, email, password];
  var mailOptions = {
    from: '"React Team" <noreply@qtnext.com>',
    to: email,
    subject: 'Registered Successfully',
    html: 'This mail is sent from React Intern batch. You are registered successfully',
  };

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Successfully sent');
  });

  server.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error:", err);
      response.status(500).json({ message: "Error raised" });
    } else {
      console.log("Registration successful");
      response.json({ message: "Registration successful", success: true });
    }
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log([req.body.email, req.body.password])
  const sql = "SELECT * FROM register WHERE email = (?)";
  server.query(sql, [email], (err, results) => {
    if (err) {
      console.error('Error querying user:', err);
    }
    const user = results[0];
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    if (email !== user.email || password !== user.password) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    return res.json({ success: true, user: { email: user.email, username: user.username } });
  });
});

app.post('/reset', (request, response) => {
  const {email} = request.body;
  console.log(request.body.email)
  const sql = "SELECT * FROM register WHERE email = (?)";
  server.query(sql, [email], (err, results) => {
    if (err) {
      console.error('Error querying user:', err);
    }
    const user = results[0];
    if (!user) {
      return response.status(401).json({ success: false, message: 'No user exists with this mail' });
    }
    else{
      var mailOptions = {
        from: '"React Team" <noreply@qtnext.com>',
        to: email,
        subject: 'Forgot Password',
        html: 'This mail is sent from React Intern batch. You are requested for your forgotten password your password is ',
      };
    
      transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Successfully sent');
      });
    }

    return response.json({ success: true, user: { email: user.email, username: user.username } });
  });

});


const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log("Server is running on port ${PORT}");
});