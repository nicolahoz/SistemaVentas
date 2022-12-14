import { useFormikContext } from "formik";
import MostrarErrorCampo from "./MostrarErrorCampo";

export default function FormGroupFecha(props: fromGroupFechaProps) {
    const { values, validateForm, touched, errors } = useFormikContext<any>();
    return (
        <div className="form-group">
            <label htmlFor={props.campo}>{props.label}</label>
            <input type="date"
                className="form-control"
                style={{marginLeft: '1rem'}}
                id={props.campo} name={props.campo}
                defaultValue={values[props.campo]?.toLocaleDateString('en-CA')}
                onChange={e => {
                    const fecha = new Date(e.currentTarget.value + 'T00:00:00');
                    values[props.campo] = fecha;
                    validateForm();
                    props.onClick()
                }} />
            {touched[props.campo] && errors[props.campo] ? <MostrarErrorCampo mensaje={errors[props.campo]?.toString()!} /> : null}
        </div>
    )
}

interface fromGroupFechaProps {
    campo: string;
    label: string;
    onClick: () => void
}