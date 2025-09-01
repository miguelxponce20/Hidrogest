const fotoInput = document.getElementById('foto');
const fotoPerfil = document.getElementById('fotoPerfil');
const perfilForm = document.getElementById('perfilForm');

// Vista previa de la foto
fotoInput.addEventListener('change', function() {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      fotoPerfil.src = e.target.result;
    }
    reader.readAsDataURL(file);
  }
});

// Enviar formulario
perfilForm.addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Perfil actualizado correctamente!');
});

// Funcionalidad del menú móvil
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    if (mobileMenuBtn && sidebar && sidebarOverlay) {
        // Abrir menú móvil
        mobileMenuBtn.addEventListener('click', function() {
            sidebar.classList.add('active');
            sidebarOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        // Cerrar menú móvil al hacer clic en el overlay
        sidebarOverlay.addEventListener('click', function() {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Cerrar menú móvil al hacer clic en un enlace
        const navLinks = sidebar.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                sidebar.classList.remove('active');
                sidebarOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Cerrar menú móvil con tecla Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                sidebarOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// Inicializar menú móvil
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
});