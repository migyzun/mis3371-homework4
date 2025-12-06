/*
Program name: homework3.js
Name: Jose Miguel Zuniga
Date Created: 10/20/25
Date Last Edited: 11/14/2025
Version: 2.2
Description: Homework 3 JS
*/

// Display today's date
const currentDateElement = document.getElementById("currentDate");
const currentDate = new Date().toLocaleDateString();
currentDateElement.innerHTML = currentDate;

// Update pain level display
document.getElementById("slider").addEventListener("input", function() {
    const painLevel = this.value;
    document.getElementById("painValue").textContent = painLevel;
});

// Update pain level function
function updatePainLevel(value) {
    document.getElementById("painValue").textContent = value;
}

// Display form input values 
function displayInput() {
    var formContents = new FormData(document.getElementById("patientForm"));
    var formOutput = "<table class='output'><thead><tr><th colspan='2'>Your Information</th></tr></thead><tbody>";
    
    for (var [key, value] of formContents.entries()) {
        var input = document.querySelector(`[name="${key}"]`);
        if (!input) continue;
        var type = input.type;

        if (type === "checkbox" && !input.checked) continue;
        if (type === "radio" && !input.checked) continue;
        
        switch (type) {
            case "checkbox":
                formOutput += `<tr><td align='right'>${key}</td><td class='outputdata'>&#x2713;</td></tr>`;
                break;
            case "file":
                formOutput += `<tr><td align='right'>${key}</td><td class='outputdata'>${value.name}</td></tr>`;
                break;
            case "password":
                formOutput += `<tr><td align='right'>${key}</td><td class='outputdata'>${"*".repeat(value.length)}</td></tr>`;
                break;
            default:
                formOutput += `<tr><td align='right'>${key}</td><td class='outputdata'>${value}</td></tr>`;
                break;
        }
    }

    document.getElementById("reviewArea").innerHTML = formOutput + "</tbody></table>";
}

// Validate user ID
function validateUserID() {
    var userIDInput = document.getElementById("userID");
    var userID = userIDInput.value.toLowerCase();
    var userIDError = document.getElementById("userIDError");
    userIDError.textContent = "";

    if (userID.length === 0) {
        return false;
    }
    if (userID.length < 5 || userID.length > 20) {
        userIDError.textContent = "ERROR: Username must be between 5 and 20 characters.";
        return false;
    }
    if (!isNaN(userID.charAt(0))) {
        userIDError.textContent = "ERROR: Username cannot start with a number.";
        return false;
    }
    var userIDPattern = /^[a-z0-9_-]+$/;
    if (!userIDPattern.test(userID)) {
        userIDError.textContent = "ERROR: Username can only contain letters, numbers, underscores, or dashes.";
        return false;
    }
    userIDInput.value = userID.toLowerCase();
    checkFormValidity();
    return true;
}

// Validate Password
function validatePassword() {
    var password = document.getElementById("password").value;
    var passwordError = document.getElementById("passwordError");
    var userID = document.getElementById("userID").value.toLowerCase();

    passwordError.textContent = ""; 
    var isValid = true;

    // Pattern to check for at least one lowercase, one uppercase, and one digit
    var passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;

    if (password.length === 0) {
        return false;
    }
    if (password.length < 8 || password.length > 30) {
        passwordError.textContent = "ERROR: Password must be between 8 and 30 characters long.";
        isValid = false;
    } 
    else if (!passwordPattern.test(password)) {
        passwordError.textContent = "ERROR: Password must include at least one uppercase letter, one lowercase letter, and one digit.";
        isValid = false;
    }
    else if (password.toLowerCase() === userID) {
        passwordError.textContent = "ERROR: Password cannot be the same as the Username.";
        isValid = false;
    }
    else if (userID.length > 0 && password.toLowerCase().includes(userID)) {
        passwordError.textContent = "ERROR: Password cannot contain your username.";
        isValid = false;
    }

    checkFormValidity();
    return isValid;
}

