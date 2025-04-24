/**
 * Particle animation utility for background star effects
 */

/**
 * Creates a particle animation system
 * @param {HTMLCanvasElement} canvas - Canvas element
 * @param {CanvasRenderingContext2D} ctx - Canvas 2D context
 * @param {boolean} darkMode - Current theme state
 * @returns {Function} Cleanup function
 */
export function setupParticles(canvas, ctx, darkMode) {
  let animationFrameId;
  let particles = [];
  
  // Create particles
  const particleCount = darkMode ? 50 : 35;
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle(canvas, darkMode));
  }
  
  // Animation function
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
      particle.update();
      particle.draw(ctx, canvas, darkMode);
    });
    
    animationFrameId = requestAnimationFrame(animate);
  };
  
  // Start animation
  animate();
  
  // Return cleanup function
  return () => {
    cancelAnimationFrame(animationFrameId);
  };
}

/**
 * Particle class for star animations
 */
class Particle {
  constructor(canvas, darkMode) {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2.5 + 0.8;
    this.speedX = (Math.random() - 0.5) * 0.2;
    this.speedY = (Math.random() - 0.5) * 0.1;
    this.opacity = Math.random() * 0.4 + 0.2;
    this.twinkleSpeed = Math.random() * 0.03 + 0.01;
    this.twinkle = Math.random() * Math.PI;
    
    // Colors based on theme
    this.baseColor = darkMode 
      ? [220, 220, 240] // Blue-white for dark mode stars
      : [119, 80, 61]; // Brown for light mode
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    
    // Twinkle effect
    this.twinkle += this.twinkleSpeed;
    const twinkleFactor = (Math.sin(this.twinkle) + 1) / 2;
    
    // Dynamic color with twinkle
    const o = this.opacity * (0.6 + twinkleFactor * 0.4);
    this.color = `rgba(${this.baseColor[0]}, ${this.baseColor[1]}, ${this.baseColor[2]}, ${o})`;
  }

  draw(ctx, canvas, darkMode) {
    // Handle wrapping around edges
    if (this.x < 0) this.x = canvas.width;
    if (this.x > canvas.width) this.x = 0;
    if (this.y < 0) this.y = canvas.height;
    if (this.y > canvas.height) this.y = 0;
    
    ctx.beginPath();
    
    if (darkMode) {
      // Draw a star shape in dark mode
      const outerRadius = this.size;
      const innerRadius = this.size / 2;
      const spikes = 4;
      
      for (let i = 0; i < spikes * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = (Math.PI / spikes) * i;
        
        const x = this.x + Math.cos(angle) * radius;
        const y = this.y + Math.sin(angle) * radius;
        
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      
      ctx.closePath();
      ctx.fillStyle = this.color;
      ctx.fill();
    } else {
      // Draw a simple dot in light mode
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }
}