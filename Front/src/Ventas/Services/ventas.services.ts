import axios from "axios";
import { urlVentas } from "../../Generales/endpoints";
import { nuevoVentasModel, ventaCancelar } from "../../Models/ventas.model";
import { filtroVentasProps } from "../Components/FiltroVentas";


export async function crear(venta: nuevoVentasModel){
    await axios.post(`${urlVentas}`, venta)
}

export async function editar(ventaEditar: nuevoVentasModel, id:any){
    await axios.put(`${urlVentas}/${id}`, ventaEditar)
}

export async function borrar(id: number){
    await axios.delete(`${urlVentas}/${id}`)
}

export async function getProductos() {
    const res = axios.get(`${urlVentas}/postget`)
    return res
}

export async function filtrar(valores:filtroVentasProps) {
    const res = axios.get(`${urlVentas}/filtrar`, { params: valores })
    return res
}

export async function getVenta(id:any) {
    const res = axios.get(`${urlVentas}/${id}`)
    return res
}

export async function cancelar(id:any, pago: ventaCancelar){
    await axios.put(`${urlVentas}/cancelar/${id}`,pago)
}

export async function chart(){
    const res = axios.get(`${urlVentas}/chart`)
    return res
}

export async function chartSemanal(){
    const res = axios.get(`${urlVentas}/chartSemanal`)
    return res
}

export async function ventasCliente(id:any){
    const res = axios.get(`${urlVentas}/ventasCliente/${id}`)
    return res
}

export async function chartProductos(){
    const res = axios.get(`${urlVentas}/chartProductos`)
    return res
}

export async function getPDF(id: number){
    const res = axios.get(`${urlVentas}/pdf/${id}`)
    return res
}