// Validate Password Match
function validatePasswordMatch() {
    var password = document.getElementById("password").value;
    var reEnteredPassword = document.getElementById("re_password").value;
    var passwordMatchError = document.getElementById("passwordMatchError");

    passwordMatchError.textContent = ""; 
    var isValid = true;

    if (reEnteredPassword.length === 0) {
        return false;
    }
    if (password !== reEnteredPassword) {
        passwordMatchError.textContent = "ERROR: Passwords do not match.";
        isValid = false;
    }

    checkFormValidity();
    return isValid;
}

// Validate first name
function validateFirstName() {
    var firstName = document.getElementById("firstName").value;
    var firstNameError = document.getElementById("firstNameError");
    firstNameError.textContent = "";
    var namePattern = /^[A-Za-z'-]+$/;

    if (firstName.length === 0) {
        return false;
    }
    if (firstName.length < 1 || firstName.length > 30) {
        firstNameError.textContent = "ERROR: First name must be 1 to 30 characters.";
        return false;
    }
    if (!namePattern.test(firstName)) {
        firstNameError.textContent = "ERROR: Please enter a valid first name (letters, apostrophes, and dashes only).";
        return false;
    }
    checkFormValidity();
    return true;
}

// Validate Middle Initial
function validateMiddleInitial() {
    var middleInitial = document.getElementById("middleInitial").value;
    var middleInitialError = document.getElementById("middleInitialError");
    middleInitialError.textContent = "";

    if (middleInitial && !/^[A-Za-z]$/.test(middleInitial)) {
        middleInitialError.textContent = "ERROR: Middle initial must be a single letter.";
        return false;
    }
    checkFormValidity();
    return true;
}

// Validate last name
function validateLastName() {
    var lastName = document.getElementById("lastName").value;
    var lastNameError = document.getElementById("lastNameError");
    lastNameError.textContent = "";
    var lastNamePattern = /^[A-Za-z' -]{1,30}$/;

    if (lastName.length === 0) {
        return false;
    }
    if (!lastNamePattern.test(lastName)) {
        lastNameError.textContent = "ERROR: Please enter a valid last name (1 to 30 characters, letters, apostrophes, dashes only).";
        return false;
    }
    checkFormValidity();
    return true;
}

// Validate date of birth with 3 separate fields
function dobValidation() {
    const month = document.getElementById("dobMonth").value;
    const day = document.getElementById("dobDay").value;
    const year = document.getElementById("dobYear").value;
    const error = document.getElementById("dobError");
    error.textContent = "";

    // Check if all fields are filled
    if (month === "" || day === "" || year === "") {
        if (month !== "" || day !== "" || year !== "") {
            error.textContent = "ERROR: Please complete all date fields.";
        }
        return false;
    }

    // Validate month
    const monthNum = parseInt(month);
    if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
        error.textContent = "ERROR: Month must be between 01 and 12.";
        return false;
    }

    // Validate day
    const dayNum = parseInt(day);
    if (isNaN(dayNum) || dayNum < 1 || dayNum > 31) {
        error.textContent = "ERROR: Day must be between 01 and 31.";
        return false;
    }

    // Validate year
    const yearNum = parseInt(year);
    if (isNaN(yearNum) || year.length !== 4) {
        error.textContent = "ERROR: Year must be 4 digits.";
        return false;
    }

    // Create date object and validate
    const date = new Date(yearNum, monthNum - 1, dayNum);
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 120);

    // Check if date is valid
    if (date.getMonth() !== monthNum - 1 || date.getDate() !== dayNum) {
        error.textContent = "ERROR: Invalid date.";
        return false;
    }

    // Check if date is in the future
    if (date > new Date()) {
        error.textContent = "ERROR: Date cannot be in the future.";
        return false;
    }
    
    // Check if date is more than 120 years ago
    if (date < maxDate) {
        error.textContent = "ERROR: Date cannot be more than 120 years ago.";
        return false;
    }

    checkFormValidity();
    return true;
}

