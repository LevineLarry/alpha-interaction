const mysql = require("mysql2")

export default async function handler(req, res) {
    try {
        const {id} = req.query
        const connection = mysql.createConnection(process.env.DATABASE_URL)
        var [results, fields, err] = await connection.promise().query(`SELECT * FROM proxima_cloud WHERE id=${id};`)
        connection.end()
        res.status(200).json({ flight: results });
    } catch(e) {
        console.log(e)
        res.status(500).json({success: false, error: e})
    }
}