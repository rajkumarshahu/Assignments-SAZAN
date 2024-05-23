document.addEventListener("DOMContentLoaded", () => {
	const form = document.querySelector("form");
	const alertPlaceholder = document.querySelector(".alert-placeholder");

	const showAlert = (message, type) => {
		const alertHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                             <div>${message}</div>
                             <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                           </div>`;
		const wrapper = document.createElement("div");
		wrapper.innerHTML = alertHTML;
		alertPlaceholder.append(wrapper);
	};

	const clearAlerts = () => {
		alertPlaceholder.innerHTML = "";
	};

	const clearValidations = () => {
		form
			.querySelectorAll(".is-invalid")
			.forEach((field) => field.classList.remove("is-invalid"));
	};

	const invalidateField = (field) => {
		if (field && !field.classList.contains("is-invalid")) {
			field.classList.add("is-invalid");
		}
	};

	const getFormField = (id) => document.getElementById(id).value.trim();

	const getFieldValues = () => ({
		employeeName: getFormField("employeeName"),
		grossPay: parseFloat(getFormField("grossPay")),
		bonus: parseFloat(getFormField("bonus")) || 0,
		allowance: parseFloat(getFormField("allowance")) || 0,
		incomeTax: parseFloat(getFormField("incomeTax")),
		employmentInsurance: parseFloat(getFormField("employmentInsurance")) || 0,
		pensionPlan: parseFloat(getFormField("pensionPlan")) || 0,
		gender: document.querySelector('input[name="genderOptions"]:checked')
			?.value,
		dependents: parseInt(
			document.querySelector('input[name="dependentsOptions"]:checked')?.value
		),
	});

	const validateForm = () => {
		const values = getFieldValues();
		let invalid = false;

		const validateNumericField = (key) => {
			const value = values[key];
			if (isNaN(value) || value <= 0) {
				invalidateField(document.getElementById(key));
				return true;
			}
			return false;
		};

		if (!values.employeeName) {
			invalidateField(document.getElementById("employeeName"));
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
			invalid = true;
		}
		if (!values.dependents) {
			showAlert("Please select the number of dependents.", "warning");
			invalid = true;
		}

		if (invalid) {
			showAlert("Please correct the highlighted fields.", "warning");
		}
		return { invalid, values };
	};

	const showResults = (
		employeeName,
		grossPay,
		additions,
		deductions,
		finalSalary
	) => {
		document.getElementById("resultEmployeeName").textContent = employeeName;
		document.getElementById("resultGrossSalary").textContent =
			grossPay.toFixed(2);
		document.getElementById("resultAdditions").textContent =
			additions.toFixed(2);
		document.getElementById("resultDeductions").textContent =
			deductions.toFixed(2);
		document.getElementById("resultFinalSalary").textContent =
			finalSalary.toFixed(2);
		document.getElementById("results").style.display = "block";
	};

	form.addEventListener("submit", (e) => {
		e.preventDefault();
		clearAlerts();
		clearValidations();
		const { invalid, values } = validateForm();
		if (invalid) return;

		let deductions =
			values.grossPay * (values.employmentInsurance + values.pensionPlan);
		let additions = values.bonus + values.allowance;
		values.grossPay += additions;

		if (values.gender === "female") {
			values.incomeTax = Math.max(0, values.incomeTax - 1);
		}
		if ([3, 4].includes(values.dependents)) {
			values.incomeTax -= 2 * values.dependents;
		}

		let incomeTaxDeduction = values.grossPay * (values.incomeTax / 100);
		let netSalary = values.grossPay - (deductions + incomeTaxDeduction);

		showResults(
			values.employeeName,
			values.grossPay,
			additions,
			deductions,
			netSalary
		);
	});
});
