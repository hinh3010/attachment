import dotenv from 'dotenv'
dotenv.config()

console.log("db_server:::", process.env.MONGODB_SERVER_URL)
console.log("db_attachment:::", process.env.MONGODB_ATTACHMENT_URL)
const env = {
    port: process.env.PORT,
    project_name: process.env.PROJECT_NAME || 'attachment',
    node_env: process.env.NODE_ENV || 'development',
    rootpath: 'src/attachments',
    database: {
        connection_mongodb_server: process.env.MONGODB_SERVER_URL,
        connection_mongodb_attachment: process.env.MONGODB_ATTACHMENT_URL,
    },
    jwt: { access_token_serret: 'HelloCacBanTre', }
}

export default env