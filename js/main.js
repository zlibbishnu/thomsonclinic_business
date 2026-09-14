/* =====================================================
   THOMSON CLINIC
   GLOBAL JAVASCRIPT
===================================================== */


/* =====================================================
   LOAD COMPONENTS
===================================================== */

async function loadComponent(elementId, filePath) {

    const element = document.getElementById(elementId);

    if (!element) {
        return;
    }

    try {

        const response = await fetch(filePath);

        if (!response.ok) {
            throw new Error(
                `Failed to load ${filePath}`
            );
        }

        const html = await response.text();

        element.innerHTML = html;

    } catch (error) {

        console.error(
            `Component loading error:`,
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


    /*
        Components are now inside the page.

        Therefore we initialize functionality
        that depends on header/footer elements.
    */

    initializeTheme();
    initializeMobileMenu();
    initializeCopyright();

}


/* =====================================================
   THEME
===================================================== */

function initializeTheme() {

    const themeToggle =
        document.getElementById("themeToggle");

    if (!themeToggle) {
        return;
    }


    /* Load saved theme */

    const savedTheme =
        localStorage.getItem("thomson-theme");


    if (savedTheme === "dark") {

        document.body.classList.add("dark");

    }


    /* Toggle theme */

    themeToggle.addEventListener(
        "click",
        () => {

            document.body.classList.toggle("dark");

            const isDark =
                document.body.classList.contains("dark");


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
        document.getElementById("menuBtn");

    const navLinks =
        document.getElementById("navLinks");


    if (!menuBtn || !navLinks) {
        return;
    }


    menuBtn.addEventListener(
        "click",
        () => {

            navLinks.classList.toggle("active");

        }
    );


    /* Close menu after clicking a link */

    navLinks
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    navLinks.classList.remove(
                        "active"
                    );

                }
            );

        });

}


/* =====================================================
   COPYRIGHT YEAR
===================================================== */

function initializeCopyright() {

    const copyright =
        document.getElementById("copyright");

    if (!copyright) {
        return;
    }


    const year =
        new Date().getFullYear();


    copyright.textContent =
        `© ${year} Thomson Clinic. All rights reserved.`;

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