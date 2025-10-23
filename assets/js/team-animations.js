// ========================================
// TEAM SECTION - ADVANCED JAVASCRIPT ANIMATIONS
// ========================================

document.addEventListener("DOMContentLoaded", function () {
  // ===== 1. PARTICLE EFFECT ON HOVER =====
  const teamCards = document.querySelectorAll(".team-card");

  teamCards.forEach((card) => {
    // Create particle container
    const particleContainer = document.createElement("div");
    particleContainer.className = "particle-container";
    card.querySelector(".team-avatar-container").appendChild(particleContainer);

    // Create glow ring
    const glowRing = document.createElement("div");
    glowRing.className = "glow-ring";
    card.querySelector(".team-avatar-container").appendChild(glowRing);

    // Mouse enter - create particles
    card.addEventListener("mouseenter", function () {
      createParticles(particleContainer);
      createSparkles(card);
    });
  });

  // ===== 2. CREATE FLOATING PARTICLES =====
  function createParticles(container) {
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";

      // Random position
      particle.style.left = Math.random() * 100 + "%";
      particle.style.animationDelay = Math.random() * 2 + "s";
      particle.style.animationDuration = Math.random() * 2 + 2 + "s";

      container.appendChild(particle);

      // Remove after animation
      setTimeout(() => {
        particle.remove();
      }, 4000);
    }
  }

  // ===== 3. CREATE SPARKLE EFFECT =====
  function createSparkles(card) {
    const avatarContainer = card.querySelector(".team-avatar-container");
    const rect = avatarContainer.getBoundingClientRect();

    for (let i = 0; i < 10; i++) {
      const sparkle = document.createElement("div");
      sparkle.className = "sparkle";

      // Random position around avatar
      const angle = (Math.PI * 2 * i) / 10;
      const radius = 140;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      sparkle.style.left = "50%";
      sparkle.style.top = "50%";
      sparkle.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
      sparkle.style.animation = `sparkleAnimation ${
        Math.random() * 1 + 1
      }s ease-out`;
      sparkle.style.animationDelay = i * 0.1 + "s";

      avatarContainer.appendChild(sparkle);

      // Remove after animation
      setTimeout(() => {
        sparkle.remove();
      }, 2000);
    }
  }

  // ===== 4. 3D TILT EFFECT ON MOUSE MOVE =====
  teamCards.forEach((card) => {
    const avatar = card.querySelector(".team-avatar-container");

    card.addEventListener("mousemove", function (e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      avatar.style.transform = `
        scale(1.15) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg)
      `;
    });

    card.addEventListener("mouseleave", function () {
      avatar.style.transform = "scale(1) rotateX(0) rotateY(0)";
    });
  });

  // ===== 5. RIPPLE EFFECT ON CLICK =====
  teamCards.forEach((card) => {
    card.addEventListener("click", function (e) {
      const ripple = document.createElement("div");
      ripple.style.position = "absolute";
      ripple.style.borderRadius = "50%";
      ripple.style.background = "rgba(16, 185, 129, 0.5)";
      ripple.style.width = "10px";
      ripple.style.height = "10px";
      ripple.style.pointerEvents = "none";

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.style.transform = "translate(-50%, -50%)";

      card.appendChild(ripple);

      // Animate ripple
      ripple.animate(
        [
          { width: "10px", height: "10px", opacity: 1 },
          { width: "500px", height: "500px", opacity: 0 },
        ],
        {
          duration: 800,
          easing: "ease-out",
        }
      );

      setTimeout(() => {
        ripple.remove();
      }, 800);
    });
  });

  // ===== 6. BADGE ROTATION ON HOVER =====
  teamCards.forEach((card) => {
    const badge = card.querySelector(".team-badge");
    let rotationAngle = 0;
    let rotationInterval;

    card.addEventListener("mouseenter", function () {
      rotationInterval = setInterval(() => {
        rotationAngle += 5;
        badge.style.transform = `scale(1.2) rotate(${rotationAngle}deg)`;
      }, 20);
    });

    card.addEventListener("mouseleave", function () {
      clearInterval(rotationInterval);
      badge.style.transform = "scale(1) rotate(0deg)";
    });
  });

  // ===== 7. TEXT TYPING EFFECT ON FIRST LOAD =====
  const teamNames = document.querySelectorAll(".team-name");

  teamNames.forEach((name, index) => {
    const originalText = name.textContent;
    name.textContent = "";
    name.style.opacity = "1";

    setTimeout(() => {
      let charIndex = 0;
      const typingInterval = setInterval(() => {
        if (charIndex < originalText.length) {
          name.textContent += originalText[charIndex];
          charIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, 50);
    }, index * 500);
  });

  // ===== 8. FLOATING ANIMATION ON SCROLL =====
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animation = "fadeInUp 0.8s ease-out";
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  teamCards.forEach((card) => {
    observer.observe(card);
  });

  // ===== 9. CURSOR GLOW EFFECT =====
  teamCards.forEach((card) => {
    const glowCursor = document.createElement("div");
    glowCursor.className = "cursor-glow";
    glowCursor.style.cssText = `
      position: absolute;
      width: 20px;
      height: 20px;
      background: radial-gradient(circle, rgba(16, 185, 129, 0.6), transparent);
      border-radius: 50%;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.3s;
      z-index: 100;
    `;
    card.appendChild(glowCursor);

    card.addEventListener("mousemove", function (e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      glowCursor.style.left = x + "px";
      glowCursor.style.top = y + "px";
      glowCursor.style.opacity = "1";
    });

    card.addEventListener("mouseleave", function () {
      glowCursor.style.opacity = "0";
    });
  });

  // ===== 10. CONFETTI EFFECT ON BADGE CLICK =====
  const badges = document.querySelectorAll(".team-badge");

  badges.forEach((badge) => {
    badge.addEventListener("click", function (e) {
      e.stopPropagation();

      const colors = ["#10b981", "#064e3b", "#34d399", "#059669"];
      const card = badge.closest(".team-card");

      for (let i = 0; i < 30; i++) {
        const confetti = document.createElement("div");
        confetti.style.cssText = `
          position: absolute;
          width: 8px;
          height: 8px;
          background: ${colors[Math.floor(Math.random() * colors.length)]};
          top: ${badge.offsetTop}px;
          left: ${badge.offsetLeft}px;
          border-radius: 50%;
          pointer-events: none;
        `;

        card.appendChild(confetti);

        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 200 + 100;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;

        confetti.animate(
          [
            {
              transform: "translate(0, 0) scale(1)",
              opacity: 1,
            },
            {
              transform: `translate(${vx}px, ${vy}px) scale(0)`,
              opacity: 0,
            },
          ],
          {
            duration: 1000,
            easing: "cubic-bezier(0, .9, .57, 1)",
          }
        );

        setTimeout(() => {
          confetti.remove();
        }, 1000);
      }
    });
  });

  console.log("🎉 Team Advanced Animations Loaded!");
});
