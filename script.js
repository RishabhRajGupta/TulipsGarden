// ============================================
// CONFIGURATION & CONSTANTS
// ============================================

const CONFIG = {
    tulips: {
        layers: {
            back: 12,
            middle: 15,
            front: 10
        },
        colors: ['pink', 'purple', 'yellow', 'white', 'red', 'rainbow'],
        messages: [
            "Bohut hi kishmat walo ko milti hai aapke jaisi 🌟",
            "Aapki laughter hi mera jeevan hai, roz brush krte rehna 💕",
            "Aapki wajah se mujhe lagta hai ki iss duniya me jaadu jaisi bhi koi chiz hoti hai ✨",
            "I cherish every moment i spend with you 💎",
            "You light up my day, my life, my world 🌟",
            "Exploring every bit of you is my biggest adventure 🗺️",
            "Your laugh is my favorite sound 🎵",
            "You make ordinary moments extraordinary 🎨",
            "You're my safe place, a place for peace, a place to call home 🏠",
            "You're the best part of my day in such a hectic life ☀️",
            "You inspire me to be 1% better everyday 🌱",
            "You're my favorite person 💖",
            "You are the reason i started believing in god 💓",
            "You make my life even brighter 🌈",
            "You're my favorite hello and hardest goodbye 👋",
            "You're the calmness after my storm 🌈",
            "Aapki wajah se hi mai puura hu 🧩",
            "You're my happy place 😊",
            "You're perfect, my goddess 🛐",
            "Without you, i am just incomplete 🦋",
            "You're my best friend, my love, my partner, my everything 👫",
            "You're the melody in my heart 🎶",
            "You're my sunshine ☁️",
            "You make everything 100x better 🌸",
            "You're my favorite notification 📱",
            "Aap hi meri manifestations & prayers ka natija ho 🙏",
            "Bhagwaan ka sabse bada ashirwad hi aap ho 🎁",
            "Meri aatma ko sukhi banane ka reason aap ho 🌺",
            "You're my forever and always ♾️",
            "You're the love of my life 💗"
        ]
    },
    fireflies: {
        count: 50,
        spawnDelay: 100
    },
    orbs: {
        count: 15
    },
    petals: {
        count: 30
    },
    grass: {
        count: 100
    },
    parallax: {
        mouseSensitivity: 0.02,
        tulipAttraction: 0.15
    },
    lightRays: {
        count: 8
    }
};

// ============================================
// GLOBAL STATE
// ============================================

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let isEntered = false;
let audioContext = null;
let backgroundMusic = null;

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Show loading screen briefly
    setTimeout(() => {
        document.querySelector('.loading-screen').classList.add('loaded');
    }, 2000);

    // Initialize all components
    initializeGarden();
    initializeFloatingElements();
    initializeGrass();
    initializeLightRays();
    initializeEventListeners();
    initializeParallax();
});

// ============================================
// GARDEN INITIALIZATION
// ============================================

function initializeGarden() {
    const layers = {
        back: document.querySelector('.tulip-layer--back'),
        middle: document.querySelector('.tulip-layer--middle'),
        front: document.querySelector('.tulip-layer--front')
    };

    // Create tulips for each layer
    Object.keys(layers).forEach(layerName => {
        const layer = layers[layerName];
        const count = CONFIG.tulips.layers[layerName];
        
        for (let i = 0; i < count; i++) {
            const tulip = createTulip(i, layerName);
            layer.appendChild(tulip);
        }
    });
}

function createTulip(index, layer) {
    const container = document.createElement('div');
    container.className = 'tulip';
    container.setAttribute('data-layer', layer);
    container.setAttribute('tabindex', '0');
    
    // Random color
    const color = CONFIG.tulips.colors[Math.floor(Math.random() * CONFIG.tulips.colors.length)];
    container.classList.add(`tulip--${color}`);
    
    // Random message
    const message = CONFIG.tulips.messages[Math.floor(Math.random() * CONFIG.tulips.messages.length)];
    container.setAttribute('data-message', message);
    
    // Animation delay
    const delay = index * 0.15;
    container.style.animationDelay = `${delay}s`;
    
    // Create structure
    const stem = createStem();
    const flower = createFlower(color);
    
    container.appendChild(stem);
    stem.appendChild(flower);
    
    // Add click event
    container.addEventListener('click', () => showMessage(message));
    container.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            showMessage(message);
        }
    });
    
    return container;
}

