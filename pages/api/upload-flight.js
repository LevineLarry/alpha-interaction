const mysql = require("mysql2")

export default async function handler(req, res) {
    try {
        const {name, data, description, publicFlight} = req.body

        const connection = mysql.createConnection(process.env.DATABASE_URL)
        connection.execute(`INSERT INTO proxima_cloud (name, data, description, creator, public) VALUES ('${name}', '${data}', '${description}', '${1}', '${publicFlight ? 0 : 1}');`)
        connection.end()
        res.status(200).json({ success: true });
    } catch(e) {
        console.log(e)
        res.status(500).json({success: false, error: e})
    }
}