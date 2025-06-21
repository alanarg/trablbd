export interface IConta {
    id_conta: Number,
    id_cliente: Number,
    id_dispositivo?:Number,
    tipo_conta: String,
    saldo: Number,
    data_criacao: Date,
    limite_noturno: Number,
    cliente: any,

    transacao_transacao_id_conta_destinoToconta: any,
    transacao_transacao_id_conta_origemToconta: any,
}