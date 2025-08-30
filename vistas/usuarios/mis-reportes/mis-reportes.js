// Funcionalidad para Mis Reportes

// Filtros de reportes
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const reportItems = document.querySelectorAll('.report-item');

    // Cálculo inicial de estadísticas
    updateStats('all');

    // Mejorar cards con estados visuales
    enhanceReportCards();

    filterButtons.forEach(button => {
        button.setAttribute('role', 'tab');
        button.setAttribute('aria-selected', button.classList.contains('active') ? 'true' : 'false');
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            // Remover clase active de todos los botones
            filterButtons.forEach(btn => { btn.classList.remove('active'); btn.setAttribute('aria-selected', 'false'); });
            // Agregar clase active al botón seleccionado
            this.classList.add('active');
            this.setAttribute('aria-selected', 'true');

            // Filtrar reportes (sin animación)
            reportItems.forEach(item => {
                const show = filter === 'all' || item.getAttribute('data-status') === filter;
                item.style.transition = 'none';
                item.style.display = show ? 'block' : 'none';
            });

            // Actualizar estadísticas
            updateStats(filter);
        });
    });
});

// Mejorar diseño de cards de reportes
function enhanceReportCards() {
    const reportItems = document.querySelectorAll('.report-item');
    
    reportItems.forEach(item => {
        const status = item.getAttribute('data-status');
        const priority = item.querySelector('.report-priority')?.textContent || '';
        
        // Añadir iconos según tipo y estado
        addStatusIcons(item, status);
        
        // Añadir indicadores de prioridad
        addPriorityIndicators(item, priority);
        
        // Mejorar timeline visual
        enhanceTimeline(item);
    });
}

// Añadir iconos de estado
function addStatusIcons(item, status) {
    const statusEl = item.querySelector('.report-status');
    if (!statusEl) return;
    
    const icons = {
        'pending': '⏳',
        'in-progress': '🔄',
        'resolved': '✅'
    };
    
    if (icons[status]) {
        statusEl.innerHTML = `${icons[status]} ${statusEl.textContent}`;
    }
}

// Añadir indicadores de prioridad
function addPriorityIndicators(item, priority) {
    const priorityEl = item.querySelector('.report-priority');
    if (!priorityEl) return;
    
    const indicators = {
        'Alta': '🔴',
        'Media': '🟡',
        'Baja': '🟢'
    };
    
    if (indicators[priority]) {
        priorityEl.innerHTML = `${indicators[priority]} ${priorityEl.textContent}`;
    }
}

// Mejorar timeline visual
function enhanceTimeline(item) {
    const timeline = item.querySelector('.report-timeline');
    if (!timeline) return;
    
    const timelineItems = timeline.querySelectorAll('.timeline-item');
    timelineItems.forEach((timelineItem, index) => {
        const dot = timelineItem.querySelector('.timeline-dot');
        const content = timelineItem.querySelector('.timeline-content');
        
        // Añadir línea conectora
        if (index < timelineItems.length - 1) {
            const connector = document.createElement('div');
            connector.className = 'timeline-connector';
            connector.style.cssText = `
                position: absolute;
                left: 5px;
                top: 20px;
                width: 2px;
                height: 20px;
                background: var(--outline-light);
                z-index: 1;
            `;
            timelineItem.style.position = 'relative';
            timelineItem.appendChild(connector);
        }
        
        // Mejorar dot visual
        if (dot) {
            dot.style.cssText = `
                width: 12px;
                height: 12px;
                border-radius: 50%;
                margin-top: 6px;
                z-index: 2;
                position: relative;
            `;
        }
    });
}

// Actualizar estadísticas según el filtro
function updateStats(filter) {
    const reportItems = document.querySelectorAll('.report-item');
    let total = 0, pending = 0, resolved = 0, inProgress = 0;

    reportItems.forEach(item => {
        const status = item.getAttribute('data-status');
        if (filter === 'all' || status === filter) {
            total++;
            switch(status) {
                case 'pending': pending++; break;
                case 'in-progress': inProgress++; break;
                case 'resolved': resolved++; break;
            }
        }
    });

    if (filter === 'all') {
        document.getElementById('totalReports').textContent = reportItems.length;
        document.getElementById('pendingReports').textContent = document.querySelectorAll('.report-item[data-status="pending"]').length;
        document.getElementById('resolvedReports').textContent = document.querySelectorAll('.report-item[data-status="resolved"]').length;
    } else {
        document.getElementById('totalReports').textContent = total;
        document.getElementById('pendingReports').textContent = pending;
        document.getElementById('resolvedReports').textContent = resolved;
    }
}

