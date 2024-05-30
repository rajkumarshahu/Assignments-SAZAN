import React from "react";
import PropTypes from "prop-types";

const FormInput = ({
	label,
	type,
	id,
	placeholder,
	value,
	onChange,
	isInvalid,
}) => (
	<div className="mb-3">
		<label htmlFor={id} className="form-label">
			{label}
		</label>
		<input
			type={type}
			className={`form-control ${isInvalid ? "is-invalid" : ""}`}
			id={id}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
		/>
		{isInvalid && (
			<div className="invalid-feedback">
				This field is required and must be valid.
			</div>
		)}
	</div>
);

FormInput.propTypes = {
	label: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	onChange: PropTypes.func.isRequired,
	isInvalid: PropTypes.bool.isRequired,
};

export default FormInput;
