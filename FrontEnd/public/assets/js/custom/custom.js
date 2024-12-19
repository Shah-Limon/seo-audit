// $(document).ready(function () {
//   // Start animations
//   gsap.to(".loader", 0.5, {
//     delay: 3,
//     opacity: 0,
//   });
//   $(".loader").css("pointer-events", "none");

//   // Menu toggle function
//   function menu(menuIcon) {
//     menuIcon.toggleClass("close");
//     $(".starta-mobile-nav").toggleClass("menu-active");
//   }

//   $(".menuIcon").on("click", function () {
//     menu((menuIcon = $(".menuIcon")));
//   });

//   // Smooth scroll setup
//   let ScrollArea = document.querySelector("#scroll-content");
//   if (!ScrollArea) {
//     ScrollArea = document.documentElement;
//   }
  
//   const options = {
//     damping: 0.1,
//     speed: 1,
//     renderByPixel: true,
//     continuousScrolling: true,
//     syncCallbacks: true,
//     alwaysShowTracks: true,
//   };

//   let scrollbar;
//   try {
//     if (ScrollArea && ScrollArea.id === 'scroll-content') {
//       scrollbar = Scrollbar.init(ScrollArea, options);
//     }
//   } catch (error) {
//     console.warn('Smooth scrollbar initialization skipped:', error);
//   }

//   $(".starta-nav").addClass("transitionNav");
//   $(".menuIcon").addClass("transitionNav");
  
//   // Add back to top button if it doesn't exist
//   if (!$(".backToTop").length) {
//     $("body").append(
//       '<div class="backToTop"><i class="fa-solid fa-arrow-up"></i></div>'
//     );
//   }

//   function handleScroll(scrollY) {
//     if (scrollY >= 500) {
//       $(".starta-nav").addClass("sticky");
//       $(".menuIcon").css("top", scrollY + 38 + "px");
//       $(".sticky").css("top", scrollY + "px");
//       $(".backToTop").css({ opacity: "1", transform: "translateY(0px)" });
//       setTimeout(() => {
//         $(".starta-nav").removeClass("transitionNav");
//         $(".menuIcon").removeClass("transitionNav");
//       }, 1000);
//     } else {
//       $(".starta-nav").css("top", 0 + "px");
//       $(".starta-nav").removeClass("sticky");
//       $(".menuIcon").css("top", 0 + 38 + "px");
//       $(".backToTop").css({ opacity: "0", transform: "translateY(100%)" });
//       $(".starta-nav").addClass("transitionNav");
//       $(".menuIcon").addClass("transitionNav");
//     }

//     $(".starta-mobile-nav").css("top", scrollY + "px");
//   }

//   if (scrollbar) {
//     scrollbar.addListener((status) => {
//       handleScroll(status.offset.y);
//     });
//   } else {
//     $(window).on('scroll', () => {
//       handleScroll(window.scrollY);
//     });
//   }

//   // Back to top button handling
//   $(".backToTop").on("click", function (e) {
//     e.preventDefault();
//     if (scrollbar) {
//       gsap.to(scrollbar, {
//         scrollTo: 0,
//         duration: 2.5,
//         ease: "power4.inOut"
//       });
//     } else {
//       window.scrollTo({
//         top: 0,
//         behavior: 'smooth'
//       });
//     }
//   });

//   // Menu hover animations
//   $(".menu-animation").on("mouseover", function () {
//     $(this).addClass("hover");
//   });

//   $(".menu-animation").on("mouseleave", function () {
//     $(this).removeClass("hover");
//   });

//   // Button animations hover
//   $(".starta-button").on("mouseover", function (e) {
//     var relX = e.pageX - $(this).offset().left;
//     var relY = e.pageY - $(this).offset().top;
//     $(this).find(".starta-button-hover").css({ left: relX, top: relY });
//     $(this).find(".starta-button-hover").removeClass("desplode-circle");
//     $(this).find(".starta-button-hover").addClass("explode-circle");
//   });

//   $(".starta-button").on("mouseleave", function (e) {
//     var relX = e.pageX - $(this).offset().left;
//     var relY = e.pageY - $(this).offset().top;
//     $(this).find(".starta-button-hover").css({ left: relX, top: relY });
//     $(this).find(".starta-button-hover").removeClass("explode-circle");
//     $(this).find(".starta-button-hover").addClass("desplode-circle");
//   });

//   $(".starta-button-2").each(function () {
//     $(this).children(".starta-button-hover").remove();
//   });

