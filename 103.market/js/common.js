$(document).ready(function () {

	$('.main__slider').slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 5000
	});

	let citySelect = document.querySelector('.header__city');
	citySelect.addEventListener('click', function(){
		let cityFilter = document.querySelector('.modal__city__filter');
		let arrow = document.querySelector('.header__city__icon_angle');
		if (arrow.classList.contains('isActive')) {
			arrow.classList.remove('isActive');
			cityFilter.classList.remove('isActive');
		} else {
			arrow.classList.add('isActive');
			cityFilter.classList.add('isActive');
		}
		
	});

});