// SSN Format Function
function formatSSN() {
    var ssnInput = document.getElementById("ssn");
    var ssnError = document.getElementById("ssnError");
    var input = ssnInput.value.replace(/\D/g, "").slice(0, 9);
    ssnInput.value = input.length > 0 ? input.slice(0, 3) + (input.length > 3 ? "-" + input.slice(3, 5) : "") + (input.length > 5 ? "-" + input.slice(5, 9) : "") : "";
}

// SSN Validation Function
function validateSSN() {
    var ssnInput = document.getElementById("ssn");
    var ssnError = document.getElementById("ssnError");
    var valid = ssnInput.value.replace(/\D/g, "").length === 9;
    ssnError.textContent = valid ? "" : "ERROR: Enter exactly 9 digits for a valid SSN.";
    checkFormValidity();
    return valid;
}

// Validate the address 1
function validateAddress() {
    var addressInput = document.getElementById("address1");
    var addressError = document.getElementById("addressError");
    var address = addressInput.value.trim();
   
    if (address.length === 0) {
        return false;
    }
    if (address.length < 2 || address.length > 30) {
        addressError.textContent = "ERROR: Address must be between 2 and 30 characters.";
        addressInput.setCustomValidity("Address must be between 2 and 30 characters.");
        return false;
    } else {
        addressError.textContent = ""; 
        addressInput.setCustomValidity(""); 
    }
    checkFormValidity();
    return true;
}

// Validate Address 2 length 
function validateAddress2() {
    var address2Input = document.getElementById("address2");
    var address2Error = document.getElementById("address2Error");
    var address2 = address2Input.value.trim();

    if (address2.length > 0 && (address2.length < 2 || address2.length > 30)) {
        address2Error.textContent = "ERROR: Address 2 must be between 2 and 30 characters.";
        address2Input.setCustomValidity("Address 2 must be between 2 and 30 characters.");
        return false;
    } else {
        address2Error.textContent = ""; 
        address2Input.setCustomValidity(""); 
    }
    checkFormValidity();
    return true;
}

// Validate City 
function validateCity() {
    var cityInput = document.getElementById("city");
    var cityError = document.getElementById("cityError");
    var city = cityInput.value.trim();

    if (city.length === 0) {
        return false;
    }
    if (city.length < 2 || city.length > 30) {
        cityError.textContent = "ERROR: City must be between 2 and 30 characters.";
        cityInput.setCustomValidity("City must be between 2 and 30 characters.");
        return false;
    } else {
        cityError.textContent = ""; 
        cityInput.setCustomValidity(""); 
    }
    checkFormValidity();
    return true;
}

// Validate State
function validateState() {
    var state = document.getElementById("state").value;
    var stateError = document.getElementById("stateError");
    stateError.textContent = "";

    if (state === "") {
        stateError.textContent = "ERROR: Please select a state.";
        return false;
    }
    checkFormValidity();
    return true;
}

// Validate Zip Code
function validateZipCode() {
    var zipCode = document.getElementById("zipCode").value.trim();
    var zipCodeError = document.getElementById("zipCodeError");
    zipCodeError.textContent = ""; 

    if (zipCode.length === 0) {
        return false;
    }
    if (!/^\d{5}$/.test(zipCode)) {
        zipCodeError.textContent = "ERROR: Please enter a valid 5-digit Zip Code.";
        return false;
    }

    checkFormValidity();
    return true;
}

// Validate Email
function validateEmail() {
    var email = document.getElementById("email").value;
    var emailError = document.getElementById("emailError");
    emailError.textContent = "";
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.length === 0) {
        return false;
    }
    if (!emailPattern.test(email)) {
        emailError.textContent = "ERROR: Please enter a valid email address (name@domain.tld).";
        return false;
    }

    checkFormValidity();
    return true;
}

// Force email to lowercase as user types
document.getElementById('email').addEventListener('input', function() {
    this.value = this.value.toLowerCase();
});

