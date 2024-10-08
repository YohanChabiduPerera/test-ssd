import DOMPurify from "dompurify"; // For sanitization

// Encodes input to prevent XSS
export const encodeInput = (input) => {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(input));
  return div.innerHTML;
};

// Sanitize and encode inputs to prevent XSS
export const sanitizeAndEncodeInputs = (inputs) => {
  const sanitizedInputs = {
    userName: DOMPurify.sanitize(inputs.userName),
    password: DOMPurify.sanitize(inputs.password),
    contact: DOMPurify.sanitize(inputs.contact),
    address: DOMPurify.sanitize(inputs.address),
  };

  const encodedInputs = {
    userName: encodeInput(sanitizedInputs.userName),
    password: encodeInput(sanitizedInputs.password),
    contact: encodeInput(sanitizedInputs.contact),
    address: encodeInput(sanitizedInputs.address),
  };

  return encodedInputs;
};

// Define validation messages separately
const errorMessages = {
  invalidEmail: "Invalid email format. Please enter a valid email.",
  invalidPassword:
    "Password must be 6-20 characters, include at least one uppercase letter, one number, and one special character.",
  invalidContact: "Contact number must be exactly 10 digits.",
  invalidAddressLength: "Address must be at least 10 characters long.",
  invalidAddressReq: "Address must contain both letters and numbers.",
  invalidAddressChar: "Address contains invalid special characters.",
};

// Form validation logic
export const validateForm = (inputs) => {
  const errors = {};

  if (!inputs.userName.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)) {
    errors.userName = errorMessages.invalidEmail;
  }

  if (
    !inputs.password.match(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/
    )
  ) {
    errors.password = errorMessages.invalidPassword;
  }

  if (!inputs.contact.match(/^\d{10}$/)) {
    errors.contact = errorMessages.invalidContact;
  }

  const addressValue = inputs.address.trim();
  if (addressValue.length < 10) {
    errors.address = errorMessages.invalidAddressLength;
  } else if (!/\d/.test(addressValue) || !/[a-zA-Z]/.test(addressValue)) {
    errors.address = errorMessages.invalidAddressReq;
  } else if (/[^a-zA-Z0-9\s,-]/.test(addressValue)) {
    errors.address = errorMessages.invalidAddressChar;
  }

  return errors;
};

