// Dashboard JavaScript for HIDROGEST

document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard
    initDashboard();
    
    // Setup event listeners
    setupEventListeners();
    
    // Load initial data
    loadDashboardData();
});

// Initialize dashboard components
function initDashboard() {
    // Add owner class to body if user is owner
    const userType = document.querySelector('.user-type').textContent;
    if (userType === 'Propietario') {
        document.body.classList.add('owner');
    }
    
    // Initialize notifications
    initNotifications();
    
    // Initialize user dropdown
    initUserDropdown();
    
    // Initialize modals
    initModals();
    
    // Initialize calendar
    initCalendar();
}

// Setup event listeners
function setupEventListeners() {
    // User menu toggle
    const userBtn = document.getElementById('userBtn');
    if (userBtn) {
        userBtn.addEventListener('click', toggleUserDropdown);
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.user-menu')) {
            closeUserDropdown();
        }
    });
    
    // Notification button
    const notificationBtn = document.getElementById('notificationBtn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', showNotificationsModal);
    }
    
    // Action buttons
    setupActionButtons();
    
    // Search functionality
    setupSearch();
}

// Initialize notifications
function initNotifications() {
    // Update notification count
    updateNotificationCount();
    
    // Simulate real-time updates
    setInterval(updateNotificationCount, 30000); // Every 30 seconds
}

// Update notification count
function updateNotificationCount() {
    const badge = document.getElementById('notificationBadge');
    if (badge) {
        // Simulate dynamic notification count
        const currentCount = parseInt(badge.textContent);
        const newCount = Math.max(0, currentCount + Math.floor(Math.random() * 3) - 1);
        badge.textContent = newCount;
        
        // Add animation if count changes
        if (newCount !== currentCount) {
            badge.style.animation = 'none';
            setTimeout(() => {
                badge.style.animation = 'pulse 0.6s ease-in-out';
            }, 10);
        }
    }
}

// Initialize user dropdown
function initUserDropdown() {
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) {
        // Add click handlers for dropdown items
        const dropdownItems = dropdown.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(item => {
            item.addEventListener('click', handleDropdownAction);
        });
    }
}

// Initialize modals
function initModals() {
    // Setup modal close functionality
    setupModalCloseHandlers();
    
    // Setup form submissions
    setupFormSubmissions();
    
    // Setup notification filters
    setupNotificationFilters();
    
    // Setup mark as read functionality
    setupMarkAsRead();
}

// Toggle user dropdown
function toggleUserDropdown() {
    const userBtn = document.getElementById('userBtn');
    const dropdown = document.getElementById('userDropdown');
    
    if (userBtn && dropdown) {
        userBtn.classList.toggle('active');
        dropdown.classList.toggle('show');
    }
}

// Close user dropdown
function closeUserDropdown() {
    const userBtn = document.getElementById('userBtn');
    const dropdown = document.getElementById('userDropdown');
    
    if (userBtn && dropdown) {
        userBtn.classList.remove('active');
        dropdown.classList.remove('show');
    }
}

// Handle dropdown actions
function handleDropdownAction(e) {
    const action = e.currentTarget.dataset.action;
    
    switch (action) {
        case 'settings':
            showSettingsModal();
            break;
        case 'help':
            showHelpModal();
            break;
        case 'logout':
            logout();
            break;
    }
    
    closeUserDropdown();
}

// Setup action buttons
function setupActionButtons() {
    const actionButtons = document.querySelectorAll('.action-btn');
    
    actionButtons.forEach(btn => {
        btn.addEventListener('click', handleActionButton);
    });
}

// Handle action button clicks
function handleActionButton(e) {
    const actionText = e.currentTarget.querySelector('.action-text').textContent;
    
    switch (actionText) {
        case 'Reportar Incidencia':
            showIncidentModal();
            break;
        case 'Ver Calendario':
            showCalendarModal();
            break;
        case 'Notificaciones':
            showNotificationsModal();
            break;
        case 'Pagar Factura':
            showPaymentModal();
            break;
    }
}

