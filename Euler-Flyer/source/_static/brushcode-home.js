(() => {
  const home = document.querySelector(".bc-home");
  const canvas = document.querySelector("#bc-field");
  const soundToggle = document.querySelector(".bc-sound-toggle");

  if (!home || !canvas) return;

  const ctx = canvas.getContext("2d");
  const pointer = { x: 0.5, y: 0.45, active: false };
  const particles = [];
  const filmFrames = [...document.querySelectorAll(".bc-frame")];
  let width = 0;
  let height = 0;
  let dpr = 1;
  let frame = 0;
  let scrollProgress = 0;
  let audioContext;
  let audioMaster;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const targetCount = Math.min(190, Math.max(90, Math.floor(width * height / 8800)));
    particles.length = 0;

    for (let i = 0; i < targetCount; i += 1) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 0.9 + 0.1,
        speed: Math.random() * 0.35 + 0.08,
        drift: Math.random() * Math.PI * 2,
        hue: Math.random() > 0.68 ? 82 : Math.random() > 0.44 ? 188 : 12,
      });
    }
  }

  function drawNebula() {
    const px = pointer.x * width;
    const py = pointer.y * height;
    const glow = ctx.createRadialGradient(px, py, 20, px, py, Math.max(width, height) * 0.62);
    glow.addColorStop(0, "rgba(104, 242, 255, 0.16)");
    glow.addColorStop(0.38, "rgba(155, 140, 255, 0.06)");
    glow.addColorStop(0.72, "rgba(255, 120, 93, 0.035)");
    glow.addColorStop(1, "rgba(3, 4, 6, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);
  }

  function drawParticles() {
    const px = pointer.x * width;
    const py = pointer.y * height;
    const scrollAngle = scrollProgress * Math.PI * 2;
    const centerX = width * 0.5;
    const centerY = height * 0.5;

    for (const particle of particles) {
      const orbitX = (particle.y - centerY) * Math.sin(scrollAngle) * 0.0009;
      const orbitY = (particle.x - centerX) * Math.cos(scrollAngle) * 0.0005;
      const dx = particle.x - px;
      const dy = particle.y - py;
      const distance = Math.max(1, Math.hypot(dx, dy));
      const influence = pointer.active ? Math.max(0, 1 - distance / 260) : 0;
      const wave = Math.sin(frame * 0.008 + particle.drift) * 0.55;

      particle.x += Math.cos(particle.drift + frame * 0.002) * particle.speed + dx * influence * 0.004 + orbitX;
      particle.y += particle.speed * (0.8 + particle.z) + wave * 0.08 + dy * influence * 0.004 + orbitY;

      if (particle.y > height + 24) particle.y = -24;
      if (particle.x < -24) particle.x = width + 24;
      if (particle.x > width + 24) particle.x = -24;

      const alpha = 0.16 + particle.z * 0.62 + influence * 0.32;
      ctx.beginPath();
      ctx.fillStyle = `hsla(${particle.hue}, 96%, 68%, ${alpha})`;
      ctx.arc(particle.x, particle.y, particle.z * 1.7 + influence * 1.6, 0, Math.PI * 2);
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

        if (distance < 105) {
          const alpha = (1 - distance / 105) * 0.12;
          ctx.strokeStyle = `rgba(220, 244, 255, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
  }

  function drawRings() {
    const cx = width * (0.68 + (pointer.x - 0.5) * 0.04);
    const cy = height * (0.45 + (pointer.y - 0.5) * 0.04);
    const base = Math.min(width, height) * 0.26;
    const scrollTurn = scrollProgress * Math.PI * 1.65;

    for (let i = 0; i < 3; i += 1) {
      const radius = base + i * 44 + Math.sin(frame * 0.012 + i) * 10;
      ctx.strokeStyle = `rgba(${i === 1 ? "214, 255, 111" : "104, 242, 255"}, ${0.12 - i * 0.025})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(cx, cy, radius * 1.08, radius * 0.58, -0.72 + scrollTurn, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  function animate() {
    frame += 1;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "rgba(3, 4, 6, 0.72)";
    ctx.fillRect(0, 0, width, height);
    drawNebula();
    drawRings();
    drawParticles();
    drawFilaments();
    requestAnimationFrame(animate);
  }

  function updateScrollMotion() {
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    scrollProgress = window.scrollY / maxScroll;
    const fieldSpin = (scrollProgress * 64).toFixed(3);
    const orbitSpin = (scrollProgress * 220).toFixed(3);
    const viewportCenter = window.innerHeight * 0.52;
    const isCompact = window.innerWidth < 640;
    const maxRotate = isCompact ? 24 : 58;
    const maxTranslateY = isCompact ? 46 : 120;
    const depthBase = isCompact ? -120 : -260;
    const depthRange = isCompact ? 160 : 300;

    document.documentElement.style.setProperty("--bc-field-spin", `${fieldSpin}deg`);
    document.documentElement.style.setProperty("--bc-orbit-spin", `${orbitSpin}deg`);
    document.documentElement.style.setProperty("--bc-scroll-shift", `${(scrollProgress * -120).toFixed(1)}px`);

    for (const frameElement of filmFrames) {
      const rect = frameElement.getBoundingClientRect();
      const frameCenter = rect.top + rect.height * 0.5;
      const distance = (frameCenter - viewportCenter) / window.innerHeight;
      const clamped = Math.max(-1.4, Math.min(1.4, distance));
      const presence = Math.max(0, 1 - Math.abs(clamped) / 1.35);
      const rotate = clamped * -maxRotate;
      const translateZ = depthBase + presence * depthRange;
      const translateY = clamped * maxTranslateY;
      const scale = (isCompact ? 0.96 : 0.9) + presence * (isCompact ? 0.04 : 0.1);
      const opacity = (isCompact ? 0.54 : 0.34) + presence * (isCompact ? 0.46 : 0.66);
      const blur = Math.max(0, Math.abs(clamped) - 0.9) * (isCompact ? 1.5 : 4);

      frameElement.style.setProperty("--bc-frame-rotate", `${rotate.toFixed(3)}deg`);
      frameElement.style.setProperty("--bc-frame-z", `${translateZ.toFixed(1)}px`);
      frameElement.style.setProperty("--bc-frame-y", `${translateY.toFixed(1)}px`);
      frameElement.style.setProperty("--bc-frame-scale", scale.toFixed(3));
      frameElement.style.setProperty("--bc-frame-rail-opacity", (0.12 + presence * 0.44).toFixed(3));
      frameElement.style.opacity = opacity.toFixed(3);
      frameElement.style.filter = `blur(${blur.toFixed(2)}px)`;
    }
  }

  function createAmbientSound() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    audioMaster = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();
    const delay = audioContext.createDelay();
    const feedback = audioContext.createGain();

    audioMaster.gain.value = 0.0001;
    filter.type = "lowpass";
    filter.frequency.value = 820;
    filter.Q.value = 0.9;
    delay.delayTime.value = 0.42;
    feedback.gain.value = 0.28;

    delay.connect(feedback);
    feedback.connect(delay);
    delay.connect(audioMaster);
    filter.connect(delay);
    filter.connect(audioMaster);
    audioMaster.connect(audioContext.destination);

    [55, 82.41, 110, 146.83].forEach((frequency, index) => {
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      const pan = audioContext.createStereoPanner();
      const lfo = audioContext.createOscillator();
      const lfoGain = audioContext.createGain();

      oscillator.type = index % 2 ? "triangle" : "sine";
      oscillator.frequency.value = frequency;
      gain.gain.value = 0.045;
      pan.pan.value = index % 2 ? 0.42 : -0.42;
      lfo.frequency.value = 0.04 + index * 0.017;
      lfoGain.gain.value = 5 + index * 1.5;

      lfo.connect(lfoGain);
      lfoGain.connect(oscillator.frequency);
      oscillator.connect(gain);
      gain.connect(pan);
      pan.connect(filter);
      oscillator.start();
      lfo.start();
    });
  }

  async function toggleSound() {
    if (!audioContext) createAmbientSound();

    if (audioContext.state === "suspended") {
      await audioContext.resume();
    }

    const isPlaying = soundToggle.classList.toggle("is-playing");
    soundToggle.setAttribute("aria-pressed", String(isPlaying));
    soundToggle.setAttribute("aria-label", isPlaying ? "关闭环境音" : "开启环境音");

    const now = audioContext.currentTime;
    audioMaster.gain.cancelScheduledValues(now);
    audioMaster.gain.setValueAtTime(Math.max(audioMaster.gain.value, 0.0001), now);
    audioMaster.gain.exponentialRampToValueAtTime(isPlaying ? 0.24 : 0.0001, now + 0.8);
  }

  window.addEventListener("resize", () => {
    resize();
    updateScrollMotion();
  });
  window.addEventListener("scroll", updateScrollMotion, { passive: true });
  window.addEventListener("pointermove", event => {
    pointer.x = event.clientX / Math.max(1, width);
    pointer.y = event.clientY / Math.max(1, height);
    pointer.active = true;
  });
  window.addEventListener("pointerleave", () => {
    pointer.active = false;
  });

  if (soundToggle) soundToggle.addEventListener("click", toggleSound);

  resize();
  updateScrollMotion();
  animate();
})();
