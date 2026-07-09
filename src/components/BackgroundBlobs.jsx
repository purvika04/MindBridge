import React, { useEffect, useRef } from 'react';

export default function BackgroundBlobs() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.speedY = (Math.random() - 0.5) * 0.2;
        this.alpha = Math.random() * 0.5 + 0.1;
        this.pulseSpeed = Math.random() * 0.01 + 0.005;
        this.direction = Math.random() > 0.5 ? 1 : -1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Boundaries
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

        // Pulse alpha
        this.alpha += this.pulseSpeed * this.direction;
        if (this.alpha > 0.6 || this.alpha < 0.1) {
          this.direction *= -1;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168, 85, 247, ${this.alpha})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(168, 85, 247, 0.4)';
        ctx.fill();
        ctx.restore();
      }
    }

    const initParticles = () => {
      particles = [];
      const count = Math.min(Math.floor(canvas.width / 40), 60);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Canvas for fine particles */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-40" />

      {/* Large Gradient Blobs */}
      <div className="gradient-blob gradient-blob-1 w-[600px] h-[600px] top-[-100px] left-[-100px] animate-pulse-slow" />
      <div className="gradient-blob gradient-blob-2 w-[700px] h-[700px] bottom-[-200px] right-[-100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      <div className="gradient-blob gradient-blob-3 w-[500px] h-[500px] top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 animate-pulse-slow" style={{ animationDelay: '4s' }} />

      {/* Grid overlay for tech look */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
    </div>
  );
}
