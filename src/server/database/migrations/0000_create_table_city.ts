import type { Knex } from 'knex'
import { ETableNames } from '../knex/ETableNames'


export async function up(knex: Knex) {

    knex.schema.createTable(ETableNames.city, table => {
        table.bigIncrements('id').primary().index()
        table.string('name', 150).notNullable().checkLength('<=', 150)

        table.comment(`Tabela que armazenará as cidades do sistema`)
    })
        .then(() => console.log(`# Create Table ${ETableNames.city}`))
}


export async function down(knex: Knex) {

    knex.schema.dropTable(ETableNames.city)
        .then(() => console.log(`# Drop table ${ETableNames.city}`))

}