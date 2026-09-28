/* Portafolio: parallax de la portada, aparición de bloques y lightbox del certificado */

/* Portada: el glow baja más lento que el scroll y el hero se apaga al salir */
(function () {
    const hero = document.getElementById("hero");
    const bg = document.querySelector(".hero-bg");
    if (!hero || !bg) return;

    // Altura real del hero (por si el contenido cambia)
    const topeHero = () => hero.getBoundingClientRect().top + window.scrollY;

    function animar() {
        const y = window.scrollY;

        // Entre 0 y ~520px de scroll el hero se difumina
        const opacidad = Math.max(0, 1 - y / 520);
        hero.style.opacity = opacidad.toFixed(3);

        // El glow se mueve a media velocidad
        bg.style.transform = "translateY(" + y * 0.18 + "px)";
    }

    animar();
    window.addEventListener("scroll", animar, { passive: true });
})();

/* Cada bloque "reveal" entra con un fade suave cuando se asoma al viewport */
(function () {
    const elementos = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
        // Navegadores viejos: sin observer, se muestra todo de una
        elementos.forEach(function (el) {
            el.classList.add("visible");
        });
        return;
    }

    const observer = new IntersectionObserver(
        function (entradas) {
            entradas.forEach(function (entrada) {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add("visible");
                    observer.unobserve(entrada.target);
                }
            });
        },
        { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    elementos.forEach(function (el) {
        observer.observe(el);
    });
})();

/* Lightbox: abre el certificado sobre la misma página, sin cambiar de URL */
(function () {
    const lightbox = document.getElementById("lightbox");
    if (!lightbox) return;

    const imagen = lightbox.querySelector("img");
    const btnCerrar = lightbox.querySelector(".lightbox-cerrar");
    const disparadores = document.querySelectorAll("[data-lightbox]");

    function abrir(href) {
        imagen.src = href;
        lightbox.classList.add("abierto");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function cerrar() {
        lightbox.classList.remove("abierto");
        lightbox.setAttribute("aria-hidden", "true");
        imagen.src = "";
        document.body.style.overflow = "";
    }

    disparadores.forEach(function (enlace) {
        enlace.addEventListener("click", function (e) {
            e.preventDefault();
            abrir(enlace.getAttribute("href"));
        });
    });

    // Cerrar con clic en el fondo, la X o la tecla Escape
    lightbox.addEventListener("click", function (e) {
        if (e.target === lightbox || e.target === btnCerrar) cerrar();
    });

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") cerrar();
    });
})();