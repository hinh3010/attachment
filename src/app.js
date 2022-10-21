import express from 'express'
import UserModel from './apis/models/user.m.js'
import routeV1 from './apis/routes/index.r.js'
import catchAsync from './apis/utils/catch-async.js'
import pick from './apis/utils/pick.js'
import mongooseDbConnect from './connect/connect_mongodb.js'
import env from './env.js'
import appLoader from './loader/app.loader.js'
import jwtMdw from './apis/middlewares/jwt.mdw';


const app = express()
appLoader(app)
// mongooseDbConnect()


app.use('/v1', routeV1)
app.use('/', jwtMdw.verifyAccessToken, catchAsync(async (req, res) => {

    const query = { ...req.query, isSuperAdmin: false }
    const filters = pick(query, ['accountType', 'accountStatus', 'isAdmin']);
    const options = pick(query, ['sort', 'limit', 'page']);

    const userList = await UserModel.paginate(
        {
            ...filters, deletedById: { $exists: false },
        },
        {
            ...options, select: '-password -token -refreshToken',
        }
    )

    return res.json({
        status: 200,
        data: userList
    })
}))

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