//   // Initialize CircleType if element exists
//   const circleTextElement = document.getElementById("circle-text");
//   if (circleTextElement) {
//     try {
//       new CircleType(circleTextElement);
//     } catch (error) {
//       console.warn('CircleType initialization failed:', error);
//     }
//   }

//   // GSAP initialization
//   if (typeof gsap !== 'undefined') {
//     gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

//     if (scrollbar) {
//       scrollbar.addListener(ScrollTrigger.update);
//       ScrollTrigger.defaults({ scroller: ScrollArea });

//       ScrollTrigger.scrollerProxy("#scroll-content", {
//         scrollTop(value) {
//           if (arguments.length) {
//             scrollbar.scrollTop = value;
//           }
//           return scrollbar.scrollTop;
//         },
//       });
//     }

//     // GSAP animations
//     let shapes = gsap.timeline({
//       scrollTrigger: {
//         scrub: true,
//         pin: true,
//         start: "top top",
//         end: "+=100%",
//       },
//     });

//     shapes.to(".shapes img", {
//       y: 80,
//       duration: 1,
//     });

//     let imgBLock = gsap.timeline({
//       scrollTrigger: {
//         trigger: ".animate-img",
//         start: "center 80%",
//         end: "bottom 10%",
//       },
//     });

//     imgBLock.from(".animate-img", {
//       x: -500,
//       duration: 0.7,
//       opacity: 0,
//     });
//     imgBLock.to(".animate-img", {
//       x: 0,
//       duration: 0.7,
//       opacity: 1,
//     });

//     imgBLock.from(".fill", {
//       width: 0,
//     });
//     imgBLock.to(".fill", {
//       width: "75%",
//     });
//   }

//   // Smooth scroll for anchor links only
//   $(".starta-menu li a").each(function () {
//     if (this.getAttribute('href').startsWith('#')) {
//       $(this).on("click", function (e) {
//         e.preventDefault();
//         const target = $(this.getAttribute('href'));
//         if (target.length) {
//           const offset = target.offset().top - 120;
          
//           if (scrollbar) {
//             gsap.to(scrollbar, {
//               scrollTo: offset,
//               duration: 2.5,
//               ease: "power4.inOut",
//             });
//           } else {
//             window.scrollTo({
//               top: offset,
//               behavior: 'smooth'
//             });
//           }

//           $(".starta-menu li a").removeClass("active");
//           $(this).addClass("active");
          
//           // Close mobile menu if open
//           if ($(".menuIcon").hasClass("close")) {
//             menu($(".menuIcon"));
//           }
//         }
//       });
//     }
//   });

//   // Icon background colors
//   let iconbg = ["rgb(--primary-color)", "rgb(255,202,96)", "rgb(63,223,254)"];

//   $(".starta-icon").each(function (i) {
//     let colorIndex = i % iconbg.length;
//     $(this).css("background-color", iconbg[colorIndex]);
//   });

//   // YouTube link handling
//   $(".ytLink").each(function () {
//     $(this)
//       .closest(".imgOverlay")
//       .find(".servicePlay")
//       .attr("data-copy", $(this).parent("a").attr("href"));
//   });

//   $(".servicePlay").on("click", function () {
//     const videoLink = $(this).attr("data-copy");
//     const tempInput = $("<input>");
//     $("body").append(tempInput);
//     tempInput.val(videoLink).select();
//     document.execCommand("copy");
//     tempInput.remove();
//     $(this).children("span").text("Copied!");
//   });

//   // Testimonials handling
//   if ($(".testimonialsSlides").length) {
//     const swiper2 = new Swiper(".testimonialsSlides", {
//       slidesPerView: 1,
//       loop: true,
//     });

//     var testimonialHeight = $(".testimonialSingle").outerHeight();
//     $(".testimonialsSlides").css("height", testimonialHeight + "px");
//   }

//   // Instagram feed slides
//   if ($(".swiper").length) {
//     const swiper = new Swiper(".swiper", {
//       modules: [EffectMaterial],
//       effect: "material",
//       slidesPerView: 7,
//       spaceBetween: 20,
//     });

//     const rClass = ["bottomSlide", "topSlide"];
//     $(".swiper-material-content").each(function () {
//       $(this).addClass(rClass[Math.floor(Math.random() * rClass.length)]);
//     });
//   }

//   // Video player controls
//   $(".startplay").on("click", function () {
//     const getParent = $(this).closest(".video-block");
//     const getVideo = getParent.find("iframe");
//     getVideo.css("display", "block");
//     getParent.find(".close").css("display", "block");
//     var symbol = getVideo[0].src.indexOf("?") > -1 ? "&" : "?";
    
