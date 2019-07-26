import React from 'react';
import { fromJS } from 'immutable';
import { Field, reduxForm } from 'redux-form/immutable';

class FrmEstados extends React.Component {
	renderError({ error, touched }) {
		if (touched && error) {
			return (
				<div className="ui error message">
					<div className="header">{error}</div>
				</div>
			);
		}
	}

	renderInput = ({ input, label, meta }) => {
		const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
		return (
			<div className={className}>
				<label>{label}</label>
				<input {...input} autoComplete="off" />
				{this.renderError(meta)}
			</div>
		);
	};

	onSubmit = formValues => {
		let data;
		if (this.props.createData) {
			data = fromJS({
				flag: 'create',
			});
		} else {
			data = fromJS({
				flag: 'update',
			});
		}

		const newData = formValues.mergeDeep(data);
		this.props.onSubmit(newData.toJS());
	};

	render() {
		return (
			<form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
				<Field name="Nombre" component={this.renderInput} label="Nombre" />
				<Field name="Descripcion" component={this.renderInput} label="Descripcion" />
				<Field name="IdEstadoAnterior" component={this.renderInput} label="Estado Anterior" />
				<Field name="IdEstadoSiguiente" component={this.renderInput} label="Estado Siguiente" />
				<div
					style={{
						bottom: '0',
						width: '100%',
						height: '60px',
					}}
				>
					<button className="ui button primary">Guardar</button>
				</div>
			</form>
		);
	}
}

const validate = values => {
	const errors = {};
	if (!values.get('title')) {
		errors.title = 'Required';
	} else if (values.get('title').length > 15) {
		errors.title = 'Must be 5 characters or less';
	}

	return errors;
};

export default reduxForm({
	form: 'formEstados',
	validate,
	enableReinitialize: true,
})(FrmEstados);
