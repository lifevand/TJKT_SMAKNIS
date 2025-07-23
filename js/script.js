document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.getElementById('app-container');
    const navLinks = document.querySelectorAll('.nav-link');
    const menuToggle = document.getElementById('menuToggle');
    const navList = document.getElementById('navList');
    const loader = document.getElementById('loader');

    // Show loader on page load
    window.addEventListener('load', () => {
        loader.classList.add('hidden');
    });

    // Helper to load content from template
    const loadPage = (pageId, direction = 'forward') => {
        const template = document.getElementById(`${pageId}-template`);
        if (!template) {
            console.error(`Template for ${pageId} not found!`);
            return;
        }

        // Get current active page
        const currentPage = appContainer.querySelector('.page.active');

        // Check if the requested page is already active
        if (currentPage && currentPage.id === pageId) {
            return; // Already on this page, do nothing
        }

        // Add 'prev' class to the current page for exit animation
        if (currentPage) {
            currentPage.classList.remove('active');
            currentPage.classList.add('prev'); // Mark as previous for transition
        }

        // Create new page element
        const newPage = document.importNode(template.content, true).firstElementChild;
        appContainer.appendChild(newPage);

        // Force reflow for CSS transition to work
        void newPage.offsetWidth; // Trigger reflow
        newPage.classList.add('active');

        // Clean up old page after transition
        if (currentPage) {
            currentPage.addEventListener('transitionend', function handler() {
                if (!currentPage.classList.contains('active')) { // Ensure it's truly gone
                    currentPage.remove();
                }
                currentPage.removeEventListener('transitionend', handler);
            });
        }

        // Update active nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.target === pageId) {
                link.classList.add('active');
            }
        });

        // Close mobile menu if open
        if (navList.classList.contains('active')) {
            navList.classList.remove('active');
        }
    };

    // Navigation logic
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.dataset.target) { // Check if it's a page link
                e.preventDefault();
                const targetPage = link.dataset.target;
                history.pushState({ page: targetPage }, '', `#${targetPage}`);
                loadPage(targetPage);
            }
        });
    });

    // Handle initial page load or direct access via hash
    const initialHash = window.location.hash.substring(1) || 'home';
    loadPage(initialHash);

    // Handle browser back/forward buttons
    window.addEventListener('popstate', (event) => {
        const page = event.state && event.state.page ? event.state.page : 'home';
        loadPage(page);
    });

    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
    });

    // Scroll to section for hero button
    appContainer.addEventListener('click', (e) => {
        if (e.target.matches('.scroll-to')) {
            e.preventDefault();
            const targetId = e.target.getAttribute('href').substring(1);
            history.pushState({ page: targetId }, '', `#${targetId}`);
            loadPage(targetId);
        }
    });

    // Example of handling form submission (Contact Page)
    appContainer.addEventListener('submit', (e) => {
        if (e.target.matches('.contact-form')) {
            e.preventDefault();
            alert('Pesan Anda telah terkirim! (Simulasi)');
            e.target.reset();
        }
    });
});