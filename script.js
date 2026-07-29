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
    image: "./color-starlight-v2.png",
    alt: "星光白 Pro1 Mini 单品展示",
    dark: false,
  },
  {
    label: "Velvet",
    name: "丝绒黑",
    finish: "低调的深色轮廓，衬出细腻金属光泽。",
    image: "./color-velvet-v2.png",
    alt: "丝绒黑 Pro1 Mini 单品展示",
    dark: true,
  },
  {
    label: "Mist",
    name: "冷雾紫",
    finish: "一抹克制的雾紫，让随身清凉更有风格。",
    image: "./color-mist-v2.png",
    alt: "冷雾紫 Pro1 Mini 单品展示",
    dark: false,
  },
];

const designPrinciples = [
  {
    label: "COMPACT",
    title: "30% 更精简",
    note: "缩小体积，不缩减风感。日常随身的比例被重新计算。",
  },
  {
    label: "PRECISE",
    title: "01—100 连续调节",
    note: "滚轮控制让风不再只有强弱，而是准确停在舒服的位置。",
  },
  {
    label: "EVERYDAY",
    title: "180g 轻松随行",
    note: "一手拿起，放进小包，让清凉自然进入通勤与旅行。",
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
const colorImage = document.querySelector("#color-product-image");
const colorSection = document.querySelector("#colors");

colorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const color = colorways[Number(button.dataset.color)];
    colorLabel.textContent = color.label;
    colorName.textContent = color.name;
    colorFinish.textContent = color.finish;
    colorImage.src = color.image;
    colorImage.alt = color.alt;
    colorSection.classList.toggle("is-dark", color.dark);

    colorButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
  });
});

const statementSection = document.querySelector(".brand-statement");
const statementProduct = document.querySelector(".statement-product");
const principleButtons = document.querySelectorAll("[data-principle]");
const principleLabel = document.querySelector("#principle-label");
const principleTitle = document.querySelector("#principle-title");
const principleNote = document.querySelector("#principle-note");

function selectPrinciple(index) {
  const principle = designPrinciples[index];
  principleLabel.textContent = principle.label;
  principleTitle.textContent = principle.title;
  principleNote.textContent = principle.note;

  principleButtons.forEach((button) => {
    const active = Number(button.dataset.principle) === index;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

principleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectPrinciple(Number(button.dataset.principle));
  });
});

statementSection?.addEventListener("pointermove", (event) => {
  if (!statementProduct || reducedMotion) return;
  const rect = statementSection.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;
  statementProduct.style.transform =
    `translate3d(${x * 16}px, ${y * 12}px, 0) rotate(${x * 2.2}deg)`;
});

statementSection?.addEventListener("pointerleave", () => {
  if (statementProduct) statementProduct.style.transform = "";
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
