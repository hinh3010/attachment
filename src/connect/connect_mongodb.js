import mongoose from "mongoose";
import env from "../env";

// const mongooseDbConnect = async () => {
//     try {
//         await mongoose.connect(env.database.connection_mongodb_attackment, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             ssl: true
//         })
//         console.log('MongoDb::: connected!!')
//     } catch (error) {
//         console.log(`MongoDB::: Failed to connect!! - ${error.message}`)
//         throw new Error(`MongoDB::: Failed to connect!!`)
//     }
// }
// export default mongooseDbConnect

mongoose.connAttachment = mongoose.createConnection(env.database.connection_mongodb_attachment, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .on('connected', function () {
        console.log(`MongoDb::: Attachment connected!!`)
    })
    .on('disconnected', function () {
        console.log(`MongoDb::: Attachment disconnected!!`)
    })
    .on('error', function (err) {
        console.log(`MongoDB::: Attachment Failed to connect!! `, err.message)
    })

mongoose.connServer = mongoose.createConnection(env.database.connection_mongodb_server, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .on('connected', function () {
        console.log(`MongoDb::: Server connected!!`)
    })
    .on('disconnected', function () {
        console.log(`MongoDb::: Server disconnected!!`)
    })
    .on('error', function (err) {
        console.log(`MongoDB::: Server Failed to connect!! `, err.message)
    })

module.exports = mongoose
