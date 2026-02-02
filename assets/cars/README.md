# Car Image Setup Instructions

## Required Images

You need to add two car images to this directory:

### 1. car-right.png
- **Purpose**: Cars moving from LEFT → RIGHT (upper road)
- **Direction**: Car should face RIGHT (→)
- **Format**: PNG with transparent background
- **Size**: Approximately 150-200px wide
- **Example**: 🚗 ➡️

### 2. car-left.png
- **Purpose**: Cars moving from RIGHT → LEFT (lower road)
- **Direction**: Car should face LEFT (←)
- **Format**: PNG with transparent background
- **Size**: Approximately 150-200px wide
- **Example**: ⬅️ 🚗

## Where to Get Car Images

### Free Resources:
1. **Flaticon**: https://www.flaticon.com/
   - Search: "car side view"
   - Filter: PNG, Free

2. **Freepik**: https://www.freepik.com/
   - Search: "car icon transparent background"
   - Download PNG format

3. **PNG Tree**: https://pngtree.com/
   - Search: "car transparent"
   - Choose side view cars

4. **The Noun Project**: https://thenounproject.com/
   - Search: "car"
   - Download PNG with transparency

### Creating Your Own:
- Use any image editor (Photoshop, GIMP, Figma)
- Draw a simple car shape (side view)
- Export as PNG with transparent background
- Or flip an existing car image horizontally for the opposite direction

## Quick Test

The animation will automatically fall back to:
- `../right-car.png` (if it exists)
- `../left-car.png` (if it exists)

So you can use the existing car images in the parent `assets/` folder for testing.

## File Naming

**Important**: File names must match exactly:
- `car-right.png` (lowercase, with hyphen)
- `car-left.png` (lowercase, with hyphen)

## Example Car Specifications

```
car-right.png:
- Width: 180px
- Height: 80px
- Format: PNG-24 (with alpha channel)
- Background: Transparent
- Orientation: Horizontal (facing right)
- Style: Side view, simple/flat design

car-left.png:
- Same specs as car-right.png
- Just flipped horizontally
```

## Current Status

✅ Directory created
❌ car-right.png - **MISSING** (add this file)
❌ car-left.png - **MISSING** (add this file)

Once you add these images, refresh the browser to see the cars in action!
