import type { Knex } from 'knex'
import { ETableNames } from '../knex/ETableNames'


export async function up(knex: Knex) {

    knex.schema.createTable(ETableNames.person, table => {
        table.bigIncrements('id').index().primary().notNullable()
        table.string('fullname').index().notNullable()
        table.string('email').unique().notNullable()
        table
            .bigInteger('city_id')
            .notNullable()
            .references('id')
            .inTable(ETableNames.city)
            .onUpdate('CASCADE')
            .onDelete('RESTRICT')


        table.comment(`Tabela que armazenará as pessoas do sistema`)
    })
        .then(() => console.log(`# Create Table ${ETableNames.person}`))
}


export async function down(knex: Knex) {

    knex.schema.dropTable(ETableNames.person)
        .then(() => console.log(`# Drop table ${ETableNames.person}`))

}