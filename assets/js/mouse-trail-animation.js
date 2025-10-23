// ========================================
// MOUSE TRAIL ANIMATION - JAVASCRIPT
// ========================================

(function () {
  "use strict";

  console.log("🎨 Mouse Trail Animation Loading...");

  // Check if device is mobile/touch
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  if (isMobile) {
    console.log("📱 Mobile device detected - Mouse trail disabled");
    return;
  }

  // Configuration
  const config = {
    trailType: "particles", // 'particles', 'gradient', 'stars', 'sparkles', 'all'
    particleCount: 15,
    particleSize: 8,
    particleColor: "#10b981",
    enableCustomCursor: true,
    enableGlow: true,
    enableRipple: true,
    maxParticles: 50,
    throttleDelay: 16, // ~60fps
  };

  let lastTime = 0;
  let particles = [];

  // Create custom cursor
  let cursor = null;
  let cursorGlow = null;

  if (config.enableCustomCursor) {
    cursor = document.createElement("div");
    cursor.className = "custom-cursor";
    document.body.appendChild(cursor);
  }

  if (config.enableGlow) {
    cursorGlow = document.createElement("div");
    cursorGlow.className = "cursor-glow";
    document.body.appendChild(cursorGlow);
  }

  // Mouse move handler with throttle
  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Update custom cursor position
    if (cursor) {
      cursor.style.left = mouseX - 10 + "px";
      cursor.style.top = mouseY - 10 + "px";
    }

    if (cursorGlow) {
      cursorGlow.style.left = mouseX - 100 + "px";
      cursorGlow.style.top = mouseY - 100 + "px";
    }

    // Throttle particle creation
    const currentTime = Date.now();
    if (currentTime - lastTime < config.throttleDelay) return;
    lastTime = currentTime;

    // Clean up old particles
    if (particles.length > config.maxParticles) {
      const oldParticle = particles.shift();
      if (oldParticle && oldParticle.parentNode) {
        oldParticle.remove();
      }
    }

    // Create trail particles based on type
    if (config.trailType === "particles" || config.trailType === "all") {
      createParticle(mouseX, mouseY);
    }

    if (config.trailType === "gradient" || config.trailType === "all") {
      createGradientTrail(mouseX, mouseY);
    }

    if (config.trailType === "stars") {
      createStarTrail(mouseX, mouseY);
    }

    if (config.trailType === "sparkles") {
      createSparkle(mouseX, mouseY);
    }
  });

  // Click effect
  document.addEventListener("mousedown", function (e) {
    if (cursor) {
      cursor.classList.add("clicked");
    }

    if (config.enableRipple) {
      createRipple(e.clientX, e.clientY);
    }
  });

  document.addEventListener("mouseup", function () {
    if (cursor) {
      cursor.classList.remove("clicked");
    }
  });

  // Create particle trail
  function createParticle(x, y) {
    const particle = document.createElement("div");
    particle.className = "trail-particle";

    const size = Math.random() * config.particleSize + 4;
    particle.style.width = size + "px";
    particle.style.height = size + "px";
    particle.style.left = x - size / 2 + "px";
    particle.style.top = y - size / 2 + "px";
    particle.style.background = config.particleColor;

    document.body.appendChild(particle);
    particles.push(particle);

    setTimeout(() => {
      if (particle.parentNode) {
        particle.remove();
      }
    }, 800);
  }

  // Create gradient trail
  function createGradientTrail(x, y) {
    const trail = document.createElement("div");
    trail.className = "trail-gradient";
    trail.style.left = x - 15 + "px";
    trail.style.top = y - 15 + "px";

    document.body.appendChild(trail);
    particles.push(trail);

    setTimeout(() => {
      if (trail.parentNode) {
        trail.remove();
      }
    }, 1000);
  }

  // Create star trail
  function createStarTrail(x, y) {
    const star = document.createElement("div");
    star.className = "trail-star";
    star.style.left = x - 4 + "px";
    star.style.top = y - 4 + "px";
    star.style.background = config.particleColor;

    document.body.appendChild(star);
    particles.push(star);

    setTimeout(() => {
      if (star.parentNode) {
        star.remove();
      }
    }, 1200);
  }

  // Create sparkle effect
  function createSparkle(x, y) {
    for (let i = 0; i < 3; i++) {
      const sparkle = document.createElement("div");
      sparkle.className = "trail-sparkle";

      const offsetX = (Math.random() - 0.5) * 20;
      const offsetY = (Math.random() - 0.5) * 20;

      sparkle.style.left = x + offsetX + "px";
      sparkle.style.top = y + offsetY + "px";

      document.body.appendChild(sparkle);
      particles.push(sparkle);

      setTimeout(() => {
        if (sparkle.parentNode) {
          sparkle.remove();
        }
      }, 600);
    }
  }

  // Create click ripple
  function createRipple(x, y) {
    const ripple = document.createElement("div");
    ripple.className = "click-ripple";
    ripple.style.left = x - 5 + "px";
    ripple.style.top = y - 5 + "px";

    document.body.appendChild(ripple);

    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.remove();
      }
    }, 600);
  }

  // Clean up on page unload
  window.addEventListener("beforeunload", function () {
    particles.forEach((p) => {
      if (p && p.parentNode) p.remove();
    });
  });

  console.log("✅ Mouse Trail Animation Loaded!");
  console.log("🎯 Trail Type:", config.trailType);
})();
