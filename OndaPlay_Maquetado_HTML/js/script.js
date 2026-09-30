/* =========================================================
   OndaPlay — script.js
   Lógica compartida de navegación, sidebar y CRUD simulado
   (sin backend: todo ocurre en el DOM, es un maquetado)
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initSidebarToggle();
  initCrudModals();
  initDeleteButtons();
  initToast();
});

/* ---------- Sidebar (móvil) ---------- */
function initSidebarToggle() {
  const btn = document.querySelector("[data-sidebar-toggle]");
  const sidebar = document.querySelector(".admin-sidebar");
  if (!btn || !sidebar) return;
  btn.addEventListener("click", () => sidebar.classList.toggle("open"));
  document.addEventListener("click", (e) => {
    if (window.innerWidth > 900) return;
    if (!sidebar.contains(e.target) && !btn.contains(e.target)) {
      sidebar.classList.remove("open");
    }
  });
}

/* ---------- Modales de alta / edición ----------
   Botones con [data-edit-row] abren el modal y precargan
   los campos del formulario a partir de data-attributes
   de la fila (simulación de "Editar"). Botones con
   [data-new-record] abren el modal en blanco ("Nuevo"). */
function initCrudModals() {
  document.querySelectorAll("[data-new-record]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const modalId = btn.getAttribute("data-target-modal");
      const modalEl = document.getElementById(modalId);
      if (!modalEl) return;
      modalEl.querySelectorAll("input, select, textarea").forEach((f) => {
        if (f.type === "checkbox") f.checked = false; else f.value = "";
      });
      const title = modalEl.querySelector(".modal-title");
      if (title) title.textContent = title.dataset.newLabel || "Nuevo registro";
    });
  });

  document.querySelectorAll("[data-edit-row]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const modalId = btn.getAttribute("data-target-modal");
      const modalEl = document.getElementById(modalId);
      if (!modalEl) return;
      const row = btn.closest("tr");
      modalEl.querySelectorAll("[data-field]").forEach((field) => {
        const key = field.getAttribute("data-field");
        const val = row?.getAttribute("data-" + key);
        if (val !== null && val !== undefined) field.value = val;
      });
      const title = modalEl.querySelector(".modal-title");
      if (title) title.textContent = title.dataset.editLabel || "Editar registro";
    });
  });

  document.querySelectorAll("[data-save-record]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const modalId = btn.getAttribute("data-target-modal");
      const modalEl = document.getElementById(modalId);
      const bsModal = bootstrap.Modal.getOrCreateInstance(modalEl);
      bsModal.hide();
      showToast("Registro guardado correctamente (simulación de interfaz).");
    });
  });
}

/* ---------- Eliminar fila (simulado) ---------- */
function initDeleteButtons() {
  document.querySelectorAll("[data-delete-row]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const row = btn.closest("tr");
      if (!row) return;
      if (confirm("¿Desactivar / eliminar este registro? Esta acción es solo una simulación de interfaz.")) {
        row.style.transition = "opacity .2s";
        row.style.opacity = "0";
        setTimeout(() => row.remove(), 200);
        showToast("Registro eliminado (simulación de interfaz).");
      }
    });
  });
}

/* ---------- Toast ---------- */
function initToast() {
  if (document.getElementById("opToast")) return;
  const wrap = document.createElement("div");
  wrap.className = "op-toast";
  wrap.innerHTML = `
    <div id="opToast" class="toast align-items-center text-bg-dark border-0" role="status">
      <div class="d-flex">
        <div class="toast-body" id="opToastBody">Listo.</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
      </div>
    </div>`;
  document.body.appendChild(wrap);
}
function showToast(msg) {
  const body = document.getElementById("opToastBody");
  if (!body) return;
  body.textContent = msg;
  const toast = bootstrap.Toast.getOrCreateInstance(document.getElementById("opToast"), { delay: 2200 });
  toast.show();
}
