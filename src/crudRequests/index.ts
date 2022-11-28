import { deleteOne } from './delete'
import { getAll, getOne } from './get'
import { postOne } from './post'
import { putOne } from './put'
import { Express } from 'express'


export const crudRequests = (Model: any, app: Express) => {
    [
        getOne,
        getAll,
        postOne,
        putOne,
        deleteOne
    ].forEach(e => {
        e(Model, app)
    })
}