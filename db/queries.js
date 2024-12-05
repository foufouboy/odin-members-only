const connection = require("./pool");

const queries = {
    // POSTS QUERIES

    getAllPosts: async () => {

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
    },

    // USERS QUERIES

    getAllUsers: async () => {

        const { rows } = await connection.query(`
            SELECT 
                users.id, 
                users.full_name, 
                users.username, 
                users.member_status, 
                COUNT(posts.id) AS post_count
            FROM 
                users
            LEFT JOIN 
                posts ON users.id = posts.user_id
            GROUP BY 
                users.id, users.full_name, users.username, users.member_status
            ORDER BY
                users.id;
        `);

        return rows;
    }
}

module.exports = queries;