import React from "react";
import PropTypes from "prop-types";

const Alert = ({ message, type, onClose }) => (
	<div
		className={`alert alert-${type} alert-dismissible fade show`}
		role="alert"
	>
		{message}
		<button
			type="button"
			className="btn-close"
			aria-label="Close"
			onClick={onClose}
		></button>
	</div>
);

Alert.propTypes = {
	message: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	onClose: PropTypes.func.isRequired,
};

export default Alert;
