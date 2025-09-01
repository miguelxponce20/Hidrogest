// Funcionalidad para Reportar Incidencia

// Variables globales
let selectedLocation = null;
let incidentMarker = null;

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar mapa si existe
    initIncidentMap();

    // Configurar validaciones del formulario
    setupFormValidation();

    // Mejorar UI de la página
    enhanceIncidentUI();

    // Configurar funcionalidad de ubicación
    setupLocationFunctionality();
});

// Inicializar mapa para seleccionar ubicación de la incidencia
function initIncidentMap() {
    const mapElement = document.getElementById('incidentMap');
    if (!mapElement) return;

    // Inicializar mapa en San Juan de los Morros
    const map = L.map('incidentMap').setView([9.91152, -67.3538], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Manejar clics en el mapa
    map.on('click', async function(e) {
        if (incidentMarker) {
            map.removeLayer(incidentMarker);
        }

        incidentMarker = L.marker(e.latlng).addTo(map);

        // Obtener dirección usando geocodificación inversa
        const address = await reverseGeocode(e.latlng.lat, e.latlng.lng);
        document.getElementById('incidentLocation').value = address;

        selectedLocation = {
            lat: e.latlng.lat,
            lng: e.latlng.lng,
            address: address
        };
    });

    // Guardar referencia al mapa globalmente
    window.incidentMap = map;
}

// Geocodificación inversa para obtener dirección
async function reverseGeocode(lat, lng) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data && data.display_name) {
            return data.display_name;
        }

        return `Lat: ${lat.toFixed(6)}, Lng: ${lng.toFixed(6)}`;
    } catch (error) {
        console.error('Error en geocodificación inversa:', error);
        return `Lat: ${lat.toFixed(6)}, Lng: ${lng.toFixed(6)}`;
    }
}

// Configurar validaciones del formulario
function setupFormValidation() {
    const form = document.getElementById('incidentForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        if (validateIncidentForm()) {
            submitIncident();
        }
    });
}

// Mejorar UI de la página de incidencias
function enhanceIncidentUI() {
    // Añadir iconos a los tipos de incidencia
    addIncidentTypeIcons();

    // Mejorar campos de formulario
    enhanceFormFields();

    // Añadir indicadores de validación en tiempo real
    addRealTimeValidation();
}

// Añadir iconos a tipos de incidencia
function addIncidentTypeIcons() {
    const select = document.getElementById('incidentType');
    if (!select) return;

    const options = select.querySelectorAll('option');
    options.forEach(option => {
        if (option.value) {
            const icons = {
                'corte': '🚰',
                'baja_presion': '💧',
                'agua_sucia': '🗑️',
                'fuga': '💦',
                'otro': '❓'
            };

            if (icons[option.value]) {
                option.innerHTML = `${icons[option.value]} ${option.textContent}`;
            }
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
            'Tipo de Incidencia': '🏷️',
            'Ubicación': '📍',
            'Descripción': '📝',
            'Prioridad': '⚡'
        };

        if (icons[text]) {
            label.innerHTML = `${icons[text]} ${text}`;
        }
    });
}

// Añadir validación en tiempo real
function addRealTimeValidation() {
    const descriptionTextarea = document.getElementById('incidentDescription');
    if (descriptionTextarea) {
        descriptionTextarea.addEventListener('input', function() {
            const charCount = this.value.length;
            const maxLength = 500;

            // Actualizar contador de caracteres si existe
            const counter = document.getElementById('charCounter');
            if (counter) {
                counter.textContent = `${charCount}/${maxLength}`;

                if (charCount > maxLength * 0.9) {
                    counter.style.color = 'var(--error)';
                } else if (charCount > maxLength * 0.7) {
                    counter.style.color = 'var(--warning)';
                } else {
                    counter.style.color = 'var(--on-surface-secondary)';
                }
            }

            // Validación visual
            if (charCount > 0 && charCount <= maxLength) {
                this.style.borderColor = 'var(--success)';
            } else if (charCount > maxLength) {
                this.style.borderColor = 'var(--error)';
            } else {
                this.style.borderColor = '';
            }
        });
    }
}

