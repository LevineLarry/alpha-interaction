const mysql = require("mysql2")

export default async function handler(req, res) {
    try {
        const connection = mysql.createConnection(process.env.DATABASE_URL)
        var [results, fields, err] = await connection.promise().query(`SELECT name, id FROM proxima_cloud;`)
        connection.end()
        res.status(200).json({ flights: results });
    } catch(e) {
        console.log(e)
        res.status(500).json({success: false, error: e})
    }
}