import { ICity } from '../../models/City'
import { IPerson } from '../../models/Person'


declare module 'knex/types/tables'{

    interface Tables{
        city: ICity,
        user: IUser
        person: IPerson
    }

}