// Configurar funcionalidad de ubicación
function setupLocationFunctionality() {
    const locationInput = document.getElementById('incidentLocation');
    if (!locationInput) return;

    // Intentar obtener ubicación actual
    const getLocationBtn = document.createElement('button');
    getLocationBtn.type = 'button';
    getLocationBtn.className = 'btn-secondary';
    getLocationBtn.innerHTML = '📍 Usar mi ubicación actual';
    getLocationBtn.onclick = getCurrentLocation;

    // Insertar botón después del campo de ubicación
    const locationGroup = locationInput.parentNode;
    if (locationGroup) {
        locationGroup.appendChild(getLocationBtn);
    }
}

// Obtener ubicación actual del usuario
function getCurrentLocation() {
    if (!navigator.geolocation) {
        alert('La geolocalización no está soportada por este navegador.');
        return;
    }

    const locationInput = document.getElementById('incidentLocation');
    const btn = document.querySelector('button[onclick="getCurrentLocation()"]');

    // Cambiar texto del botón
    if (btn) {
        btn.innerHTML = '⏳ Obteniendo ubicación...';
        btn.disabled = true;
    }

    navigator.geolocation.getCurrentPosition(
        async function(position) {
            const { latitude, longitude } = position.coords;

            // Actualizar mapa si existe
            if (window.incidentMap) {
                if (incidentMarker) {
                    window.incidentMap.removeLayer(incidentMarker);
                }

                incidentMarker = L.marker([latitude, longitude]).addTo(window.incidentMap);
                window.incidentMap.setView([latitude, longitude], 16);
            }

            // Obtener dirección
            const address = await reverseGeocode(latitude, longitude);

            if (locationInput) {
                locationInput.value = address;
            }

            selectedLocation = {
                lat: latitude,
                lng: longitude,
                address: address
            };

            // Restaurar botón
            if (btn) {
                btn.innerHTML = '✅ Ubicación obtenida';
                btn.disabled = false;
                setTimeout(() => {
                    btn.innerHTML = '📍 Usar mi ubicación actual';
                }, 3000);
            }
        },
        function(error) {
            console.error('Error obteniendo ubicación:', error);

            let errorMessage = 'No se pudo obtener tu ubicación.';
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage = 'Acceso a ubicación denegado. Por favor, permite el acceso a tu ubicación.';
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage = 'Información de ubicación no disponible.';
                    break;
                case error.TIMEOUT:
                    errorMessage = 'Tiempo de espera agotado para obtener ubicación.';
                    break;
            }

            alert(errorMessage);

            // Restaurar botón
            if (btn) {
                btn.innerHTML = '📍 Usar mi ubicación actual';
                btn.disabled = false;
            }
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000 // 5 minutos
        }
    );
}

// Validar formulario de incidencia
function validateIncidentForm() {
    const incidentType = document.getElementById('incidentType').value;
    const incidentLocation = document.getElementById('incidentLocation').value.trim();
    const incidentDescription = document.getElementById('incidentDescription').value.trim();

    // Validar tipo de incidencia
    if (!incidentType) {
        alert('Por favor selecciona el tipo de incidencia.');
        document.getElementById('incidentType').focus();
        return false;
    }

    // Validar ubicación
    if (!incidentLocation) {
        alert('Por favor especifica la ubicación de la incidencia.');
        document.getElementById('incidentLocation').focus();
        return false;
    }

    // Validar descripción
    if (!incidentDescription) {
        alert('Por favor describe la incidencia.');
        document.getElementById('incidentDescription').focus();
        return false;
    }

    if (incidentDescription.length < 10) {
        alert('La descripción debe tener al menos 10 caracteres.');
        document.getElementById('incidentDescription').focus();
        return false;
    }

    if (incidentDescription.length > 500) {
        alert('La descripción no puede exceder 500 caracteres.');
        document.getElementById('incidentDescription').focus();
        return false;
    }

    return true;
}

