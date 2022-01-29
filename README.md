# Password Protected Routes for React app

Some stolen code, just for me for future projects.

Its **NOT** safe

```javascript
// some stolen code ( just for me for future projects )
// its not the safest
app.get('*', (req, res) => {
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
```
