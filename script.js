const nav = document.getElementById("main-nav");
const toggle = document.querySelector(".menu-toggle");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

const currentPage = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".site-nav a").forEach((link) => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});

const revealElements = document.querySelectorAll(".reveal");
revealElements.forEach((item, index) => {
  item.style.setProperty("--delay", `${Math.min(index * 70, 280)}ms`);
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((item) => observer.observe(item));
} else {
  revealElements.forEach((item) => item.classList.add("visible"));
}

document.querySelectorAll(".year").forEach((el) => {
  el.textContent = new Date().getFullYear();
});

const contactForm = document.getElementById("contact-form");
if (contactForm) {
  const status = document.getElementById("form-status");
  const ownerWhatsappNumber = contactForm.dataset.whatsappNumber || "919000012345";

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const bike = String(formData.get("bike") || "").trim();
    const service = String(formData.get("service") || "").trim();
    const issue = String(formData.get("message") || "").trim();

    if (!name || !phone) {
      status.textContent = "Please enter your name and phone number.";
      status.className = "form-status error";
      return;
    }

    const whatsappMessage = [
      "Hello NewGen Smart Garage, I want to book a service request.",
      "",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Bike Model: ${bike || "Not specified"}`,
      `Service Needed: ${service || "Not specified"}`,
      `Issue: ${issue || "Not specified"}`
    ].join("\n");

    const whatsappUrl = `https://wa.me/${ownerWhatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    status.textContent = "Opening WhatsApp with your request...";
    status.className = "form-status success";
    window.location.href = whatsappUrl;
  });
}
