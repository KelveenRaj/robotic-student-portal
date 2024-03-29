import * as Yup from "yup";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password should be at least 6 characters")
    .required("Password is required"),
});

const signUpSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  dob: Yup.string().required("Date of Birth is required"),
  gender: Yup.string().required("Gender is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password should be at least 6 characters")
    .required("Password is required"),
  center: Yup.string().required("Center is required"),
  nric: Yup.string().required("My Kad / NRIC is required"),
  contact: Yup.string().required("Personal contact number is required"),
  race: Yup.string().required("Race is required"),
  personalEmail: Yup.string()
    .email("Invalid email address")
    .required("Personal Email is required"),
  moeEmail: Yup.string()
    .email("Invalid email address")
    .required("Moe Email is required"),
  school: Yup.string().required("School is required"),
  nationality: Yup.string().required("Nationality is required"),
  parentName: Yup.string().required("Parent Name is required"),
  relationship: Yup.string().required(
    "Parent/Guardian relationship is required"
  ),
  parentEmail: Yup.string()
    .email("Invalid email address")
    .required("Parent email is required"),
  parentContact: Yup.string().required("Parent contact number is required"),
});

const verifySchema = Yup.object().shape({
  code: Yup.string().required("otp is required"),
});

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const resetPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(6, "New password should be at least 6 characters")
    .required("New password is required"),
  otp: Yup.string().required("otp is required"),
});

export {
  loginSchema,
  signUpSchema,
  verifySchema,
  forgotPasswordSchema,
  resetPasswordSchema,
};
