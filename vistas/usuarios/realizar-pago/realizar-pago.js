// Funcionalidad para Realizar Pago

// Variables globales
let selectedPaymentMethod = '';
let currentBillData = {
    id: '#FAC-2024-001',
    amount: 45.50,
    dueDate: '15 Dic 2024'
};

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Obtener parámetros de la URL si existen
    const urlParams = new URLSearchParams(window.location.search);
    const billParam = urlParams.get('bill');
    const amountParam = urlParams.get('amount');

    if (billParam && amountParam) {
        currentBillData.id = billParam;
        currentBillData.amount = parseFloat(amountParam);
        updatePaymentSummary();
    }

    // Configurar validaciones del formulario
    setupFormValidation();

    // Configurar formateo de campos
    setupFieldFormatting();

    // Calcular total inicial sin intereses
    recalculateTotal();
    
    // Mejorar UI de la página de pago
    enhancePaymentUI();
});

// Mejorar UI de la página de pago
function enhancePaymentUI() {
    // Añadir iconos a los métodos de pago
    addPaymentMethodIcons();
    
    // Mejorar campos de formulario
    enhanceFormFields();
    
    // Añadir indicadores de seguridad
    addSecurityIndicators();
}

// Añadir iconos a métodos de pago
function addPaymentMethodIcons() {
    const methodSelect = document.getElementById('paymentMethod');
    if (!methodSelect) return;
    
    const options = methodSelect.querySelectorAll('option');
    options.forEach(option => {
        const icons = {
            'debit': '💳',
            'credit': '💳',
            'transfer': '🏦',
            'cash': '💵'
        };
        
        if (icons[option.value]) {
            option.innerHTML = `${icons[option.value]} ${option.textContent}`;
        }
    });
}

// Mejorar campos de formulario
function enhanceFormFields() {
    // Añadir iconos a labels
    const labels = document.querySelectorAll('label');
    labels.forEach(label => {
        const text = label.textContent;
        const icons = {
            'Número de Tarjeta': '🔢',
            'Fecha de Vencimiento': '📅',
            'CVV': '🔒',
            'Nombre del Titular': '👤',
            'Banco': '🏛️',
            'Número de Cuenta': '📋',
            'Número de Referencia': '🔗'
        };
        
        if (icons[text]) {
            label.innerHTML = `${icons[text]} ${text}`;
        }
    });
    
    // Añadir estados de validación en tiempo real
    addRealTimeValidation();
}

// Añadir validación en tiempo real
function addRealTimeValidation() {
    const cardNumber = document.getElementById('cardNumber');
    const expiryDate = document.getElementById('expiryDate');
    const cvv = document.getElementById('cardCVV');
    
    if (cardNumber) {
        cardNumber.addEventListener('input', function() {
            validateCardNumber(this);
        });
    }
    
    if (expiryDate) {
        expiryDate.addEventListener('input', function() {
            validateExpiryDate(this);
        });
    }
    
    if (cvv) {
        cvv.addEventListener('input', function() {
            validateCVV(this);
        });
    }
}

// Validar número de tarjeta en tiempo real
function validateCardNumber(input) {
    const value = input.value.replace(/\s+/g, '');
    const isValid = value.length >= 13 && value.length <= 19;
    
    if (value.length > 0) {
        input.style.borderColor = isValid ? 'var(--success)' : 'var(--error)';
        input.style.backgroundColor = isValid ? 'rgba(16,185,129,0.05)' : 'rgba(239,68,68,0.05)';
    } else {
        input.style.borderColor = '';
        input.style.backgroundColor = '';
    }
}

// Validar fecha de expiración en tiempo real
function validateExpiryDate(input) {
    const value = input.value;
    const isValid = /^\d{2}\/\d{2}$/.test(value);
    
    if (value.length > 0) {
        input.style.borderColor = isValid ? 'var(--success)' : 'var(--error)';
        input.style.backgroundColor = isValid ? 'rgba(16,185,129,0.05)' : 'rgba(239,68,68,0.05)';
    } else {
        input.style.borderColor = '';
        input.style.backgroundColor = '';
    }
}

// Validar CVV en tiempo real
function validateCVV(input) {
    const value = input.value;
    const isValid = value.length === 3;
    
    if (value.length > 0) {
        input.style.borderColor = isValid ? 'var(--success)' : 'var(--error)';
        input.style.backgroundColor = isValid ? 'rgba(16,185,129,0.05)' : 'rgba(239,68,68,0.05)';
    } else {
        input.style.borderColor = '';
        input.style.backgroundColor = '';
    }
}

