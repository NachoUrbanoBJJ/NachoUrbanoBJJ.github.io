/* ============================================================
   PORTFOLIO — Diario vintage
   Comportamiento: parallax del hero + reveal de secciones
   ============================================================ */

/* ---- Hero: parallax del glow dorado + fade al hacer scroll ---- */
(function () {
    const hero = document.getElementById("hero");
    const bg = document.querySelector(".hero-bg");
    if (!hero || !bg) return;

    // Tope del hero (por si la página cambia de alto)
    const topeHero = () => hero.getBoundingClientRect().top + window.scrollY;

    function animar() {
        const y = window.scrollY;

        // Fade: el hero se desvanece entre 0 y ~520px de scroll
        const opacidad = Math.max(0, 1 - y / 520);
        hero.style.opacity = opacidad.toFixed(3);

        // Parallax: el glow se mueve más lento que el scroll
        bg.style.transform = "translateY(" + y * 0.18 + "px)";
    }

    animar();
    window.addEventListener("scroll", animar, { passive: true });
})();

/* ---- Scroll reveal: fade-in + slide en cada sección ---- */
(function () {
    const elementos = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
        // Fallback: si el navegador no soporta el observer, mostramos todo
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

/* ---- Lightbox: certificado que se abre sobre la misma página ---- */
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

    // Cierra con clic fuera de la imagen, la X o la tecla Escape
    lightbox.addEventListener("click", function (e) {
        if (e.target === lightbox || e.target === btnCerrar) cerrar();
    });

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") cerrar();
    });
})();