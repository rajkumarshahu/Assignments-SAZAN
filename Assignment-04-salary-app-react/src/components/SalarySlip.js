import React from "react";
import PropTypes from "prop-types";

const SalarySlip = ({
	employeeName,
	grossPay,
	additions,
	deductions,
	finalSalary,
}) => (
	<div className="results-container p-4 bg-white rounded shadow-sm">
		<h3 className="text-center mb-4">Salary Slip</h3>
		<p className="mb-3">
			Employee Name: <span className="fw-bold">{employeeName}</span>
		</p>
		<p className="mb-3">
			Gross Salary: <span className="fw-bold">${grossPay.toFixed(2)}</span>
		</p>
		<p className="mb-3">
			Additions: <span className="fw-bold">${additions.toFixed(2)}</span>
		</p>
		<p className="mb-3">
			Deductions: <span className="fw-bold">${deductions.toFixed(2)}</span>
		</p>
		<p className="mb-3">
			Final Salary: <span className="fw-bold">${finalSalary.toFixed(2)}</span>
		</p>
	</div>
);

SalarySlip.propTypes = {
	employeeName: PropTypes.string.isRequired,
	grossPay: PropTypes.number.isRequired,
	additions: PropTypes.number.isRequired,
	deductions: PropTypes.number.isRequired,
	finalSalary: PropTypes.number.isRequired,
};

export default SalarySlip;
