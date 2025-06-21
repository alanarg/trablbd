export interface ITransacao {
    id_transacao?: Number,
    id_conta_origem?: Number,
    id_conta_destino?: Number,
    id_dispositivo?: Number,
    valor?: number,
    tipo?: String,
    data_transacao?: Date,
    latitude?: Number,
    longitude?: Number,
    alerta_anomalia?: any,
    conta_transacao_id_conta_destinoToconta?: any,
    conta_transacao_id_conta_origemToconta?: any,
    dispositivo?: any
}