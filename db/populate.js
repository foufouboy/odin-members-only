const connection = require("./pool");
const bcrypt = require("bcryptjs");

const sampleUsers = [
    {
        full_name: "Diogene de Sinope",
        username: "Dio_",
        password: "El2jarisszar*",
        member_status: "admin",
    },
    {
        full_name: "Milocibelle",
        username: "Milo",
        password: "une_petite_fee",
        member_status: "member",
    },
    {
        full_name: "John Doe",
        username: "john_doe123",
        password: "john_doe_doe",
        member_status: "registered",
    },
];

const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        full_name VARCHAR(50) NOT NULL,
        username VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(100) NOT NULL,
        member_status VARCHAR(50) NOT NULL
    );
`;

const createPostsTable = `
    CREATE TABLE IF NOT EXISTS posts (
        id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        title VARCHAR(50) NOT NULL,
        content VARCHAR(500) NOT NULL,
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        user_id INTEGER NOT NULL,
        CONSTRAINT fk_user_posts 
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
    );
`;

async function _main() {
    await connection.query(createUsersTable);
    await connection.query(createPostsTable);

    let insertUsers = `
        INSERT INTO users (full_name, username, password, member_status) 
        VALUES
    `;

    Promise.all(sampleUsers.map(u => bcrypt.hash(u.password, 10)))
    .then(values => {
        sampleUsers.forEach((user, i) => {
            const {
                full_name, 
                username, 
                member_status } = user;

            const queryValue = `('${full_name}', '${username}', '${values[i]}', '${member_status}')`;
            insertUsers += queryValue;
            insertUsers += i === sampleUsers.length - 1 ? ";" : ","
        });

        connection.query(insertUsers);
    });
}

_main();