// Setup search functionality
function setupSearch() {
    const searchInput = document.querySelector('.search-bar input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput && searchBtn) {
        // Search on enter key
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(searchInput.value);
            }
        });
        
        // Search on button click
        searchBtn.addEventListener('click', function() {
            performSearch(searchInput.value);
        });
        
        // Real-time search suggestions
        searchInput.addEventListener('input', function() {
            if (searchInput.value.length > 2) {
                showSearchSuggestions(searchInput.value);
            } else {
                hideSearchSuggestions();
            }
        });
    }
}

// Perform search
function performSearch(query) {
    if (query.trim()) {
        // Add search functionality here
        // This could navigate to search results page or show results in a modal
    }
}

// Show search suggestions
function showSearchSuggestions(query) {
    // Add search suggestions functionality
}

// Hide search suggestions
function hideSearchSuggestions() {
    // Hide search suggestions
}

// Toggle notifications
function toggleNotifications() {
    // Add notifications panel functionality
}

// Load dashboard data
function loadDashboardData() {
    // Simulate loading data from API
    
    // Update service status
    updateServiceStatus();
    
    // Update notifications
    updateNotifications();
    
    // Update user info
    updateUserInfo();
}

// Update service status
function updateServiceStatus() {
    // Simulate real-time status updates
    const statusCards = document.querySelectorAll('.status-card');
    
    statusCards.forEach(card => {
        // Add subtle animation to show data is live
        card.style.animation = 'none';
        setTimeout(() => {
            card.style.animation = 'fadeIn 0.5s ease-out';
        }, 100);
    });
}

// Update notifications
function updateNotifications() {
    const notificationsList = document.querySelector('.notifications-list');
    
    if (notificationsList) {
        // Add new notification animation
        const newNotification = document.createElement('div');
        newNotification.className = 'notification-item unread';
        newNotification.innerHTML = `
            <div class="notification-icon info">📢</div>
            <div class="notification-content">
                <p class="notification-text">Nueva notificación del sistema</p>
                <span class="notification-time">Ahora</span>
            </div>
        `;
        
        // Add with animation
        newNotification.style.opacity = '0';
        newNotification.style.transform = 'translateY(-20px)';
        notificationsList.insertBefore(newNotification, notificationsList.firstChild);
        
        // Animate in
        setTimeout(() => {
            newNotification.style.transition = 'all 0.3s ease';
            newNotification.style.opacity = '1';
            newNotification.style.transform = 'translateY(0)';
        }, 100);
        
        // Remove after 5 seconds (demo)
        setTimeout(() => {
            newNotification.style.transition = 'all 0.3s ease';
            newNotification.style.opacity = '0';
            newNotification.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                if (newNotification.parentNode) {
                    newNotification.parentNode.removeChild(newNotification);
                }
            }, 300);
        }, 5000);
    }
}

// Update user info
function updateUserInfo() {
    // Update last login time, etc.
    const lastUpdate = document.querySelector('.last-update');
    if (lastUpdate) {
        const now = new Date();
        const timeString = now.toLocaleTimeString('es-ES', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        lastUpdate.textContent = `Última actualización: ${timeString}`;
    }
}

// Logout function
function logout() {
    // Show logout confirmation
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
        // Clear user data
        localStorage.removeItem('userToken');
        
        // Redirect to login page
        window.location.href = 'login/login.html';
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
    
    .notification-item {
        transition: all 0.3s ease;
    }
    
    .status-card {
        transition: all 0.3s ease;
    }
    
    .action-btn {
        transition: all 0.3s ease;
    }
    
    .widget {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);

// Add real-time updates simulation
setInterval(() => {
    // Update service status randomly
    const statusCards = document.querySelectorAll('.status-card');
    statusCards.forEach(card => {
        if (Math.random() > 0.95) { // 5% chance
            card.style.animation = 'none';
            setTimeout(() => {
                card.style.animation = 'fadeIn 0.5s ease-out';
            }, 100);
        }
    });
    
    // Update notification count
    updateNotificationCount();
}, 10000); // Every 10 seconds

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('.search-bar input');
        if (searchInput) {
            searchInput.focus();
        }
    }
    
    // Escape to close dropdowns
    if (e.key === 'Escape') {
        closeUserDropdown();
    }
});

