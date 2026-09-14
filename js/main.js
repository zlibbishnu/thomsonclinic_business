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
   LOAD GLOBAL COMPONENTS
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
   MOBILE NAVIGATION + DROPDOWNS
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


    /*
       Main mobile menu
    */

    menuBtn.addEventListener(
        "click",
        () => {

            const active =
                navLinks.classList.toggle(
                    "active"
                );


            menuBtn.textContent =
                active
                    ? "×"
                    : "☰";


            menuBtn.setAttribute(
                "aria-expanded",
                active
                    ? "true"
                    : "false"
            );

        }
    );


    /*
       Mobile dropdowns
    */

    const navItems =
        navLinks.querySelectorAll(
            ".nav-item"
        );


    navItems.forEach(
        item => {

            const mainLink =
                item.querySelector(
                    ".nav-main-link"
                );

            const dropdown =
                item.querySelector(
                    ".nav-dropdown"
                );


            if (
                !mainLink ||
                !dropdown
            ) {

                return;

            }


            mainLink.addEventListener(
                "click",
                e => {

                    /*
                       Desktop:
                       normal link behaviour.

                       Mobile:
                       first tap opens dropdown.
                    */

                    if (
                        window.innerWidth > 900
                    ) {

                        return;

                    }


                    const isOpen =
                        item.classList.contains(
                            "open"
                        );


                    /*
                       If submenu exists and
                       isn't open, open it.
                    */

                    if (!isOpen) {

                        e.preventDefault();


                        navItems.forEach(
                            other => {

                                other.classList.remove(
                                    "open"
                                );

                            }
                        );


                        item.classList.add(
                            "open"
                        );

                    }

                }
            );


            /*
               Dropdown links close menu
            */

            dropdown
                .querySelectorAll("a")
                .forEach(
                    link => {

                        link.addEventListener(
                            "click",
                            () => {

                                navItems.forEach(
                                    other => {

                                        other.classList.remove(
                                            "open"
                                        );

                                    }
                                );


                                navLinks.classList.remove(
                                    "active"
                                );


                                menuBtn.textContent =
                                    "☰";


                                menuBtn.setAttribute(
                                    "aria-expanded",
                                    "false"
                                );

                            }
                        );

                    }
                );

        }
    );


    /*
       Desktop / outside click
    */

    document.addEventListener(
        "click",
        e => {

            if (
                !navLinks.contains(e.target) &&
                !menuBtn.contains(e.target)
            ) {

                navItems.forEach(
                    item => {

                        item.classList.remove(
                            "open"
                        );

                    }
                );

            }

        }
    );


    /*
       Escape key
    */

    document.addEventListener(
        "keydown",
        e => {

            if (
                e.key !== "Escape"
            ) {

                return;

            }


            navItems.forEach(
                item => {

                    item.classList.remove(
                        "open"
                    );

                }
            );


            navLinks.classList.remove(
                "active"
            );


            menuBtn.textContent =
                "☰";


            menuBtn.setAttribute(
                "aria-expanded",
                "false"
            );

        }
    );


    /*
       Close mobile menu when
       resizing back to desktop.
    */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 900
            ) {

                navLinks.classList.remove(
                    "active"
                );


                navItems.forEach(
                    item => {

                        item.classList.remove(
                            "open"
                        );

                    }
                );


                menuBtn.textContent =
                    "☰";


                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );

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
   SMART PAGE + SECTION NAVIGATION
===================================================== */

function initializeSmoothScroll() {

    const header =
        document.getElementById(
            "header"
        );


    const headerOffset =
        () => {

            return header
                ? header.offsetHeight + 12
                : 12;

        };


    /*
       Same-page anchor navigation
    */

    document
        .querySelectorAll(
            'a[href*="#"]'
        )
        .forEach(anchor => {

            anchor.addEventListener(
                "click",
                function (e) {

                    const href =
                        this.getAttribute(
                            "href"
                        );


                    if (
                        !href ||
                        href === "#"
                    ) {

                        return;

                    }


                    const url =
                        new URL(
                            href,
                            window.location.href
                        );


                    /*
                       Only intercept same-page
                       links.
                    */

                    const samePage =
                        url.origin ===
                            window.location.origin
                        &&
                        url.pathname ===
                            window.location.pathname;


                    if (!samePage) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            url.hash
                        );


                    if (!target) {

                        return;

                    }


                    e.preventDefault();


                    const position =
                        target
                            .getBoundingClientRect()
                            .top
                        +
                        window.scrollY
                        -
                        headerOffset();


                    window.scrollTo({

                        top:position,

                        behavior:"smooth"

                    });


                    /*
                       Update URL without
                       causing a jump.
                    */

                    history.pushState(
                        null,
                        "",
                        url.hash
                    );


                    /*
                       Close mobile navigation.
                    */

                    const navLinks =
                        document.getElementById(
                            "navLinks"
                        );

                    const menuBtn =
                        document.getElementById(
                            "menuBtn"
                        );


                    if (
                        navLinks &&
                        navLinks.classList.contains(
                            "active"
                        )
                    ) {

                        navLinks.classList.remove(
                            "active"
                        );


                        if (menuBtn) {

                            menuBtn.textContent =
                                "☰";

                            menuBtn.setAttribute(
                                "aria-expanded",
                                "false"
                            );

                        }

                    }

                }
            );

        });


    /*
       If arriving from another page with
       #section, compensate for fixed header.
    */

    if (window.location.hash) {

        window.addEventListener(
            "load",
            () => {

                const target =
                    document.querySelector(
                        window.location.hash
                    );


                if (!target) {

                    return;

                }


                setTimeout(
                    () => {

                        const position =
                            target
                                .getBoundingClientRect()
                                .top
                            +
                            window.scrollY
                            -
                            headerOffset();


                        window.scrollTo({

                            top:position,

                            behavior:"smooth"

                        });

                    },
                    120
                );

            }
        );

    }

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
   ACTIVE PAGE NAVIGATION
===================================================== */

function initializeActiveNavigation() {

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    const navLinks =
        document.querySelectorAll(
            ".nav-main-link"
        );


    navLinks.forEach(
        link => {

            const href =
                link.getAttribute(
                    "href"
                );


            if (!href) return;


            const linkPage =
                href
                    .split("/")
                    .pop()
                    .split("#")[0]
                    .toLowerCase();


            if (
                (
                    currentPage === "" ||
                    currentPage === "index.html"
                )
                &&
                (
                    linkPage === "" ||
                    linkPage === "index.html"
                )
            ) {

                link.classList.add(
                    "active"
                );

            }
            else if (
                linkPage === currentPage
            ) {

                link.classList.add(
                    "active"
                );

            }

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