// Añadir indicadores de seguridad
function addSecurityIndicators() {
    const formContainer = document.querySelector('.payment-form-container');
    if (!formContainer) return;
    
    const securityNotice = document.createElement('div');
    securityNotice.className = 'security-notice';
    securityNotice.innerHTML = `
        <div class="security-header">
            <span class="security-icon">🔒</span>
            <span class="security-text">Pago Seguro</span>
        </div>
        <div class="security-features">
            <span class="feature">✓ Encriptado SSL</span>
            <span class="feature">✓ Protección PCI DSS</span>
            <span class="feature">✓ Sin almacenamiento de datos</span>
        </div>
    `;
    
    // Insertar después del título del formulario
    const formTitle = formContainer.querySelector('h4');
    if (formTitle) {
        formTitle.parentNode.insertBefore(securityNotice, formTitle.nextSibling);
    }
}

// Actualizar resumen de pago
function updatePaymentSummary() {
    document.getElementById('paymentBillNumber').textContent = currentBillData.id;
    document.getElementById('paymentAmount').textContent = `$${currentBillData.amount.toFixed(2)}`;
    document.getElementById('paymentDueDate').textContent = currentBillData.dueDate;
    document.getElementById('paymentTotal').textContent = `$${currentBillData.amount.toFixed(2)}`;
}

// Mostrar/ocultar campos según método de pago
function togglePaymentFields() {
    const paymentMethod = document.getElementById('paymentMethod').value;
    selectedPaymentMethod = paymentMethod;

    // Ocultar todos los campos específicos
    document.getElementById('cardFields').style.display = 'none';
    document.getElementById('transferFields').style.display = 'none';

    // Mostrar campos del método seleccionado
    if (paymentMethod === 'debit' || paymentMethod === 'credit') {
        document.getElementById('cardFields').style.display = 'block';
    } else if (paymentMethod === 'transfer') {
        document.getElementById('transferFields').style.display = 'block';
    }
}

// Configurar validaciones del formulario
function setupFormValidation() {
    const form = document.getElementById('paymentForm');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        if (validateForm()) {
            showPaymentConfirmation();
        }
    });
}

// Configurar formateo de campos
function setupFieldFormatting() {
    // Formateo automático del número de tarjeta
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            formatCardNumber(e.target);
        });
    }

    // Formateo automático de fecha de expiración
    const expiryInput = document.getElementById('expiryDate');
    if (expiryInput) {
        expiryInput.addEventListener('input', function(e) {
            formatExpiryDate(e.target);
        });
    }

    // Solo números para CVV
    const cvvInput = document.getElementById('cardCVV');
    if (cvvInput) {
        cvvInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }
}

// Formatear número de tarjeta
function formatCardNumber(input) {
    let value = input.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let formattedValue = '';

    for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 === 0) {
            formattedValue += ' ';
        }
        formattedValue += value[i];
    }

    input.value = formattedValue;
}

// Formatear fecha de expiración
function formatExpiryDate(input) {
    let value = input.value.replace(/\D/g, '');

    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }

    input.value = value;
}

// Validar formulario
function validateForm() {
    const paymentMethod = document.getElementById('paymentMethod').value;

    if (!paymentMethod) {
        alert('Por favor selecciona un método de pago.');
        return false;
    }

    // Validaciones específicas por método
    if (paymentMethod === 'debit' || paymentMethod === 'credit') {
        return validateCardFields();
    } else if (paymentMethod === 'transfer') {
        return validateTransferFields();
    }

    return true;
}

// Validar campos de tarjeta
function validateCardFields() {
    const cardNumber = document.getElementById('cardNumber').value.replace(/\s+/g, '');
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cardCVV').value;
    const cardholderName = document.getElementById('cardholderName').value;

    if (cardNumber.length < 13 || cardNumber.length > 19) {
        alert('Número de tarjeta inválido.');
        return false;
    }

    if (!expiryDate.match(/^\d{2}\/\d{2}$/)) {
        alert('Fecha de expiración inválida.');
        return false;
    }

    if (cvv.length !== 3) {
        alert('CVV inválido.');
        return false;
    }

    if (!cardholderName.trim()) {
        alert('Nombre del titular es requerido.');
        return false;
    }

    return true;
}

// Validar campos de transferencia
function validateTransferFields() {
    const bankName = document.getElementById('bankName').value;
    const accountNumber = document.getElementById('accountNumber').value;
    const referenceNumber = document.getElementById('referenceNumber').value;

    if (!bankName) {
        alert('Por favor selecciona un banco.');
        return false;
    }

    if (!accountNumber.trim()) {
        alert('Número de cuenta es requerido.');
        return false;
    }

    if (!referenceNumber.trim()) {
        alert('Número de referencia es requerido.');
        return false;
    }

    return true;
}

