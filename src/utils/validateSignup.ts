export function validateSignup(userInfo: Record<string, string>) {
  const errors: Record<string, string> = {};
  const emailRegex = /^\S+@\S+\.\S+$/;
  const phoneRegex = /^\+?\d{10,15}$/;

  // First Name
  if (!userInfo.firstname) {
    errors.firstname = "First name is required.";
  } else if (userInfo.firstname.length < 2) {
    errors.firstname = "First name must be at least 2 characters.";
  }

  // Last Name
  if (!userInfo.lastname) {
    errors.lastname = "Last name is required.";
  } else if (userInfo.lastname.length < 2) {
    errors.lastname = "Last name must be at least 2 characters.";
  }

  // Username
  if (!userInfo.username) {
    errors.username = "Username is required.";
  } else if (userInfo.username.length < 3) {
    errors.username = "Username must be at least 3 characters.";
  }

  // Email
  if (!userInfo.email) {
    errors.email = "Email is required.";
  } else if (!emailRegex.test(userInfo.email)) {
    errors.email = "Please enter a valid email address.";
  }

  // Password
  if (!userInfo.password) {
    errors.password = "Password is required.";
  } else if (userInfo.password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }

  // Gender
  if (!userInfo.gender) {
    errors.gender = "Please select your gender.";
  }

  // Date of Birth
  if (!userInfo.dateOfBirth) {
    errors.dateOfBirth = "Date of birth is required.";
  }

  // Country
  if (!userInfo.country) {
    errors.country = "Country is required.";
  }

  // State
  if (!userInfo.state) {
    errors.state = "State is required.";
  }

  // City
  if (!userInfo.city) {
    errors.city = "City is required.";
  }

  // Street
  if (!userInfo.street) {
    errors.street = "Street is required.";
  }

  // Emergency Contact Name
  if (!userInfo.emergencyName) {
    errors.emergencyName = "Emergency contact name is required.";
  }

  // Emergency Phone
  if (!userInfo.emergencyPhone) {
    errors.emergencyPhone = "Emergency phone number is required.";
  } else if (!phoneRegex.test(userInfo.emergencyPhone)) {
    errors.emergencyPhone = "Please enter a valid phone number (10-15 digits).";
  }

  // Relationship
  if (!userInfo.relationship) {
    errors.relationship = "Please select a relationship.";
  }

  return errors;
}
