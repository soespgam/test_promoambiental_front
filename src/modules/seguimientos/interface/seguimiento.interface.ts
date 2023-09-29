export interface Seguimiento {
    id?: string;
    Nombres: string;
    Apellidos: string;
    Asunto: string;
    correo: string;
    Telefono: number;
    fecha: Date;
    dias: number;
    fecha_proximo_seguimiento: Date
}