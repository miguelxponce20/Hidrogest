/**
 * common.js - JavaScript común para todas las pantallas de usuarios HIDROGEST
 * Maneja funcionalidades globales como navegación móvil, notificaciones, dropdowns, etc.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar funcionalidades comunes
    initCommon();
});

function initCommon() {
    // Inicializar menú móvil
    initMobileMenu();

    // Inicializar notificaciones
    initNotifications();

    // Inicializar dropdown de usuario
    initUserDropdown();

    // Inicializar modales
    initModals();

    // Inicializar navegación activa
    initActiveNavigation();

    // Inicializar búsqueda
    initSearch();

    console.log('✅ Funcionalidades comunes inicializadas');
}

/**
 * Inicialización del menú móvil
 */
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    if (!mobileMenuBtn || !sidebar || !sidebarOverlay) {
        console.warn('⚠️ Elementos del menú móvil no encontrados');
        return;
    }

    // Toggle del menú móvil
    mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMobileMenu();
    });

    // Cerrar menú al hacer clic en el overlay
    sidebarOverlay.addEventListener('click', function() {
        closeMobileMenu();
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Prevenir cierre al hacer clic dentro del sidebar
    sidebar.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    console.log('✅ Menú móvil inicializado');
}

function toggleMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    if (sidebar && sidebarOverlay) {
        const isActive = sidebar.classList.contains('active');

        if (isActive) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }
}

function openMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    if (sidebar && sidebarOverlay) {
        sidebar.classList.add('active');
        sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevenir scroll
    }
}

function closeMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    if (sidebar && sidebarOverlay) {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restaurar scroll
    }
}

/**
 * Inicialización de notificaciones
 */
function initNotifications() {
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationBadge = document.getElementById('notificationBadge');

    if (notificationBtn) {
        notificationBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleNotificationsModal();
        });
    }

    // Simular actualización de badge
    updateNotificationBadge();

    console.log('✅ Notificaciones inicializadas');
}

function updateNotificationBadge() {
    const notificationBadge = document.getElementById('notificationBadge');

    if (notificationBadge) {
        // Aquí se conectaría con la API para obtener el conteo real
        const count = Math.floor(Math.random() * 10); // Simulación
        if (count > 0) {
            notificationBadge.textContent = count > 99 ? '99+' : count;
            notificationBadge.style.display = 'flex';
        } else {
            notificationBadge.style.display = 'none';
        }
    }
}

/**
 * Inicialización del dropdown de usuario
 */
function initUserDropdown() {
    const userBtn = document.getElementById('userBtn');
    const userDropdown = document.getElementById('userDropdown');

    if (!userBtn || !userDropdown) {
        console.warn('⚠️ Elementos del dropdown de usuario no encontrados');
        return;
    }

    // Toggle del dropdown
    userBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleUserDropdown();
    });

    // Cerrar dropdown al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!userBtn.contains(e.target) && !userDropdown.contains(e.target)) {
            closeUserDropdown();
        }
    });

    // Manejar clics en elementos del dropdown
    userDropdown.addEventListener('click', function(e) {
        const action = e.target.closest('[data-action]')?.getAttribute('data-action');

        if (action) {
            handleUserDropdownAction(action);
        }
    });

    console.log('✅ Dropdown de usuario inicializado');
}

function toggleUserDropdown() {
    const userBtn = document.getElementById('userBtn');
    const userDropdown = document.getElementById('userDropdown');

    if (userBtn && userDropdown) {
        const isActive = userBtn.classList.contains('active');

        if (isActive) {
            closeUserDropdown();
        } else {
            openUserDropdown();
        }
    }
}

function openUserDropdown() {
    const userBtn = document.getElementById('userBtn');
    const userDropdown = document.getElementById('userDropdown');

    if (userBtn && userDropdown) {
        userBtn.classList.add('active');
        userDropdown.classList.add('show');
    }
}

function closeUserDropdown() {
    const userBtn = document.getElementById('userBtn');
    const userDropdown = document.getElementById('userDropdown');

    if (userBtn && userDropdown) {
        userBtn.classList.remove('active');
        userDropdown.classList.remove('show');
    }
}

