
const basicAuth = require('express-basic-auth');
const express = require('express');
const path = require('path');
const app = express();
const passport = require('passport-http')

const PORT = process.env.PORT || 5000;

const auth = basicAuth({
  users: {
    admin: '123',
    user: '456',
  },
});



app.get('/', (req, res) => {
  console.log('dassdasda')
  const reject = () => {
    res.setHeader('www-authenticate', 'Basic')
    res.sendStatus(401)
  }
  
  const authorization = req.headers.authorization
  
  if(!authorization) {
    return reject()
  }
  
  const [username, password] = Buffer.from(authorization.replace('Basic ', ''), 'base64').toString().split(':')
  
  if(! (username === 'admin' && password === 'fWPZZ3<p&xjFVY23')) {
    return reject()
  }

  res.sendFile(path.join(__dirname, "public", "index.html"));
})

app
.use(express.static(path.join(__dirname, '/public')))
.listen(PORT, () => console.log(`Listening on ${PORT}`));

/* app.get('/', passport.authenticate('basic', { session: false }), (req, res) => {
  res.sendFile(path.join(`${__dirname}/../build/index.html`))
})
 */

