import { useState } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { proveedoresCrear } from "../../Models/proveedores.model";
import MostrarErrores from "../../utils/MostrarErrores";
import * as services from "../Services/proveedores.services";
import FormularioProveedores from "./FormularioProveedores";

export default function CargarProveedor(props: cargarProveedorProps) {

    const history = useHistory();
    const [errores, setErrores] = useState<string[]>([]);

    async function crear(proveedor: proveedoresCrear) {
        console.log(proveedor)
        try {
            services.crear(proveedor)
            props.setFlagListado()
            Swal.fire(
                'Carga Correcta',
                'El proveedor fue cargado correctamente', 'success'
            )
        }
        catch (error) {
            setErrores(error.response.data);
        }
    }

    return (
        <>
            <MostrarErrores errores={errores}/>
            <FormularioProveedores modelo={{ nombre: '', telefono: '', direccion: '', email: '' }} onSubmit={async valores => {
                crear(valores)
            }} />
        </>
    )
}

interface cargarProveedorProps{
    setFlagModal: () => void
    setFlagListado: () => void
}