/* =====================================================
   THOMSON CLINIC
   GLOBAL JAVASCRIPT
===================================================== */


/* =====================================================
   COMPONENT LOADER
===================================================== */

async function loadComponent(elementId, filePath) {

    const element = document.getElementById(elementId);

    if (!element) return;

    try {

        const response = await fetch(filePath);

        if (!response.ok) {
            throw new Error(`Failed to load ${filePath}`);
        }

        const html = await response.text();

        element.innerHTML = html;

    } catch (error) {

        console.error(
            "Component loading error:",
            error
        );

    }

}


/* =====================================================
   LOAD HEADER + FOOTER
===================================================== */

async function loadGlobalComponents() {

    await loadComponent(
        "header-placeholder",
        "components/header.html"
    );

    await loadComponent(
        "footer-placeholder",
        "components/footer.html"
    );


    /* Components must load first */

    initializeTheme();

    initializeMobileMenu();

    initializeHeaderScroll();

    initializeReveal();

    initializeFAQ();

    initializeSmoothScroll();

    initializeCopyright();

    initializeWhatsApp();

    initializeCursorGlow();

}


/* =====================================================
   THEME
===================================================== */

function initializeTheme() {

    const themeToggle =
        document.getElementById(
            "themeToggle"
        );

    if (!themeToggle) return;


    /* Load saved theme */

    const savedTheme =
        localStorage.getItem(
            "thomson-theme"
        );


    if (savedTheme === "dark") {

        document.body.classList.add(
            "dark"
        );

    }


    /* Toggle theme */

    themeToggle.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "dark"
            );


            const isDark =
                document.body.classList.contains(
                    "dark"
                );


            localStorage.setItem(
                "thomson-theme",
                isDark
                    ? "dark"
                    : "light"
            );

        }
    );

}


/* =====================================================
   MOBILE NAVIGATION
===================================================== */

function initializeMobileMenu() {

    const menuBtn =
        document.getElementById(
            "menuBtn"
        );

    const navLinks =
        document.getElementById(
            "navLinks"
        );


    if (!menuBtn || !navLinks) return;


    menuBtn.addEventListener(
        "click",
        () => {

            navLinks.classList.toggle(
                "active"
            );


            menuBtn.textContent =
                navLinks.classList.contains(
                    "active"
                )
                    ? "×"
                    : "☰";

        }
    );


    /* Close menu after clicking link */

    navLinks
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    navLinks.classList.remove(
                        "active"
                    );

                    menuBtn.textContent =
                        "☰";

                }
            );

        });

}


/* =====================================================
   HEADER SCROLL
===================================================== */

function initializeHeaderScroll() {

    const header =
        document.getElementById(
            "header"
        );


    if (!header) return;


    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 25) {

                header.classList.add(
                    "scrolled"
                );

            } else {

                header.classList.remove(
                    "scrolled"
                );

            }

        }
    );

}


/* =====================================================
   SCROLL REVEAL
===================================================== */

function initializeReveal() {

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    if (!revealElements.length) return;


    const observer =
        new IntersectionObserver(

            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList
                                .add(
                                    "visible"
                                );


                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },

            {
                threshold: 0.12
            }

        );


    revealElements.forEach(
        element => {

            observer.observe(
                element
            );

        }
    );

}


/* =====================================================
   FAQ ACCORDION
===================================================== */

function initializeFAQ() {

    const faqItems =
        document.querySelectorAll(
            ".faq-item"
        );


    if (!faqItems.length) return;


    faqItems.forEach(
        item => {

            const question =
                item.querySelector(
                    ".faq-question"
                );


            const answer =
                item.querySelector(
                    ".faq-answer"
                );


            if (!question || !answer) {
                return;
            }


            question.addEventListener(
                "click",
                () => {


                    const active =
                        item.classList.contains(
                            "active"
                        );


                    /* Close all FAQ items */

                    faqItems.forEach(
                        other => {

                            other.classList.remove(
                                "active"
                            );


                            const otherAnswer =
                                other.querySelector(
                                    ".faq-answer"
                                );


                            if (otherAnswer) {

                                otherAnswer.style
                                    .maxHeight = null;

                            }

                        }
                    );


                    /* Open selected FAQ */

                    if (!active) {

                        item.classList.add(
                            "active"
                        );


                        answer.style.maxHeight =
                            answer.scrollHeight +
                            "px";

                    }

                }
            );

        }
    );

}


/* =====================================================
   SMOOTH SCROLL
===================================================== */

function initializeSmoothScroll() {

    const header =
        document.getElementById(
            "header"
        );


    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(anchor => {

            anchor.addEventListener(
                "click",
                function (e) {

                    const id =
                        this.getAttribute(
                            "href"
                        );


                    if (
                        id === "#" ||
                        id === ""
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            id
                        );


                    if (target) {

                        e.preventDefault();


                        const offset =
                            header
                                ? header.offsetHeight + 12
                                : 12;


                        const position =
                            target
                                .getBoundingClientRect()
                                .top
                            +
                            window.scrollY
                            -
                            offset;


                        window.scrollTo({

                            top: position,

                            behavior: "smooth"

                        });

                    }

                }
            );

        });

}


/* =====================================================
   WHATSAPP
===================================================== */

function initializeWhatsApp() {

    const WHATSAPP_NUMBER =
        "919438450966";


    document
        .querySelectorAll(
            ".whatsapp-link"
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                function (e) {

                    e.preventDefault();


                    const message =
                        this.dataset.message ||
                        "Hello Thomson Clinic, I would like to know more about your services.";


                    const whatsappURL =
                        "https://wa.me/" +
                        WHATSAPP_NUMBER +
                        "?text=" +
                        encodeURIComponent(
                            message
                        );


                    window.open(
                        whatsappURL,
                        "_blank",
                        "noopener,noreferrer"
                    );

                }
            );

        });

}


/* =====================================================
   CURRENT YEAR
===================================================== */

function initializeCopyright() {

    const copyright =
        document.getElementById(
            "copyright"
        );


    if (!copyright) return;


    copyright.textContent =
        "© " +
        new Date().getFullYear() +
        " Thomson Clinic. All rights reserved.";

}


/* =====================================================
   CURSOR GLOW — DESKTOP
===================================================== */

function initializeCursorGlow() {

    if (
        !window.matchMedia(
            "(pointer:fine)"
        ).matches
    ) {

        return;

    }


    const glow =
        document.createElement(
            "div"
        );


    glow.style.position =
        "fixed";

    glow.style.width =
        "180px";

    glow.style.height =
        "180px";

    glow.style.borderRadius =
        "50%";

    glow.style.pointerEvents =
        "none";

    glow.style.zIndex =
        "-1";

    glow.style.background =
        "radial-gradient(circle, rgba(24,183,196,.07), transparent 70%)";

    glow.style.transform =
        "translate(-50%,-50%)";


    document.body.appendChild(
        glow
    );


    document.addEventListener(
        "mousemove",
        e => {

            glow.style.left =
                e.clientX + "px";

            glow.style.top =
                e.clientY + "px";

        }
    );

}


/* =====================================================
   START
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadGlobalComponents();

    }
);