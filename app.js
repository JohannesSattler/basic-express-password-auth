const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  const reject = () => {
    res.setHeader('www-authenticate', 'Basic')
    res.sendStatus(401)
  }
  
  const authorization = req.headers.authorization
  
  if(!authorization) {
    return reject()
  }
  
  const [username, password] = Buffer.from(authorization.replace('Basic ', ''), 'base64').toString().split(':')

  if(!(username === 'admin' && password === 'ykExH&k9u')) {
    return reject()
  }

  res.sendFile(path.join(__dirname, "public", "index.html"));
})

app
.use(express.static(path.join(__dirname, '/public')))
.listen(PORT, () => console.log(`Listening on ${PORT}`));


