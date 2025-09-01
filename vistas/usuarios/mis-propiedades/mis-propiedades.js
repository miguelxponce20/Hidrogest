// Funcionalidad para Mis Propiedades

// Variables globales
let propertiesData = [
    {
        id: 'CTR-2023-001',
        name: 'Casa Principal',
        type: 'Residencial',
        address: 'Calle Principal 123, Sector Norte, San Juan de los Morros',
        contractNumber: 'CTR-2023-001',
        startDate: '15 Enero 2023',
        lastReading: '1,250 m³ - 10 Dic 2024',
        averageConsumption: '45 m³/mes',
        monthlyCost: 42.60,
        status: 'active',
        serviceStatus: 'Excelente',
        readings: [
            { date: '10 Dic 2024', consumption: 1250, cost: 42.60 },
            { date: '10 Nov 2024', consumption: 1205, cost: 38.20 },
            { date: '10 Oct 2024', consumption: 1160, cost: 42.60 },
            { date: '10 Sep 2024', consumption: 1115, cost: 35.80 }
        ]
    },
    {
        id: 'CTR-2023-002',
        name: 'Apartamento Centro',
        type: 'Residencial',
        address: 'Av. Bolívar Norte 456, Centro, San Juan de los Morros',
        contractNumber: 'CTR-2023-002',
        startDate: '20 Marzo 2023',
        lastReading: '890 m³ - 8 Dic 2024',
        averageConsumption: '32 m³/mes',
        monthlyCost: 44.70,
        status: 'active',
        serviceStatus: 'Excelente',
        readings: [
            { date: '8 Dic 2024', consumption: 890, cost: 44.70 },
            { date: '8 Nov 2024', consumption: 858, cost: 38.20 },
            { date: '8 Oct 2024', consumption: 826, cost: 42.60 },
            { date: '8 Sep 2024', consumption: 794, cost: 35.80 }
        ]
    }
];

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando Mis Propiedades...');
    updatePropertiesStats();

    // Mejorar cards de propiedades
    enhancePropertyCards();

    console.log('✅ Mis Propiedades inicializado correctamente');
});

// Actualizar estadísticas de propiedades
function updatePropertiesStats() {
    const totalProperties = propertiesData.length;
    const activeProperties = propertiesData.filter(p => p.status === 'active').length;
    const totalMonthly = propertiesData.reduce((sum, p) => sum + p.monthlyCost, 0);

    document.getElementById('totalProperties').textContent = totalProperties;
    document.getElementById('activeProperties').textContent = activeProperties;
    document.getElementById('totalMonthly').textContent = `$${totalMonthly.toFixed(2)}`;
}

