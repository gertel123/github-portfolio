/* -----------------------------------------
  Have focus outline only for keyboard users 
 ---------------------------------------- */

const handleFirstTab = (e) => {
  if(e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing')

    window.removeEventListener('keydown', handleFirstTab)
    window.addEventListener('mousedown', handleMouseDownOnce)
  }

}

const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing')

  window.removeEventListener('mousedown', handleMouseDownOnce)
  window.addEventListener('keydown', handleFirstTab)
}

window.addEventListener('keydown', handleFirstTab)

const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

let alterStyles = (isBackToTopRendered) => {
  backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
  backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
  backToTopButton.style.transform = isBackToTopRendered
    ? "scale(1)"
    : "scale(0)";
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 700) {
    isBackToTopRendered = true;
    alterStyles(isBackToTopRendered);
  } else {
    isBackToTopRendered = false;
    alterStyles(isBackToTopRendered);
  }
});

// Fade effects start
document.addEventListener("DOMContentLoaded", function() {
  const faders = document.querySelectorAll('.fade-in');

  const appearOptions = {
    threshold: 0.2
  };

  const appearOnScroll = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        // return;
      } else {
        // entry.target.classList.add("show");
        // observer.unobserve(entry.target);
        entry.target.classList.remove("show");
      }
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });
});
// fade effects end

// Carousel start
document.addEventListener("DOMContentLoaded", () => {
  // Hanapin lahat ng carousel container
  document.querySelectorAll(".carousel").forEach(carousel => {
    const slides = carousel.querySelectorAll(".slide");
    const prevBtn = carousel.querySelector(".prev");
    const nextBtn = carousel.querySelector(".next");
    let index = 0;

    function showSlide(i) {
      slides.forEach((slide, idx) => {
        slide.classList.remove("active");
        if (idx === i) slide.classList.add("active");
      });
    }

    // Next button
    nextBtn.addEventListener("click", () => {
      index = (index + 1) % slides.length;
      showSlide(index);
    });

    // Prev button
    prevBtn.addEventListener("click", () => {
      index = (index - 1 + slides.length) % slides.length;
      showSlide(index);
    });

    // Start with first slide
    showSlide(index);

    // Auto slide every 5 seconds (per carousel)
    setInterval(() => {
      index = (index + 1) % slides.length;
      showSlide(index);
    }, 5000);
  });
});

// If you select one of the image in the carousels it will popup
const images = document.querySelectorAll('.carousel img'); // lahat ng carousel images
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.lightbox .close');
const prevBtn = document.querySelector('.lightbox .prev');
const nextBtn = document.querySelector('.lightbox .next');

let currentIndex = 0;

// Open lightbox
images.forEach((img, index) => {
  img.addEventListener('click', () => {
    lightbox.classList.add('show');
    lightboxImg.src = img.src;
    currentIndex = index;
  });
});

// Close button
closeBtn.addEventListener('click', () => {
  lightbox.classList.remove('show');
});

// Next button
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % images.length;
  lightboxImg.src = images[currentIndex].src;
});

// Prev button
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  lightboxImg.src = images[currentIndex].src;
});

// Carousel Caption
const captionBox = document.getElementById("carousel-caption");

function updateCaption(index) {
  captionBox.textContent = images[index].alt;
}

// initialize caption
updateCaption(currentIndex);

// update on next/prev
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  showSlide(currentIndex);
  updateCaption(currentIndex);
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showSlide(currentIndex);
  updateCaption(currentIndex);
});

// Carousel End