function createStem() {
    const stem = document.createElement('div');
    stem.className = 'tulip-stem';
    
    // Add leaves
    const leftLeaf = document.createElement('div');
    leftLeaf.className = 'tulip-leaf tulip-leaf--left';
    
    const rightLeaf = document.createElement('div');
    rightLeaf.className = 'tulip-leaf tulip-leaf--right';
    
    stem.appendChild(leftLeaf);
    stem.appendChild(rightLeaf);
    
    // Random sway animation duration
    const swayDuration = 3 + Math.random() * 2;
    stem.style.animationDuration = `${swayDuration}s`;
    
    return stem;
}

function createFlower(color) {
    const flower = document.createElement('div');
    flower.className = 'tulip-flower';
    
    // Create petals
    const petalTypes = ['front', 'left-front', 'right-front', 'left-back', 'right-back', 'back'];
    
    petalTypes.forEach(type => {
        const petal = document.createElement('div');
        petal.className = `tulip-petal tulip-petal--${type}`;
        
        // Add vein detail
        const vein = document.createElement('div');
        vein.className = 'petal-vein';
        petal.appendChild(vein);
        
        // Add dew drops on front petals
        if (type === 'front' || type === 'left-front' || type === 'right-front') {
            const dewCount = Math.random() > 0.5 ? 2 : 3;
            for (let i = 1; i <= dewCount; i++) {
                const dew = document.createElement('div');
                dew.className = `dew-drop dew-drop--${i}`;
                petal.appendChild(dew);
            }
        }
        
        flower.appendChild(petal);
    });
    
    // Create center pistil
    const center = document.createElement('div');
    center.className = 'tulip-center';
    flower.appendChild(center);
    
    // Random glow animation duration
    const glowDuration = 2.5 + Math.random() * 1.5;
    flower.style.animationDuration = `3s, ${glowDuration}s`;
    
    return flower;
}

// ============================================
// FLOATING ELEMENTS
// ============================================

function initializeFloatingElements() {
    createFireflies();
    createLightOrbs();
    createFallingPetals();
}

function createFireflies() {
    const container = document.querySelector('.fireflies-container');
    
    for (let i = 0; i < CONFIG.fireflies.count; i++) {
        setTimeout(() => {
            const firefly = document.createElement('div');
            firefly.className = 'firefly';
            
            // Random position
            firefly.style.left = `${Math.random() * 100}%`;
            firefly.style.top = `${Math.random() * 100}%`;
            
            // Random animation duration and delay
            const duration = 10 + Math.random() * 10;
            const delay = Math.random() * 5;
            firefly.style.animationDuration = `${duration}s`;
            firefly.style.animationDelay = `${delay}s`;
            
            // Random size
            const size = 3 + Math.random() * 3;
            firefly.style.width = `${size}px`;
            firefly.style.height = `${size}px`;
            
            container.appendChild(firefly);
        }, i * CONFIG.fireflies.spawnDelay);
    }
}

function createLightOrbs() {
    const container = document.querySelector('.light-orbs');
    
    for (let i = 0; i < CONFIG.orbs.count; i++) {
        const orb = document.createElement('div');
        orb.className = 'light-orb';
        
        // Random position
        orb.style.left = `${Math.random() * 100}%`;
        orb.style.top = `${50 + Math.random() * 50}%`;
        
        // Random size
        const size = 20 + Math.random() * 40;
        orb.style.width = `${size}px`;
        orb.style.height = `${size}px`;
        
        // Random animation
        const duration = 15 + Math.random() * 10;
        const delay = Math.random() * 5;
        orb.style.animationDuration = `${duration}s`;
        orb.style.animationDelay = `${delay}s`;
        
        container.appendChild(orb);
    }
}

