const signUpForm = document.getElementsByTagName('form')[1];
const signInForm = document.getElementsByTagName('form')[0];
const email = document.getElementById('mail');
const pass = document.getElementById('password');
const confirm_pass = document.getElementById('confirm_password');
const first_name = document.getElementById('first_name');
const last_name = document.getElementById('last_name');
const date = document.getElementById('date');

const signInEmail = document.getElementById('signin-mail');
const signInPass = document.getElementById('signin-pass');

const error_email = document.getElementById('error_email');
const error_pass = document.getElementById('error_pass');
const error_confirm_pass = document.getElementById('error_confirm_pass');
const error_first_name = document.getElementById('error_first_name');
const error_last_name = document.getElementById('error_last_name');
const error_date = document.getElementById('error_date');

const errorSignInEmail = document.getElementById('error-signin-email');
const errorSignInPass = document.getElementById('error-signin-pass');


signUpForm.addEventListener("submit", handleSignUpEvent, false);
signInForm.addEventListener("submit", handleSignInEvent, false);


function handleSignUpEvent(event) {
  event.preventDefault();
  let formValid = true;
  if (email.validity.valid) {
    error_email.className = "inactive";
  }
  else {
    formValid = false;
    error_email.className = "error";
  }

  if (pass.validity.valid) {
    error_pass.className = "inactive";
  }
  else {
    formValid = false;
    error_pass.className = "error";
  }

  if ((!confirm_pass.value) || (confirm_pass.value !== pass.value)) {
    error_confirm_pass.className = "error";
    formValid = false;
  }
  else {
    error_confirm_pass.className = "inactive";
  }

  if (first_name.validity.valid) {
    error_first_name.className = "inactive";
  }
  else {
    error_first_name.className = "error";
    formValid = false;
  }

  if (last_name.validity.valid) {
    error_last_name.className = "inactive";
  }
  else {
    error_last_name.className = "error";
    formValid = false;
  }

  if (date.validity.valid) {
    error_date.className = "inactive";
  }
  else {
    error_date.className = "error";
    formValid = false;
  }

  if (formValid) {
    signUpForm.submit();
  }

}

function handleSignInEvent(event) {
  event.preventDefault();
  let formValid = true;

  if (signInEmail.validity.valid) {
    errorSignInEmail.className = "inactive";
  }
  else {
    formValid = false;
    errorSignInEmail.className = "error";
  }

  if (signInPass.validity.valid) {
    errorSignInPass.className = "inactive";
  }
  else {
    formValid = false;
    errorSignInPass.className = "error";
  }

  if (formValid) {
    signInForm.submit();
  }
}