//     if (getVideo[0].src.indexOf("autoplay") === -1) {
//       getVideo[0].src += symbol + "autoplay=1";
//     } else {
//       getVideo[0].src = getVideo[0].src.replace(/autoplay=0/, "autoplay=1");
//     }
//   });

//   $(".close").on("click", function () {
//     const getParent = $(this).closest(".video-block");
//     const getVideo = getParent.find("iframe");
//     getVideo.css("display", "none");
    
//     if (getVideo[0].src.indexOf("autoplay") === -1) {
//       getVideo[0].src += "?autoplay=0";
//     } else {
//       getVideo[0].src = getVideo[0].src.replace(/autoplay=1/, "autoplay=0");
//     }
    
//     $(this).css("display", "none");
//   });

//   // Testimonial circle sizing
//   $(".testimonialCircle").each(function () {
//     $(this).css({
//       width: $(this).parent().outerHeight() + "px",
//       height: $(this).parent().outerHeight() + "px",
//     });
//   });
// });
$(document).ready(function () {
  // Start animations
  gsap.to(".loader", 0.5, {
    delay: 3,
    opacity: 0,
  });
  $(".loader").css("pointer-events", "none");

  // Menu toggle function
  function menu(menuIcon) {
    menuIcon.toggleClass("close");
    $(".starta-mobile-nav").toggleClass("menu-active");
  }

  $(".menuIcon").on("click", function () {
    menu((menuIcon = $(".menuIcon")));
  });

  // Smoth-scroll
  const ScrollArea = document.getElementById("scroll-content");
  const options = {
    damping: 0.1,
    speed: 1,
    renderByPixel: true,
    continuousScrolling: true,
    syncCallbacks: true,
    alwaysShowTracks: true,
  };
  var scrollbar = Scrollbar.init(ScrollArea, options);

  $(".starta-nav").addClass("transitionNav");
  $(".menuIcon").addClass("transitionNav");

  // Check if back to top button exists before adding
  if (!$(".backToTop").length) {
    $("body").append(
      '<div class="backToTop"><i class="fa-solid fa-arrow-up"></i></div>'
    );
  }

  scrollbar.addListener((status) => {
    const offset = status.offset;

    if (offset.y >= 500) {
      $(".starta-nav").addClass("sticky");
      $(".menuIcon").css("top", offset.y + 38 + "px");
      $(".sticky").css("top", offset.y + "px");
      $(".backToTop").css({ opacity: "1", transform: "translateY(0px)" });
      setTimeout(() => {
        $(".starta-nav").removeClass("transitionNav");
        $(".menuIcon").removeClass("transitionNav");
      }, 1000);
    } else {
      $(".starta-nav").css("top", 0 + "px");
      $(".starta-nav").removeClass("sticky");
      $(".menuIcon").css("top", 0 + 38 + "px");
      $(".backToTop").css({ opacity: "0", transform: "translateY(100%)" });
      $(".starta-nav").addClass("transitionNav");
      $(".menuIcon").addClass("transitionNav");
    }

    $(".starta-mobile-nav").css("top", offset.y + "px");
  });

  // Use event delegation for back to top button
  $(document).on("click", ".backToTop", function (e) {
    const target = $("#top");
    const targetEl = $(target);
    const targetRect = targetEl.offset();
    e.preventDefault();
    gsap.to(scrollbar, {
      scrollTo: targetRect.top,
      duration: 2.5,
      ease: "power4.inOut",
      onCompleteParams: [targetRect.top],
    });

    $(".starta-menu li a").removeClass("active");
    $(this).addClass("active");
  });

  // Menu Hover with event delegation
  $(document).on("mouseover", ".menu-animation", function () {
    $(this).addClass("hover");
  });

  $(document).on("mouseleave", ".menu-animation", function () {
    $(this).removeClass("hover");
  });

  // button animations hover with event delegation
  $(document).on("mouseover", ".starta-button", function (e) {
    var relX = e.pageX - $(this).offset().left;
    var relY = e.pageY - $(this).offset().top;
    $(this).find(".starta-button-hover").css({ left: relX, top: relY });
    $(this).find(".starta-button-hover").removeClass("desplode-circle");
    $(this).find(".starta-button-hover").addClass("explode-circle");
  });

  $(document).on("mouseleave", ".starta-button", function (e) {
    var relX = e.pageX - $(this).offset().left;
    var relY = e.pageY - $(this).offset().top;
    $(this).find(".starta-button-hover").css({ left: relX, top: relY });
    $(this).find(".starta-button-hover").removeClass("explode-circle");
    $(this).find(".starta-button-hover").addClass("desplode-circle");
  });

  $(".starta-button-2").each(function () {
    $(this).children(".starta-button-hover").remove();
  });

  // gsap register Scroll Trigger & Smooth-scroll
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  scrollbar.addListener(ScrollTrigger.update);
  ScrollTrigger.defaults({ scroller: ScrollArea });

  ScrollTrigger.scrollerProxy("#scroll-content", {
    scrollTop(value) {
      if (arguments.length) {
        scrollbar.scrollTop = value;
      }
      return scrollbar.scrollTop;
    },
  });

  scrollbar.addListener(ScrollTrigger.update);
  ScrollTrigger.defaults({ scroller: ScrollArea });

  //gsap timelines
  let shapes = gsap.timeline({
    scrollTrigger: {
      scrub: true,
      pin: true,
      start: "top top",
      end: "+=100%",
    },
  });

  shapes.to(".shapes img", {
    y: 80,
    duration: 1,
  });

  let imgBLock = gsap.timeline({
    scrollTrigger: {
      trigger: ".animate-img",
      start: "center 80%",
      end: "bottom 10%",
    },
  });
  imgBLock.from(".animate-img", {
    x: -500,
    duration: 0.7,
    opacity: 0,
  });
  imgBLock.to(".animate-img", {
    x: 0,
    duration: 0.7,
    opacity: 1,
  });

  imgBLock.from(".fill", {
    width: 0,
  });
  imgBLock.to(".fill", {
    width: "75%",
  });

  let imgBLock2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".animate-img2",
      start: "center 50%",
      end: "bottom 10%",
    },
  });

  imgBLock2.from(".animate-img2", {
    x: -500,
    duration: 0.7,
    opacity: 0,
  });
  imgBLock2.to(".animate-img2", {
    x: 0,
    duration: 0.7,
    opacity: 1,
  });

  let imgBLock3 = gsap.timeline({
    scrollTrigger: {
      trigger: ".animate-img3",
      start: "top center",
      end: "bottom 10%",
    },
  });

  imgBLock3.from(".animate-img3", {
    x: -500,
    duration: 0.7,
    opacity: 0,
  });
  imgBLock3.to(".animate-img3", {
    x: 0,
    duration: 0.7,
    opacity: 1,
  });

  let iconbg = ["rgb(--primary-color)", "rgb(255,202,96)", "rgb(63,223,254)"];

  $(".starta-icon").each(function (i) {
    let colorIndex = i % iconbg.length;
    $(this).css("background-color", iconbg[colorIndex]);
  });

  $(".ytLink").each(function () {
    $(this)
      .closest(".imgOverlay")
      .find(".servicePlay")
      .attr("data-copy", $(this).parent("a").attr("href"));
  });

  $(document).on("click", ".servicePlay", function () {
    const videoLink = $(this).attr("data-copy");
    const tempInput = $("<input>");
    $("body").append(tempInput);
    tempInput.val(videoLink).select();
    document.execCommand("copy");
    tempInput.remove();
    $(this).children("span").text("Copied!");
  });

  // Initialize CircleType only if element exists and on homepage
  if (window.location.pathname === '/' && document.getElementById("circle-text")) {
    try {
      new CircleType(document.getElementById("circle-text"));
    } catch (error) {
      console.warn('CircleType initialization skipped:', error);
    }
  }

  // testimonials Slide
  if ($(".testimonialsSlides").length) {
    const swiper2 = new Swiper(".testimonialsSlides", {
      slidesPerView: 1,
      loop: true,
    });

    var testimonialHeight = $(".testimonialSingle").outerHeight();
    $(".testimonialsSlides").css("height", testimonialHeight + "px");
  }

  // insta feed SLides
  if ($(".swiper").length) {
    const swiper = new Swiper(".swiper", {
      modules: [EffectMaterial],
      effect: "material",
      slidesPerView: 7,
      spaceBetween: 20,
    });

    const rClass = ["bottomSlide", "topSlide"];
    $(".swiper-material-content").each(function (index) {
      $(this).addClass(rClass[Math.floor(Math.random() * rClass.length)]);
    });
  }

  // scroll to with event delegation
  $(document).on("click", ".starta-menu li a", function (e) {
    const href = $(this).attr("href");
    if (href.startsWith("#")) {
      menu((menuIcon = $(".menuIcon")));
      e.preventDefault();
      const targetEl = $(href);
      if (targetEl.length) {
        gsap.to(scrollbar, {
          scrollTo: targetEl.offset().top - 120,
          duration: 2.5,
          ease: "power4.inOut",
        });

        $(".starta-menu li a").removeClass("active");
        $(this).addClass("active");
      }
    }
  });

  // Video handling with event delegation
  $(document).on("click", ".startplay", function () {
    const getParent = $(this).closest(".video-block");
    const getVideo = getParent.find("iframe");
    getVideo.css("display", "block");
    getParent.find(".close").css("display", "block");
    var symbol = getVideo[0].src.indexOf("?") > -1 ? "&" : "?";
    getVideo[0].src += symbol + "autoplay=1";
  });

  $(document).on("click", ".close", function () {
    const getParent = $(this).closest(".video-block");
    const getVideo = getParent.find("iframe");
    getVideo.css("display", "none");
    getVideo[0].src = getVideo[0].src.replace(/autoplay=1/, "autoplay=0");
    $(this).css("display", "none");
  });

  $(".testimonialCircle").each(function () {
    $(this).css({
      width: $(this).parent().outerHeight() + "px",
      height: $(this).parent().outerHeight() + "px",
    });
  });
  // First, unregister any existing handlers
