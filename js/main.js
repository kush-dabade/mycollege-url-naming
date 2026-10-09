// MyCollege - shared JavaScript for all pages

// 1. Highlight the navigation link for the current page
var currentPath = window.location.pathname.replace(/\/$/, "") || "/";
var navLinks = document.querySelectorAll(".main-nav a");

navLinks.forEach(function (link) {
  if (link.getAttribute("href") === currentPath) {
    link.classList.add("active");
  }
});

// 2. Show / hide the menu on small screens
var toggle = document.querySelector(".nav-toggle");
var nav = document.querySelector(".main-nav");

if (toggle && nav) {
  toggle.addEventListener("click", function () {
    nav.classList.toggle("open");
  });
}

// 3. FAKE login (demo only)
// Only the DEMO_USER account below is accepted. Only the student's name is
// remembered, in sessionStorage (cleared when the browser tab is closed).
// The password is never sent or saved anywhere.

function getStudent() {
  try {
    return sessionStorage.getItem("student");
  } catch (e) {
    return null;
  }
}

function setStudent(id) {
  try {
    if (id) {
      sessionStorage.setItem("student", id);
    } else {
      sessionStorage.removeItem("student");
    }
  } catch (e) {
    // storage blocked: the demo still works, it just won't remember you
  }
}

function logout() {
  setStudent(null);
  window.location.href = "/students/login?loggedout=1";
}

// The only account that can log in (demo only - visible to anyone who views the source)
var DEMO_USER = {
  username: "kush dabade", // typed in any upper/lower case
  password: "12345",
  name: "Kush Dabade"
};

var student = getStudent();

// 3a. When logged in, show "ID + Log out" in the menu on every page
if (student && nav) {
  var chip = document.createElement("li");
  chip.className = "user-chip";
  chip.innerHTML = "<span><svg width='14' height='14' viewBox='0 0 24 24' fill='currentColor' aria-hidden='true'><path d='M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2c-4.4 0-9 2.2-9 5v3h18v-3c0-2.8-4.6-5-9-5z'/></svg> <span class='chip-id'></span></span><button type='button'>Log out</button>";
  chip.querySelector(".chip-id").textContent = student;
  chip.querySelector("button").addEventListener("click", logout);
  nav.querySelector("ul").appendChild(chip);
}

// 3b. Login page
var loginForm = document.getElementById("login-form");

if (loginForm) {
  var idInput = document.getElementById("student-id");
  var passInput = document.getElementById("password");
  var loginBtn = document.getElementById("login-btn");
  var btnText = loginBtn.querySelector(".btn-text");
  var message = document.getElementById("login-message");

  function showMessage(text, isSuccess) {
    message.textContent = text;
    message.className = isSuccess ? "alert success" : "alert";
    message.hidden = false;
  }

  function setError(input, errorId, text) {
    document.getElementById(errorId).textContent = text;
    input.classList.toggle("invalid", text !== "");
  }

  // Already logged in? Show a "signed in" box instead of the form
  if (student) {
    loginForm.hidden = true;
    document.getElementById("current-student").textContent = student;
    document.getElementById("already-logged-in").hidden = false;
    document.getElementById("logout-here").addEventListener("click", logout);
  }

  // Just logged out?
  if (window.location.search.indexOf("loggedout=1") !== -1) {
    showMessage("You have been logged out successfully.", true);
  }

  // Show / hide password button
  document.getElementById("show-pass").addEventListener("click", function () {
    var hidden = passInput.type === "password";
    passInput.type = hidden ? "text" : "password";
    this.textContent = hidden ? "Hide" : "Show";
  });

  // Forgot password link (pretends to send an email)
  document.getElementById("forgot-link").addEventListener("click", function (event) {
    event.preventDefault();
    if (idInput.value.trim() === "") {
      setError(idInput, "id-error", "Enter your username first.");
      idInput.focus();
      return;
    }
    setError(idInput, "id-error", "");
    showMessage("A password reset link has been sent to the email registered with " +
      idInput.value.trim() + ".", true);
  });

  function shakeForm() {
    loginForm.classList.remove("shake");
    void loginForm.offsetWidth; // restart the animation
    loginForm.classList.add("shake");
  }

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault(); // never actually submit the form

    var username = idInput.value.trim();
    var pass = passInput.value;
    var ok = true;

    setError(idInput, "id-error", "");
    setError(passInput, "pass-error", "");
    message.hidden = true;

    if (username === "") {
      setError(idInput, "id-error", "Please enter your username.");
      ok = false;
    }
    if (pass === "") {
      setError(passInput, "pass-error", "Please enter your password.");
      ok = false;
    }

    if (!ok) {
      shakeForm();
      return;
    }

    // Looks like it's checking with a server... (it isn't)
    var correct = username.toLowerCase() === DEMO_USER.username && pass === DEMO_USER.password;
    passInput.value = "";
    loginBtn.disabled = true;
    loginBtn.classList.add("loading");
    btnText.textContent = "Verifying credentials...";

    if (!correct) {
      setTimeout(function () {
        loginBtn.disabled = false;
        loginBtn.classList.remove("loading");
        btnText.textContent = "Log In";
        showMessage("Invalid username or password. Please try again.", false);
        message.classList.add("error");
        shakeForm();
        passInput.focus();
      }, 1200);
      return;
    }

    setTimeout(function () {
      btnText.textContent = "Loading your dashboard...";
    }, 1000);

    setTimeout(function () {
      loginBtn.classList.remove("loading");
      loginBtn.classList.add("success");
      btnText.textContent = "\u2714 Login successful";
      setStudent(DEMO_USER.name);
    }, 1800);

    setTimeout(function () {
      window.location.href = "/examination/results";
    }, 2500);
  });
}

// 3c. Results page: welcome the student and highlight their row
var resultsTable = document.querySelector(".results-table");

if (resultsTable && student) {
  var banner = document.createElement("div");
  banner.className = "welcome-banner";
  banner.textContent = "Welcome back, " + student + "! Here are the latest results for your class.";

  resultsTable.querySelectorAll("tbody tr").forEach(function (row) {
    if (row.cells[1].textContent === student) {
      row.classList.add("my-row");
      banner.textContent = "Welcome back, " + student + " (" + row.cells[0].textContent +
        ")! Your result is highlighted below.";
    }
  });

  resultsTable.parentNode.insertBefore(banner, resultsTable);
}

// 4. Show the current year in the footer
var yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
