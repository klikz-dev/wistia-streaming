require('dotenv').config()

const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const layouts = require('express-ejs-layouts')
const routes = require('./config/routes')
const { categories, heroVideoIds, featuredCategories } = require('./config/const')

const app = express()
const port = process.env.PORT || 8081

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(
  session({
    secret: '.ASCD123!',
    resave: false,
    saveUninitialized: false,
  })
)

app.use(layouts)
app.set('layout', './layouts/main')
app.set('view engine', 'ejs')

app.use((req, res, next) => {
  res.locals.categories = categories
  res.locals.heroVideoIds = heroVideoIds
  res.locals.featuredCategories = featuredCategories
  res.locals.user = req.session.user

  next()
})

app.use(express.static('public'))
app.use('/', routes)

app
  .listen(port, () => {
    console.log(`Server listening on port ${port}`)
  })
  .on('error', err => {
    console.error(`Error starting server: ${err}`)
  })
