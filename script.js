const windDescriptions = {
  light: "轻柔微风，适合安静阅读与室内办公。",
  daily: "清爽送风，为日常通勤留出舒适余量。",
  strong: "强劲风感，应对户外行走与闷热天气。",
};

const colorways = [
  {
    label: "Starlight",
    name: "星光白",
    finish: "清透、安静，像晨光落在银器上。",
  },
  {
    label: "Velvet",
    name: "丝绒黑",
    finish: "低调的深色轮廓，衬出细腻金属光泽。",
  },
  {
    label: "Mist",
    name: "冷雾紫",
    finish: "一抹克制的雾紫，让随身清凉更有风格。",
  },
];

function describeWind(level) {
  if (level <= 30) return windDescriptions.light;
  if (level <= 70) return windDescriptions.daily;
  return windDescriptions.strong;
}

const windSlider = document.querySelector("#wind-level");
const windNumber = document.querySelector("#wind-number");
const windDescription = document.querySelector("#wind-description");
const windPercent = document.querySelector("#wind-percent");

windSlider?.addEventListener("input", (event) => {
  const level = Number(event.currentTarget.value);
  const description = describeWind(level);
  windNumber.textContent = String(level).padStart(2, "0");
  windDescription.textContent = description;
  windPercent.textContent = `${level}%`;
  windSlider.setAttribute("aria-valuetext", `${level} 档，${description}`);
});

const aromaSection = document.querySelector("#aroma");
const aromaStatus = document.querySelector(".aroma-status");
const aromaButtons = document.querySelectorAll("[data-aroma]");

aromaButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const isOn = button.dataset.aroma === "on";
    aromaSection?.classList.toggle("is-aroma-on", isOn);
    aromaStatus.textContent = isOn
      ? "扩香模式：香片随气流释放淡雅气息"
      : "纯净模式：取下扩香舱，保留清爽送风";

    aromaButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
  });
});

const colorButtons = document.querySelectorAll("[data-color]");
const colorLabel = document.querySelector("#color-label");
const colorName = document.querySelector("#color-name");
const colorFinish = document.querySelector("#color-finish");

colorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const color = colorways[Number(button.dataset.color)];
    colorLabel.textContent = color.label;
    colorName.textContent = color.name;
    colorFinish.textContent = color.finish;

    colorButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
  });
});

const revealElements = document.querySelectorAll("[data-reveal]");
const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

if (reducedMotion || !("IntersectionObserver" in window)) {
  revealElements.forEach((element) => element.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 },
  );

  revealElements.forEach((element) => observer.observe(element));
}

function updateProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  document.documentElement.style.setProperty(
    "--page-progress",
    String(max > 0 ? window.scrollY / max : 0),
  );
}

updateProgress();
window.addEventListener("scroll", updateProgress, { passive: true });
