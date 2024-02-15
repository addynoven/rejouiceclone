function scrollTrigger() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
scrollTrigger();

var playerCloser = document.querySelector(".nav .player-close");
var menu = document.querySelector(".menu");
var menuButton = document.querySelector(".menu-button");
var menuCloser = document.querySelector("#menu-closer");
var playReel = document.querySelector(".play-reel");
var follower = document.querySelector("#follower");
var page1 = document.querySelector(".page1-content");
var main = document.querySelector("#main");
var elem = document.querySelector(".elem");
var page6 = document.querySelector(".page6");
var svg1 = document.querySelector("#svg1");
var page6Follower = document.querySelector(".page6-follower");

// Cursor Follower

let mm1024 = window.matchMedia("(min-width: 1200px)");

function handleMediaChange(e) {
  if (e.matches) {
    // Media query matches, add your cursor effect or other code here
    if (window.innerWidth >= 1200) {
      cursorEffect();
      reelPlayer();
      reelCloser();
      rejouiceAnimation();
      page2Animation();
      page3Animation();
      page5Animation();
      page7Animation();
      page8Animation();
      page6Cursor();
      page6mouse();
      // menuToggle();
    }
  }
}

mm1024.addListener(handleMediaChange);

function loader() {
  var tl = gsap.timeline();

  tl.from("#loader h3", {
    x: 100,
    opacity: 0,
    duration: 0.7,
    stagger: 0.2,
  });

  tl.to("#loader h3", {
    opacity: 0,
    duration: 0.7,
    stagger: 0.2,
  });

  tl.to("#loader", {
    display: "none",
    duration: 0.7,
    onComplete: () => {
      // Trigger handleMediaChange for mm1024 after the loader is complete
      handleMediaChange(mm1024);
    },
  });
}
loader();

function menuToggle() {
  menuButton.addEventListener("click", () => {
    menu.style.top = 0;
  });
  menuCloser.addEventListener("click", () => {
    menu.style.top = "-100%";
  });
}
menuToggle()

let previousWidth = window.innerWidth;

window.onresize = function() {
  // Check if the width has changed along the x-axis
  if (Math.abs(window.innerWidth - previousWidth) > 0) {
    // Reload the page
    location.reload();
  }
  // Update the previous width
  previousWidth = window.innerWidth;
};


function cursorEffect() {
  document.addEventListener("mousemove", function (dets) {
    gsap.to(follower, {
      x: dets.x,
      y: dets.y,
    });
  });

  page1.addEventListener("mouseenter", () => {
    gsap.to(follower, {
      scale: 1,
      opacity: 1,
      duration: 0.1,
    });
  });

  page1.addEventListener("mouseleave", () => {
    gsap.to(follower, {
      scale: 0,
      opacity: 0,
      duration: 0.1,
    });
  });
}

function page6Cursor() {
  document.addEventListener("mousemove", function (dets1) {
    gsap.to(page6Follower, {
      x: dets1.x,
      y: dets1.y,
    });
  });
}
// page6Cursor();

function page6mouse() {
  svg1.addEventListener("mouseenter", () => {
    console.log("mouse entered");
    gsap.to(page6Follower, {
      scale: 1,
      opacity: 1,
      duration: 0.1,
    });
  });

  svg1.addEventListener("mouseleave", () => {
    gsap.to(page6Follower, {
      scale: 0,
      opacity: 0,
      duration: 0.1,
    });
  });
}

// page6mouse();

function reelPlayer() {
  page1.addEventListener("click", () => {
    playReel.style.left = "0";
    playReel.style.width = "100vw";
    playReel.style.transition = "1s ease-in-out";
    follower.style.display = "none";
    videoReel.currentTime = 0;
  });
}
reelPlayer();

var videoReel = document.querySelector("#video-reel");

function hideReel() {
  gsap.to(playReel, {
    left: "-100%",
    duration: 0.1, // Adjust the duration as needed
  });

  gsap.to(follower, {
    display: "flex",
    scale: 1,
  });
}

function reelCloser() {
  playerCloser.addEventListener("click", () => {
    videoReel.muted = true;
    hideReel();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      videoReel.muted = true;
      hideReel();
    }
  });
}
reelCloser();

