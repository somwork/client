const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()

app.use(express.static('build'))

app.get('*', (req, res) => {
  res.set('Content-Type', 'text/html')

  res.send(
    fs.readFileSync(path.resolve(__dirname, 'build', 'index.html'))
  )
})

app.listen(3000)
