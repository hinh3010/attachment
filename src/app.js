import express from 'express'
import routeV1 from './apis/routes/index.r.js'
import mongooseDbConnect from './connect/connect_mongodb.js'
import env from './env.js'
import appLoader from './loader/app.loader.js'


const app = express()
appLoader(app)
mongooseDbConnect()


app.use('/v1', routeV1)

app.use((err, req, res, next) => {
    res.json({
        status: err.status || 500,
        message: err.message
    })
})

const PORT = env.port || 8082
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/`)
})