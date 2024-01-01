import knex, {Knex} from 'knex'
import {test, development, production} from './Enviroments'
import 'dotenv/config'
import pg from 'pg'

if(process.env.NODE_ENV == 'production'){
    pg.types.setTypeParser(20, 'text', parseInt)
}

let knexConfig: Knex.Config

switch(process.env.NODE_ENV || 'development'){
case 'test':
    knexConfig = test
    break
case 'production':
    knexConfig = production
    break

default: 
    knexConfig = development
    break
}

const KnexInstance = knex(knexConfig)

export default KnexInstance