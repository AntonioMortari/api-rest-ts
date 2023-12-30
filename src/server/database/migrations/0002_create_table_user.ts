import { Knex } from 'knex'
import { ETableNames } from '../knex/ETableNames'


export async function up(knex: Knex){

    knex.schema.createTable(ETableNames.user, table => {
        table.bigIncrements('id').primary().index()
        table.string('name').notNullable().checkLength('>', 3)
        table.string('email').index().unique().notNullable().checkLength('>', 5)
        table.string('password').notNullable().checkLength('>', 6)

        table.comment('Tabela para armazenar usuários do sistema')
    })
        .then(() => console.log(`# Create Table ${ETableNames.person}`))

}

export async function down (knex: Knex){
    knex.schema.dropTable(ETableNames.user)
        .then(() => console.log('Drop table user'))
}