// Add smooth scrolling for sidebar navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Add active state
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        this.parentElement.classList.add('active');
        
        // Smooth scroll to section (if implemented)
        const target = this.getAttribute('href');
        if (target && target !== '#') {
            const element = document.querySelector(target);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Add loading states for buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
        if (!this.classList.contains('loading')) {
            this.classList.add('loading');
            this.style.pointerEvents = 'none';
            
            // Simulate loading
            setTimeout(() => {
                this.classList.remove('loading');
                this.style.pointerEvents = 'auto';
            }, 1000);
        }
    });
});

// Add CSS for loading states
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    button.loading {
        position: relative;
        color: transparent !important;
    }
    
    button.loading::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 16px;
        height: 16px;
        border: 2px solid transparent;
        border-top: 2px solid currentColor;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: translate(-50%, -50%) rotate(0deg); }
        100% { transform: translate(-50%, -50%) rotate(360deg); }
    }
`;
document.head.appendChild(loadingStyle);

// Modal Functions
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

function showNotificationsModal() {
    showModal('notificationsModal');
}

function showIncidentModal() {
    showModal('incidentModal');
}

function showCalendarModal() {
    showModal('calendarModal');
}

function showPaymentModal() {
    showModal('paymentModal');
}

function showBillsModal() {
    showModal('billsModal');
}

function showSettingsModal() {
    showModal('settingsModal');
}

function showHelpModal() {
    showModal('helpModal');
}

// Setup modal close handlers
function setupModalCloseHandlers() {
    const modals = document.querySelectorAll('.modal');
    
    modals.forEach(modal => {
        const overlay = modal.querySelector('.modal-overlay');
        const closeBtn = modal.querySelector('.modal-close');
        const cancelBtn = modal.querySelector('[id$="Cancel"]');
        
        if (overlay) {
            overlay.addEventListener('click', () => {
                hideModal(modal.id);
            });
        }
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                hideModal(modal.id);
            });
        }
        
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                hideModal(modal.id);
            });
        }
    });
}

// Setup form submissions
function setupFormSubmissions() {
    // Incident form
    const incidentForm = document.getElementById('incidentForm');
    if (incidentForm) {
        incidentForm.addEventListener('submit', handleIncidentSubmission);
    }
    
    // Payment form
    const paymentForm = document.getElementById('paymentForm');
    if (paymentForm) {
        paymentForm.addEventListener('submit', handlePaymentSubmission);
    }
    
    // Settings form
    const settingsSaveBtn = document.getElementById('settingsSave');
    if (settingsSaveBtn) {
        settingsSaveBtn.addEventListener('click', handleSettingsSave);
    }
}

// Handle incident form submission
function handleIncidentSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const incidentData = {
        type: formData.get('incidentType'),
        location: formData.get('incidentLocation'),
        description: formData.get('incidentDescription'),
        priority: formData.get('incidentPriority'),
        timestamp: new Date().toISOString()
    };
    
    // Simulate API call
    setTimeout(() => {
        hideModal('incidentModal');
        showSuccessMessage('Incidencia reportada exitosamente');
        e.target.reset();
    }, 1000);
}

// Handle payment form submission
function handlePaymentSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const paymentData = {
        method: formData.get('paymentMethod'),
        amount: 45.50,
        timestamp: new Date().toISOString()
    };
    
    // Simulate API call
    setTimeout(() => {
        hideModal('paymentModal');
        showSuccessMessage('Pago procesado exitosamente');
        e.target.reset();
    }, 1500);
}

// Handle settings save
function handleSettingsSave() {
    const emailNotifications = document.getElementById('emailNotifications').checked;
    const smsNotifications = document.getElementById('smsNotifications').checked;
    const dataSharing = document.getElementById('dataSharing').checked;
    
    // Simulate API call
    setTimeout(() => {
        hideModal('settingsModal');
        showSuccessMessage('Configuración guardada exitosamente');
    }, 1000);
}

// Setup notification filters
function setupNotificationFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active filter
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter notifications
            filterNotifications(filter);
        });
    });
}

// Filter notifications
function filterNotifications(filter) {
    const notifications = document.querySelectorAll('.notification-item');
    
    notifications.forEach(notification => {
        if (filter === 'all' || notification.dataset.type === filter) {
            notification.style.display = 'flex';
        } else {
            notification.style.display = 'none';
        }
    });
}

// Setup mark as read functionality
function setupMarkAsRead() {
    const markReadBtns = document.querySelectorAll('.notification-mark-read');
    
    markReadBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const notification = this.closest('.notification-item');
            if (notification) {
                notification.classList.remove('unread');
                this.style.display = 'none';
                
                // Update notification count
                updateNotificationCount();
            }
        });
    });
}

// Initialize calendar
function initCalendar() {
    generateCalendar();
    
    // Setup calendar navigation
    const prevBtn = document.getElementById('prevMonth');
    const nextBtn = document.getElementById('nextMonth');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => navigateMonth(-1));
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => navigateMonth(1));
    }
}

// Generate calendar
function generateCalendar() {
    const calendarGrid = document.getElementById('calendarGrid');
    const currentMonth = document.getElementById('currentMonth');
    
    if (!calendarGrid || !currentMonth) return;
    
    const now = new Date();
    const currentDate = new Date(now.getFullYear(), now.getMonth(), 1);
    
    // Update month display
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                       'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    currentMonth.textContent = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    
    // Generate calendar days
    const firstDay = currentDate.getDay();
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    
    let calendarHTML = '';
    
    // Add day headers
    const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    dayNames.forEach(day => {
        calendarHTML += `<div class="calendar-day header">${day}</div>`;
    });
    
    // Add empty days for first week
    for (let i = 0; i < firstDay; i++) {
        calendarHTML += '<div class="calendar-day other-month"></div>';
    }
    
    // Add days of month
    for (let day = 1; day <= daysInMonth; day++) {
        let dayClass = 'calendar-day';
        
        // Add special classes for events
        if (day === 15) {
            dayClass += ' cut'; // Corte programado
        } else if (day === 22) {
            dayClass += ' maintenance'; // Mantenimiento
               } else if (day === now.getDate() && currentDate.getMonth() === now.getMonth()) {
            dayClass += ' event'; // Hoy
        }
        
        calendarHTML += `<div class="${dayClass}">${day}</div>`;
    }
    
    calendarGrid.innerHTML = calendarHTML;
}

// Navigate calendar months
function navigateMonth(direction) {
    // This would update the current month and regenerate calendar
    // For now, just regenerate with current month
    generateCalendar();
}

// Show success message
function showSuccessMessage(message) {
    // Create success notification
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.innerHTML = `
        <div class="success-content">
            <span class="success-icon">✅</span>
            <span class="success-text">${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add CSS for success notifications
const successStyle = document.createElement('style');
successStyle.textContent = `
    .success-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--success);
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    }
    
    .success-notification.show {
        transform: translateX(0);
    }
    
    .success-content {
        display: flex;
        align-items: center;
        gap: 12px;
    }
    
    .success-icon {
        font-size: 18px;
    }
    
    .success-text {
        font-weight: 600;
    }
`;

document.head.appendChild(successStyle);

// Bills and Payment Functions
function downloadBill(billNumber) {
    // Simulate bill download
    showSuccessMessage(`Descargando factura ${billNumber}...`);
    
    // Simulate download process
    setTimeout(() => {
        showSuccessMessage(`Factura ${billNumber} descargada exitosamente`);
    }, 2000);
}

function payBill(billNumber, amount) {
    // Update payment modal with bill information
    document.getElementById('paymentBillNumber').textContent = billNumber;
    document.getElementById('paymentAmount').textContent = `$${amount.toFixed(2)}`;
    document.getElementById('paymentTotal').textContent = `$${amount.toFixed(2)}`;
    
    // Set due date (you can make this dynamic)
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 15);
    const formattedDate = dueDate.toLocaleDateString('es-ES', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
    });
    document.getElementById('paymentDueDate').textContent = `Vence: ${formattedDate}`;
    
    // Hide bills modal and show payment modal
    hideModal('billsModal');
    showModal('paymentModal');
}

