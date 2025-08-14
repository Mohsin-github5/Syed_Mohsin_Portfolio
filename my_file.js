// script.js

document.addEventListener("DOMContentLoaded", function() {
  // Initialize Particles.js
  particlesJS("particles-js", {
    "particles": {
      "number": {
        "value": 80,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#00f7ff"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#00f7ff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 2,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "grab"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 140,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  });

  // Smooth scrolling for anchor links
  const scrollLinks = document.querySelectorAll("a[href^='#']");
  
  scrollLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: "smooth"
        });
      }
    });
  });

  // Header scroll effect
  const header = document.querySelector("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Theme switcher
  const themeSwitch = document.querySelector("#toggle-theme");
  const themeIcon = document.querySelector(".theme-icon i");
  
  themeSwitch.addEventListener("change", () => {
    document.body.setAttribute("data-theme", themeSwitch.checked ? "light" : "dark");
    themeIcon.className = themeSwitch.checked ? "fas fa-sun" : "fas fa-moon";
    
    // Save theme preference
    localStorage.setItem("theme", themeSwitch.checked ? "light" : "dark");
  });

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme") || "dark";
  if (savedTheme === "light") {
    themeSwitch.checked = true;
    document.body.setAttribute("data-theme", "light");
    themeIcon.className = "fas fa-sun";
  }

  // Animate skill bars on scroll
  const skillBars = document.querySelectorAll(".skill-level");
  
  function animateSkillBars() {
    skillBars.forEach(bar => {
      const level = bar.getAttribute("data-level");
      bar.style.width = level + "%";
    });
  }

  // Initialize GSAP animations
  gsap.registerPlugin(ScrollTrigger);
  
  // Animate elements on scroll
  gsap.utils.toArray(".skill-card, .service-card, .certificate-card").forEach(card => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power2.out"
    });
  });

  // Animate stats counting
  const statNumbers = document.querySelectorAll(".stat-number");
  
  statNumbers.forEach(stat => {
    const target = parseInt(stat.getAttribute("data-count"));
    const duration = 2000;
    const startTime = Date.now();
    
    const updateCount = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(progress * target);
      
      stat.textContent = value;
      
      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        stat.textContent = target;
      }
    };
    
    ScrollTrigger.create({
      trigger: stat,
      start: "top 80%",
      onEnter: updateCount
    });
  });

  // Initialize VanillaTilt for skill cards
  if (document.querySelector(".skill-card")) {
    VanillaTilt.init(document.querySelectorAll(".skill-card"), {
      max: 15,
      speed: 400,
      glare: true,
      "max-glare": 0.2,
    });
  }

  // FAB functionality
  const fabMain = document.querySelector(".fab-main");
  const fabContainer = document.querySelector(".fab-container");
  
  if (fabMain) {
    fabMain.addEventListener("click", () => {
      fabContainer.classList.toggle("active");
    });
  }

  // Certificate flip functionality
  const certificateCards = document.querySelectorAll(".certificate-card");
  
  certificateCards.forEach(card => {
    const frontBtn = card.querySelector(".certificate-front .btn");
    const backBtn = card.querySelector(".certificate-back .btn");
    
    if (frontBtn) {
      frontBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        card.classList.add("flipped");
      });
    }
    
    if (backBtn) {
      backBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        card.classList.remove("flipped");
      });
    }
  });

  // Animate skill bars when section comes into view
  const skillsSection = document.querySelector("#skills");
  
  if (skillsSection) {
    ScrollTrigger.create({
      trigger: skillsSection,
      start: "top 80%",
      onEnter: animateSkillBars
    });
  }

  // Form submission
  const contactForm = document.querySelector(".contact-form");
  
  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();
      
      // Get form values
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);
      
      // Here you would typically send the data to a server
      console.log("Form submitted:", data);
      
      // Show success message
      alert("Thank you for your message! I'll get back to you soon.");
      this.reset();
    });
  }
});