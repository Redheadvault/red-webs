// Theme Switcher with LocalStorage persistence

const body = document.body;
const mainContent = document.getElementById('mainContent');
const viewsBtn = document.getElementById('viewsBtn');
const viewButtons = document.querySelectorAll('.views-menu button');

// Load saved theme or default to 'cutter'
const savedView = localStorage.getItem('rh-redwebs-view') || 'cutter';
setView(savedView, false);

// Toggle dropdown
if (viewsBtn) {
    viewsBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        document.querySelector('.views-dropdown').classList.toggle('active');
    });
}

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
    const dropdown = document.querySelector('.views-dropdown');
    if (dropdown && !dropdown.contains(e.target)) {
        dropdown.classList.remove('active');
    }
});

// View switching
viewButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.stopPropagation();
        const view = this.getAttribute('data-view');
        setView(view, true);
        localStorage.setItem('rh-redwebs-view', view);
        document.querySelector('.views-dropdown').classList.remove('active');
    });
});

function setView(view, animate) {
    // Set body theme
    body.setAttribute('data-view', view);
    
    // If we're on the homepage, load the template
    if (mainContent) {
        if (animate) {
            mainContent.style.opacity = '0';
            mainContent.style.transform = 'translateY(20px)';
        }
        
        setTimeout(() => {
            const template = document.getElementById(`${view}-template`);
            if (template) {
                const content = template.content.cloneNode(true);
                mainContent.innerHTML = '';
                mainContent.appendChild(content);
            }
            
            if (animate) {
                setTimeout(() => {
                    mainContent.style.opacity = '1';
                    mainContent.style.transform = 'translateY(0)';
                }, 50);
            } else {
                mainContent.style.opacity = '1';
                mainContent.style.transform = 'translateY(0)';
            }
        }, animate ? 300 : 0);
    }
}

// Set transition on mainContent if it exists
if (mainContent) {
    mainContent.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
}
