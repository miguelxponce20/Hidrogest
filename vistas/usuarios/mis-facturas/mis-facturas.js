// Funcionalidad para Mis Facturas

// Filtros de facturas
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const billItems = document.querySelectorAll('.bill-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            // Remover clase active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Agregar clase active al botón seleccionado
            this.classList.add('active');

            // Filtrar facturas
            billItems.forEach(item => {
                if (filter === 'all') {
                    item.style.display = 'block';
                } else {
                    const status = item.getAttribute('data-status');
                    if (status === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });

            // Actualizar resumen
            updateSummary(filter);
        });
    });
});

// Actualizar resumen según el filtro
function updateSummary(filter) {
    const billItems = document.querySelectorAll('.bill-item');
    let pending = 0, paid = 0, overdue = 0, totalPending = 0, totalPaid = 0, totalOverdue = 0;

    billItems.forEach(item => {
        const status = item.getAttribute('data-status');
        const amountText = item.querySelector('.amount').textContent;
        const amount = parseFloat(amountText.replace('$', ''));

        switch(status) {
            case 'pending':
                pending++;
                totalPending += amount;
                break;
            case 'paid':
                paid++;
                totalPaid += amount;
                break;
            case 'overdue':
                overdue++;
                totalOverdue += amount;
                break;
        }
    });

    // Actualizar valores en la interfaz
    document.querySelector('.summary-value').textContent = `$${totalPending.toFixed(2)}`;
    document.querySelectorAll('.summary-value')[1].textContent = `$${totalOverdue.toFixed(2)}`;
    document.querySelectorAll('.summary-value')[2].textContent = `$${totalPaid.toFixed(2)}`;
}

// Descargar factura
function downloadBill(billId) {
    // Simular descarga
    alert(`Descargando factura ${billId}...`);

    // En una aplicación real, esto haría una petición al servidor
    // para descargar el PDF de la factura
    console.log(`Descargando factura: ${billId}`);
}

// Pagar factura
function payBill(billId, amount) {
    // Redirigir a la página de pago con los parámetros
    const paymentUrl = `/vistas/usuarios/realizar-pago/realizar-pago.html?bill=${billId}&amount=${amount}`;
    window.location.href = paymentUrl;
}

// Funciones adicionales que podrían ser útiles

// Ver detalles de la factura
function viewBillDetails(billId) {
    // Esta función podría abrir un modal con más detalles de la factura
    console.log(`Viendo detalles de: ${billId}`);
}

// Imprimir factura
function printBill(billId) {
    // Abrir una nueva ventana con la factura para imprimir
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
        <head>
            <title>Factura ${billId}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 20px; }
                .details { margin: 20px 0; }
                .amount { font-size: 24px; font-weight: bold; color: #007bff; }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>HIDROGEST</h1>
                <h2>Factura ${billId}</h2>
            </div>
            <div class="details">
                <p><strong>Período:</strong> Diciembre 2024</p>
                <p><strong>Monto:</strong> <span class="amount">$45.50</span></p>
                <p><strong>Estado:</strong> Pendiente</p>
            </div>
            <div style="text-align: center; margin-top: 50px;">
                <button onclick="window.print()">Imprimir</button>
            </div>
        </body>
        </html>
    `);
    printWindow.document.close();
}

// Exportar facturas a CSV
function exportBills() {
    alert('Exportando facturas a CSV...');
    // Implementación para exportar datos a CSV
}

// Recordatorio de pago
function setPaymentReminder(billId) {
    const reminderDate = prompt('¿Cuándo quieres que te recordemos el pago? (YYYY-MM-DD)');
    if (reminderDate) {
        alert(`Recordatorio configurado para ${reminderDate} para la factura ${billId}`);
    }
}
