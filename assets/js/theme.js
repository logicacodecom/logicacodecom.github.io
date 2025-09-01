/*---------------------------------------------------------------------------------
* 
* Template JS
* 
* Template:		RED - Responsive One/Multi Page HTML5 Website Template
* Author: 		Themetorium
* URL:			https://themetorium.net
* 
---------------------------------------------------------------------------------*/


/* Table of Content
====================
// Detect mobile device and add class "is-mobile" to </body>
// Page preloader
// Off canvas menu
// Page header
// Parallax effect
// jQuery for page scrolling feature
// YTPlayer
// OWL Carousel
// Isotope
// Magnific Popup
// Portfolio grid
// Counter-Up
// Deferring embed videos
// Info boxes
// Forms
// uniMail
// Scroll to top button
// Miscellaneous
*/



(function ($) {
	'use strict';



	// ==========================================================
	// Detect mobile device and add class "is-mobile" to </body>
	// ==========================================================

	// Detect mobile device (Do not remove!!!)
	var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Nokia|Opera Mini/i.test(navigator.userAgent) ? true : false;

	// Add class "is-mobile" to </body>
	if(isMobile) {
		$("body").addClass("is-mobile");
	}



	// =============================================================
	// Page preloader (display loading animation while page loads)
	// =============================================================

	// Wait for window load
	$(window).on('load', function () {
		// Animate loader off screen
		$("#preloader").fadeOut("slow");
	});



	// ===================================================================================
	// Off canvas menu (source: http://codyhouse.co/gem/secondary-expandable-navigation/)
	// ===================================================================================

	var $lateral_menu_trigger = $('#cd-menu-trigger'),
	$content_wrapper = $('#body-content'),
	$navigation = $('header');

	// open-close lateral menu clicking on the menu icon.
	$lateral_menu_trigger.on('click', function(event){
		event.preventDefault();

		$lateral_menu_trigger.toggleClass('is-clicked');
		$navigation.toggleClass('lateral-menu-is-open');
		$content_wrapper.toggleClass('lateral-menu-is-open');
		$('#cd-lateral-nav').toggleClass('lateral-menu-is-open');
	});

	// close lateral menu clicking outside the menu itself.
	$content_wrapper.on('click', function(event){
		if( !$(event.target).is('#cd-menu-trigger, #cd-menu-trigger span') ) {

			$lateral_menu_trigger.removeClass('is-clicked');
			$navigation.removeClass('lateral-menu-is-open');
			$content_wrapper.removeClass('lateral-menu-is-open');
			$('#cd-lateral-nav').removeClass('lateral-menu-is-open');

		}
	});

	// close lateral menu clicking on link if class "page-scroll" exist.
	$(".cd-navigation > li > a.page-scroll").on('click', function (e) {
		$lateral_menu_trigger.removeClass('is-clicked');
		$navigation.removeClass('lateral-menu-is-open');
		$content_wrapper.removeClass('lateral-menu-is-open');
		$('#cd-lateral-nav').removeClass('lateral-menu-is-open');

		e.stopPropagation();
	});

	// open (or close) submenu items in the lateral menu. Close all the other open submenu items.
	$('.item-has-children').children('a').on('click', function(event){
		event.preventDefault();
		$(this).toggleClass('submenu-open').next('.sub-menu').slideToggle(200).end().parent('.item-has-children').siblings('.item-has-children').children('a').removeClass('submenu-open').next('.sub-menu').slideUp(200);
	});



	// ===============================
	// Page header
	// ===============================

	// if .page-header-caption contains class "ph-cap-light" add class "ph-cap-light-on" to <body>.
	if ($('.page-header-caption').hasClass('ph-cap-light')) {
		$('body').addClass('ph-cap-light-on');
	}



	// ==================================================
	// Parallax effect (for page header and intro only!)
	// ==================================================

	// Parallax scrolling (no effect on touch devices!)
	if(!isMobile) {

		// Parallax scrolling effect (transform) 
		$(window).on("scroll",function() {
			var plxScroll = $(this).scrollTop();

			$('.parallax-1').css('transform', 'translate3d(0, '+ ((plxScroll * 0.1)) +'px, 0)');
			$('.parallax-2').css('transform', 'translate3d(0, '+ ((plxScroll * 0.2)) +'px, 0)');
			$('.parallax-3').css('transform', 'translate3d(0, '+ ((plxScroll * 0.3)) +'px, 0)');
			$('.parallax-4').css('transform', 'translate3d(0, '+ ((plxScroll * 0.4)) +'px, 0)');
			$('.parallax-5').css('transform', 'translate3d(0, '+ ((plxScroll * 0.5)) +'px, 0)');
			$('.parallax-6').css('transform', 'translate3d(0, '+ ((plxScroll * 0.6)) +'px, 0)');
			$('.parallax-7').css('transform', 'translate3d(0, '+ ((plxScroll * 0.7)) +'px, 0)');
			$('.parallax-8').css('transform', 'translate3d(0, '+ ((plxScroll * 0.8)) +'px, 0)');
		});

		// Element fade out scrolling effect
		$(window).on("scroll",function() {
			$(".fade-out-scroll-1").css("opacity", 1 - $(window).scrollTop() / 150);
			$(".fade-out-scroll-2").css("opacity", 1 - $(window).scrollTop() / 250);
			$(".fade-out-scroll-3").css("opacity", 1 - $(window).scrollTop() / 350);
			$(".fade-out-scroll-4").css("opacity", 1 - $(window).scrollTop() / 450);
			$(".fade-out-scroll-5").css("opacity", 1 - $(window).scrollTop() / 550);
			$(".fade-out-scroll-6").css("opacity", 1 - $(window).scrollTop() / 650);
			$(".fade-out-scroll-7").css("opacity", 1 - $(window).scrollTop() / 750);
			$(".fade-out-scroll-8").css("opacity", 1 - $(window).scrollTop() / 850);
		});
	}



	// ==================================================================
	// jQuery for page scrolling feature - requires jQuery Easing plugin
	// ==================================================================

	$('.page-scroll').bind('click', function(event) {
		var $anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: $($anchor.attr('href')).offset().top -14
		}, 1500, 'easeInOutExpo');
		event.preventDefault();
	});



	// ===========================================================================
	// YTPlayer (BG Youtube video): https://github.com/pupunzi/jquery.mb.YTPlayer
	// ===========================================================================

	$(".youtube-bg").mb_YTPlayer();
	


	// =====================================================
	// OWL Carousel
	// More info: https://owlcarousel2.github.io/OwlCarousel2/
	// Note: "animate.css" library is required: https://daneden.github.io/animate.css/
	// =====================================================

	$(window).on('load', function() {
		
		$('.owl-carousel').each(function() {
			var $carousel = $(this);
			$carousel.owlCarousel({

				items: $carousel.data("items"),
				loop: $carousel.data("loop"),
				margin: $carousel.data("margin"),
				startPosition: $carousel.data("start-position"),
				animateIn: $carousel.data("animate-in"),
				animateOut: $carousel.data("animate-out"),
				autoHeight: $carousel.data("autoheight"),
				autoplay: $carousel.data("autoplay"),
				autoplayTimeout: $carousel.data("autoplay-timeout"),
				autoplayHoverPause: $carousel.data("autoplay-hover-pause"),
				autoplaySpeed: $carousel.data("autoplay-speed"),
				nav: $carousel.data("nav"),
				navText: ['', ''],
				navSpeed: $carousel.data("nav-speed"),
				dots: $carousel.data("dots"),
				dotsSpeed: $carousel.data("dots-speed"),
				mouseDrag: $carousel.data("mouse-drag"),
				touchDrag: $carousel.data("touch-drag"),
				dragEndSpeed: $carousel.data("drag-end-speed"),
				lazyLoad: $carousel.data("lazy-load"),
				video: true,
				onLoadLazy: owlLazyLoading,
				onLoadedLazy: owlLazyLoaded,
				responsive: {
					0: {
						items: $carousel.data("mobile-portrait"),
					},
					480: {
						items: $carousel.data("mobile-landscape"),
					},
					768: {
						items: $carousel.data("tablet-portrait"),
					},
					992: {
						items: $carousel.data("tablet-landscape"),
					},
					1200: {
						items: $carousel.data("items"),
					}
				}

			});

		});


		// Mousewheel plugin
		var owlMouse = $('.owl-mousewheel');
		owlMouse.on('mousewheel', '.owl-stage', function (e) {
			if (e.deltaY > 0) {
				owlMouse.trigger('prev.owl', [800]);
			} else {
				owlMouse.trigger('next.owl', [800]);
			}
			e.preventDefault();
		});
		

		// Keyboard (prev/next arrow) events for navigating
		// https://github.com/OwlCarousel2/OwlCarousel2/issues/492#issuecomment-55629470
		var owlKeyboard = $('.owl-carousel');
		$(document).keyup(function(i){
			if(i.keyCode==37) {
				owlKeyboard.trigger('prev.owl', [800]);
			} else if (i.keyCode==39) {
				owlKeyboard.trigger('next.owl', [800]);
			}
		});


		// Add owl lazy loader to ".owl-lazy" element (for background images only!).
		// ===========================================
		$('.owl-lazy').each(function() {
			var owlLazy = $(this);
			if ($(owlLazy).hasClass('bg-image')) {
				// add wrap element to ".owl-lazy".
				$(owlLazy).wrap('<div class="owl-lazy-wrap" />');
				// add lazy loader to parent element.
				$(owlLazy).parent().prepend('<div class="owl-lazy-loader"></div>');
			}
		});

		// Owl Callbacks for lazy loader
		function owlLazyLoading(event) {
			$('.owl-lazy-loader').each(function() {
				$(this).addClass('owl-lazy-loading');
			});
		}
		function owlLazyLoaded(event) {
			$('.owl-lazy-loader').each(function() {
				$(this).removeClass('owl-lazy-loading');
			});
		}

	});



	// ===================================================================================
   // Isotope
   // More info: http://isotope.metafizzy.co
   // Note: "imagesloaded" blugin is required: https://github.com/desandro/imagesloaded
   // ===================================================================================

   // init Isotope
   var $container = $('.isotope-items-wrap');
   $container.imagesLoaded(function() {
      $container.isotope({
         itemSelector: '.isotope-item',
         transitionDuration: '0.7s',
         masonry: {
         	columnWidth: '.isotope-grid-sizer',
            horizontalOrder: false
         }
      });
   });

   // Filter
   $('.isotope-filter-links button').on("click", function() {
      var selector = $(this).attr('data-filter');
      $container.isotope({
         filter: selector
      });
      return false;
   });

   // Filter item active
   var filterItemActive = $('.isotope-filter-links button');
   filterItemActive.on('click', function(){
      var $this = $(this);
      if ( !$this.hasClass('active')) {
         filterItemActive.removeClass('active');
         $this.addClass('active');
      }
   });

   // if "isotope-items-wrap" exist.
	if ($('.isotope-items-wrap').length){
		
		// add overflow scroll to <html> (isotope items gaps fix).
		if ( document.querySelector('body').offsetHeight > window.innerHeight ) {
			document.documentElement.style.overflowY = 'scroll';
		}
	}



	// ==============================================================
	// Magnific Popup: http://dimsemenov.com/plugins/magnific-popup/
	// ==============================================================

	// Image gallery popup (type image)
	$('.popup-gallery').magnificPopup({
		delegate: '.popup-trigger',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-fadein',
		gallery: {
			enabled: true, // enable or disable gallery (false/true)
			preload: [0,1], // read about this option in next Lazy-loading section
			navigateByImgClick: true,
			arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>', // markup of an arrow button
			tPrev: 'Previous (Left arrow key)', // title for left button
			tNext: 'Next (Right arrow key)', // title for right button
			tCounter: '<span class="mfp-counter">%curr% of %total%</span>' // markup of counter
		},
		image: {
			titleSrc: 'data-title', // Attribute of the target element that contains caption for the slide.
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.' // Error message
		}
	});

	// Image gallery popup for OWL Carousel (type image)
	$('.owl-popup-gallery').magnificPopup({
		delegate: '.owl-item:not(.cloned) .owl-popup-trigger',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-fadein',
		gallery: {
			enabled: true, // enable or disable gallery (false/true)
			preload: [0,1], // read about this option in next Lazy-loading section
			navigateByImgClick: true,
			arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>', // markup of an arrow button
			tPrev: 'Previous (Left arrow key)', // title for left button
			tNext: 'Next (Right arrow key)', // title for right button
			tCounter: '<span class="mfp-counter">%curr% of %total%</span>' // markup of counter
		},
		image: {
			titleSrc: 'data-title', // Attribute of the target element that contains caption for the slide.
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.' // Error message
		}
	});

	// Inline popup (iframe)
	$('.popup-iframe').magnificPopup({
		disableOn: 768,
		type: 'iframe',
		mainClass: 'mfp-fadein',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false,
		gallery: {
			enabled: false, // enable or disable gallery (false/true)
			arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>', // markup of an arrow button
			tPrev: 'Previous (Left arrow key)', // title for left button
			tNext: 'Next (Right arrow key)' // title for right button
		}
	});

	// Inline popup (type inline)
	$('.inline-popup-trigger').magnificPopup({
		type: 'inline',
		modal: false,
		alignTop: true,
		fixedContentPos: true,
		fixedBgPos: false,
		overflowY: 'auto',
		closeBtnInside: true,
		preloader: false,
		midClick: true,
		removalDelay: 300,
		mainClass: 'mfp-fade-zoom',
		gallery: {
			enabled: false, // enable or disable gallery (false/true)
			arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>', // markup of an arrow button
			tPrev: 'Previous (Left arrow key)', // title for left button
			tNext: 'Next (Right arrow key)' // title for right button
		}
	});

	$(document).on('click', '.inline-popup-close', function (e) {
		e.preventDefault();
		$.magnificPopup.close();
	});



	// =====================
	// Portfolio grid
	// =====================

	// If "pgi-image-ghost" exist add class "cover-opacity-*" to "pgi-image-wrap".
	$('.pgi-image-wrap').each( function() {
		if ($(this).find(".pgi-image-ghost").length ) {
			$(this).addClass("cover-opacity-6");
		}
	});



	// ========================================================================================
	// Counter-Up (requires jQuery waypoints.js plugin): https://github.com/bfintal/Counter-Up
	// ========================================================================================

	$('.counter').counterUp({
		delay: 10,
		time: 2000
	});



	// ============================================================================================
	//
	// Deferring embed videos (Youtube, Vimeo).
	// 
	// When you have videos from Youtube, Vimeo or just about any other provider embedded 
	// in your webpages it causes your page to load slower. Just about every video can be deferred 
	// until after your initial pageload which will allow your page to load quickly 
	// without having to gather all the files and resources that the video is requesting.
	//
	// More info: https://www.feedthebot.com/pagespeed/defer-videos.html
	//
	// ============================================================================================

	function init() {
	var vidDefer = document.getElementsByTagName('iframe');
	for (var i=0; i<vidDefer.length; i++) {
	if(vidDefer[i].getAttribute('data-src')) {
		vidDefer[i].setAttribute('src',vidDefer[i].getAttribute('data-src'));
	} } }
	window.onload = init;



	// =====================
	// Info boxes
	// =====================

	if ($(".info-box-wrap").hasClass("ib-alter-2")) {
		$(".info-box").each( function() {
			var $aaa = $(this).find(".info-box-heading");
			var $bbb = $(this).find(".info-box-info");

			$aaa.prependTo($bbb);
		});
	}



	// ================================================================
	// Forms
	// ================================================================

	// Bootstrap forms validation
	// ===========================
	window.addEventListener('load', function() {
		// Fetch all the forms we want to apply custom Bootstrap validation styles to
		var forms = document.getElementsByClassName('needs-validation');
		// Loop over them and prevent submission
		var validation = Array.prototype.filter.call(forms, function(form) {
			form.addEventListener('submit', function(event) {
				if (form.checkValidity() === false) {
					event.preventDefault();
					event.stopPropagation();
				}
				form.classList.add('was-validated');
			}, false);
		});
	}, false);


	// Remove input placeholder on focus
	// ==================================
	$("input,textarea").focus(function () {
		$(this).data("placeholder", $(this).attr("placeholder"))
			.attr("placeholder", "");
	}).blur(function () {
		$(this).attr("placeholder", $(this).data("placeholder"));
	}); 


	// Form "Browse File" button info
	// ===============================
	$(document).on("change", ":file", function() {
		var input = $(this),
		numFiles = input.get(0).files ? input.get(0).files.length : 1,
		label = input.val().replace(/\\/g, "/").replace(/.*\//, "");
		input.trigger("fileselect", [numFiles, label]);
	});
	$(":file").on("fileselect", function(event, numFiles, label) {
		var input = $(this).parents(".custom-file").find(".custom-file-info"),
		log = numFiles > 1 ? numFiles + " files selected" : label;

		if( input.length ) {
			input.val(log);
		} else {
			if( log ) alert(log);
		}
	});



	// ===============================================
	// uniMail - Universal PHP Mail Feedback Script
	// Source: https://github.com/agragregra/uniMail
	// ===============================================

	$(document).ready(function() {

		// E-mail Ajax Send
		$("#contact-form").submit(function() { // your contact form ID.
			var th = $(this);
			$.ajax({
				type: "POST",
				url: "mail.php", // mail.php path (do not remove this file!!!).
				data: th.serialize()
			}).done(function() {
				alert("Thank you. Your message has been sent!");
				setTimeout(function() {
				// Done Functions
				th.trigger("reset");
				}, 1000);
			});
			return false;
		});

	});



	// =====================
	// Scroll to top button
	// =====================

	// Check to see if the window is top if not then display button
	$(window).scroll(function(){
		if ($(this).scrollTop() > 800) {
			$('.scrolltotop').fadeIn();
		} else {
			$('.scrolltotop').fadeOut();
		}
	});

	// Click event to scroll to top
	$('.scrolltotop').on('click', function () {
		$('html, body').animate({scrollTop : 0}, 1500, 'easeInOutExpo');
		return false;
	});



	// ===============
	// Miscellaneous
	// ===============

	// if "tt-sidebar" exist.
	if ($('.tt-sidebar').length){
		$("body").addClass("tt-sidebar-on");
	}

	// Bootstrap tooltip
	// ==================
   $('[data-toggle="tooltip"]').tooltip();


   // Bootstrap popover
	// ==================
   $('[data-toggle="popover"]').popover();


	// Bootstrap-3 modal fix
	// =============================
	$('.modal').appendTo("body");


	// Hover fix for iOS
	// =============================
	$('*').on('touchstart',function() {
		$(this).trigger('hover');
	}).on('touchend',function() {
		$(this).trigger('hover');
	});


})(jQuery); 