$(document).off();

$(document).ready(function () {
  // Remove any existing elements that might cause conflicts
  $(".backToTop").remove();

  // Start animations
  gsap.to(".loader", 0.5, {
    delay: 3,
    opacity: 0,
  });
  $(".loader").css("pointer-events", "none");

  let currentScrollbar = null;

  function initializeScrollbar() {
    // Clean up existing scrollbar if it exists
    if (currentScrollbar) {
      currentScrollbar.destroy();
    }

    const ScrollArea = document.getElementById("scroll-content");
    if (!ScrollArea) return null;

    const options = {
      damping: 0.1,
      speed: 1,
      renderByPixel: true,
      continuousScrolling: true,
      syncCallbacks: true,
      alwaysShowTracks: true,
    };

    try {
      currentScrollbar = Scrollbar.init(ScrollArea, options);
      return currentScrollbar;
    } catch (error) {
      console.warn('Scrollbar initialization failed:', error);
      return null;
    }
  }

  // Initialize scrollbar
  const scrollbar = initializeScrollbar();

  // Menu toggle function
  function menu(menuIcon) {
    menuIcon.toggleClass("close");
    $(".starta-mobile-nav").toggleClass("menu-active");
  }

  // Add the back to top button if not exists
  if (!$(".backToTop").length) {
    const backToTopButton = $('<div class="backToTop"><i class="fa-solid fa-arrow-up"></i></div>');
    $("body").append(backToTopButton);
  }

  function handleScroll(scrollY) {
    if (scrollY >= 500) {
      $(".starta-nav").addClass("sticky");
      $(".menuIcon").css("top", scrollY + 38 + "px");
      $(".sticky").css("top", scrollY + "px");
      $(".backToTop").css({ opacity: "1", transform: "translateY(0px)" });
    } else {
      $(".starta-nav").css("top", 0 + "px");
      $(".starta-nav").removeClass("sticky");
      $(".menuIcon").css("top", 0 + 38 + "px");
      $(".backToTop").css({ opacity: "0", transform: "translateY(100%)" });
    }

    $(".starta-mobile-nav").css("top", scrollY + "px");
  }

  // Event Handlers
  $(document).on("click", ".menuIcon", function() {
    menu($(this));
  });

  $(document).on("click", ".backToTop", function(e) {
    e.preventDefault();
    if (scrollbar) {
      scrollbar.scrollTo(0, 0, 600);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  // Scroll handling
  if (scrollbar) {
    scrollbar.addListener((status) => handleScroll(status.offset.y));
  } else {
    $(window).on('scroll', () => handleScroll(window.scrollY));
  }

  // Initialize CircleType only on elements that exist
  const circleTextElement = document.getElementById("circle-text");
  if (circleTextElement) {
    try {
      new CircleType(circleTextElement);
    } catch (error) {
      console.warn('CircleType initialization skipped:', error);
    }
  }

  // GSAP initialization if needed
  if (typeof gsap !== 'undefined' && scrollbar) {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    scrollbar.addListener(ScrollTrigger.update);
    ScrollTrigger.defaults({ scroller: ScrollArea });
  }

  // Cleanup function
  function cleanup() {
    if (currentScrollbar) {
      currentScrollbar.destroy();
      currentScrollbar = null;
    }
    $(".backToTop").remove();
    $(document).off();
  }

  // Add cleanup to window object for React
  window.cleanupCustomJs = cleanup;

  // Clean up when navigating away
  window.addEventListener('beforeunload', cleanup);
});

  // Cleanup function for route changes
  window.cleanupCustomJs = function() {
    if (scrollbar) {
      scrollbar.destroy();
    }
    $(".backToTop").remove();
  };
});