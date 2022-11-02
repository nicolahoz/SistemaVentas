import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { urlClientes } from "../Generales/endpoints";
import { clienteModel } from "../Models/clientes.model";

export default function InfoCliente() {
    const { id }: any = useParams();
    const [cliente, setCliente] = useState<clienteModel>()

    useEffect(() => {
        axios.get(`${urlClientes}/${id}`)
            .then((respuesta: AxiosResponse<clienteModel>) => {
                setCliente(respuesta.data)
            })
    }, [id])

    return (
        <div className='container'>
            <h3>Detalle de cliente {id}</h3>
            <br></br>
            <h2>{cliente?.nombreYApellido}</h2>
            <h4>{cliente?.email}</h4>
            <br></br>
            <h4>Domicilio: {cliente?.domicilio}</h4>
            <h4>Telefono: {cliente?.telefono}</h4>
        </div>
    )
}