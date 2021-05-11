const form  = document.getElementsByTagName('form')[1];
const email = document.getElementById('mail');
const pass = document.getElementById('password');
const confirm_pass = document.getElementById('confirm_password');
const first_name = document.getElementById('first_name');
const last_name = document.getElementById('last_name');
const date = document.getElementById('date');

let error_email = document.getElementById('error_email');
let error_pass = document.getElementById('error_pass');
let error_confirm_pass = document.getElementById('error_confirm_pass');
let error_first_name = document.getElementById('error_first_name');
let error_last_name = document.getElementById('error_last_name');
let error_date = document.getElementById('error_date');


email.addEventListener("input", function (event) {
  if (email.validity.valid) {
    error_email.innerHTML = ""; 
    error_email.className = "error"; 
  }
}, false);


pass.addEventListener("input", function (event) {
  if (pass.validity.valid) {
    error_pass.innerHTML = ""; 
    error_pass.className = "error"; 
  }
}, false);


confirm_pass.addEventListener("input", function (event) {
  if (confirm_pass.value === pass.value) {
    error_confirm_pass.innerHTML = ""; 
    error_confirm_pass.className = "error"; 
  }
}, false);


first_name.addEventListener("input", function (event) {
  if (first_name.validity.valid) {
    error_first_name.innerHTML = ""; 
    error_first_name.className = "error"; 
  }
}, false);


last_name.addEventListener("input", function (event) {
  if (last_name.validity.valid) {
    error_last_name.innerHTML = ""; 
    error_last_name.className = "error"; 
  }
}, false);


date.addEventListener("input", function (event) {
  if (date.validity.valid) {
    error_date.innerHTML = ""; 
    error_date.className = "error"; 
  }
}, false);



form.addEventListener("submit", function (event) {
  if (!email.validity.valid) {
    error_email.innerHTML = "Please enter a valid email address.";
    error_email.className = "error active";
    event.preventDefault();
  }
  
  if (!pass.validity.valid) {
    error_pass.innerHTML = "Password does not meet minimal requirements(8).";
    error_pass.className = "error active";
    event.preventDefault();
  }
  
  if (confirm_pass.value !== pass.value) {
    error_confirm_pass.innerHTML = "Passwords don't match";
    error_confirm_pass.className = "error active";
    event.preventDefault();
  }
  
  if (!first_name.validity.valid) {
    error_first_name.innerHTML = "Please enter a valid first name.";
    error_first_name.className = "error active";
    event.preventDefault();
  }
  
  if (!last_name.validity.valid) {
    error_last_name.innerHTML = "Please enter a valid last name.";
    error_last_name.className = "error active";
    event.preventDefault();
  }
  
  if (!date.validity.valid) {
    error_date.innerHTML = "Please enter a valid date of birth.";
    error_date.className = "error active";
    event.preventDefault();
  }
  
}, false);