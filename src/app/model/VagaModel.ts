import {UserModel} from "./UserModel"

export class VagaModel {
    public id : number
    public titulo : string
    public descricao : string
    public data : Date
    public anunciante : UserModel
    public candidato: UserModel[]
}