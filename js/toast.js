export function mostrarToast(msg) {
  const toastContainer = document.getElementById("toast-container");

  if (!toastContainer) return;

  const toastContent = document.createElement("div");

  toastContent.classList.add("toast");

  toastContent.textContent = msg;

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

};


