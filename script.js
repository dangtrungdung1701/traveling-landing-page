const header = document.querySelector(".header");
const hero = document.querySelector(".hero");
const bookingTour = document.querySelector(".booking-tour");
const slide = document.querySelector(".slide");
const scrollTop = document.querySelector(".scroll-top");

window.addEventListener("scroll", () => {
  let scroll = window.scrollY;

  if (scroll + header.offsetHeight > hero.offsetHeight) {
    header.classList.add("overlay");
  } else {
    header.classList.remove("overlay");
  }
});

window.addEventListener("scroll", () => {
  let scroll = window.scrollY;

  if (scroll > hero.offsetHeight) {
    scrollTop.classList.add("show");
  } else {
    scrollTop.classList.remove("show");
  }
});
scrollTop.addEventListener("click", () => {
  window.scrollTo(0, 0);
});
const show = (data) => {
  data.forEach((item, index) => {
    const slide = document.querySelector(".slide");
    let node = document.createElement("div");
    node.className = "slide-item";
    node.innerHTML = `<img src="./images/booking-tour/${item.img}" alt="img${index}">
    <div class="img-content">
    <span class="booking">BOOKING</span>
    <span class="tour">Tour</span>
    </div>`;
    slide.append(node);
  });
  slideItem();
};

fetch("http://localhost:3000/images")
  .then((response) => {
    return response.json();
  })
  .then((data) => show(data));
function slideItem() {
  let slideItems = document.querySelectorAll(".slide-item");

  let index = 2;
  var mySlide;
  const slideItemMargin = parseInt(getComputedStyle(slideItems[1]).marginRight);
  const slideItemWidth = slideItems[index].clientWidth;
  slideItems.forEach((item) => {
    item.classList.remove("active");
  });
  slideItems[index].classList.add("active");
  const stopSlider = () => {
    clearInterval(mySlide);
  };

  const startSlider = () => {
    mySlide = setInterval(() => {
      index++;
      if (index > slideItems.length - 1) {
        index = 0;
      }
      slide.style.transform = `translateX(${-(
        slideItemWidth + slideItemMargin
      )}px)`;
      slideItems.forEach((item) => {
        item.classList.remove("active");
      });
      slideItems[index].classList.add("active");
      setTimeout(() => {
        slide.append(slide.firstElementChild);
        slide.style.transition = "none";
        slide.style.transform = "translateX(0)";
        setTimeout(() => {
          slide.style.transition = "all 0.5s ease-in-out";
        }, 100);
      }, 500);
    }, 3000);
  };

  const doSlide = () => {
    startSlider();
    slideItems.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        stopSlider();
      });
      item.addEventListener("mouseleave", () => {
        startSlider();
      });
    });
  };
  doSlide();
}
