const icones = {
  success: "✔",
  error: "✖",
  warning: "⚠",
};

export function mostrarToast(msg, tipo = "success") {
  const toastContainer = document.getElementById("toast-container");
  if (!toastContainer) return;

  const toastContent = document.createElement("div");
  toastContent.classList.add("toast", tipo);

  const icone = icones[tipo] || "✔";

  toastContent.textContent = `${icone} ${msg}`;

  toastContainer.appendChild(toastContent);

  setTimeout(() => {
    toastContent.classList.add("show");
  }, 10);

  setTimeout(() => {
    toastContent.classList.remove("show");
    toastContent.classList.add("hide");
  }, 1500);

  setTimeout(() => {
    toastContent.remove();
  }, 1800);
}