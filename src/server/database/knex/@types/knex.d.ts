import { ICity } from '../../../interfaces/ICity'


declare module 'knex/types/tables'{

    interface Tables{
        cidade: ICity,
        // user: IUser
        // person: IPerson
    }

}