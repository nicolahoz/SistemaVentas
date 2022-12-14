import { AxiosResponse } from "axios";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import FilterIcon from "../../assets/FilterIcon";
import { presupuestoModel } from "../../Models/presupuestos.model";
import { productoModel } from "../../Models/producto.model";
import { ventasPostGetModel } from "../../Models/ventas.model";
import Button from "../../utils/Button";
import FormGroupFecha from "../../utils/FormGroupFecha";
import FormGroupText from "../../utils/FormGroupText";
import Paginacion from "../../utils/Paginacion";
import * as services from '../../Ventas/Services/ventas.services';
import * as presServices from '../Services/presupuestos.services';
import ListadoPresupuestos from "./ListadoPresupuestos";


export default function FiltroPresupuestos() {

    const [totalDePaginas, setTotalDePaginas] = useState(0);
    const [productos, setProductos] = useState<productoModel[]>([])
    const [presupuesto, setPresupuesto] = useState<presupuestoModel[]>()
    const [mostrarFiltros, setMostrarFiltros] = useState(false)
    const history = useHistory()
    const query = new URLSearchParams(useLocation().search)
    const [flag, setFlag] = useState(false);

    const handleFlag = () => {
        setFlag(!flag)
        console.log(flag)
    }

    const valorInicial: filtroPresupuestosProps = {
        productoId: 0,
        fechaDeVenta: new Date,
        pagina: 1,
        recordsPorPagina: 10
    }

    useEffect(() => {
        const res = services.getProductos()
        res.then((respuesta: AxiosResponse<ventasPostGetModel>) => {
            setProductos(respuesta.data.productos);
        })
    }, [])

    useEffect(() => {
        if (query.get('nombre')) {
            valorInicial.nombre = query.get('nombre')!
        }
        if (query.get('productoId')) {
            valorInicial.productoId = parseInt(query.get('productoId')!, 10)
        }
        if (query.get('pagina')) {
            valorInicial.pagina = parseInt(query.get('pagina')!, 10)
        }
        buscarPresupuesto(valorInicial)
    }, [flag])

    function modificarURL(valores: filtroPresupuestosProps) {
        const queryStrings: string[] = []
        if (valores.nombre) {
            queryStrings.push(`nombre=${valores.nombre}`)
        }
        if (valores.productoId) {
            queryStrings.push(`productoId=${valores.productoId}`)
        }
        if (valores.fechaDeVenta) {
            queryStrings.push(`fechaDeVenta=${valores.fechaDeVenta}`)
        }
        queryStrings.push(`pagina=${valores.pagina}`)
        history.push(`/listadoPresupuestos?${queryStrings.join('&')}`)
    }

    function buscarPresupuesto(valores: filtroPresupuestosProps) {
        modificarURL(valores)
        const res = presServices.filtrar(valores)
        res.then((respuesta: AxiosResponse<presupuestoModel[]>) => {
            const totalDeRegistros = parseInt(respuesta.headers["cantidadtotalregistros"], 10)
            setTotalDePaginas(Math.ceil(totalDeRegistros / valorInicial.recordsPorPagina));
            setPresupuesto(respuesta.data)
        })
    }

    return (
        <>
            <h3 style={{ marginTop: '1rem' }}>Filtrar Presupuestos</h3>
            <Formik initialValues={valorInicial} onSubmit={valores => {
                valores.pagina = 1;
                buscarPresupuesto(valores)
            }}>
                {(formikProps) => (
                    <>
                        <Form>
                            <Button style={{ marginBottom: '1rem' }} onClick={() => { setMostrarFiltros(!mostrarFiltros) }} className="btn btn-secondary"><FilterIcon/></Button>

                            {mostrarFiltros ?
                                <div className="form-inline">
                                    <div className="form-group mx-sm-3 mb-2">
                                        <FormGroupText campo="nombre" placeholder="Nombre" onChange={() => formikProps.submitForm()} />
                                    </div>
                                    <div className="form-group mx-sm-3 mb-2">
                                        <Field className="form-control" as="select" name="productoId" onClick={() => formikProps.submitForm()}>
                                            <option value="0">Seleccione un producto</option>
                                            {productos.map(producto =>
                                                <option key={producto.id} value={producto.id}>{producto.nombre}</option>)}
                                        </Field>
                                    </div>
                                    <div className="form-group mx-sm-3 mb-2">
                                        <FormGroupFecha campo="fechaDeVenta" label="Fecha de Venta" onClick={() => formikProps.submitForm()} />
                                    </div>
                                    <Button
                                        className="btn btn-danger mb-2"
                                        onClick={() => {
                                            formikProps.setValues(valorInicial)
                                            buscarPresupuesto(valorInicial)
                                        }}>Limpiar</Button>
                                </div>:null}
                        </Form>

                        <ListadoPresupuestos presupuestos={presupuesto} setFlag={handleFlag}/>
                        <Paginacion
                            cantidadTotalDePaginas={totalDePaginas}
                            paginaActual={formikProps.values.pagina}
                            onChange={(nuevaPagina) => {
                                formikProps.values.pagina = nuevaPagina
                                buscarPresupuesto(formikProps.values)
                            }}
                        />
                    </>
                )}

            </Formik>
        </>
    )
}

export interface filtroPresupuestosProps {
    nombre?: string;
    productoId: number;
    fechaDeVenta: Date;
    pagina: number;
    recordsPorPagina: number;
}