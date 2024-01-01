import { Knex } from 'knex'

import path from 'path'

const development: Knex.Config = {
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, '..', '..', '..', '..', 'database.sqlite')
    },
    useNullAsDefault: true,

    migrations: {
        directory: path.resolve(__dirname, '..', 'migrations')
    },

    seeds: {
        directory: path.resolve(__dirname, '..', 'seeds')
    },

    pool: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        afterCreate: (connection: any, done: Function) => {
            connection.run('PRAGMA foreign_keys = ON')
            done()
        }
    }
}

const test: Knex.Config = {
    ...development,
    connection: ':memory:'
}

const production: Knex.Config = {
    client: 'pg',

    migrations: {
        directory: path.resolve(__dirname, '..', 'migrations')
    },

    seeds: {
        directory: path.resolve(__dirname, '..', 'seeds')
    },

    connection: {
        host: process.env.HOST,
        user: process.env.USER,
        database: process.env.NAME,
        password: process.env.PASSWORD,
        port: Number(process.env.PORT || 5432),
        ssl: { rejectUnauthorized: false }
    },

}

export { development, test, production }
