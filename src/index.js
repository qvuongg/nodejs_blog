const express = require('express')
const morgan = require('morgan')
const app = express()
const { engine } = require('express-handlebars')
const port = 3000
const path = require('path')

app.use(express.static(path.join(__dirname, 'public')))
//HTTP logger
app.use(morgan('combined'))

//Template engine
app.engine('hbs', engine({
  extname: '.hbs'
}))
app.set('view engine', 'hbs')

app.set('views', path.join(__dirname,'resources/views'))


app.get('/', (req, res) => {
  res.render('home')
})

app.get('/news', (req, res) => {
  res.render('news')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})