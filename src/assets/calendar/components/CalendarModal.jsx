import React, { useEffect, useMemo, useState } from "react";
import { addHours, differenceInSeconds } from "date-fns";

import Modal from "react-modal";

import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import es from 'date-fns/locale/es';
registerLocale('es', es)

import { useCalendarStore, useUiStore } from "../../hooks";

import "./CalendarModal.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export const CalendarModal = () => {
  //Consumo custom hook de funciones para brir y cerrar modal
  const { isDateModalOpen, closeDateModal } = useUiStore();
  //Consumo custom hook de Calendar Store
  const { activeEvent } = useCalendarStore();
  //Estado para controlar el submit del formulario
  const [formSubmitted, setFormSubmitted] = useState(false)
  //Estado valores iniciales formulario
  const [formValues, setFormValues] = useState({
    title: 'Jefferson',
    notes: 'Pulido Company',
    start: new Date(),
    end: addHours(new Date(), 2)
  })
  //Funcion que se dispara cuando detecta un cambio en el titulo o el submit del form, cambiando la clase del input para la validacion de este
  const titleClass = useMemo(() => {
    if ( !formSubmitted ) return '';
    return ( formValues.title.length > 0 )
    ? 'is-valid'
    : 'is-invalid'
  }, [ formValues.title , formSubmitted])
  //Cargar informacion traida del evento del store
  useEffect(() => {
    if ( activeEvent !== null ){
      setFormValues({ ...activeEvent })
    }
  }, [ activeEvent ])
  
  //Funcion para detectar cambios con OnChange en el formulario y guardarlos en el estado
  const onInputChange = ({target}) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
  }
  //Funcion para detectar cambios con OnChange en el input de datepicker y guardarlos en el estado
  const onDateChange = (event, changing) => {
    setFormValues({
      ...formValues,
      [changing]: event
    })
  }
  //Funcion para prevenir el evento predeterminado del formulario al detectar el evento onSubmit y validacion de fechas y titulo
  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true)
    {/** Calcular diferencia en segundos entre las dos fechas */}
    const difference = differenceInSeconds(formValues.end, formValues.start)
    {/** Si la fecha NO es un numero o es menor a 0 retorna un error */}
    if (isNaN(difference) || difference <= 0) {
      Swal.fire('Fechas incorrectas', 'Revisar fechas ingresadas','error')
      return;
    }
    {/** Si el titulo tiene 0 o menos caracteres retorna un error */}
    if ( formValues.title.length <= 0 ) {
      console.log("Titulo vacio")
      return;
    }
    console.log(formValues)
  }

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={closeDateModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>
        {/* FECHA INICIAL */}
        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <DatePicker
            locale="es"
            timeCaption="Hora"
            showTimeSelect
            selected={ formValues.start }
            className="form-control"
            dateFormat="Pp"
            onChange={ (event) =>  onDateChange(event, 'start')}
          />
        </div>
        {/* FECHA FINAL */}
        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <DatePicker
            locale="es"
            timeCaption="Hora"
            showTimeSelect
            minDate={ formValues.start }
            selected={ formValues.end }
            className="form-control"
            dateFormat="Pp"
            onChange={ (event) =>  onDateChange(event, 'end')}
          />
        </div>
        <hr />
        {/* TITULO */}
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${titleClass}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={ formValues.title }
            onChange={ onInputChange }
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>
        {/* DESCRIPCION */}
        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={ formValues.notes }
            onChange={ onInputChange }
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>
        {/* BOTON SUBMIT */}
        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
