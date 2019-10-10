$(function() {

	let today = new Date();
	let year = today.getFullYear();
	let copy = document.querySelector('.footer_copy');
	copy.innerHTML = '©' + year + '«Surmin Moto Point» & KroforK.'

	let sections = $('section')
		, nav = $('.header_menu')
		, nav_height = nav.outerHeight();
	$(window).on('scroll', function () {
		let cur_pos = $(this).scrollTop();

		sections.each(function () {
			let top = $(this).offset().top - nav_height,
				bottom = top + $(this).outerHeight();

			if (cur_pos >= top && cur_pos <= bottom) {
				nav.find('a').removeClass('isActive');
				sections.removeClass('isActive');

				$(this).addClass('isActive');
				nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('isActive');
			}
		});
	});
	$('.menu_item_link').on('click', function () {
		$('.header_nav').removeClass('isActive')
		$('.gutter').removeClass('isActive')
	})

	$('.gutter').on('click', function(){
		if ($('.gutter').hasClass('isActive')) {
			$('.header_nav').removeClass('isActive')
			$('.gutter').removeClass('isActive')
		} else {
			$('.header_nav').addClass('isActive')
			$('.gutter').addClass('isActive')
		}
	})
	$("a").mPageScroll2id({
		offset: 32
	});
	$(".whatisit_slider").slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		fade: true,
		asNavFor: '.slider_nav',
		prevArrow: '<svg class="slider_nav_arrow whatisit_prevArrow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path fill="#FFFFFF" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>',
		nextArrow: '<svg class="slider_nav_arrow whatisit_nextArrow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path fill="#FFFFFF" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>'
	});

	$('.slider_nav').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		focusOnSelect: true,
		asNavFor: '.whatisit_slider'
	});

	$('.whatisit_slider').magnificPopup({
		delegate: 'a',
		type: 'image',
		tLoading: 'Загрузка изображения #%curr%...',
		mainClass: 'mfp-img-mobile',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0, 1]
		},
		image: {
			tError: '<a href="%url%">Изображение #%curr%</a> не может быть загружено.',
			titleSrc: function (item) {
				return item.el.attr('title');
			}
		}
	});

	$(".advantages_slider").slick({
		slidesToShow: 3,
		// asNavFor: '.advantages_slider_nav',
		prevArrow: '<svg class="slider_nav_arrow advantages_prevArrow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path fill="#FFFFFF" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>',
		nextArrow: '<svg class="slider_nav_arrow advantages_nextArrow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path fill="#FFFFFF" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>',
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 3,
					infinite: true,
				}
			},
			{
				breakpoint: 700,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			},
			{
				breakpoint: 578,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});

	// $('.advantages_slider_nav').slick({
	// 	slidesToShow: 3,
	// 	slidesToScroll: 1,
	// 	focusOnSelect: true,
	// 	asNavFor: '.advantages_slider'
	// });

	$('.advantages_slider').magnificPopup({
		delegate: 'a',
		type: 'image',
		tLoading: 'Загрузка изображения #%curr%...',
		mainClass: 'mfp-img-mobile',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0, 1]
		},
		image: {
			tError: '<a href="%url%">Изображение #%curr%</a> не может быть загружено.',
			titleSrc: function (item) {
				return item.el.attr('title');
			}
		}
	});

	let p = document.querySelectorAll('p');
	p.forEach(e => {
		e.innerHTML = e.innerHTML.replace(/\s?\-\s?/gmi, ' &#x2012 ')
	});
	let li = document.querySelectorAll('li');
	li.forEach(e => {
		e.innerHTML = e.innerHTML.replace(/\s?\-\s?/gmi, ' &#x2012 ')
	});

});
