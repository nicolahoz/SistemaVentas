import axios from "axios";
import { urlConsumidoFinal } from "../../Generales/endpoints";
import { nuevoVentasCFModel } from "../../Models/ventasCf.model";
import { filtroVentasProps } from "../../Ventas/Components/FiltroVentas";


export async function crear(venta: nuevoVentasCFModel) {
    await axios.post(`${urlConsumidoFinal}`, venta)
}
export async function filtrar(filtro: filtroVentasProps) {
    const res = axios.get(`${urlConsumidoFinal}/filtrar`, { params: filtro })
    return res
}

export async function getVenta(id: any) {
    const res = axios.get(`${urlConsumidoFinal}/${id}`)
    return res
}

export async function borrar(id: number) {
    await axios.delete(`${urlConsumidoFinal}/${id}`)
}

export async function editar(valores: nuevoVentasCFModel, id: any) {
    await axios.put(`${urlConsumidoFinal}/${id}`, valores)
}

export async function getPDF(id: number) {
    const res = axios.get(`${urlConsumidoFinal}/pdf/${id}`)
    return res
}