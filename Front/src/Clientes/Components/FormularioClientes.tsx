import { Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { clienteCrear } from "../../Models/clientes.model";
import Button from "../../utils/Button";
import FormGroupCheckbox from "../../utils/FormGroupCheckbox";
import FormGroupText from "../../utils/FormGroupText";


export default function FormularioClientes(props: formularioClientesProps) {
    return (
        <Formik
            initialValues={props.modelo}
            onSubmit={props.onSubmit}
            validationSchema={Yup.object({
                nombreYApellido: Yup.string().required("Este campo es requerido").max(100, "La longitud maxima es de 100"),
                email: Yup.string().required("Este campo es requerido").email("Introducir un email valido"),
                telefono: Yup.string().required("Este campo es requerido"),
                domicilio: Yup.string().required("Este campo es requerido"),
                codigoPostal: Yup.string().required("Este campo es requerido"),
                provincia: Yup.string().required("Este campo es requerido"),
                localidad: Yup.string().required("Este campo es requerido"),
                nroDocumento: Yup.string().required("Este campo es requerido"),
                razonSocial: Yup.string().required("Este campo es requerido"),
            })}
        >
            {(formikProps) => (
                <Form style={{ marginTop: '-1px' }} className="row g-3 needs-validation" noValidate>
                    <div className="col-md-4">
                        <FormGroupText campo="nombreYApellido" label="Nombre Y Apellido" placeholder="Nombre del cliente" />
                    </div>
                    <div className="col-md-4">
                        <FormGroupText campo="email" label="Email" placeholder="Correo Electronico" />
                    </div>

                    <div className="col-md-4">
                        <FormGroupText campo="telefono" label="Telefono" placeholder="Telefono" />
                    </div>
                    <div className="col-md-4">
                        <FormGroupText campo="domicilio" label="Domicilio" placeholder="Domicilio" />
                    </div>
                    <div className="col-md-4">
                        <FormGroupText campo="codigoPostal" label="Codigo Postal" placeholder="Codigo Postal" />
                    </div>
                    <div className="col-md-4">
                        <FormGroupText campo="provincia" label="Provincia" placeholder="Provincia" />
                    </div>
                    <div className="col-md-4">
                        <FormGroupText campo="localidad" label="Localidad" placeholder="Localidad" />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="tipoDocumento">Tipo de Documento</label>
                        <Field className="form-control" as="select" name="tipoDocumento">
                            <option value={0}>Seleccionar tipo de documento</option>
                            <option value={1}>DNI</option>
                            <option value={5}>Pasaporte</option>
                            <option value={6}>CUIT</option>
                            <option value={7}>CUIL</option>
                        </Field>
                    </div>
                    <div className="col-md-4">
                        <FormGroupText campo="nroDocumento" label="Numero de documento" placeholder="Numero de documento" />
                    </div>
                    <div className="col-md-4">
                        <FormGroupText campo="razonSocial" label="Razon Social" placeholder="Razon Social" />
                    </div>               
                    <div className="col-md-4">
                        <FormGroupCheckbox campo="percibeIIBB" label="Percibe IIBB"/>
                    </div>               
                    <div className="col-md-4">
                        <FormGroupCheckbox campo="percibeIVA" label="Percibe IVA"/>
                    </div>               
                    <div className="col-8">
                        <Button disabled={formikProps.isSubmitting} type="submit">
                            Guardar
                        </Button>
                        <Button
                            className="btn btn-danger"
                            style={{ marginLeft: '0.5rem' }}
                            onClick={() => {
                                formikProps.setValues(props.modelo)
                            }}>Limpiar</Button>
                        <Button
                            className="btn btn-secondary"
                            style={{ marginLeft: '0.5rem' }}
                            onClick={() => {
                                props.setBandera!()
                            }}>Salir</Button>  
                    </div>
                </Form>
            )}
        </Formik>
    );
}

interface formularioClientesProps {
    modelo: clienteCrear;
    onSubmit(
        valores: clienteCrear,
        accion: FormikHelpers<clienteCrear>
    ): void;
    setBandera?: () => void;
}