// Mostrar modal de confirmación
function showPaymentConfirmation() {
    const methodNames = {
        'debit': 'Tarjeta de Débito',
        'credit': 'Tarjeta de Crédito',
        'transfer': 'Transferencia Bancaria',
        'cash': 'Efectivo'
    };

    document.getElementById('confirmBillNumber').textContent = currentBillData.id;
    document.getElementById('confirmAmount').textContent = `$${currentBillData.amount.toFixed(2)}`;
    document.getElementById('confirmMethod').textContent = methodNames[selectedPaymentMethod] || selectedPaymentMethod;

    const modal = document.getElementById('paymentConfirmationModal');
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
}

// Procesar pago
function processPayment() {
    // Cerrar modal de confirmación
    const modal = document.getElementById('paymentConfirmationModal');
    modal.classList.remove('show');
    setTimeout(() => modal.style.display = 'none', 300);

    // Simular procesamiento del pago
    showProcessingMessage();

    setTimeout(function() {
        showPaymentSuccess();
    }, 2000); // Simular delay de procesamiento
}

// Mostrar mensaje de procesamiento
function showProcessingMessage() {
    // Aquí podrías mostrar un spinner o mensaje de carga
    console.log('Procesando pago...');
}

// Mostrar modal de éxito
function showPaymentSuccess() {
    const now = new Date();
    const transactionId = 'TXN-' + now.getFullYear() + '-' + String(Math.floor(Math.random() * 1000)).padStart(3, '0');

    document.getElementById('transactionId').textContent = transactionId;
    document.getElementById('successBillNumber').textContent = currentBillData.id;
    document.getElementById('successAmount').textContent = `$${currentBillData.amount.toFixed(2)}`;
    document.getElementById('successDate').textContent = now.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    const successModal = document.getElementById('paymentSuccessModal');
    successModal.style.display = 'flex';
    setTimeout(() => successModal.classList.add('show'), 10);
}

// Descargar recibo
function downloadReceipt() {
    alert('Descargando recibo de pago...');
    // Aquí iría la lógica para descargar el recibo
}

// Ir a mis facturas
function goToBills() {
    window.location.href = '../mis-facturas/mis-facturas.html';
}

// Cancelar pago
function cancelPayment() {
    if (confirm('¿Estás seguro de que quieres cancelar el pago?')) {
        window.location.href = '../mis-facturas/mis-facturas.html';
    }
}

// Cerrar modales
document.getElementById('confirmationModalClose').addEventListener('click', function() {
    const modal = document.getElementById('paymentConfirmationModal');
    modal.classList.remove('show');
    setTimeout(() => modal.style.display = 'none', 300);
});

document.getElementById('confirmationModalOverlay').addEventListener('click', function() {
    const modal = document.getElementById('paymentConfirmationModal');
    modal.classList.remove('show');
    setTimeout(() => modal.style.display = 'none', 300);
});

document.getElementById('confirmationCancel').addEventListener('click', function() {
    const modal = document.getElementById('paymentConfirmationModal');
    modal.classList.remove('show');
    setTimeout(() => modal.style.display = 'none', 300);
});

document.getElementById('successModalClose').addEventListener('click', function() {
    const modal = document.getElementById('paymentSuccessModal');
    modal.classList.remove('show');
    setTimeout(() => modal.style.display = 'none', 300);
});

document.getElementById('successModalOverlay').addEventListener('click', function() {
    // No cerrar automáticamente el modal de éxito con overlay
});

// Funciones adicionales para mejorar la UX

// Detectar tipo de tarjeta
function detectCardType(cardNumber) {
    const number = cardNumber.replace(/\s+/g, '');

    if (number.startsWith('4')) {
        return 'Visa';
    } else if (number.startsWith('5') || number.startsWith('2')) {
        return 'Mastercard';
    } else if (number.startsWith('3')) {
        return 'American Express';
    }

    return 'Desconocida';
}

// Validar fecha de expiración
function isValidExpiryDate(month, year) {
    const now = new Date();
    const currentYear = now.getFullYear() % 100; // Últimos 2 dígitos
    const currentMonth = now.getMonth() + 1;

    const expYear = parseInt(year);
    const expMonth = parseInt(month);

    if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
        return false;
    }

    return expMonth >= 1 && expMonth <= 12;
}

// Calcular intereses (si aplica)
function calculateInterest(amount, method) {
    // Lógica para calcular intereses según el método de pago
    const interestRates = {
        'debit': 0,
        'credit': 0.05, // 5% para tarjetas de crédito
        'transfer': 0,
        'cash': 0
    };

    const rate = interestRates[method] || 0;
    return amount * rate;
}
