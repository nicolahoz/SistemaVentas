import { Field, Form, Formik, FormikHelpers } from "formik";
import { credencialesUsuario } from "../../Models/auth.model";
import * as Yup from 'yup'
import FormGroupText from "../../utils/FormGroupText";
import Button from "../../utils/Button";
import { Link, NavLink } from "react-router-dom";
import SvgComponent from "../../assets/Login-Icon";
import UsernameIcon from "../../assets/Username-Icon";
import PasswordIcon from "../../assets/PasswordIcon";



export default function FormularioAuth(props: formularioAuthProps) {
    return (
        <Formik initialValues={props.modelo}
            onSubmit={props.onSubmit}
            validationSchema={Yup.object({
                email: Yup.string().required("Este campo es requerido").email("Introducir un email valido"),
                password: Yup.string().required("Este campo es requerido")

            })}>
            {formikProps => (
                <Form>
                    <div className="bg-white p-5 rounded-5 text-secondary shadow" style={{ width: '25rem', marginLeft:'22.5rem', marginTop:'10rem', borderRadius:'40px' }}>
                        <div className="d-flex justify-content-center" style={{marginTop:'-10px'}}>
                            <SvgComponent/>
                        </div>
                        <h3 className="text-center fs-1 fw-bold">Login</h3>
                        <div className="input-group mt-4">
                            <div className="input-group-text bg-info" style={{borderRadius:'20px', marginRight:'5px', marginLeft:'-5px'}}>
                                <UsernameIcon/>
                            </div>
                            <Field className="form-control bg-light" name="email" type="text" placeholder="Username" />
                        </div>
                        <div className="input-group mt-1">
                            <div className="input-group-text bg-info" style={{borderRadius:'20px', marginRight:'5px', marginLeft:'-5px'}}>
                                <PasswordIcon/>
                            </div>
                            <Field className="form-control bg-light" name="password" type="passwrod" placeholder="Password" />
                        </div>
                        <Button disabled={formikProps.isSubmitting} className="btn btn-info text-white w-100 mt-4 fw-semibold shadow-sm" style={{marginTop:'1rem', width:'310px', marginBottom:'0.2rem'}} type="submit">Enviar</Button>
                        <div className="d-flex gap-1 justify-content-center mt-1">
                            <NavLink to="/registro" className="text-decoration-none text-info fw-semibold">Registrarse</NavLink>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

interface formularioAuthProps {
    modelo: credencialesUsuario;
    onSubmit(valores: credencialesUsuario, acciones: FormikHelpers<credencialesUsuario>): void;
}