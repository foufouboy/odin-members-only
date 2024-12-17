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

    getUserFromId: async (id) => {
        const { rows } = await connection.query(
            "SELECT * FROM users WHERE id = $1",
            [id],
        );

        return rows[0];
    },

    getUserFromUname: async (username) => {
        const { rows } = await connection.query(
            "SELECT * FROM users WHERE username = $1",
            [username],
        );

        return rows[0];
    },

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
    },

    createUser: async (fullname, username, password) => {
        await connection.query(`
            INSERT INTO users 
                (full_name, username, password, member_status)
            VALUES
                ($1, $2, $3, 'registered');
        `, [fullname, username, password]);
    },
}

module.exports = queries;