// Ver detalles del reporte
function viewReport(reportId) {
    const modal = document.getElementById('reportModal');
    const modalBody = document.getElementById('reportModalBody');

    // Datos del reporte (en una aplicación real vendrían del backend)
    const reportData = getReportData(reportId);

    modalBody.innerHTML = `
        <div class="report-details">
            <div class="report-header-info">
                <div class="report-id-large">${reportData.id}</div>
                <div class="report-status-large ${reportData.status}">${reportData.statusText}</div>
            </div>

            <div class="report-info-section">
                <h4>Información del Reporte</h4>
                <div class="info-grid">
                    <div class="info-item">
                        <label>Tipo de Incidencia:</label>
                        <span>${reportData.type}</span>
                    </div>
                    <div class="info-item">
                        <label>Prioridad:</label>
                        <span class="priority-${reportData.priority.toLowerCase()}">${reportData.priority}</span>
                    </div>
                    <div class="info-item">
                        <label>Ubicación:</label>
                        <span>${reportData.location}</span>
                    </div>
                    <div class="info-item">
                        <label>Fecha de Creación:</label>
                        <span>${reportData.createdDate}</span>
                    </div>
                </div>
            </div>

            <div class="report-description-section">
                <h4>Descripción</h4>
                <p>${reportData.description}</p>
            </div>

            <div class="report-timeline-section">
                <h4>Historial del Reporte</h4>
                <div class="timeline-full">
                    ${reportData.timeline.map(item => `
                        <div class="timeline-item-full">
                            <div class="timeline-dot-full ${item.status}"></div>
                            <div class="timeline-content-full">
                                <span class="timeline-date-full">${item.date}</span>
                                <span class="timeline-text-full">${item.text}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="report-actions-section">
                <button class="btn-secondary" onclick="printReport('${reportId}')">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M6 9V2H18V9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M6 18H4C3.46957 18 2.96086 17.7893 2.58579 17.4142C2.21071 17.0391 2 16.5304 2 16V11C2 10.4696 2.21071 9.96086 2.58579 9.58579C2.96086 9.21071 3.46957 9 4 9H20C20.5304 9 21.0391 9.21071 21.4142 9.58579C21.7893 9.96086 22 10.4696 22 11V16C22 16.5304 21.7893 17.0391 21.4142 17.4142C21.0391 17.7893 20.5304 18 20 18H18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M18 14H6V22H18V14Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Imprimir Reporte
                </button>
                ${reportData.status === 'resolved' ? `
                    <button class="btn-primary" onclick="rateService('${reportId}')">
                        Calificar Servicio
                    </button>
                ` : `
                    <button class="btn-primary" onclick="followUpReport('${reportId}')">
                        Seguir Reporte
                    </button>
                `}
            </div>
        </div>
    `;

    modal.style.display = 'block';
}

// Obtener datos del reporte (simulado)
function getReportData(reportId) {
    const reports = {
        'REP-2024-001': {
            id: '#REP-2024-001',
            status: 'pending',
            statusText: 'Pendiente',
            type: 'Corte de agua',
            priority: 'Alta',
            location: 'Casa Principal - Sector Norte',
            createdDate: '15 Dic 2024, 10:30 AM',
            description: 'Reporté falta de agua en mi residencia desde hace 2 días. El suministro se cortó sin previo aviso y no he recibido ninguna notificación oficial.',
            timeline: [
                { date: '15 Dic 2024, 10:30 AM', text: 'Reporte creado exitosamente', status: '' }
            ]
        },
        'REP-2024-002': {
            id: '#REP-2024-002',
            status: 'in-progress',
            statusText: 'En Progreso',
            type: 'Baja presión',
            priority: 'Media',
            location: 'Apartamento - Centro',
            createdDate: '13 Dic 2024, 9:45 AM',
            description: 'La presión del agua ha disminuido considerablemente en las últimas semanas, especialmente por las mañanas. Esto afecta el uso normal de los servicios.',
            timeline: [
                { date: '14 Dic 2024, 3:15 PM', text: 'Técnico asignado - Juan Pérez', status: 'active' },
                { date: '13 Dic 2024, 9:45 AM', text: 'Reporte creado exitosamente', status: '' }
            ]
        },
        'REP-2024-003': {
            id: '#REP-2024-003',
            status: 'resolved',
            statusText: 'Resuelto',
            type: 'Agua sucia',
            priority: 'Media',
            location: 'Casa Principal - Sector Norte',
            createdDate: '10 Dic 2024, 8:20 AM',
            description: 'El agua salía con un olor fuerte a cloro. Ya fue solucionado.',
            timeline: [
                { date: '12 Dic 2024, 2:30 PM', text: 'Problema resuelto - Calidad de agua normalizada', status: 'completed' },
                { date: '11 Dic 2024, 11:00 AM', text: 'Trabajo realizado - Sistema de filtrado revisado', status: 'completed' },
                { date: '10 Dic 2024, 8:20 AM', text: 'Reporte creado exitosamente', status: 'completed' }
            ]
        }
    };

    return reports[reportId];
}

// Seguir reporte
function followUpReport(reportId) {
    alert(`Siguiendo el reporte ${reportId}. Te notificaremos cuando haya actualizaciones.`);
}

// Contactar técnico
function contactTechnician(reportId) {
    alert(`Contactando al técnico asignado al reporte ${reportId}...`);
}

// Calificar servicio
function rateService(reportId) {
    const rating = prompt(`Califica el servicio para el reporte ${reportId} (1-5 estrellas):`);
    if (rating && rating >= 1 && rating <= 5) {
        alert(`¡Gracias! Has calificado con ${rating} estrella(s) el reporte ${reportId}.`);
    }
}

// Imprimir reporte
function printReport(reportId) {
    window.print();
}

// Cerrar modal
document.getElementById('reportModalClose').addEventListener('click', function() {
    document.getElementById('reportModal').style.display = 'none';
});

document.getElementById('reportModalOverlay').addEventListener('click', function() {
    document.getElementById('reportModal').style.display = 'none';
});
