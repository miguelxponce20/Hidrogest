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