// Format the phone number as xxx-xxx-xxxx
function formatPhoneNumber() {
    var phoneInput = document.getElementById("phoneNumber");
    var input = phoneInput.value.replace(/\D/g, "").slice(0, 10);
    phoneInput.value = input.length > 0 ? input.slice(0, 3) + (input.length > 3 ? "-" + input.slice(3, 6) : "") + (input.length > 6 ? "-" + input.slice(6, 10) : "") : "";
}

// Validate phone number
function validatePhoneNumber() {
    var phoneInput = document.getElementById("phoneNumber");
    var phoneError = document.getElementById("phoneError");
    var valid = phoneInput.value.replace(/\D/g, "").length === 10;
    phoneError.textContent = valid ? "" : "ERROR: Please enter a valid 10-digit phone number.";
    checkFormValidity();
    return valid;
}

// Validate Gender
function validateGender() {
    var gender = document.querySelector('input[name="msex"]:checked');
    var genderError = document.getElementById("genderError");
    genderError.textContent = "";

    if (!gender) {
        genderError.textContent = "ERROR: Please select a gender.";
        return false;
    }
    checkFormValidity();
    return true;
}

// Validate Marital Status
function validateMaritalStatus() {
    var marital = document.querySelector('input[name="marital_status"]:checked');
    var maritalError = document.getElementById("maritalError");
    maritalError.textContent = "";

    if (!marital) {
        maritalError.textContent = "ERROR: Please select your marital status.";
        return false;
    }
    checkFormValidity();
    return true;
}

// Validate Insurance
function validateInsurance() {
    var insurance = document.querySelector('input[name="insurance"]:checked');
    var insuranceError = document.getElementById("insuranceError");
    insuranceError.textContent = "";

    if (!insurance) {
        insuranceError.textContent = "ERROR: Please select if you have insurance.";
        return false;
    }
    checkFormValidity();
    return true;
}

// Validate Description/Textarea
function validateDescription() {
    var description = document.getElementById("description").value;
    var descriptionError = document.getElementById("descriptionError");
    descriptionError.textContent = "";

    // Check for double quotes
    if (description.includes('"')) {
        descriptionError.textContent = "ERROR: Please avoid using double quotes.";
        return false;
    }
    checkFormValidity();
    return true;
}

// Check form validity and show/hide submit button automatically
function checkFormValidity() {
    let isValid = true;

    // Check all required fields - only validate if they have content
    var userID = document.getElementById("userID").value;
    var password = document.getElementById("password").value;
    var rePassword = document.getElementById("re_password").value;
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var dobMonth = document.getElementById("dobMonth").value;
    var dobDay = document.getElementById("dobDay").value;
    var dobYear = document.getElementById("dobYear").value;
    var ssn = document.getElementById("ssn").value.replace(/\D/g, "");
    var address1 = document.getElementById("address1").value.trim();
    var city = document.getElementById("city").value.trim();
    var state = document.getElementById("state").value;
    var zipCode = document.getElementById("zipCode").value.trim();
    var email = document.getElementById("email").value;
    var phoneNumber = document.getElementById("phoneNumber").value.replace(/\D/g, "");
    var gender = document.querySelector('input[name="msex"]:checked');
    var marital = document.querySelector('input[name="marital_status"]:checked');
    var insurance = document.querySelector('input[name="insurance"]:checked');

    // Check if all required fields are filled
    if (!userID || userID.length < 5 || userID.length > 20) isValid = false;
    if (!password || password.length < 8 || password.length > 30) isValid = false;
    if (!rePassword || password !== rePassword) isValid = false;
    if (!firstName || firstName.length < 1) isValid = false;
    if (!lastName || lastName.length < 1) isValid = false;
    if (!dobMonth || !dobDay || !dobYear) isValid = false;
    if (ssn.length !== 9) isValid = false;
    if (!address1 || address1.length < 2) isValid = false;
    if (!city || city.length < 2) isValid = false;
    if (!state) isValid = false;
    if (zipCode.length !== 5) isValid = false;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) isValid = false;
    if (phoneNumber.length !== 10) isValid = false;
    if (!gender) isValid = false;
    if (!marital) isValid = false;
    if (!insurance) isValid = false;

    // Also check that there are no error messages displayed
    var errorElements = document.querySelectorAll('.error-message');
    for (var i = 0; i < errorElements.length; i++) {
        if (errorElements[i].textContent.trim() !== "") {
            isValid = false;
            break;
        }
    }

    // Show or hide submit button
    var submitButton = document.getElementById("submitButton");
    if (isValid) {
        submitButton.style.display = "inline-block";
    } else {
        submitButton.style.display = "none";
    }

    return isValid;
}