// Enviar incidencia
function submitIncident() {
    const form = document.getElementById('incidentForm');
    const successMessage = document.getElementById('successMessage');

    // Recopilar datos del formulario
    const incidentData = {
        type: document.getElementById('incidentType').value,
        location: document.getElementById('incidentLocation').value.trim(),
        description: document.getElementById('incidentDescription').value.trim(),
        priority: document.getElementById('incidentPriority').value,
        coordinates: selectedLocation,
        timestamp: new Date().toISOString(),
        status: 'pending'
    };

    // Simular envío (en producción sería una petición AJAX)
    console.log('Enviando incidencia:', incidentData);

    // Mostrar mensaje de éxito
    if (successMessage) {
        successMessage.style.display = 'block';

        // Generar ID de reporte simulado
        const reportId = `INC-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`;

        // Actualizar mensaje con ID del reporte
        const messageText = successMessage.querySelector('p');
        if (messageText) {
            messageText.innerHTML = `✅ Tu incidencia ha sido reportada correctamente.<br><strong>ID del Reporte: ${reportId}</strong>`;
        }

        // Limpiar formulario
        form.reset();

        // Limpiar marcador del mapa
        if (incidentMarker && window.incidentMap) {
            window.incidentMap.removeLayer(incidentMarker);
            incidentMarker = null;
        }

        selectedLocation = null;

        // Ocultar mensaje después de 5 segundos
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    }

    // Aquí iría la lógica real para enviar los datos al servidor
    // Ejemplo:
    /*
    fetch('/api/incidents', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(incidentData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Incidencia enviada:', data);
        // Manejar respuesta del servidor
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al enviar la incidencia. Por favor intenta nuevamente.');
    });
    */
}

// Funciones adicionales para mejorar la UX

// Mostrar/ocultar ayuda contextual
function toggleHelp(helpId) {
    const helpElement = document.getElementById(helpId);
    if (helpElement) {
        helpElement.style.display = helpElement.style.display === 'none' ? 'block' : 'none';
    }
}

// Validar tipo de archivo para adjuntos (si se implementa)
function validateFile(file) {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
        alert('Solo se permiten archivos de imagen (JPG, PNG, GIF).');
        return false;
    }

    if (file.size > maxSize) {
        alert('El archivo no puede superar los 5MB.');
        return false;
    }

    return true;
}

// Actualizar progreso del formulario
function updateFormProgress() {
    const form = document.getElementById('incidentForm');
    if (!form) return;

    const requiredFields = form.querySelectorAll('[required]');
    const filledFields = Array.from(requiredFields).filter(field => field.value.trim() !== '');

    const progress = (filledFields.length / requiredFields.length) * 100;

    // Actualizar barra de progreso si existe
    const progressBar = document.getElementById('formProgress');
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
    }

    console.log(`Progreso del formulario: ${Math.round(progress)}%`);
}

// Sugerencias inteligentes basadas en el tipo de incidencia
function updateSuggestions() {
    const incidentType = document.getElementById('incidentType').value;
    const descriptionTextarea = document.getElementById('incidentDescription');

    if (!descriptionTextarea) return;

    const suggestions = {
        'corte': 'Describe desde cuándo comenzó el corte, si afecta a toda la zona, y si has contactado a vecinos.',
        'baja_presion': 'Indica cuándo es más notorio (mañana, tarde, noche), si afecta todos los grifos, y el nivel aproximado de presión.',
        'agua_sucia': 'Describe el color, olor o sabor del agua, desde cuándo ocurre, y si sale de todos los grifos.',
        'fuga': 'Especifica la ubicación exacta de la fuga, si es visible, el tamaño aproximado, y si está causando daños.',
        'otro': 'Proporciona todos los detalles relevantes sobre la incidencia que estás reportando.'
    };

    const placeholder = suggestions[incidentType] || 'Describe detalladamente la incidencia...';
    descriptionTextarea.placeholder = placeholder;
}

// Inicializar sugerencias cuando cambia el tipo
document.addEventListener('DOMContentLoaded', function() {
    const incidentTypeSelect = document.getElementById('incidentType');
    if (incidentTypeSelect) {
        incidentTypeSelect.addEventListener('change', updateSuggestions);
        updateSuggestions(); // Inicializar con el valor actual
    }
});

// Función para mostrar/ocultar campos adicionales basados en el tipo
function toggleAdditionalFields() {
    const incidentType = document.getElementById('incidentType').value;
    const additionalFields = document.getElementById('additionalFields');

    if (additionalFields) {
        if (incidentType === 'fuga') {
            additionalFields.innerHTML = `
                <div class="form-group">
                    <label for="leakSize">Tamaño aproximado de la fuga:</label>
                    <select id="leakSize" name="leakSize">
                        <option value="">Seleccionar</option>
                        <option value="pequena">Pequeña (gotas)</option>
                        <option value="mediana">Mediana (chorro fino)</option>
                        <option value="grande">Grande (chorro fuerte)</option>
                    </select>
                </div>
            `;
            additionalFields.style.display = 'block';
        } else {
            additionalFields.style.display = 'none';
        }
    }
}