// Ver detalles de la propiedad
function viewPropertyDetails(propertyId) {
    console.log('🔍 Mostrando detalles de propiedad:', propertyId);
    const property = propertiesData.find(p => p.id === propertyId);

    if (!property) {
        console.error('❌ Propiedad no encontrada:', propertyId);
        alert('Propiedad no encontrada');
        return;
    }

    const modal = document.getElementById('propertyModal');
    const modalBody = document.getElementById('propertyModalBody');

    modalBody.innerHTML = `
        <div class="property-details">
            <div class="property-detail-header">
                <div class="property-detail-title">
                    <h3>${property.name}</h3>
                    <span class="property-detail-type">${property.type}</span>
                </div>
                <div class="property-detail-status ${property.status}">
                    <span class="status-dot"></span>
                    ${property.status === 'active' ? 'Servicio Activo' : 'Servicio Inactivo'}
                </div>
            </div>

            <div class="property-detail-info">
                <h4>Información General</h4>
                <div class="info-grid">
                    <div class="info-item">
                        <label>Dirección:</label>
                        <span>${property.address}</span>
                    </div>
                    <div class="info-item">
                        <label>Número de Contrato:</label>
                        <span>${property.contractNumber}</span>
                    </div>
                    <div class="info-item">
                        <label>Fecha de Inicio:</label>
                        <span>${property.startDate}</span>
                    </div>
                    <div class="info-item">
                        <label>Última Lectura:</label>
                        <span>${property.lastReading}</span>
                    </div>
                    <div class="info-item">
                        <label>Consumo Promedio:</label>
                        <span>${property.averageConsumption}</span>
                    </div>
                    <div class="info-item">
                        <label>Costo Mensual Actual:</label>
                        <span class="amount">$${property.monthlyCost.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            <div class="property-consumption-history">
                <h4>Historial de Consumo (Últimos 4 meses)</h4>
                <div class="consumption-table">
                    <div class="table-header">
                        <span>Fecha</span>
                        <span>Consumo (m³)</span>
                        <span>Costo ($)</span>
                    </div>
                    ${property.readings.map(reading => `
                        <div class="table-row">
                            <span>${reading.date}</span>
                            <span>${reading.consumption.toLocaleString()}</span>
                            <span>$${reading.cost.toFixed(2)}</span>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="property-detail-actions">
                <button class="btn-secondary" onclick="viewConsumptionHistory('${property.id}')">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M9 19V6L21 3V16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M11 17C11 17.5304 10.7893 18.0391 10.4142 18.4142C10.0391 18.7893 9.53043 19 9 19C8.46957 19 7.96086 18.7893 7.58579 18.4142C7.21071 18.0391 7 17.5304 7 17C7 16.4696 7.21071 15.9609 7.58579 15.5858C7.96086 15.2107 8.46957 15 9 15C9.53043 15 10.0391 15.2107 10.4142 15.5858C10.7893 15.9609 11 16.4696 11 17Z" stroke="currentColor" stroke-width="2"/>
                        <path d="M21 16V19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Ver Historial Completo
                </button>
                <button class="btn-primary" onclick="reportIncident('${property.id}')">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M10.29 3.86L1.82 18A2 2 0 0 0 3.82 20H20.18A2 2 0 0 0 22.18 18L13.71 3.86A2 2 0 0 0 10.29 3.86Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Reportar Incidencia
                </button>
                <button class="btn-outline" onclick="downloadPropertyReport('${property.id}')">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <polyline points="7,10 12,15 17,10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Descargar Reporte
                </button>
            </div>
        </div>
    `;

    modal.style.display = 'flex';
    // Pequeño delay para asegurar que display: flex esté aplicado antes de la transición
    setTimeout(() => modal.classList.add('show'), 10);
}

// Ver historial de consumo
function viewConsumptionHistory(propertyId) {
    console.log('📊 Mostrando historial de consumo:', propertyId);
    const property = propertiesData.find(p => p.id === propertyId);

    if (!property) {
        console.error('❌ Propiedad no encontrada:', propertyId);
        alert('Propiedad no encontrada');
        return;
    }

    // Crear un modal o vista expandida del historial
    const modal = document.getElementById('propertyModal');
    const modalBody = document.getElementById('propertyModalBody');

    modalBody.innerHTML = `
        <div class="consumption-history">
            <div class="history-header">
                <h3>Historial de Consumo - ${property.name}</h3>
                <p>Contrato: ${property.contractNumber}</p>
            </div>

            <div class="consumption-chart-placeholder">
                <div class="chart-placeholder">
                    <svg width="400" height="200" viewBox="0 0 400 200">
                        <!-- Gráfico simple de barras -->
                        <text x="200" y="20" text-anchor="middle" font-size="16" font-weight="bold">
                            Consumo Mensual (m³)
                        </text>
                        ${property.readings.map((reading, index) => {
                            const barHeight = (reading.consumption / 1500) * 120; // Escala
                            const x = 50 + (index * 80);
                            const y = 160 - barHeight;
                            return `
                                <rect x="${x}" y="${y}" width="40" height="${barHeight}"
                                      fill="#007bff" rx="4"/>
                                <text x="${x + 20}" y="${y - 10}" text-anchor="middle" font-size="12">
                                    ${reading.consumption}
                                </text>
                                <text x="${x + 20}" y="180" text-anchor="middle" font-size="10">
                                    ${reading.date.split(' ')[1]}
                                </text>
                            `;
                        }).join('')}
                    </svg>
                </div>
            </div>

            <div class="consumption-table-full">
                <div class="table-header">
                    <span>Fecha</span>
                    <span>Consumo (m³)</span>
                    <span>Costo ($)</span>
                    <span>Consumo vs Mes Anterior</span>
                </div>
                ${property.readings.map((reading, index) => {
                    const previousConsumption = index < property.readings.length - 1 ?
                        property.readings[index + 1].consumption : reading.consumption;
                    const difference = reading.consumption - previousConsumption;
                    const differenceClass = difference > 0 ? 'increase' : difference < 0 ? 'decrease' : 'same';

                    return `
                        <div class="table-row">
                            <span>${reading.date}</span>
                            <span>${reading.consumption.toLocaleString()}</span>
                            <span>$${reading.cost.toFixed(2)}</span>
                            <span class="consumption-difference ${differenceClass}">
                                ${difference > 0 ? '+' : ''}${difference} m³
                            </span>
                        </div>
                    `;
                }).join('')}
            </div>

            <div class="consumption-stats">
                <div class="stat-box">
                    <span class="stat-label">Consumo Promedio</span>
                    <span class="stat-value">${property.averageConsumption}</span>
                </div>
                <div class="stat-box">
                    <span class="stat-label">Costo Promedio Mensual</span>
                    <span class="stat-value">$${property.monthlyCost.toFixed(2)}</span>
                </div>
                <div class="stat-box">
                    <span class="stat-label">Total Consumido (4 meses)</span>
                    <span class="stat-value">${property.readings.reduce((sum, r) => sum + r.consumption, 0).toLocaleString()} m³</span>
                </div>
            </div>

            <div class="history-actions">
                <button class="btn-secondary" onclick="exportConsumptionData('${property.id}')">
                    Exportar Datos
                </button>
                <button class="btn-primary" onclick="viewPropertyDetails('${property.id}')">
                    Volver a Detalles
                </button>
            </div>
        </div>
    `;

    modal.style.display = 'flex';
    // Pequeño delay para asegurar que display: flex esté aplicado antes de la transición
    setTimeout(() => modal.classList.add('show'), 10);
}

// Reportar incidencia para una propiedad
function reportIncident(propertyId) {
    console.log('🚨 Reportando incidencia para propiedad:', propertyId);
    const property = propertiesData.find(p => p.id === propertyId);

    if (!property) {
        console.error('❌ Propiedad no encontrada:', propertyId);
        alert('Propiedad no encontrada');
        return;
    }

    // Redirigir a la página de reportar incidencia con la propiedad preseleccionada
    const incidentUrl = '../incidencias/incidencias.html?property=' + encodeURIComponent(property.name);
    window.location.href = incidentUrl;
}

// Descargar reporte de propiedad
function downloadPropertyReport(propertyId) {
    alert(`Descargando reporte completo de la propiedad ${propertyId}...`);
    // Implementación para descargar PDF con detalles completos
}

// Agregar nueva propiedad
function addNewProperty() {
    alert('Funcionalidad para agregar nueva propiedad próximamente disponible.');
    // Aquí iría la lógica para agregar una nueva propiedad
}

// Exportar datos de propiedades
function exportProperties() {
    alert('Exportando datos de todas las propiedades...');
    // Implementación para exportar datos a CSV/Excel
}

// Exportar datos de consumo
function exportConsumptionData(propertyId) {
    alert(`Exportando datos de consumo para la propiedad ${propertyId}...`);
    // Implementación para exportar datos de consumo a CSV
}

// Cerrar modal
document.getElementById('propertyModalClose').addEventListener('click', function() {
    const modal = document.getElementById('propertyModal');
    modal.classList.remove('show');
    setTimeout(() => modal.style.display = 'none', 300);
});

document.getElementById('propertyModalOverlay').addEventListener('click', function() {
    const modal = document.getElementById('propertyModal');
    modal.classList.remove('show');
    setTimeout(() => modal.style.display = 'none', 300);
});

// Funciones adicionales para mejorar la funcionalidad

// Calcular estadísticas de consumo
function calculateConsumptionStats(readings) {
    const totalConsumption = readings.reduce((sum, reading) => sum + reading.consumption, 0);
    const averageConsumption = totalConsumption / readings.length;
    const totalCost = readings.reduce((sum, reading) => sum + reading.cost, 0);
    const averageCost = totalCost / readings.length;

    return {
        totalConsumption,
        averageConsumption,
        totalCost,
        averageCost
    };
}

// Obtener lecturas por período
function getReadingsByPeriod(readings, period) {
    // Filtrar lecturas por período (mes, trimestre, año)
    const now = new Date();
    const filteredReadings = readings.filter(reading => {
        const readingDate = new Date(reading.date);
        const diffTime = Math.abs(now - readingDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        switch(period) {
            case 'month': return diffDays <= 30;
            case 'quarter': return diffDays <= 90;
            case 'year': return diffDays <= 365;
            default: return true;
        }
    });

    return filteredReadings;
}

// Generar recomendaciones basadas en consumo
function generateConsumptionRecommendations(property) {
    const stats = calculateConsumptionStats(property.readings);
    const recommendations = [];

    if (stats.averageConsumption > 50) {
        recommendations.push('Considera revisar posibles fugas de agua');
    }

    if (stats.averageConsumption < 20) {
        recommendations.push('Tu consumo es muy bajo, ¡excelente eficiencia!');
    }

    // Más recomendaciones basadas en patrones...

    return recommendations;
}

// Mejorar diseño de cards de propiedades
function enhancePropertyCards() {
    const propertyCards = document.querySelectorAll('.property-card');
    
    propertyCards.forEach(card => {
        const status = card.getAttribute('data-status');
        const type = card.querySelector('.property-type')?.textContent || '';
        
        // Añadir iconos de tipo de propiedad
        addPropertyTypeIcons(card, type);
        
        // Añadir indicadores de estado del servicio
        addServiceStatusIndicators(card);
        
        // Mejorar métricas visuales
        enhancePropertyMetrics(card);
        
        // Añadir badges de estado
        addStatusBadges(card, status);
    });
}

// Añadir iconos de tipo de propiedad
function addPropertyTypeIcons(card, type) {
    const typeEl = card.querySelector('.property-type');
    if (!typeEl) return;
    
    const icons = {
        'Residencial': '🏠',
        'Comercial': '🏢',
        'Industrial': '🏭',
        'Mixto': '🏘️'
    };
    
    if (icons[type]) {
        typeEl.innerHTML = `${icons[type]} ${typeEl.textContent}`;
    }
}

// Añadir indicadores de estado del servicio
function addServiceStatusIndicators(card) {
    const serviceStatusEl = card.querySelector('.metric-value.service-good');
    if (!serviceStatusEl) return;
    
    const status = serviceStatusEl.textContent;
    const indicators = {
        'Excelente': '🟢',
        'Bueno': '🟡',
        'Regular': '🟠',
        'Malo': '🔴'
    };
    
    if (indicators[status]) {
        serviceStatusEl.innerHTML = `${indicators[status]} ${status}`;
    }
}

// Mejorar métricas visuales
function enhancePropertyMetrics(card) {
    const metrics = card.querySelectorAll('.metric');
    
    metrics.forEach(metric => {
        const label = metric.querySelector('.metric-label');
        const value = metric.querySelector('.metric-value');
        
        if (label && value) {
            // Añadir iconos a las métricas
            const metricIcons = {
                'Consumo Promedio': '💧',
                'Costo Mensual': '💰',
                'Estado del Servicio': '📊'
            };
            
            const icon = metricIcons[label.textContent];
            if (icon) {
                label.innerHTML = `${icon} ${label.textContent}`;
            }
            
            // Destacar valores importantes
            if (value.textContent.includes('$')) {
                value.style.color = 'var(--primary)';
                value.style.fontWeight = '900';
            }
        }
    });
}

// Añadir badges de estado
function addStatusBadges(card, status) {
    const statusEl = card.querySelector('.property-status');
    if (!statusEl) return;
    
    const badges = {
        'active': '🟢',
        'inactive': '🔴',
        'pending': '🟡',
        'suspended': '⚫'
    };
    
    if (badges[status]) {
        statusEl.innerHTML = `${badges[status]} ${statusEl.textContent}`;
    }
}