// Validate entire form when Validate button is clicked
function validateForm() {
    let isValid = true;
    let errorMessages = [];

    // Run all validations and collect errors
    if (!validateUserID()) { isValid = false; errorMessages.push("Username"); }
    if (!validatePassword()) { isValid = false; errorMessages.push("Password"); }
    if (!validatePasswordMatch()) { isValid = false; errorMessages.push("Password Match"); }
    if (!validateFirstName()) { isValid = false; errorMessages.push("First Name"); }
    if (!validateMiddleInitial()) { isValid = false; errorMessages.push("Middle Initial"); }
    if (!validateLastName()) { isValid = false; errorMessages.push("Last Name"); }
    if (!dobValidation()) { isValid = false; errorMessages.push("Date of Birth"); }
    if (!validateSSN()) { isValid = false; errorMessages.push("SSN"); }
    if (!validateAddress()) { isValid = false; errorMessages.push("Address 1"); }
    if (!validateAddress2()) { isValid = false; errorMessages.push("Address 2"); }
    if (!validateCity()) { isValid = false; errorMessages.push("City"); }
    if (!validateState()) { isValid = false; errorMessages.push("State"); }
    if (!validateZipCode()) { isValid = false; errorMessages.push("Zip Code"); }
    if (!validateEmail()) { isValid = false; errorMessages.push("Email"); }
    if (!validatePhoneNumber()) { isValid = false; errorMessages.push("Phone Number"); }
    if (!validateGender()) { isValid = false; errorMessages.push("Gender"); }
    if (!validateMaritalStatus()) { isValid = false; errorMessages.push("Marital Status"); }
    if (!validateInsurance()) { isValid = false; errorMessages.push("Insurance"); }
    if (!validateDescription()) { isValid = false; errorMessages.push("Description"); }

    // Display validation summary
    var submitButton = document.getElementById("submitButton");
    var validationSummary = document.getElementById("validationSummary");

    if (isValid) {
        submitButton.style.display = "inline-block";
        validationSummary.innerHTML = "<p style='color: green; font-weight: bold; margin-top: 20px;'>✓ All fields are valid! You may now submit the form.</p>";
    } else {
        submitButton.style.display = "none";
        validationSummary.innerHTML = "<p style='color: red; font-weight: bold; margin-top: 20px;'>✗ Please correct the following fields: " + errorMessages.join(", ") + "</p>";
    }

    return isValid;
}

//Clears all errors when reset is clicked
function clearAllErrors() {
    document.getElementById("userIDError").textContent = "";
    document.getElementById("passwordError").textContent = "";
    document.getElementById("passwordMatchError").textContent = "";
    document.getElementById("firstNameError").textContent = "";
    document.getElementById("middleInitialError").textContent = "";
    document.getElementById("lastNameError").textContent = "";
    document.getElementById("dobError").textContent = "";
    document.getElementById("ssnError").textContent = "";
    document.getElementById("addressError").textContent = "";
    document.getElementById("address2Error").textContent = "";
    document.getElementById("cityError").textContent = "";
    document.getElementById("stateError").textContent = "";
    document.getElementById("zipCodeError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("phoneError").textContent = "";
    document.getElementById("genderError").textContent = "";
    document.getElementById("maritalError").textContent = "";
    document.getElementById("insuranceError").textContent = "";
    document.getElementById("descriptionError").textContent = "";
    document.getElementById("validationSummary").innerHTML = "";
    document.getElementById("reviewArea").innerHTML = "";
    document.getElementById("submitButton").style.display = "none";
}
