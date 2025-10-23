// ========================================
// PRICING CARDS - ADVANCED ANIMATIONS
// ========================================

document.addEventListener("DOMContentLoaded", function () {
  console.log("🎨 Pricing Cards Animations Loading...");

  const pricingCards = document.querySelectorAll(".pricing-card");

  if (pricingCards.length === 0) {
    console.warn("⚠️ No pricing cards found!");
    return;
  }

  console.log(`✅ Found ${pricingCards.length} pricing cards`);

  // ===== 1. CREATE PARTICLES FOR EACH CARD =====
  pricingCards.forEach((card, index) => {
    const particlesContainer = document.createElement("div");
    particlesContainer.className = "pricing-particles";
    card.appendChild(particlesContainer);

    // Create 8 particles per card
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";

      // Random size
      const size = Math.random() * 6 + 3; // 3-9px
      particle.style.width = size + "px";
      particle.style.height = size + "px";

      // Random position
      particle.style.left = Math.random() * 100 + "%";
      particle.style.top = Math.random() * 100 + "%";

      // Random animation delay
      particle.style.animationDelay = Math.random() * 4 + "s";
      particle.style.animationDuration = Math.random() * 2 + 3 + "s";

      // Color based on card type
      if (card.classList.contains("pricing-card-bronze")) {
        particle.style.background = "rgba(255, 255, 255, 0.6)";
      } else if (card.classList.contains("pricing-card-silver")) {
        particle.style.background = "rgba(255, 255, 255, 0.8)";
      } else if (card.classList.contains("pricing-card-gold")) {
        particle.style.background = "rgba(255, 255, 255, 0.9)";
      }

      particlesContainer.appendChild(particle);
    }
  });

  // ===== 2. PULSE ANIMATION ON SCROLL INTO VIEW =====
  const observerOptions = {
    threshold: 0.3,
    rootMargin: "0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("pulse");
        setTimeout(() => {
          entry.target.classList.remove("pulse");
        }, 1000);
      }
    });
  }, observerOptions);

  pricingCards.forEach((card) => {
    observer.observe(card);
  });

  // ===== 3. 3D TILT EFFECT ON MOUSE MOVE =====
  pricingCards.forEach((card) => {
    card.addEventListener("mousemove", function (e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `
        perspective(1000px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg) 
        translateY(-12px) 
        scale(1.02)
      `;
    });

    card.addEventListener("mouseleave", function () {
      card.style.transform = "";
    });
  });

  // ===== 4. RIPPLE EFFECT ON CLICK =====
  pricingCards.forEach((card) => {
    card.addEventListener("click", function (e) {
      const ripple = document.createElement("div");
      ripple.style.position = "absolute";
      ripple.style.borderRadius = "50%";
      ripple.style.background = "rgba(255, 255, 255, 0.6)";
      ripple.style.width = "10px";
      ripple.style.height = "10px";
      ripple.style.pointerEvents = "none";
      ripple.style.zIndex = "100";

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.style.transform = "translate(-50%, -50%)";

      card.appendChild(ripple);

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
        if (ripple.parentNode) {
          ripple.remove();
        }
      }, 800);
    });
  });

  // ===== 5. PRICE COUNTER ANIMATION =====
  const priceElements = document.querySelectorAll(".pricing-price");

  priceElements.forEach((priceEl) => {
    const targetPrice = parseInt(priceEl.textContent.replace(/[^0-9]/g, ""));
    let currentPrice = 0;
    const duration = 1500; // 1.5 seconds
    const increment = targetPrice / (duration / 16);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && currentPrice === 0) {
            const counter = setInterval(() => {
              currentPrice += increment;
              if (currentPrice >= targetPrice) {
                currentPrice = targetPrice;
                clearInterval(counter);
              }
              priceEl.textContent = "$ " + Math.floor(currentPrice);
            }, 16);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(priceEl);
  });

  // ===== 6. BUTTON SPARKLE EFFECT =====
  const buttons = document.querySelectorAll(".pricing-button");

  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement("div");
        sparkle.style.cssText = `
          position: absolute;
          width: 4px;
          height: 4px;
          background: white;
          border-radius: 50%;
          pointer-events: none;
          z-index: 101;
        `;

        const rect = button.getBoundingClientRect();
        sparkle.style.left = Math.random() * rect.width + "px";
        sparkle.style.top = Math.random() * rect.height + "px";

        button.appendChild(sparkle);

        sparkle.animate(
          [
            {
              transform: "translate(0, 0) scale(1)",
              opacity: 1,
            },
            {
              transform: `translate(${Math.random() * 40 - 20}px, ${
                Math.random() * 40 - 20
              }px) scale(0)`,
              opacity: 0,
            },
          ],
          {
            duration: 800,
            easing: "ease-out",
          }
        );

        setTimeout(() => {
          if (sparkle.parentNode) {
            sparkle.remove();
          }
        }, 800);
      }
    });
  });

  // ===== 7. RECOMMENDED BADGE PULSE =====
  const recommendedBadge = document.querySelector(".pricing-badge");

  if (recommendedBadge) {
    setInterval(() => {
      recommendedBadge.animate(
        [
          { transform: "scale(1)", opacity: 1 },
          { transform: "scale(1.1)", opacity: 0.9 },
          { transform: "scale(1)", opacity: 1 },
        ],
        {
          duration: 1000,
          easing: "ease-in-out",
        }
      );
    }, 3000);
  }

  console.log("🎉 Pricing Cards Animations Loaded Successfully!");
});
