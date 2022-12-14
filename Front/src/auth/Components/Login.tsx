import axios from "axios";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { urlCuentas } from "../../Generales/endpoints";
import { credencialesUsuario, respuestaAutenticacion } from "../../Models/auth.model";
import MostrarErrores from "../../utils/MostrarErrores";
import AutenticacionContext from "../AutenticacionContext";
import { guardarTokenLocalStorage, obtenerClaims } from "../handlerJWT";
import FormularioAuth from "./FormularioAuth";

export default function Login() {

    const {actualizar} = useContext(AutenticacionContext)
    const [errores, setErrores] = useState<string[]>([])
    const history = useHistory()

    async function login(credenciales: credencialesUsuario) {
        console.log(credenciales)
        try {
            const respuesta = await axios.post<respuestaAutenticacion>(`${urlCuentas}/login`, credenciales)
            guardarTokenLocalStorage(respuesta.data)
            actualizar(obtenerClaims())
            history.push("/")
            console.log(respuesta)
        } catch (error) {
            setErrores(error.response.data)
        }
    }

    return (
        <>
            <MostrarErrores errores={errores}/>
            <FormularioAuth
                modelo={{ nombre: '', password: '' }}
                onSubmit={async valores => await login(valores)}
                tipo="Login"
            />
        </>
    )
}