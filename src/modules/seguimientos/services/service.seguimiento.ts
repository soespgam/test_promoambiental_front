import { apiClient } from "../../../shared/axios/axios-imple"
import { Seguimiento } from "../interface/seguimiento.interface";

export const HttpServicesSeguimiento = {
    getSeguimientos:():Promise<Seguimiento[]> =>{
        return apiClient.get('http://127.0.0.1:8000/api/seguimientos');
    },
}