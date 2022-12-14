import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ventasModel } from "../../Models/ventas.model";
import * as services from "../Services/ventas.services";
import * as serClientes from "../../Clientes/Services/clientes.services"
import { clienteModel } from "../../Models/clientes.model";

export default function DetalleVentas(props: infoVentaProps) {
    const [venta, setVenta] = useState<ventasModel>()

    useEffect(() => {
        const res = services.getVenta(props.id)
            res.then((respuesta: AxiosResponse<ventasModel>) => {
                respuesta.data.fechaDeVenta = new Date(respuesta.data.fechaDeVenta)
                setVenta(respuesta.data)
                console.log(venta)
            })
    }, [props.id])


    return (
        <div className='container'>
            <h4 style={{marginTop:'1rem'}}>Detalle de venta {props.id}</h4>
            <table className='table'>
                <thead>
                    <tr className='table-warning'>
                        <th>Nombre del producto</th>
                        <th>Precio por unidad</th>
                        <th>Cantidad vendida</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {venta?.productos.map((producto) => (
                        <tr className='table-secondary' key={venta?.id}>
                            <td>{producto.nombre}</td>
                            <td>${producto.precio.toFixed(2)}</td>
                            <td>{producto.cantidad}</td>
                            <td>{(producto.cantidad * producto.precio).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
                <br></br>
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th className='table-warning'>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className='table-secondary'>{venta?.precioTotal?.toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

interface infoVentaProps{
    id: number
    setFlagModal: () => void
    setFlagListado: () => void
}