require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const authCtrl = require('./controllers/authController')
const treasureController = require('./controllers/treasureController')
const auth = require('./middleware/authMiddleware')

const port = 4000

const app = express()

app.use(express.json())

const { CONNECTION_STRING, SESSION_SECRET } = process.env

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
})

app.use(
    session({
        resave: true,
        saveUninitialized: false,
        secret: SESSION_SECRET
    })
)

app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.get('/auth/logout', authCtrl.logout)
app.get('/api/treasure/dragon', treasureController.dragonTreasure)
app.get('/api/treasure/user', auth.usersOnly, treasureController.getUserTreasure)
app.post('/api/treasure/user', auth.usersOnly, treasureController.addUserTreasure)
app.get('/api/treasure/all', auth.usersOnly, auth.adminsOnly, treasureController.getAllTreasure)

app.listen(port, () => {
    console.log(`listening on ${port}`)
})