document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});
function iniciarApp() {
    navegacionFija();
    crearGaleria();
    scrollNav();
};

function navegacionFija() {
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector ('.sobre-festival');
    const body = document.querySelector ('body');
    window.addEventListener('scroll', function () {
        if (sobreFestival.getBoundingClientRect().top <0 ){
            barra.classList.add('fijo');
            body.classList.add('body-scroll');
        } else {
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }
    });
}

function scrollNav() {
    const enlaces = document.querySelectorAll('.navegacion-principal a');
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function (e) {
            e.preventDefault();
            const sectionScroll = e.target.attributes.href.value;
            const section = document.querySelector(sectionScroll);
            section.scrollIntoView({behavior : 'smooth'});
        })
    });
}

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');

    for( let i = 1; i <= 12; i++){
        const imagen = document.createElement('picture');
        imagen.innerHTML= `
        <source srcset="build/img/thumb/${i}.avif" type="image/avif">
        <source srcset="build/img/thumb/${i}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="Imagen galeria">
        `
        imagen.onclick =  () => mostrarImagen(i);

        galeria.appendChild(imagen);
    }
};

function mostrarImagen (id) {
    const imagen = document.createElement('picture');
    imagen.innerHTML= `
    <source srcset="build/img/grande/${id}.avif" type="image/avif">
    <source srcset="build/img/grande/${id}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="build/img/thumb/${id}.jpg" alt="Imagen galeria">
    `
    //Crea el overlay con la imagen
    const overlay = document.createElement('div');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
    overlay.onclick = () =>{   overlay.remove();   body.classList.remove('fijar-body'); } 
    
    //Boton de cierre de modal
    const cerrarModal = document.createElement('button');
    cerrarModal.textContent = 'X';
    cerrarModal.classList.add('btn', 'btn-cerrar');
    cerrarModal.onclick = () =>{   overlay.remove();   body.classList.remove('fijar-body'); } 
    window.onkeydown = ( e ) => { if ( e.keyCode == 27) { overlay.remove(); body.classList.remove('fijar-body'); }}; //al apretar esc se cierra
    overlay.appendChild(cerrarModal);

    //Lo añade al HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add ('fijar-body');
};