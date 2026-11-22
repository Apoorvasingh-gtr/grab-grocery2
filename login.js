(() => {
  const form = document.querySelector("#loginForm");
  const email = document.querySelector("#email");
  const password = document.querySelector("#password");
  const toggle = document.querySelector("#togglePassword");
  const submit = document.querySelector("#submitButton");
  const formError = document.querySelector("#formError");

  toggle.addEventListener("click", () => {
    const visible = password.type === "password";
    password.type = visible ? "text" : "password";
    toggle.textContent = visible ? "Hide" : "Show";
    toggle.setAttribute("aria-label", `${visible ? "Hide" : "Show"} password`);
    toggle.setAttribute("aria-pressed", String(visible));
    password.focus();
  });

  function setError(input, message) {
    const wrap = input.closest(".input-wrap");
    const error = document.querySelector(`#${input.id}Error`);
    wrap.classList.toggle("invalid", Boolean(message));
    input.setAttribute("aria-invalid", String(Boolean(message)));
    error.textContent = message;
  }

  [email, password].forEach(input => input.addEventListener("input", () => {
    setError(input, "");
    formError.textContent = "";
  }));

  function validate() {
    let valid = true;
    const address = email.value.trim();
    if (!address) { setError(email, "Enter your email address."); valid = false; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(address)) { setError(email, "Enter a valid email address."); valid = false; }
    else setError(email, "");
    if (!password.value) { setError(password, "Enter your password."); valid = false; }
    else if (password.value.length < 8) { setError(password, "Password must be at least 8 characters."); valid = false; }
    else setError(password, "");
    if (!valid) (email.getAttribute("aria-invalid") === "true" ? email : password).focus();
    return valid;
  }

  form.addEventListener("submit", async event => {
    event.preventDefault();
    formError.textContent = "";
    if (!validate()) return;
    submit.disabled = true;
    submit.setAttribute("aria-busy", "true");
    try {
      await new Promise(resolve => window.setTimeout(resolve, 750));
      try {
        const profile = JSON.parse(localStorage.getItem("grabGroceryProfile") || "{}");
        profile.email = email.value.trim();
        localStorage.setItem("grabGroceryProfile", JSON.stringify(profile));
      } catch { /* The demo sign-in can continue if browser storage is unavailable. */ }
      formError.className = "form-success";
      formError.textContent = "You're signed in! Taking you to your groceries...";
      window.setTimeout(() => window.location.assign("shop.html"), 650);
    } finally {
      submit.disabled = false;
      submit.removeAttribute("aria-busy");
    }
  });

  document.querySelectorAll("[data-provider]").forEach(button => button.addEventListener("click", () => {
    const provider = button.dataset.provider;
    formError.textContent = `Sign in with ${provider === "google" ? "Google" : "GitHub"} isn't configured on this project yet.`;
  }));

  document.querySelectorAll("[data-unconfigured]").forEach(link => link.addEventListener("click", event => {
    event.preventDefault();
    formError.textContent = `${link.dataset.unconfigured} isn't configured on this project yet.`;
  }));
})();


