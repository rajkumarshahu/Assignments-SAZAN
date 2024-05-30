import React, { useState } from "react";
import Alert from "./components/Alert";
import FormInput from "./components/FormInput";
import FormRadioGroup from "./components/FormRadioGroup";
import SalarySlip from "./components/SalarySlip";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./styles.css";

const App = () => {
	const [alerts, setAlerts] = useState([]);
	const [results, setResults] = useState(null);
	const [formValues, setFormValues] = useState({
		employeeName: "",
		grossPay: "",
		bonus: "",
		allowance: "",
		incomeTax: "",
		employmentInsurance: "",
		pensionPlan: "",
		gender: "",
		dependents: "",
	});
	const [validationErrors, setValidationErrors] = useState({
		employeeName: false,
		grossPay: false,
		bonus: false,
		allowance: false,
		incomeTax: false,
		employmentInsurance: false,
		pensionPlan: false,
		gender: false,
		dependents: false,
	});

	const showAlert = (message, type) => {
		const id = Math.floor(Math.random() * 1001);
		setAlerts((prevAlerts) => [...prevAlerts, { id, message, type }]);
	};

	const clearAlert = (id) => {
		setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
	};

	const clearAlerts = () => {
		setAlerts([]);
	};

	const handleInputChange = (e) => {
		const { id, name, value, type } = e.target;
		setFormValues({
			...formValues,
			[type === "radio" ? name : id]: value,
		});
		setValidationErrors({
			...validationErrors,
			[type === "radio" ? name : id]: false,
		});
	};

	const validateForm = () => {
		clearAlerts(); // Clear alerts at the beginning of validation
		const values = formValues;
		let invalid = false;
		const newValidationErrors = { ...validationErrors };

		const validateNumericField = (key) => {
			const value = parseFloat(values[key]);
			if (isNaN(value) || value <= 0) {
				newValidationErrors[key] = true;
				return true;
			}
			return false;
		};

		if (!values.employeeName.trim()) {
			newValidationErrors.employeeName = true;
			invalid = true;
		}

		// Validate all numeric fields
		const numericFields = [
			"grossPay",
			"bonus",
			"allowance",
			"incomeTax",
			"employmentInsurance",
			"pensionPlan",
		];
		numericFields.forEach((key) => {
			if (validateNumericField(key)) {
				invalid = true;
			}
		});

		if (!values.gender) {
			showAlert("Please select a gender.", "warning");
			newValidationErrors.gender = true;
			invalid = true;
		}

		if (
			values.dependents === "" ||
			values.dependents === null ||
			values.dependents === undefined
		) {
			showAlert("Please select the number of dependents.", "warning");
			newValidationErrors.dependents = true;
			invalid = true;
		}

		if (invalid) {
			showAlert("Please correct the highlighted fields.", "warning");
		}
		setValidationErrors(newValidationErrors);
		return { invalid, values };
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		clearAlerts();
		const { invalid, values } = validateForm();
		if (invalid) return;

		let grossPay = parseFloat(values.grossPay);
		let bonus = parseFloat(values.bonus) || 0;
		let allowance = parseFloat(values.allowance) || 0;
		let incomeTax = parseFloat(values.incomeTax) || 0;
		let employmentInsurance = parseFloat(values.employmentInsurance) || 0;
		let pensionPlan = parseFloat(values.pensionPlan) || 0;

		let additions = bonus + allowance;
		grossPay += additions;

		if (values.gender === "female") {
			incomeTax = Math.max(0, incomeTax - 1);
		}
		if ([2, 3, 4].includes(parseInt(values.dependents))) {
			incomeTax -= 2 * parseInt(values.dependents);
		}

		let deductions = (grossPay * (employmentInsurance + pensionPlan)) / 100;
		let incomeTaxDeduction = (grossPay * incomeTax) / 100;
		let netSalary = grossPay - (deductions + incomeTaxDeduction);

		setResults({
			employeeName: values.employeeName,
			grossPay,
			additions,
			deductions,
			finalSalary: netSalary,
		});
	};

	const saveAsPDF = () => {
		const doc = new jsPDF();
		const today = new Date().toLocaleDateString();

		doc.setFontSize(20);
		doc.text("XYZ Company", 105, 20, null, null, "center");
		doc.setFontSize(12);
		doc.text(`Date: ${today}`, 105, 30, null, null, "center");

		html2canvas(document.getElementById("results")).then((canvas) => {
			const imgData = canvas.toDataURL("image/png");
			const imgProps = doc.getImageProperties(imgData);
			const pdfWidth = doc.internal.pageSize.getWidth();
			const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

			doc.addImage(imgData, "PNG", 15, 40, pdfWidth - 30, pdfHeight);
			doc.save(`${results.employeeName}-salary-slip-${today}.pdf`);
		});
	};

	return (
		<div className="container p-5 mt-5 bg-light rounded shadow-sm">
			<h2 className="text-center mb-4">Salary Calculator</h2>
			<div className="alert-placeholder">
				{alerts.map((alert) => (
					<Alert
						key={alert.id}
						message={alert.message}
						type={alert.type}
						onClose={() => clearAlert(alert.id)}
					/>
				))}
			</div>

			<form onSubmit={handleSubmit}>
				<FormInput
					label="Enter Employee Name:"
					type="text"
					id="employeeName"
					placeholder="Enter Employee Name"
					value={formValues.employeeName}
					onChange={handleInputChange}
					isInvalid={validationErrors.employeeName}
				/>
				<FormInput
					label="Enter Your Gross Pay:"
					type="number"
					id="grossPay"
					placeholder="Enter Gross Salary"
					value={formValues.grossPay}
					onChange={handleInputChange}
					isInvalid={validationErrors.grossPay}
				/>
				<div className="section-bg bg-additions">
					<h4>Additions in Dollars:</h4>
					<FormInput
						label="Bonus $:"
						type="number"
						id="bonus"
						placeholder="Enter bonus"
						value={formValues.bonus}
						onChange={handleInputChange}
						isInvalid={validationErrors.bonus}
					/>
					<FormInput
						label="Allowance $:"
						type="number"
						id="allowance"
						placeholder="Enter allowance"
						value={formValues.allowance}
						onChange={handleInputChange}
						isInvalid={validationErrors.allowance}
					/>
				</div>
				<div className="section-bg bg-deductions">
					<h4>Deductions in Percentage:</h4>
					<FormInput
						label="Income Tax %:"
						type="number"
						step="0.01"
						id="incomeTax"
						placeholder="Enter Income Tax"
						value={formValues.incomeTax}
						onChange={handleInputChange}
						isInvalid={validationErrors.incomeTax}
					/>
					<FormInput
						label="Employment Insurance %:"
						type="number"
						step="0.01"
						id="employmentInsurance"
						placeholder="Enter Employment Insurance"
						value={formValues.employmentInsurance}
						onChange={handleInputChange}
						isInvalid={validationErrors.employmentInsurance}
					/>
					<FormInput
						label="Canada Pension Plan %:"
						type="number"
						step="0.01"
						id="pensionPlan"
						placeholder="Enter Canada Pension Plan"
						value={formValues.pensionPlan}
						onChange={handleInputChange}
						isInvalid={validationErrors.pensionPlan}
					/>
				</div>
				<div className="section-bg bg-gender">
					<FormRadioGroup
						label="Choose The Gender of Employee:"
						name="gender"
						options={[
							{ id: "genderMale", value: "male", label: "Male" },
							{ id: "genderFemale", value: "female", label: "Female" },
						]}
						value={formValues.gender}
						onChange={handleInputChange}
						isValid={!validationErrors.gender}
					/>
				</div>
				<div className="section-bg bg-dependents">
					<FormRadioGroup
						label="Choose The Number of Dependents:"
						name="dependents"
						options={[
							{ id: "dependentsNone", value: 0, label: "0" },
							{ id: "dependentsTwo", value: 2, label: "2" },
							{ id: "dependentsThree", value: 3, label: "3" },
							{ id: "dependentsFour", value: 4, label: "4" },
						]}
						value={formValues.dependents}
						onChange={handleInputChange}
						isValid={!validationErrors.dependents}
					/>
				</div>

				{results && (
					<div>
						<div id="results" className="mt-4">
							<SalarySlip
								employeeName={results.employeeName}
								grossPay={results.grossPay}
								additions={results.additions}
								deductions={results.deductions}
								finalSalary={results.finalSalary}
							/>
						</div>
						<div className="text-center">
							<button
								type="button"
								className="btn btn-secondary mt-3"
								onClick={saveAsPDF}
							>
								Save as PDF
							</button>
						</div>
					</div>
				)}

				<div className="text-center">
					<button type="submit" className="btn-custom mt-4">
						Calculate
					</button>
				</div>
			</form>
		</div>
	);
};

export default App;
