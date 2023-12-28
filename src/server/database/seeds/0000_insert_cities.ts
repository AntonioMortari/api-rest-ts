import { Knex } from "knex"
import { ETableNames } from "../knex/ETableNames"


const seed = async (knex: Knex) => {

    const [{count}] = await knex(ETableNames.city).count<[{ count: number }]>('* as count')

    if (Number(count) > 0) return

    const cities = [
        
        "Pacaembu",
        "Palestina",
        "Palmares Paulista",
        "Palmeira d'Oeste",
        "Palmital",
        "Panorama",
        "Paraguaçu Paulista",
        "Paraibuna",
        "Paraíso",
        "Paranapanema",
        "Paranapuã",
        "Parapuã",
        "Pardinho",
        "Pariquera-Açu",
        "Parisi",
        "Patrocínio Paulista",
        "Paulicéia",
        "Socorro",
        "Sorocaba",
        "Sud Mennucci",
        "Sumaré",
        "Suzanápolis",
        "Suzano",
        "Tabapuã",
        "Tabatinga",
        "Taboão da Serra",
        "Taciba",
        "Taguaí",
        "Taiaçu",
        "Taiúva",
        "Tambaú",
        "Tanabi",
        "Tapiraí",
        "Tapiratiba",
        "Taquaral",
        "Taquaritinga",
        "Taquarituba",
        "Taquarivaí",
        "Tarabai",
        "Tarumã",
        "Tatuí",
        "Taubaté",
        "Tejupá",
        "Teodoro Sampaio",
        "Terra Roxa",
        "Tietê",
        "Timburi",
        "Torre de Pedra",
        "Torrinha",
        "Trabiju",
        "Tremembé",
        "Três Fronteiras",
        "Tuiuti",
        "Tupã",
        "Tupi Paulista",
        "Turiúba",
        "Turmalina",
        "Ubarana",
        "Ubatuba",
        "Ubirajara",
        "Uchoa",
        "União Paulista",
        "Urânia",
        "Uru",
        "Urupês",
        "Valentim Gentil",
        "Valinhos",
        "Valparaíso",
        "Vargem",
        "Vargem Grande do Sul",
        "Vargem Grande Paulista",
        "Várzea Paulista",
        "Vera Cruz",
        "Vinhedo",
        "Viradouro",
        "Vista Alegre do Alto",
        "Vitória Brasil",
        "Votorantim",
        "Votuporanga",
        "Zacarias"
    ].map(name => {
        return {
            name: name
        }
    })

    console.log(cities)

    await knex(ETableNames.city).insert(cities)

}

export { seed }