function togglePaymentFields() {
    const paymentMethod = document.getElementById('paymentMethod').value;
    const cardFields = document.getElementById('cardFields');
    const transferFields = document.getElementById('transferFields');
    
    // Hide all fields first
    cardFields.style.display = 'none';
    transferFields.style.display = 'none';
    
    // Show relevant fields based on selection
    switch (paymentMethod) {
        case 'debit':
        case 'credit':
            cardFields.style.display = 'block';
            break;
        case 'transfer':
            transferFields.style.display = 'block';
            break;
        case 'cash':
            // No additional fields for cash
            break;
    }
}

// Setup bills filters
function setupBillsFilters() {
    const filterBtns = document.querySelectorAll('.bills-filters .filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active filter
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter bills
            filterBills(filter);
        });
    });
}

// Filter bills
function filterBills(filter) {
    const bills = document.querySelectorAll('.bill-item');
    
    bills.forEach(bill => {
        const status = bill.dataset.status;
        
        if (filter === 'all' || status === filter) {
            bill.style.display = 'block';
        } else {
            bill.style.display = 'none';
        }
    });
}

// Enhanced payment form submission
function handlePaymentSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const paymentMethod = formData.get('paymentMethod');
    
    // Validate required fields based on payment method
    let isValid = true;
    let errorMessage = '';
    
    switch (paymentMethod) {
        case 'debit':
        case 'credit':
            if (!formData.get('cardNumber') || !formData.get('expiryDate') || 
                !formData.get('cardCVV') || !formData.get('cardholderName')) {
                isValid = false;
                errorMessage = 'Por favor complete todos los campos de la tarjeta';
            }
            break;
        case 'transfer':
            if (!formData.get('bankName') || !formData.get('accountNumber') || 
                !formData.get('referenceNumber')) {
                isValid = false;
                errorMessage = 'Por favor complete todos los campos de la transferencia';
            }
            break;
        case 'cash':
            // No additional validation needed for cash
            break;
        default:
            isValid = false;
            errorMessage = 'Por favor seleccione un método de pago';
    }
    
    if (!isValid) {
        showErrorMessage(errorMessage);
        return;
    }
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Procesando...';
    submitBtn.disabled = true;
    
    // Simulate payment processing
    setTimeout(() => {
        hideModal('paymentModal');
        showSuccessMessage('Pago procesado exitosamente');
        e.target.reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Update bills modal if it's open
        updateBillsAfterPayment();
    }, 2000);
}

// Update bills after successful payment
function updateBillsAfterPayment() {
    // This would typically update the bills list from the server
    // For now, we'll just show a success message
    showSuccessMessage('La factura ha sido marcada como pagada');
}

// Show error message
function showErrorMessage(message) {
    const notification = document.createElement('div');
    notification.className = 'error-notification';
    notification.innerHTML = `
        <div class="error-content">
            <span class="error-icon">❌</span>
            <span class="error-text">${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide notification after 4 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Add CSS for error notifications
const errorStyle = document.createElement('style');
errorStyle.textContent = `
    .error-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--error);
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    }
    
    .error-notification.show {
        transform: translateX(0);
    }
    
    .error-content {
        display: flex;
        align-items: center;
        gap: 12px;
    }
    
    .error-icon {
        font-size: 18px;
    }
    
    .error-text {
        font-weight: 600;
    }
`;

document.head.appendChild(errorStyle);

// Initialize bills functionality
function initBills() {
    setupBillsFilters();
}

// Add bills initialization to main init
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard
    initDashboard();
    
    // Setup event listeners
    setupEventListeners();
    
    // Load initial data
    loadDashboardData();
    
    // Initialize bills
    initBills();
});

// HIDROGEST Dashboard initialized successfully! 🚀 