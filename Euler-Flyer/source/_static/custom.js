(() => {
  let hasStoredTheme = false;

  try {
    hasStoredTheme = Boolean(window.localStorage.getItem("theme") || window.localStorage.getItem("mode"));
  } catch {
    hasStoredTheme = false;
  }

  if (!hasStoredTheme) {
    document.documentElement.dataset.mode = "dark";
    document.documentElement.dataset.theme = "dark";
  }

  function initAmbientField() {
  if (document.documentElement.classList.contains("bc-home-page") || document.querySelector(".bc-home")) return;
  if (!document.body || document.querySelector(".ef-ambient-field")) return;

  const canvas = document.createElement("canvas");
  canvas.className = "ef-ambient-field";
  canvas.setAttribute("aria-hidden", "true");
  document.body.prepend(canvas);

  const ctx = canvas.getContext("2d");
  const pointer = { x: 0.5, y: 0.45, active: false };
  const particles = [];
  let width = 0;
  let height = 0;
  let dpr = 1;
  let frame = 0;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const targetCount = Math.min(110, Math.max(48, Math.floor((width * height) / 15000)));
    particles.length = 0;

    for (let i = 0; i < targetCount; i += 1) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 0.9 + 0.1,
        speed: Math.random() * 0.18 + 0.045,
        drift: Math.random() * Math.PI * 2,
        hue: Math.random() > 0.68 ? 82 : Math.random() > 0.44 ? 188 : 12,
      });
    }
  }

  function drawGlow() {
    const px = pointer.x * width;
    const py = pointer.y * height;
    const glow = ctx.createRadialGradient(px, py, 20, px, py, Math.max(width, height) * 0.58);
    glow.addColorStop(0, "rgba(104, 242, 255, 0.12)");
    glow.addColorStop(0.42, "rgba(155, 140, 255, 0.045)");
    glow.addColorStop(0.76, "rgba(255, 120, 93, 0.025)");
    glow.addColorStop(1, "rgba(3, 4, 6, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);
  }

  function drawParticles() {
    const px = pointer.x * width;
    const py = pointer.y * height;

    for (const particle of particles) {
      const dx = particle.x - px;
      const dy = particle.y - py;
      const distance = Math.max(1, Math.hypot(dx, dy));
      const influence = pointer.active ? Math.max(0, 1 - distance / 260) : 0;
      const wave = Math.sin(frame * 0.006 + particle.drift) * 0.35;

      particle.x += Math.cos(particle.drift + frame * 0.0015) * particle.speed + dx * influence * 0.002;
      particle.y += particle.speed * (0.72 + particle.z) + wave * 0.06 + dy * influence * 0.002;

      if (particle.y > height + 24) particle.y = -24;
      if (particle.x < -24) particle.x = width + 24;
      if (particle.x > width + 24) particle.x = -24;

      const alpha = 0.12 + particle.z * 0.42 + influence * 0.22;
      ctx.beginPath();
      ctx.fillStyle = `hsla(${particle.hue}, 96%, 68%, ${alpha})`;
      ctx.arc(particle.x, particle.y, particle.z * 1.45 + influence, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawFilaments() {
    ctx.lineWidth = 1;

    for (let i = 0; i < particles.length; i += 1) {
      const a = particles[i];
      for (let j = i + 1; j < particles.length; j += 1) {
        const b = particles[j];
        const distance = Math.hypot(a.x - b.x, a.y - b.y);

        if (distance < 118) {
          const alpha = (1 - distance / 118) * 0.08;
          ctx.strokeStyle = `rgba(220, 244, 255, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    frame += 1;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "rgba(3, 4, 6, 0.7)";
    ctx.fillRect(0, 0, width, height);
    drawGlow();
    drawParticles();
    drawFilaments();
    requestAnimationFrame(animate);
  }

  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", event => {
    pointer.x = event.clientX / Math.max(1, width);
    pointer.y = event.clientY / Math.max(1, height);
    pointer.active = true;
  });
  window.addEventListener("pointerleave", () => {
    pointer.active = false;
  });

  resize();
  animate();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAmbientField, { once: true });
  } else {
    initAmbientField();
  }
})();
