// Calendario Informativo - HIDROGEST
// Este calendario es SOLO VISUAL - No tiene funcionalidad de click
// Los eventos se muestran únicamente con colores de fondo

document.addEventListener('DOMContentLoaded', function() {
    initCalendar();
});

function initCalendar() {
    const calendarGrid = document.getElementById("calendarGrid");
    const currentMonthEl = document.getElementById("currentMonth");
    const prevBtn = document.getElementById("prevMonth");
    const nextBtn = document.getElementById("nextMonth");
    
    if (!calendarGrid || !currentMonthEl) return;
    
    let currentDate = new Date();
    
    // Generar eventos de ejemplo basados en el mes actual
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const events = generateSampleEvents(currentYear, currentMonth);

    function generateSampleEvents(year, month) {
        const events = {};
        const daysInMonth = new Date(year, month, 0).getDate();

        // Generar algunos eventos aleatorios para el mes
        const sampleEvents = [
            { type: "maintenance", titles: ["Mantenimiento preventivo", "Revisión de bombas", "Cambio de filtros", "Limpieza de tanques"] },
            { type: "cut", titles: ["Corte programado zona norte", "Corte programado zona sur", "Mantenimiento red principal"] },
            { type: "supervision", titles: ["Inspección de calidad", "Auditoría mensual", "Control de calidad", "Inspección regulatoria"] }
        ];

        // Agregar 5-8 eventos aleatorios en el mes
        const numEvents = Math.floor(Math.random() * 4) + 5;
        for (let i = 0; i < numEvents; i++) {
            const day = Math.floor(Math.random() * daysInMonth) + 1;
            const eventType = sampleEvents[Math.floor(Math.random() * sampleEvents.length)];
            const title = eventType.titles[Math.floor(Math.random() * eventType.titles.length)];

            const dateKey = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            events[dateKey] = [{ type: eventType.type, title: title }];
        }

        return events;
    }
    
    // Monday-based week start (0 = Monday, 6 = Sunday)
    function getMondayBasedDay(jsDay) {
        return (jsDay + 6) % 7;
    }
    
    function renderCalendar() {
        calendarGrid.innerHTML = "";
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        // Update month display
        currentMonthEl.textContent = currentDate.toLocaleDateString("es-ES", {
            month: "long",
            year: "numeric",
        });
        
        // Agregar headers de días de la semana
        const dayNames = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
        dayNames.forEach(dayName => {
            const dayHeader = document.createElement("div");
            dayHeader.classList.add("calendar-day-header");
            dayHeader.textContent = dayName;
            calendarGrid.appendChild(dayHeader);
        });
        
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDay = getMondayBasedDay(firstDay.getDay());
        const daysInMonth = lastDay.getDate();
        
        // Add empty days for first week (Monday-based)
        for (let i = 0; i < startDay; i++) {
            const el = document.createElement("div");
            el.classList.add("calendar-day", "empty");
            calendarGrid.appendChild(el);
        }
        
        // Add days of month
        for (let d = 1; d <= daysInMonth; d++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
            const el = document.createElement("div");
            el.classList.add("calendar-day");
            el.textContent = d;

            // Marcar el día actual
            const today = new Date();
            if (year === today.getFullYear() && month === today.getMonth() && d === today.getDate()) {
                el.classList.add("today");
            }

            // Marcar días con eventos usando colores de fondo (solo visual)
            if (events[dateStr]) {
                events[dateStr].forEach((e) => el.classList.add(e.type));
                // Agregar tooltip con información del evento
                el.title = events[dateStr][0].title;
            }

            calendarGrid.appendChild(el);
        }
    }
    
    // Setup navigation
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar();
        });
    }
    
    // Initial render
    renderCalendar();
} 