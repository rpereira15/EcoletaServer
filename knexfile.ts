import path from "path";

module.exports = {
    client: 'sqlite3',
    connection : {
        filename: path.resolve(__dirname, 'src', 'config', 'database.sqlite'),
    },
    migrations : {
        directory: path.resolve(__dirname, 'src', 'migrations'),
    },
    seeds : {
        directory: path.resolve(__dirname, 'src', 'seeds'),
    },
    useNullAsDefault: true,
};
