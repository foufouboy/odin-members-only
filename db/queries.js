const connection = require("./pool");

const queries = {
    getAllPosts: async () => {
        // USERS QUERIES

        // POSTS QUERIES

        const { rows } = await connection.query(`
            SELECT
                p.id,
                COALESCE(u.full_name, 'Anonymous') AS full_name,
                u.username,
                p.title,
                p.content,
                p.date
            FROM posts AS p
            LEFT JOIN users AS u ON u.id = p.user_id
            ORDER BY p.date DESC; 
        `)

        return rows;
    }
}

module.exports = queries;