function createFallingPetals() {
    const container = document.querySelector('.falling-petals');
    const colors = [
        'rgba(255, 179, 217, 0.7)',
        'rgba(230, 179, 255, 0.7)',
        'rgba(255, 249, 196, 0.7)',
        'rgba(255, 255, 255, 0.7)',
        'rgba(255, 107, 107, 0.7)'
    ];
    
    for (let i = 0; i < CONFIG.petals.count; i++) {
        setTimeout(() => {
            const petal = document.createElement('div');
            petal.className = 'petal';
            
            // Random position
            petal.style.left = `${Math.random() * 100}%`;
            
            // Random color
            petal.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            // Random size
            const scale = 0.7 + Math.random() * 0.6;
            petal.style.transform = `scale(${scale})`;
            
            // Random animation
            const duration = 10 + Math.random() * 10;
            const delay = Math.random() * 5;
            petal.style.animationDuration = `${duration}s`;
            petal.style.animationDelay = `${delay}s`;
            
            container.appendChild(petal);
            
            // Remove and recreate after animation
            setTimeout(() => {
                petal.remove();
                createSinglePetal(container, colors);
            }, (duration + delay) * 1000);
        }, i * 200);
    }
}

function createSinglePetal(container, colors) {
    const petal = document.createElement('div');
    petal.className = 'petal';
    
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    const scale = 0.7 + Math.random() * 0.6;
    petal.style.transform = `scale(${scale})`;
    
    const duration = 10 + Math.random() * 10;
    petal.style.animationDuration = `${duration}s`;
    
    container.appendChild(petal);
    
    setTimeout(() => {
        petal.remove();
        createSinglePetal(container, colors);
    }, duration * 1000);
}

// ============================================
// GRASS GENERATION
// ============================================

function initializeGrass() {
    const container = document.querySelector('.grass-blades');
    
    for (let i = 0; i < CONFIG.grass.count; i++) {
        const blade = document.createElement('div');
        blade.className = 'grass-blade';
        
        // Random position
        blade.style.left = `${Math.random() * 100}%`;
        
        // Random height
        const height = 20 + Math.random() * 40;
        blade.style.height = `${height}px`;
        
        // Random animation
        const duration = 2 + Math.random() * 2;
        const delay = Math.random() * 2;
        blade.style.animationDuration = `${duration}s`;
        blade.style.animationDelay = `${delay}s`;
        
        // Random opacity
        blade.style.opacity = 0.3 + Math.random() * 0.4;
        
        container.appendChild(blade);
    }
}

// ============================================
// LIGHT RAYS
// ============================================

function initializeLightRays() {
    const container = document.querySelector('.light-rays-container');
    
    for (let i = 0; i < CONFIG.lightRays.count; i++) {
        const ray = document.createElement('div');
        ray.style.position = 'absolute';
        ray.style.top = '0';
        ray.style.left = `${(i / CONFIG.lightRays.count) * 100}%`;
        ray.style.width = '2px';
        ray.style.height = '100%';
        ray.style.background = `linear-gradient(to bottom, 
            rgba(255, 255, 255, ${0.1 + Math.random() * 0.1}), 
            transparent)`;
        ray.style.opacity = '0.3';
        ray.style.transform = `rotate(${-10 + Math.random() * 20}deg)`;
        ray.style.transformOrigin = 'top center';
        ray.style.animation = `ray-pulse ${3 + Math.random() * 3}s ease-in-out infinite`;
        ray.style.animationDelay = `${Math.random() * 2}s`;
        
        container.appendChild(ray);
    }
    
    // Add ray pulse animation dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ray-pulse {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 0.4; }
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// PARALLAX & MOUSE TRACKING
// ============================================

function initializeParallax() {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleTouchMove);
}

function handleMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    updateParallax();
    updateTulipAttraction();
}

function handleTouchMove(e) {
    if (e.touches.length > 0) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
        updateParallax();
        updateTulipAttraction();
    }
}

function updateParallax() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    const offsetX = (mouseX - centerX) * CONFIG.parallax.mouseSensitivity;
    const offsetY = (mouseY - centerY) * CONFIG.parallax.mouseSensitivity;
    
    // Move background layers
    const sky = document.querySelector('.sky');
    if (sky) {
        sky.style.transform = `translate(${offsetX * 0.5}px, ${offsetY * 0.5}px)`;
    }
    
    // Move tulip layers at different speeds
    const backLayer = document.querySelector('.tulip-layer--back');
    const middleLayer = document.querySelector('.tulip-layer--middle');
    const frontLayer = document.querySelector('.tulip-layer--front');
    
    if (backLayer) {
        backLayer.style.transform = `scale(0.6) translateY(10%) translate(${offsetX * 0.3}px, ${offsetY * 0.3}px)`;
    }
    
    if (middleLayer) {
        middleLayer.style.transform = `scale(0.85) translate(${offsetX * 0.6}px, ${offsetY * 0.6}px)`;
    }
    
    if (frontLayer) {
        frontLayer.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    }
}

function updateTulipAttraction() {
    const tulips = document.querySelectorAll('.tulip');
    
    tulips.forEach(tulip => {
        const rect = tulip.getBoundingClientRect();
        const tulipCenterX = rect.left + rect.width / 2;
        const tulipCenterY = rect.top + rect.height / 2;
        
        // Calculate angle to mouse
        const angleToMouse = Math.atan2(mouseY - tulipCenterY, mouseX - tulipCenterX);
        const degrees = angleToMouse * (180 / Math.PI);
        
        // Calculate distance
        const distance = Math.sqrt(
            Math.pow(mouseX - tulipCenterX, 2) + 
            Math.pow(mouseY - tulipCenterY, 2)
        );
        
        // Only affect tulips within certain distance
        const maxDistance = 300;
        if (distance < maxDistance) {
            const influence = 1 - (distance / maxDistance);
            const rotation = degrees * influence * CONFIG.parallax.tulipAttraction;
            
            // Limit rotation angle
            const clampedRotation = Math.max(-15, Math.min(15, rotation));
            
            const stem = tulip.querySelector('.tulip-stem');
            if (stem) {
                stem.style.transform = `rotate(${clampedRotation}deg)`;
                stem.style.transition = 'transform 0.3s ease-out';
            }
        }
    });
}

// ============================================
// EVENT LISTENERS
// ============================================

function initializeEventListeners() {
    // Enter button
    const enterButton = document.querySelector('.enter-button');
    const welcomeOverlay = document.querySelector('.welcome-overlay');
    
    enterButton.addEventListener('click', () => {
        welcomeOverlay.classList.add('hidden');
        isEntered = true;
        // Start music if available
        initializeMusic();
    });
    
    // Letter button
    const letterButton = document.querySelector('.open-letter-btn');
    const letterModal = document.querySelector('.love-letter-modal');
    const closeLetter = document.querySelector('.close-letter');
    
    letterButton.addEventListener('click', () => {
        letterModal.classList.remove('hidden');
    });
    
    closeLetter.addEventListener('click', () => {
        letterModal.classList.add('hidden');
    });
    
    // Close letter on outside click
    letterModal.addEventListener('click', (e) => {
        if (e.target === letterModal) {
            letterModal.classList.add('hidden');
        }
    });
    
    // Music toggle
    const musicToggle = document.querySelector('.music-toggle');
    musicToggle.addEventListener('click', toggleMusic);
    
    // Close message on click anywhere
    document.addEventListener('click', (e) => {
        const messageBox = document.querySelector('.tulip-message');
        if (!messageBox.classList.contains('hidden') && 
            !e.target.closest('.tulip') && 
            !e.target.closest('.tulip-message')) {
            messageBox.classList.add('hidden');
        }
    });
}

