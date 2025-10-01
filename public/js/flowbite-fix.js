// Flowbite compatibility fix
// Creates dummy elements to prevent JavaScript errors

document.addEventListener('DOMContentLoaded', function() {
    // Create dummy theme toggle elements if they don't exist
    if (!document.getElementById('themeToggleDarkIcon')) {
        const dummyDarkIcon = document.createElement('div');
        dummyDarkIcon.id = 'themeToggleDarkIcon';
        dummyDarkIcon.className = 'hidden';
        dummyDarkIcon.style.display = 'none';
        document.body.appendChild(dummyDarkIcon);
    }

    if (!document.getElementById('themeToggleLightIcon')) {
        const dummyLightIcon = document.createElement('div');
        dummyLightIcon.id = 'themeToggleLightIcon';
        dummyLightIcon.className = 'hidden';
        dummyLightIcon.style.display = 'none';
        document.body.appendChild(dummyLightIcon);
    }

    if (!document.getElementById('themeToggle')) {
        const dummyToggleBtn = document.createElement('div');
        dummyToggleBtn.id = 'themeToggle';
        dummyToggleBtn.style.display = 'none';
        // Add a dummy click handler that does nothing
        dummyToggleBtn.addEventListener = function() {};
        document.body.appendChild(dummyToggleBtn);
    }
});

// Create elements immediately if DOM is already loaded
if (document.readyState === 'loading') {
    // DOM is still loading, wait for DOMContentLoaded
} else {
    // DOM already loaded, create elements immediately
    if (!document.getElementById('themeToggleDarkIcon')) {
        const dummyDarkIcon = document.createElement('div');
        dummyDarkIcon.id = 'themeToggleDarkIcon';
        dummyDarkIcon.className = 'hidden';
        dummyDarkIcon.style.display = 'none';
        document.body.appendChild(dummyDarkIcon);
    }

    if (!document.getElementById('themeToggleLightIcon')) {
        const dummyLightIcon = document.createElement('div');
        dummyLightIcon.id = 'themeToggleLightIcon';
        dummyLightIcon.className = 'hidden';
        dummyLightIcon.style.display = 'none';
        document.body.appendChild(dummyLightIcon);
    }

    if (!document.getElementById('themeToggle')) {
        const dummyToggleBtn = document.createElement('div');
        dummyToggleBtn.id = 'themeToggle';
        dummyToggleBtn.style.display = 'none';
        document.body.appendChild(dummyToggleBtn);
    }
}