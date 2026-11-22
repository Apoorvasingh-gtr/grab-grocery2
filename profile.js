(() => {
  const form = document.querySelector("#profileForm");
  const status = document.querySelector("#profileStatus");
  const storageKey = "grabGroceryProfile";
  const inputs = [...form.querySelectorAll("input:not([type=checkbox])")];

  function readProfile() {
    try { return JSON.parse(localStorage.getItem(storageKey) || "{}"); }
    catch { return {}; }
  }

  function updateSummary() {
    const name = document.querySelector("#fullName").value.trim();
    const email = document.querySelector("#profileEmail").value.trim();
    document.querySelector("#summaryName").textContent = name || "Your name";
    document.querySelector("#summaryEmail").textContent = email || "Add your email address";
    const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0]).join("").toUpperCase();
    document.querySelector("#profileAvatar").textContent = initials || "GG";
  }

  const profile = readProfile();
  inputs.forEach(input => { if (profile[input.name]) input.value = profile[input.name]; });
  if (Array.isArray(profile.platforms)) {
    form.querySelectorAll('input[name="platforms"]').forEach(box => { box.checked = profile.platforms.includes(box.value); });
  }
  updateSummary();
  ["fullName", "profileEmail"].forEach(id => document.querySelector(`#${id}`).addEventListener("input", updateSummary));

  form.addEventListener("submit", event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const saved = Object.fromEntries(inputs.map(input => [input.name, input.value.trim()]));
    saved.platforms = [...form.querySelectorAll('input[name="platforms"]:checked')].map(box => box.value);
    try {
      localStorage.setItem(storageKey, JSON.stringify(saved));
      status.textContent = "Profile saved in this browser.";
      updateSummary();
    } catch {
      status.textContent = "Could not save profile. Check your browser storage settings.";
    }
  });
})();
