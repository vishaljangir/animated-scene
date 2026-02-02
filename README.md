# Multi-Layer Animated Scene

A complete front-end project featuring a multi-layer animated scene with cars, rain, fog, clouds, and street lights.

## 🎬 Features

### Visual Layers (Properly Stacked with Z-Index)
1. **Background Layer** - Gradient sky with animated road and lane markings
2. **Clouds Layer** - Slowly drifting clouds for atmospheric depth
3. **Street Lights Layer** - Static street lights with glowing effects
4. **Vehicles Layer** - Multiple cars moving at different speeds in both directions
5. **Rain Layer** - Canvas-based rain animation with realistic falling effects
6. **Fog Layer** - Animated fog overlay for additional depth

### Cars System
- ✅ Multiple cars (6 total) with different colors
- ✅ Bi-directional movement (left-to-right and right-to-left)
- ✅ Variable speeds for each car
- ✅ Seamless looping (cars reappear on opposite side)
- ✅ CSS-based car designs with wheels, chassis, cabin, and headlights
- ✅ Cars positioned in different lanes

### Rain System
- ✅ 150 animated raindrops
- ✅ Canvas-based rendering for smooth performance
- ✅ Variable speed and length for realistic effect
- ✅ Continuous falling with automatic reset
- ✅ Subtle trail effects

### Performance Optimizations
- ✅ RequestAnimationFrame for smooth 60fps animation
- ✅ Efficient canvas rendering
- ✅ CSS transforms and will-change properties
- ✅ Debounced resize handler
- ✅ Minimal DOM manipulation

### Responsive Design
- ✅ Works on desktop screens (1920x1080 and above)
- ✅ Tablet responsive (768px - 1024px)
- ✅ Mobile friendly (320px - 768px)
- ✅ Dynamic element scaling based on screen size

### Interactive Controls
- Toggle rain on/off
- Toggle cars on/off
- Toggle fog on/off

## 📁 Project Structure

```
animated-scene/
├── index.html          # Main HTML file with scene structure
├── style.css           # All styles and animations
├── script.js           # JavaScript for rain, cars, and controls
├── README.md           # This file
└── assets/             # (Optional) Folder for custom images
```

## 🚀 How to Run

### Method 1: Direct File Opening
1. Download/extract all project files to a folder
2. Double-click `index.html` to open in your default browser
3. Enjoy the animated scene!

### Method 2: Local Server (Recommended for best performance)
1. Open terminal/command prompt in the project folder
2. Run a local server:
   
   **Using Python 3:**
   ```bash
   python3 -m http.server 8000
   ```
   
   **Using Python 2:**
   ```bash
   python -m SimpleHTTPServer 8000
   ```
   
   **Using Node.js (with http-server):**
   ```bash
   npx http-server -p 8000
   ```
   
   **Using PHP:**
   ```bash
   php -S localhost:8000
   ```

3. Open your browser and navigate to: `http://localhost:8000`

### Method 3: VS Code Live Server
1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## 🎮 Controls

Use the control panel in the top-right corner to:
- **Toggle Rain** - Enable/disable rain animation
- **Toggle Cars** - Show/hide moving vehicles
- **Toggle Fog** - Enable/disable fog effect

## 🎨 Customization

### Modify Car Count
Edit `CONFIG.cars.count` in `script.js`:
```javascript
cars: {
    count: 6,  // Change this number
    ...
}
```

### Change Rain Intensity
Edit rain configuration in `script.js`:
```javascript
rain: {
    dropCount: 150,  // More drops = heavier rain
    minSpeed: 2,     // Minimum fall speed
    maxSpeed: 5,     // Maximum fall speed
    ...
}
```

### Adjust Car Speeds
Edit speed range in `script.js`:
```javascript
cars: {
    minSpeed: 1,  // Slower cars
    maxSpeed: 3,  // Faster cars
    ...
}
```

### Change Car Colors
Modify the color array in `script.js`:
```javascript
colors: [
    { main: '#e74c3c', dark: '#c0392b' }, // Red
    { main: '#3498db', dark: '#2980b9' }, // Blue
    // Add more colors...
]
```

## 🖼️ Adding Custom Images

To use custom images instead of CSS shapes:

1. Create an `assets` folder in the project directory
2. Add your images (e.g., `car1.png`, `background.jpg`)
3. Modify the code:

**For background:**
```css
#background-layer {
    background-image: url('assets/background.jpg');
    background-size: cover;
}
```

**For cars (replace CSS car creation):**
```javascript
car.innerHTML = `<img src="assets/car1.png" alt="car" style="width: 100%; height: 100%;">`;
```

## 🌐 Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Mobile Performance

The scene is optimized for mobile devices:
- Reduced car count automatically on smaller screens
- Scaled elements for better visibility
- Touch-friendly control panel
- Efficient canvas rendering

## 🔧 Troubleshooting

**Issue: Animation is choppy**
- Try reducing `CONFIG.rain.dropCount` (e.g., to 100)
- Reduce `CONFIG.cars.count` (e.g., to 4)
- Close other browser tabs
- Try a different browser

**Issue: Cars not appearing**
- Check browser console for errors (F12)
- Ensure JavaScript is enabled
- Try refreshing the page

**Issue: Rain not visible**
- Ensure rain toggle is checked
- Check if canvas is supported in your browser
- Try adjusting rain opacity in CSS

## 📄 License

This project is free to use, modify, and distribute. No attribution required.

## 🎓 Learning Notes

This project demonstrates:
- CSS layering with z-index
- Canvas API for particle effects
- RequestAnimationFrame for smooth animations
- Responsive design principles
- DOM manipulation best practices
- Performance optimization techniques
- Object-oriented JavaScript

Enjoy your animated scene! 🎉