function rejouiceAnimation() {
  gsap.from("#rejouice h1 span", {
    // Corrected selector
    y: 130,
    opacity: 0,
    stagger: 0.1,
    duration: 0.5,
  });
}

function page2Animation() {
  gsap.from(".elem h1 ", {
    y: 130,
    opacity: 0,
    stagger: 0.2,
    duration: 2,
    scrollTrigger: {
      trigger: ".page2",
      scroller: "#main",
      start: "top 70%",
      end: "top 45%",
      // markers: true,
      scrub: 2,
    },
  });

  gsap.from(".header h2", {
    y: 150,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: ".page2",
      scroller: "#main",
      start: "top 90%",
      end: "top 70%",
      // markers: true,
      scrub: 2,
    },
  });

  gsap.from(".header h3", {
    y: 150,
    opacity: 0,
    stagger: 0.2,
    duration: 1,
    scrollTrigger: {
      trigger: ".page2",
      scroller: "#main",
      start: "top 90%",
      end: "top 70%",
      // markers: true,
      scrub: 2,
    },
  });

  // page2 part2 text reveal
}


function page3Animation() {
  gsap.from(".part2-stagger a h1", {
    y: 130,
    opacity: 0,
    stagger: 1,
    duration: 1,
    scrollTrigger: {
      trigger: ".page3",
      scroller: "#main",
      start: "top 60%",
      end: "top 55%",
      // markers: true,
      scrub: 2,
    },
  });
}

function page5Animation() {
  gsap.from(".elem5 h1 ", {
    y: 130,
    opacity: 0,
    stagger: 0.2,
    duration: 2,
    scrollTrigger: {
      trigger: ".page5",
      scroller: "#main",
      start: "top 70%",
      end: "top 45%",
      // markers: true,
      scrub: 2,
    },
  });

  gsap.from(".header5 h3", {
    y: 150,
    opacity: 0,
    stagger: 0.2,
    duration: 1,
    scrollTrigger: {
      trigger: ".page5",
      scroller: "#main",
      start: "top 90%",
      end: "top 70%",
      // markers: true,
      scrub: 2,
    },
  });

  gsap.from(".header5 h2", {
    y: 150,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: ".page5",
      scroller: "#main",
      start: "top 90%",
      end: "top 70%",
      // markers: true,
      scrub: 2,
    },
  });
}

function page7Animation() {
  gsap.from(".elem7 h1 ", {
    y: 130,
    opacity: 0,
    stagger: 0.2,
    duration: 2,
    scrollTrigger: {
      trigger: ".page7",
      scroller: "#main",
      start: "top 70%",
      end: "top 45%",
      // markers: true,
      scrub: 2,
    },
  });

  gsap.from(".header7 h3", {
    y: 150,
    opacity: 0,
    stagger: 0.2,
    duration: 1,
    scrollTrigger: {
      trigger: ".page7",
      scroller: "#main",
      start: "top 90%",
      end: "top 70%",
      // markers: true,
      scrub: 2,
    },
  });

  gsap.from(".header7 h2", {
    y: 150,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: ".page7",
      scroller: "#main",
      start: "top 90%",
      end: "top 70%",
      // markers: true,
      scrub: 2,
    },
  });
}

function page8Animation() {
  gsap.from(".page8-stagger a h1", {
    y: 130,
    opacity: 0,
    stagger: 1,
    duration: 1,
    scrollTrigger: {
      trigger: ".page8",
      scroller: "#main",
      start: "top 60%",
      end: "top 55%",
      // markers: true,
      scrub: 2,
    },
  });
}

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  speed: 7000,
  autoplay: {
    disableOnInteraction: "true",
  },
});

var videocard1 = document.getElementById("videocard1");
var videocard2 = document.getElementById("videocard2");
var videocard3 = document.getElementById("videocard3");
var video1 = document.getElementById("video1");
var video2 = document.getElementById("video2");
var video3 = document.getElementById("video3");

function videocardHover() {
  videocard1.addEventListener("mouseenter", () => {
    playVideo(video1);
  });

  videocard2.addEventListener("mouseenter", () => {
    playVideo(video2);
  });

  videocard3.addEventListener("mouseenter", () => {
    playVideo(video3);
  });

  function playVideo(video) {
    if (video) {
      video.currentTime = 0; // Set the current time to 0
      video.play(); // Play the video
    }
  }
}

videocardHover();
