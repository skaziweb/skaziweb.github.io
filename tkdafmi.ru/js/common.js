$(function() {
	$('.head-nav-mob-menu-btn').on('click', function(){
		if ($('.head-nav-mob-menu-btn').hasClass('active')){
			$('.head-nav-mob-menu-btn').removeClass('active')
			$('.head-nav-mob-menu').removeClass('active')
		}
		else {
			$('.head-nav-mob-menu-btn').addClass('active')
			$('.head-nav-mob-menu').addClass('active')
		}
	})
	$('.certificate-item, .view-reviews').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		closeBtnInside: false,
		fixedContentPos: true,
		image: {
			verticalFit: true
		},
		zoom: {
			enabled: true,
			duration: 300 // don't foget to change the duration also in CSS
		}
	})
	$('.header-carousel').owlCarousel({
		loop: true,
		autoplay: true,
		responsive: {
			0: {
				items: 1
			},
			600: {
				items: 1
			},
			1000: {
				items: 1
			}
		}
	})
	$('.reviews-carousel').owlCarousel({
		loop: true,
		autoplay: true,
		nav: true,
		items: 1,
		autoplayTimeout: 5000,
		autoplayHoverPause: true
	})
	$('.partner-carousel').owlCarousel({
		loop: true,
		margin: 10,
		autoplay: true,
		responsiveClass: true,
		responsive: {
			0: {
				items: 1,
				nav: true
			},
			576: {
				items: 3,
				nav: false
			},
			768: {
				items: 4,
				nav: false
			},
			1200: {
				items: 6,
				loop: false
			}
		}
	})
	$('.head-nav-desctop-menu a').mPageScroll2id({
		offset: 79
	});
	$(window).scroll(function () {
		if ($('.ttx').length) {
			if ($(window).scrollTop() >= $('.ttx').offset().top - 300) {
				$('.small, .medium, .large, .extralarge').addClass('active');
			}
		}
		if ($('.compare').length) {
			if ($(window).scrollTop() >= $('.compare').offset().top - 300) {
				$('.small, .medium, .large, .extralarge').addClass('active');
			}
		}
		
	});


});


function showmap () {
	$('.form-wrap').addClass('hidden');
	$('.overlay').addClass('hidden');
	$('.hide-map').removeClass('hidden');
}
function hidemap () {
	$('.form-wrap').removeClass('hidden');
	$('.overlay').removeClass('hidden');
	$('.hide-map').addClass('hidden');
}