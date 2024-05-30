import React from "react";
import PropTypes from "prop-types";

const FormRadioGroup = ({ label, name, options, value, onChange, isValid }) => {
	const groupClass = isValid ? "" : "is-invalid";

	return (
		<div className={`bg-white p-4 mt-4 rounded ${groupClass}`}>
			<h4>{label}</h4>
			{options.map((option) => (
				<div className="form-check" key={option.value}>
					<input
						className={`form-check-input ${groupClass}`}
						type="radio"
						name={name}
						id={option.id}
						value={option.value}
						checked={value === option.value.toString()}
						onChange={onChange}
					/>
					<label className="form-check-label" htmlFor={option.id}>
						{option.label}
					</label>
				</div>
			))}
			{!isValid && (
				<div className="invalid-feedback">This field is required.</div>
			)}
		</div>
	);
};

FormRadioGroup.propTypes = {
	label: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
				.isRequired,
			label: PropTypes.string.isRequired,
		})
	).isRequired,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	onChange: PropTypes.func.isRequired,
	isValid: PropTypes.bool.isRequired,
};

export default FormRadioGroup;
