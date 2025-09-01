// ===================================================
// VARIABLES GLOBALES
// ===================================================
let usuarios = [
  {
    cedula: "12345678",
    nombre: "Juan Pérez",
    correo: "juan@example.com",
    telefono: "0412-1234567",
    rol: "Administrador",
    propiedades: [
      {
        id: "CTR-2023-001",
        name: "Casa Principal",
        type: "Residencial",
        address: "Calle Principal 123, Sector Norte, San Juan de los Morros",
        contractNumber: "CTR-2023-001",
        startDate: "15 Enero 2023",
        lastReading: "1,250 m³ - 10 Dic 2024",
        averageConsumption: "45 m³/mes",
        monthlyCost: 42.6,
        status: "active",
        serviceStatus: "Excelente",
        readings: [
          { date: "10 Dic 2024", consumption: 1250, cost: 42.6 },
          { date: "10 Nov 2024", consumption: 1205, cost: 38.2 },
          { date: "10 Oct 2024", consumption: 1160, cost: 42.6 },
          { date: "10 Sep 2024", consumption: 1115, cost: 35.8 }
        ]
      }
    ]
  }
];

let propertiesData = []; // 🔹 se llena con todas las propiedades de todos los usuarios

// ===================================================
// INICIALIZACIÓN GLOBAL
// ===================================================
document.addEventListener("DOMContentLoaded", function () {
  actualizarTabla();
  updatePropertiesStats();
  enhancePropertyCards();
});

// ===================================================
// CRUD USUARIOS
// ===================================================
function actualizarTabla() {
  const tbody = document.querySelector("#usuariosTable tbody");
  tbody.innerHTML = "";
  usuarios.forEach((u, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${u.cedula}</td>
      <td>${u.nombre}</td>
      <td>${u.correo}</td>
      <td>${u.telefono}</td>
      <td>${u.rol}</td>
      <td>
        <button class="btn-info btn-sm" onclick="verPropiedades(${index})">🏠 Propiedades</button>
        <button class="btn-secondary btn-sm" onclick="editarUsuario(${index})">✏ Editar</button>
        <button class="btn-danger btn-sm" onclick="eliminarUsuario(${index})">🗑 Eliminar</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function verPropiedades(index) {
  const u = usuarios[index];
  const tbody = document.getElementById("tablaPropiedades");
  document.getElementById("propietarioNombre").textContent = u.nombre;
  tbody.innerHTML = "";

  if (u.propiedades && u.propiedades.length > 0) {
    u.propiedades.forEach((p) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${p.id}</td>
        <td>${p.address}</td>
        <td>${p.type}</td>
        <td>${p.monthlyCost}</td>
        <td><button class="btn-info btn-sm" onclick="viewPropertyDetails('${p.id}')">👁 Ver</button></td>
      `;
      tbody.appendChild(fila);
    });
  } else {
    tbody.innerHTML = `<tr><td colspan="5">❌ No tiene propiedades registradas</td></tr>`;
  }

  document.getElementById("modal-ver-propiedades").classList.add("show");
}

function editarUsuario(index) {
  // TODO: lógica de edición (ya la tienes en tu HTML original)
}

function eliminarUsuario(index) {
  if (confirm("¿Eliminar este usuario?")) {
    usuarios.splice(index, 1);
    actualizarTabla();
    mostrarToast("Usuario eliminado");
  }
}

function mostrarToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

// ===================================================
// PROPIEDADES - STATS Y DETALLES
// ===================================================
function updatePropertiesStats() {
  // juntar todas las propiedades de todos los usuarios
  propertiesData = usuarios.flatMap((u) => u.propiedades || []);

  const totalProperties = propertiesData.length;
  const activeProperties = propertiesData.filter((p) => p.status === "active").length;
  const totalMonthly = propertiesData.reduce((sum, p) => sum + (p.monthlyCost || 0), 0);

  document.getElementById("totalProperties").textContent = totalProperties;
  document.getElementById("activeProperties").textContent = activeProperties;
  document.getElementById("totalMonthly").textContent = `$${totalMonthly.toFixed(2)}`;
}

function viewPropertyDetails(propertyId) {
  const property = propertiesData.find((p) => p.id === propertyId);
  if (!property) {
    alert("Propiedad no encontrada");
    return;
  }
  const modal = document.getElementById("propertyModal");
  const modalBody = document.getElementById("propertyModalBody");
  modalBody.innerHTML = `
    <h3>${property.name}</h3>
    <p><b>Dirección:</b> ${property.address}</p>
    <p><b>Contrato:</b> ${property.contractNumber}</p>
    <p><b>Consumo Promedio:</b> ${property.averageConsumption}</p>
    <p><b>Costo Mensual:</b> $${property.monthlyCost.toFixed(2)}</p>
    <button onclick="viewConsumptionHistory('${property.id}')">📊 Ver Historial</button>
  `;
  modal.style.display = "block";
}

function viewConsumptionHistory(propertyId) {
  const property = propertiesData.find((p) => p.id === propertyId);
  if (!property) return;
  const modalBody = document.getElementById("propertyModalBody");
  modalBody.innerHTML = `
    <h3>Historial de Consumo - ${property.name}</h3>
    ${property.readings
      .map(
        (r) => `
      <p>${r.date}: ${r.consumption} m³ - $${r.cost}</p>
    `
      )
      .join("")}
    <button onclick="viewPropertyDetails('${property.id}')">⬅ Volver</button>
  `;
}

// ===================================================
// MODAL HANDLERS
// ===================================================
document.getElementById("propertyModalClose").addEventListener("click", function () {
  document.getElementById("propertyModal").style.display = "none";
});

document.getElementById("propertyModalOverlay").addEventListener("click", function () {
  document.getElementById("propertyModal").style.display = "none";
});

// ===================================================
// ENHANCEMENTS (ICONS, BADGES, ETC.)
// ===================================================
function enhancePropertyCards() {
  const propertyCards = document.querySelectorAll(".property-card");
  propertyCards.forEach((card) => {
    const status = card.getAttribute("data-status");
    const type = card.querySelector(".property-type")?.textContent || "";
    addPropertyTypeIcons(card, type);
    addStatusBadges(card, status);
  });
}

function addPropertyTypeIcons(card, type) {
  const typeEl = card.querySelector(".property-type");
  if (!typeEl) return;
  const icons = { Residencial: "🏠", Comercial: "🏢", Industrial: "🏭" };
  if (icons[type]) typeEl.innerHTML = `${icons[type]} ${typeEl.textContent}`;
}

function addStatusBadges(card, status) {
  const statusEl = card.querySelector(".property-status");
  if (!statusEl) return;
  const badges = { active: "🟢", inactive: "🔴" };
  if (badges[status]) statusEl.innerHTML = `${badges[status]} ${statusEl.textContent}`;
}