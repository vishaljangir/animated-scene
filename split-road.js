// ===========================
// CONFIGURATION
// ===========================
const config = {
    carsEnabled: true,
    weatherEnabled: false,
    carCount: 6,
    carSpeed: {
        min: 1,
        max: 2.5
    }
};

let cars = [];
let canvas, ctx;
let raindrops = [];
let svgPaths = {
    main: null,
    upper: null,
    lower: null,
    mainLength: 0,
    upperLength: 0,
    lowerLength: 0
};

function initializeSVGPaths() {
    svgPaths.main = document.getElementById('main-road-path');
    svgPaths.upper = document.getElementById('upper-road-path');
    svgPaths.lower = document.getElementById('lower-road-path');
    
    svgPaths.mainLength = svgPaths.main.getTotalLength();
    svgPaths.upperLength = svgPaths.upper.getTotalLength();
    svgPaths.lowerLength = svgPaths.lower.getTotalLength();
}

function getCarPathData(progress, direction) {
    let point, nextPoint, rotation;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const scaleX = screenWidth / 1920;
    const scaleY = screenHeight / 1080;
    
    if (direction === 'left-to-right') {
        if (progress < 0.35) {
            const mainProgress = progress / 0.35;
            const distance = mainProgress * svgPaths.mainLength;
            point = svgPaths.main.getPointAtLength(distance);
            nextPoint = svgPaths.main.getPointAtLength(Math.min(distance + 10, svgPaths.mainLength));
        } else {
            const upperProgress = (progress - 0.35) / 0.65;
            const distance = upperProgress * svgPaths.upperLength;
            point = svgPaths.upper.getPointAtLength(distance);
            nextPoint = svgPaths.upper.getPointAtLength(Math.min(distance + 10, svgPaths.upperLength));
        }
        
        const dx = nextPoint.x - point.x;
        const dy = nextPoint.y - point.y;
        rotation = Math.atan2(dy, dx) * (180 / Math.PI);
        
    } else {
        if (progress < 0.65) {
            const lowerProgress = 1 - (progress / 0.65);
            const distance = lowerProgress * svgPaths.lowerLength;
            point = svgPaths.lower.getPointAtLength(distance);
            nextPoint = svgPaths.lower.getPointAtLength(Math.max(distance - 10, 0));
        } else {
            const mainProgress = 1 - ((progress - 0.65) / 0.35);
            const distance = mainProgress * svgPaths.mainLength;
            point = svgPaths.main.getPointAtLength(distance);
            nextPoint = svgPaths.main.getPointAtLength(Math.max(distance - 10, 0));
        }
        
        const dx = point.x - nextPoint.x;
        const dy = point.y - nextPoint.y;
        rotation = Math.atan2(dy, dx) * (180 / Math.PI);
    }
    
    return { 
        x: point.x * scaleX, 
        y: point.y * scaleY, 
        rotation 
    };
}

// ===========================
// CAR MANAGEMENT
// ===========================

/**
 * Create a new car object
 */
function createCar(index) {
    const direction = index % 2 === 0 ? 'left-to-right' : 'right-to-left';
    
    // Create car element
    const carElement = document.createElement('img');
    carElement.className = 'car';
    carElement.src = direction === 'left-to-right' ? 
        'assets/cars/car-right.png' : 
        'assets/cars/car-left.png';
    
    // Fallback to existing car images if new folder doesn't exist
    carElement.onerror = function() {
        this.src = direction === 'left-to-right' ? 
            'assets/right-car.png' : 
            'assets/left-car.png';
    };
    
    document.getElementById('cars-layer').appendChild(carElement);
    
    return {
        element: carElement,
        direction: direction,
        progress: Math.random(), // Random starting position (0 to 1)
        speed: (config.carSpeed.min + Math.random() * (config.carSpeed.max - config.carSpeed.min)) / 1000
    };
}

/**
 * Initialize all cars
 */
function setupCars() {
    // Clear existing cars
    document.getElementById('cars-layer').innerHTML = '';
    cars = [];
    
    // Create new cars
    for (let i = 0; i < config.carCount; i++) {
        cars.push(createCar(i));
    }
}

/**
 * Update car positions
 */
function updateCars() {
    if (!config.carsEnabled) return;
    
    cars.forEach(car => {
        // Update progress
        car.progress += car.speed;
        
        // Reset when off screen
        if (car.progress > 1) {
            car.progress = 0;
        }
        
        // Get position along path
        const pathData = getCarPathData(car.progress, car.direction);
        
        // Apply position and rotation
        car.element.style.left = pathData.x + 'px';
        car.element.style.top = pathData.y + 'px';
        car.element.style.transform = `translate(-50%, -50%) rotate(${pathData.rotation}deg)`;
    });
}

// ===========================
// WEATHER SYSTEM (Rain)
// ===========================

function setupWeather() {
    canvas = document.getElementById('weather-canvas');
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Create raindrops
    raindrops = [];
    for (let i = 0; i < 100; i++) {
        raindrops.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            speed: 3 + Math.random() * 5,
            length: 10 + Math.random() * 20
        });
    }
}

function updateWeather() {
    if (!config.weatherEnabled) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
    }
    
    // Clear with fade effect
    ctx.fillStyle = 'rgba(15, 32, 39, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw raindrops
    ctx.strokeStyle = 'rgba(174, 194, 224, 0.6)';
    ctx.lineWidth = 1;
    
    raindrops.forEach(drop => {
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + drop.length);
        ctx.stroke();
        
        // Move raindrop
        drop.y += drop.speed;
        
        // Reset if off screen
        if (drop.y > canvas.height) {
            drop.y = -drop.length;
            drop.x = Math.random() * canvas.width;
        }
    });
}

// ===========================
// ANIMATION LOOP
// ===========================

function animate() {
    updateCars();
    updateWeather();
    requestAnimationFrame(animate);
}

// ===========================
// CONTROLS
// ===========================

function setupControls() {
    // Cars toggle
    document.getElementById('toggle-cars').addEventListener('change', (e) => {
        config.carsEnabled = e.target.checked;
        document.getElementById('cars-layer').style.display = e.target.checked ? 'block' : 'none';
    });
    
    // Weather toggle
    document.getElementById('toggle-weather').addEventListener('change', (e) => {
        config.weatherEnabled = e.target.checked;
    });
    
    // Car count slider
    document.getElementById('car-count').addEventListener('input', (e) => {
        config.carCount = parseInt(e.target.value);
        document.getElementById('car-count-display').textContent = config.carCount;
        setupCars();
    });
}

// ===========================
// WINDOW RESIZE
// ===========================

window.addEventListener('resize', () => {
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    setupCars();
});

// ===========================
// INITIALIZATION
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    initializeSVGPaths();
    setupWeather();
    setupCars();
    setupControls();
    animate();
    console.log('✨ Smooth Curved Road Ready!');
});
