import axios, { AxiosResponse } from "axios";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { urlProductos } from "../Generales/endpoints";
import { productoModel } from "../Models/producto.model";
import Button from "../utils/Button";
import Paginacion from "../utils/Paginacion";
import ListadoProductos from "./ListadoProductos";

export default function FiltroProductos() {

    const [totalDePaginas, setTotalDePaginas] = useState(0);
    const [productos, setProductos] = useState<productoModel[]>()
    const history = useHistory()
    const query = new URLSearchParams(useLocation().search)

    const valorInicial: filtroVentasProps = {
        nombre: '',
        precio: 0,
        stockDisponible: false,
        sinStock: false,
        pagina: 1,
        recordsPorPagina: 10
    }


    useEffect(() => {

        if (query.get('nombre')) {
            valorInicial.nombre = query.get('nombre')!;
        }
        if (query.get('precio')) {
            valorInicial.precio = parseInt(query.get('precio')!, 10)
        }
        if (query.get('stockDisponible')){
            valorInicial.stockDisponible = true
        }
        if (query.get('sinStock')){
            valorInicial.sinStock = true
        }

        buscarProducto(valorInicial)
    }, [])

    function modificarURL(valores: filtroVentasProps) {
        const queryStrings: string[] = []
        if (valores.nombre) {
            queryStrings.push(`nombre=${valores.nombre}`)
        }
        if (valores.precio) {
            queryStrings.push(`precio=${valores.precio}`)
        }
        if(valores.stockDisponible){
            queryStrings.push(`stockDisponible=${valores.stockDisponible}`)
        }
        if(valores.sinStock){
            queryStrings.push(`sinStock=${valores.sinStock}`)
        }

        queryStrings.push(`pagina=${valores.pagina}`)
        history.push(`/?${queryStrings.join('&')}`)
    }

    function buscarProducto(valores: filtroVentasProps) {
        console.log(valores)
        modificarURL(valores)
        axios.get(`${urlProductos}/filtrar`, { params: valores })
            .then((respuesta: AxiosResponse<productoModel[]>) => {
                console.log(respuesta.data)
                const totalDeRegistros = parseInt(
                    respuesta.headers["cantidadtotalregistros"],
                    10
                );
                setTotalDePaginas(Math.ceil(totalDeRegistros / valorInicial.recordsPorPagina));

                setProductos(respuesta.data);
            })
    }


    return (
        <>
            <h3>Filtrar Productos</h3>
            <Formik initialValues={valorInicial} onSubmit={valores => {
                valores.pagina = 1;
                buscarProducto(valores)
            }}>
                {(formikProps) => (
                    <>
                        <Form>
                            <div className="form-inline">
                                <div className="form-group mb-2">
                                    <label htmlFor="nombre" className="sr-only">Nombre del producto</label>
                                    <input type="text" className="form-control"
                                        id="nombre" placeholder="Nombre del producto"
                                        {...formikProps.getFieldProps('nombre')}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label htmlFor="precio" className="sr-only">Precio maximo</label>
                                    <input style={{marginLeft:'1rem'}} type="text" className="form-control"
                                        id="precio" placeholder="Precio maximo"
                                        {...formikProps.getFieldProps('precio')}
                                    />
                                </div>
                                <div className="form-group mx-sm-3 mb-2">
                                    <Field className="form-check-input" id="stockDisponible" name="stockDisponible" type="checkbox" />
                                    <label className="form-check-label" htmlFor="stockDisponible">Stock Disponible</label>
                                </div>
                                <div className="form-group mx-sm-3 mb-2">
                                    <Field className="form-check-input" id="sinStock" name="sinStock" type="checkbox" />
                                    <label className="form-check-label" htmlFor="sinStock">Sin Stock</label>
                                </div>
                                <Button
                                    className="btn btn-primary mb-2 mx-sm-3"
                                    onClick={() => formikProps.submitForm()}>Filtrar</Button>
                                <Button
                                    className="btn btn-danger mb-2"
                                    onClick={() => {
                                        formikProps.setValues(valorInicial)
                                        buscarProducto(valorInicial)
                                    }}>Limpiar</Button>
                            </div>
                        </Form>

                        <ListadoProductos productos={productos}/>

                        <Paginacion
                            cantidadTotalDePaginas={totalDePaginas}
                            paginaActual={formikProps.values.pagina}
                            onChange={(nuevaPagina) => {
                                formikProps.values.pagina = nuevaPagina
                                buscarProducto(formikProps.values)
                            }}
                        />
                    </>
                )}

            </Formik>
        </>
    )
}

interface filtroVentasProps {
    nombre: string;
    precio: number;
    stockDisponible: boolean;
    sinStock:boolean;
    pagina: number;
    recordsPorPagina: number;
}

