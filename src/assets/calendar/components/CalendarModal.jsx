import React, { useState } from "react";
import { addHours } from "date-fns";

import Modal from "react-modal";

import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
registerLocale('es', es)

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

  //Estado para abrir el modal
  const [isOpen, setIsOpen] = useState(true);
  //Funcion para cerrar el modal
  const onCloseModal = () => {
    setIsOpen(false);
  };
  //Estado valores iniciales formulario
  const [formValues, setFormValues] = useState({
    title: 'Jefferson',
    notes: 'Pulido Company',
    start: new Date(),
    end: addHours(new Date(), 2)
  })
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

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container">
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
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className="form-control"
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

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
