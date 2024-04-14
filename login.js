window.onload = function () {
  document
    .getElementById("register-link")
    .addEventListener("click", showRegistrationForm);
};

window.onload = function () {
  document
    .getElementById("login-link")
    .addEventListener("click", showLoginForm);
};

function showRegistrationForm() {
  document.getElementById("login-container").classList.add("hidden");
  document.getElementById("register-container").classList.remove("hidden");
  // document.getElementById("register-error").innerHTML = "";
}

function showLoginForm() {
  document.getElementById("register-container").classList.add("hidden");
  document.getElementById("login-container").classList.remove("hidden");
  // document.getElementById("login-error").innerHTML = "";
}

var loginError = document.getElementById("login-error");
var registerError = document.getElementById("register-error");

async function checkFunction(request) {
  if (request == "login") {
    var email = document.getElementById("login-email").value;
  } else {
    var email = document.getElementById("register-email").value;
    var usertype = document.getElementById("usertype").value;
  }
  // If trying to login
  if (request == "login") {
    try {
      let response = await fetch("check.php?email=" + email);
      if (response.status == 200) {
        let data = await response.text();
        errorMsg = "";
        if (data == "false") {
          errorMsg = "Cannot find email record.";
        }
        loginError.innerHTML = errorMsg;
      } else {
        console.log("Error: " + response.status);
      }
    } catch (error) {
      console.log(error);
    }
  }
  // If trying to register
  else if (request == "register") {
    console.log("Checking email: " + email);
    try {
      let response = await fetch(
        "check.php?email=" + email + "&usertype=" + usertype
      );
      if (response.status == 200) {
        let data = await response.text();
        console.log(data);
        errorMsg = "";
        if (data == "true") {
          errorMsg = "You have registered before.";
        }
        registerError.innerHTML = errorMsg;
      } else {
        console.log("Error: " + response.status);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

function checkFilledFunction(request) {
  if (request == "login") {
    var email = document.getElementById("login-email").value;
    var password = document.getElementById("login-password").value;
    if (email == "" && password == "") {
      loginError.innerHTML = "Missing email address and password!";
      return false;
    } else if (email == "") {
      loginError.innerHTML = "Missing email address!";
      return false;
    } else if (password == "") {
      loginError.innerHTML = "Please provide a password.";
      return false;
    } else {
      return true;
    }
  } else {
    var email = document.getElementById("register-email").value;
    var password = document.getElementById("register-password").value;
    var password2 = document.getElementById("confirm-password").value;
    if (password != password2) {
      registerError.innerHTML = "Mismatch passwords!";
      return false;
    } else if (email == "" && password == "") {
      registerError.innerHTML = "Missing email address and password!";
      return false;
    } else if (email == "") {
      registerError.innerHTML = "Missing email address!";
      return false;
    } else if (password == "") {
      registerError.innerHTML = "Please provide a password.";
      return false;
    } else {
      return true;
    }
  }
}
