// ===========================
// SIMPLE CONFIGURATION
// ===========================
const config = {
    rainEnabled: false,
    carsEnabled: true,
    fogEnabled: false,
    rainDrops: 150,
    carCount: 6,
    carColors: ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c']
};

let canvas, ctx;
let raindrops = [];
let cars = [];

// ===========================
// RAIN FUNCTIONS
// ===========================
function setupRain() {
    canvas = document.getElementById('rain-canvas');
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Create raindrops
    raindrops = [];
    for (let i = 0; i < config.rainDrops; i++) {
        raindrops.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            speed: 2 + Math.random() * 3,
            length: 10 + Math.random() * 20
        });
    }
}

function updateRain() {
    if (!config.rainEnabled) return;
    
    // Clear canvas
    ctx.fillStyle = 'rgba(15, 32, 39, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw and move raindrops
    ctx.strokeStyle = 'rgba(174, 194, 224, 0.6)';
    ctx.lineWidth = 1;
    
    raindrops.forEach(drop => {
        // Draw raindrop
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + drop.length);
        ctx.stroke();
        
        // Move raindrop down
        drop.y += drop.speed;
        
        // Reset if off screen
        if (drop.y > canvas.height) {
            drop.y = -drop.length;
            drop.x = Math.random() * canvas.width;
        }
    });
}

// ===========================
// CAR FUNCTIONS
// ===========================
function createCar(index) {
    const car = document.createElement('img');
    car.className = 'car';
    
    const direction = index % 2 === 0 ? 'right' : 'left';
    const lane = 1;
    
    // Use different images for different directions
    if (direction === 'right') {
        car.src = 'assets/right-car.png';
    } else {
        car.src = 'assets/left-car.png';
    }
    
    // Position car
    const roadHeight = window.innerHeight * 0.4;
    const laneHeight = roadHeight / 4;
    const bottom = window.innerHeight - (window.innerHeight * 0.6 + (lane * laneHeight) - 30);
    
    car.style.bottom = bottom + 'px';
    car.style.left = (direction === 'right' ? -150 : window.innerWidth) + 'px';
    if (direction === 'right') {
        car.style.bottom = (bottom + 200) + 'px';
    } else {
        car.style.bottom = (bottom - 50) + 'px';
    }
    
    document.getElementById('vehicles-layer').appendChild(car);
    
    return {
        element: car,
        direction: direction,
        position: direction === 'right' ? -150 : window.innerWidth,
        speed: 1 + Math.random() * 2
    };
}

function setupCars() {
    // Clear existing cars
    document.getElementById('vehicles-layer').innerHTML = '';
    cars = [];
    
    // Create new cars
    for (let i = 0; i < config.carCount; i++) {
        cars.push(createCar(i));
    }
}

function updateCars() {
    if (!config.carsEnabled) return;
    
    cars.forEach(car => {
        // Move car
        if (car.direction === 'right') {
            car.position += car.speed;
            if (car.position > window.innerWidth + 150) {
                car.position = -150;
            }
        } else {
            car.position -= car.speed;
            if (car.position < -150) {
                car.position = window.innerWidth + 150;
            }
        }
        
        // Update position
        car.element.style.left = car.position + 'px';
    });
}

// ===========================
// ANIMATION LOOP
// ===========================
function animate() {
    updateRain();
    updateCars();
    requestAnimationFrame(animate);
}

// ===========================
// CONTROLS & INITIALIZATION
// ===========================
function setupControls() {
    // Rain toggle
    document.getElementById('toggle-rain').addEventListener('change', (e) => {
        config.rainEnabled = e.target.checked;
        if (!config.rainEnabled) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    });
    
    // Cars toggle
    document.getElementById('toggle-cars').addEventListener('change', (e) => {
        config.carsEnabled = e.target.checked;
        document.getElementById('vehicles-layer').style.display = e.target.checked ? 'block' : 'none';
    });
    
    // Fog toggle
    document.getElementById('toggle-fog').addEventListener('change', (e) => {
        config.fogEnabled = e.target.checked;
        document.getElementById('fog-layer').style.display = e.target.checked ? 'block' : 'none';
    });
}

// Handle window resize
window.addEventListener('resize', () => {
    // setupRain();
    setupCars();
});

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', () => {
    // setupRain();
    setupCars();
    // setupControls();
    animate();
    console.log('✨ Animated Scene Ready!');
});