function handleUserDropdownAction(action) {
    switch (action) {
        case 'settings':
            showSettingsModal();
            break;
        case 'help':
            showHelpModal();
            break;
        case 'logout':
            handleLogout();
            break;
        default:
            console.log('Acción no manejada:', action);
    }

    closeUserDropdown();
}

/**
 * Inicialización de modales
 */
function initModals() {
    // Cerrar modales al hacer clic en overlay
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal-overlay')) {
            const modalId = e.target.id.replace('Overlay', '');
            closeModal(modalId);
        }
    });

    // Cerrar modales con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });

    // Manejar botones de cerrar modal
    document.addEventListener('click', function(e) {
        if (e.target.closest('.modal-close')) {
            const modal = e.target.closest('.modal');
            if (modal) {
                const modalId = modal.id;
                closeModal(modalId);
            }
        }
    });

    console.log('✅ Modales inicializados');
}

/**
 * Funciones de modales
 */
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevenir scroll

        // Focus trap para accesibilidad
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length > 0) {
            focusableElements[0].focus();
        }
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = ''; // Restaurar scroll
    }
}

function closeAllModals() {
    const modals = document.querySelectorAll('.modal.show');
    modals.forEach(modal => {
        modal.classList.remove('show');
    });
    document.body.style.overflow = ''; // Restaurar scroll
}

/**
 * Funciones específicas de modales
 */
function showNotificationsModal() {
    showModal('notificationsModal');
}

function showSettingsModal() {
    showModal('settingsModal');
}

function showHelpModal() {
    showModal('helpModal');
}

function showBillsModal() {
    showModal('billsModal');
}

function showPaymentModal() {
    showModal('paymentModal');
}

function showIncidentModal() {
    showModal('incidentModal');
}

function showCalendarModal() {
    showModal('calendarModal');
}

/**
 * Inicialización de navegación activa
 */
function initActiveNavigation() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        if (link.getAttribute('href') && currentPath.includes(link.getAttribute('href'))) {
            link.closest('.nav-item').classList.add('active');
        }
    });

    console.log('✅ Navegación activa inicializada');
}

/**
 * Inicialización de búsqueda
 */
function initSearch() {
    const searchInput = document.querySelector('.search-bar input');
    const searchBtn = document.querySelector('.search-btn');

    if (searchInput && searchBtn) {
        // Buscar al hacer clic en el botón
        searchBtn.addEventListener('click', function() {
            performSearch(searchInput.value);
        });

        // Buscar al presionar Enter
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(searchInput.value);
            }
        });
    }

    console.log('✅ Búsqueda inicializada');
}

function performSearch(query) {
    if (!query.trim()) {
        showToast('Por favor ingresa un término de búsqueda', 'warning');
        return;
    }

    console.log('🔍 Buscando:', query);
    // Aquí se implementaría la lógica de búsqueda real
    showToast(`Buscando: "${query}"`, 'info');
}

/**
 * Función de logout
 */
function handleLogout() {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
        // Limpiar datos de usuario
        localStorage.removeItem('userToken');
        localStorage.removeItem('userData');

        // Redirigir a login
        window.location.href = '../../login/login.html';
    }
}

/**
 * Utilidades
 */
function showToast(message, type = 'info') {
    // Crear toast temporal
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--${type === 'success' ? 'success' : type === 'error' ? 'error' : type === 'warning' ? 'warning' : 'primary'});
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        z-index: 9999;
        font-weight: 500;
        max-width: 300px;
        animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(toast);

    // Auto-remover después de 3 segundos
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

/**
 * Animaciones CSS para toasts
 */
const toastStyles = document.createElement('style');
toastStyles.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }

    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(toastStyles);

/**
 * Funciones de utilidad para otras pantallas
 */
function formatCurrency(amount) {
    return new Intl.NumberFormat('es-VE', {
        style: 'currency',
        currency: 'VES'
    }).format(amount);
}

function formatDate(date) {
    return new Intl.DateTimeFormat('es-VE', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }).format(new Date(date));
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Exportar funciones para uso en otros archivos
window.HIDROGEST = {
    showModal,
    closeModal,
    closeAllModals,
    showToast,
    formatCurrency,
    formatDate,
    debounce
};