// ============================================
// MESSAGE DISPLAY
// ============================================

function showMessage(message) {
    const messageBox = document.querySelector('.tulip-message');
    const messageContent = messageBox.querySelector('.message-content');
    
    messageContent.textContent = message;
    messageBox.classList.remove('hidden');
    
    // Auto-hide after 4 seconds
    setTimeout(() => {
        messageBox.classList.add('hidden');
    }, 6000);
}

// ============================================
// MUSIC FUNCTIONALITY
// ============================================

function initializeMusic() {
    const audio = document.getElementById('background-music');
    const musicToggle = document.querySelector('.music-toggle');
    
    if (audio) {
        audio.volume = 0.3; // 30% volume, adjust as needed
        audio.play();
        musicToggle.classList.add('playing');
    }
}

function toggleMusic() {
    const audio = document.getElementById('background-music');
    const musicToggle = document.querySelector('.music-toggle');
    
    if (!audio) return;
    
    if (audio.paused) {
        audio.play();
        musicToggle.classList.add('playing');
    } else {
        audio.pause();
        musicToggle.classList.remove('playing');
    }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Debounce mouse movement for better performance
let mouseMoveTimeout;
function debounceMouseMove(callback, delay) {
    return function(...args) {
        clearTimeout(mouseMoveTimeout);
        mouseMoveTimeout = setTimeout(() => callback.apply(this, args), delay);
    };
}

// Request animation frame for smooth animations
let rafId;
function smoothUpdate() {
    updateParallax();
    updateTulipAttraction();
    rafId = requestAnimationFrame(smoothUpdate);
}

// Start smooth updates when entered
document.querySelector('.enter-button').addEventListener('click', () => {
    rafId = requestAnimationFrame(smoothUpdate);
});

// ============================================
// KEYBOARD NAVIGATION
// ============================================

document.addEventListener('keydown', (e) => {
    // ESC to close modals
    if (e.key === 'Escape') {
        document.querySelector('.love-letter-modal').classList.add('hidden');
        document.querySelector('.tulip-message').classList.add('hidden');
    }
    
    // Space or Enter on welcome screen
    if (!isEntered && (e.key === ' ' || e.key === 'Enter')) {
        e.preventDefault();
        document.querySelector('.enter-button').click();
    }
});

// ============================================
// SPECIAL EFFECTS
// ============================================

// Add shooting stars occasionally
setInterval(() => {
    if (isEntered && Math.random() > 0.7) {
        createShootingStar();
    }
}, 5000);

function createShootingStar() {
    const star = document.createElement('div');
    star.style.position = 'fixed';
    star.style.width = '2px';
    star.style.height = '2px';
    star.style.background = 'white';
    star.style.borderRadius = '50%';
    star.style.boxShadow = '0 0 10px white, 0 0 20px white';
    star.style.left = `${Math.random() * 50}%`;
    star.style.top = `${Math.random() * 30}%`;
    star.style.zIndex = '5';
    star.style.animation = 'shooting-star 1.5s linear forwards';
    
    document.body.appendChild(star);
    
    setTimeout(() => star.remove(), 1500);
}

// Add shooting star animation
const shootingStarStyle = document.createElement('style');
shootingStarStyle.textContent = `
    @keyframes shooting-star {
        0% {
            transform: translate(0, 0) rotate(45deg);
            opacity: 1;
        }
        100% {
            transform: translate(300px, 300px) rotate(45deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(shootingStarStyle);

// ============================================
// CONSOLE EASTER EGG
// ============================================

console.log('%c🌷 Made with Love 💕', 'color: #FF69B4; font-size: 24px; font-weight: bold;');
console.log('%cFor Bee, because you deserve all the flowers in the world 🌸', 'color: #9B59B6; font-size: 14px;');
console.log('%cEven if you\'re allergic to roses 😄', 'color: #FFD700; font-size: 12px; font-style: italic;');