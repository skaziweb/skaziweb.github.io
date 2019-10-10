document.addEventListener("DOMContentLoaded", function() {
	let body = document.querySelector('body');

	$('.aReviews_slider').slick({
		autoplay: true,
		infinity: true,
		arrows: true,
		autoplaySpeed: 5000,
		pauseOnHover: true,
		nextArrow: '<span class="aReviews_slider_arrow arrow_next" aria-hidden="true"></span>',
		prevArrow: '<span class="aReviews_slider_arrow arrow_prev" aria-hidden="true"></span>'
	});
	$('.vebinar_slider').slick({
		autoplay: true,
		infinity: true,
		arrows: true,
		autoplaySpeed: 5000,
		pauseOnHover: true,
		nextArrow: '<span class="vebinar_slider_arrow vebinar_arrow_next" aria-hidden="true"></span>',
		prevArrow: '<span class="vebinar_slider_arrow vebinar_arrow_prev" aria-hidden="true"></span>'
	});

	let map_control_years = document.querySelectorAll('.map_control_years');
	let map_elems = document.querySelectorAll('.maplayer');
	let map_description = document.querySelectorAll('.map_description');

	let map_control_line_point = document.querySelector('.map_control_line_point');
	let map_control_line_active = document.querySelector('.map_control_line_active');

	if (map_control_years) {
		map_control_years.forEach((e, idx) => {
			e.addEventListener('click', function () {
				map_control_years.forEach((me, midx) => {
					if (midx == idx) {
						me.classList.add('isActive')
					} else {
						me.classList.remove('isActive')
					}
				})
				map_elems.forEach((map_e, map_idx) => {
					if (map_idx == idx) {
						map_e.classList.add('isActive')
					} else {
						map_e.classList.remove('isActive')
					}
				})
				map_description.forEach((map_d_e, map_d_idx) => {
					if (map_d_idx == idx) {
						map_d_e.classList.add('isActive')
					} else {
						map_d_e.classList.remove('isActive')
					}
				})
				const dRegExp = new RegExp(/\d+?/, 'g');
				map_control_line_point.className = map_control_line_point.className.replace(dRegExp, '' + idx)
				map_control_line_active.className = map_control_line_active.className.replace(dRegExp, '' + idx)
			})
		});
	}

	let show_more = document.querySelector('.aSection_btn_more');
	let hide_more = document.querySelector('.aSection_btn_hMore');
	let more_row = document.querySelector('.aSection_row_more');
	if (more_row) {
		show_more.addEventListener('click', function(){
			more_row.classList.add('isActive');
			hide_more.classList.add('isActive');
			this.classList.remove('isActive');
		})
		hide_more.addEventListener('click', function(){
			this.classList.remove('isActive');
			more_row.classList.remove('isActive');
			show_more.classList.add('isActive');
		})
	}

	let gutter = document.querySelector('.gutter');
	let header = document.querySelector('header');
	let header_menu = document.querySelector('.header_menu');
	let main_content_menu = document.querySelector('.main_content_menu');
	let header_mailto = document.querySelector('.header_mailto');
	if (gutter && header_menu) {
		gutter.addEventListener('click', function () {
			if (this.classList.contains('isActive')) {
				body.classList.remove('isActive')
				header_mailto.classList.remove('isActive')
				header_menu.classList.remove('isActive')
				header.classList.remove('isActive')
				this.classList.remove('isActive')
			} else {
				body.classList.add('isActive')
				header_mailto.classList.add('isActive')
				header_menu.classList.add('isActive')
				header.classList.add('isActive')
				this.classList.add('isActive')
			}
		})
	} else if (gutter && main_content_menu) {
		gutter.addEventListener('click', function () {
			if (this.classList.contains('isActive')) {
				body.classList.remove('isActive')
				main_content_menu.classList.remove('isActive')
				this.classList.remove('isActive')
			} else {
				body.classList.add('isActive')
				main_content_menu.classList.add('isActive')
				this.classList.add('isActive')
			}
		})
	}


	let main_news = document.querySelector('.main_news');
	if (main_news) {
		let start_date = new Date();
		let end_date = new Date();
		let delay = 3000;
		end_date.setDate(start_date.getDate() + 7)
		fetch('https://cors-anywhere.herokuapp.com/https://russiarunning.com/api/events/list/ru', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': '1:1'
			},
			mode: 'cors', 
			cache: 'no-cache',
			body: JSON.stringify(
				{
					"Take": 2,
					"Id": "run",
					"Name": "БЕГ",
					"DateFrom": start_date,
					"DateTo": end_date
				}
			)
		}).then((response) => {
			return response.json();
		}).then((resp) => {
				let name_month = new Array("января", "февраля", "марта", "апреля", "мая", "июня",
					"июля", "августа", "сентября", "октября", "ноября", "декабря");
				let main_news_calendar = document.querySelector('.main_news_calendar');
				let preloader = document.querySelector('.preloader');
				let main_news_calendar_item_img = document.querySelectorAll('.main_news_calendar_item_img');
				let main_news_calendar_item_head = document.querySelectorAll('.main_news_calendar_item_head');
				let main_news_calendar_item_location = document.querySelectorAll('.main_news_calendar_item_location');
				let main_news_calendar_item_desc_date = document.querySelectorAll('.main_news_calendar_item_desc_date');
				let main_news_more = document.querySelector('.main_news_more');
				let main_news_calendar_item_desc = document.querySelectorAll('.main_news_calendar_item_desc');

				for (let i in resp.Items) {
					let item = resp.Items[i]
					let date = new Date(item.d)
					main_news_calendar_item_desc_date[i].innerHTML = `${date.getDate()} ${name_month[date.getMonth()]}`
					if (item.hiu) {
						main_news_calendar_item_img[i].src = item.hiu;
					}
					if (item.t) {
						main_news_calendar_item_head[i].innerHTML = item.t;
					}
					if (item.CityName || item.p) {
						main_news_calendar_item_location[i].innerHTML = `${item.CityName || item.p}`;
					}
					for (let j in item.ri) {
						let dist = item.ri[j]
						if (dist.d > 0) {
							if (j < 2) {
								let p = document.createElement('p');
								p.classList.add('main_news_calendar_item_desc_distance');
								p.innerHTML = `${dist.d}км`
								main_news_calendar_item_desc[i].append(p);
							} else if (j == 2){
								let p = document.createElement('p');
								p.classList.add('main_news_calendar_item_desc_distance');
								p.innerHTML = `...`
								main_news_calendar_item_desc[i].append(p);
							}
						}
					}
				}
				main_news_more.innerHTML = `Еще ${resp.TotalCount} событий`;
				setTimeout(function(){
					preloader.classList.remove('isActive')
					main_news_calendar.classList.add('isActive')
				}, delay)
		}).catch((err) => {
			console.log(err)
		});
		let tabCalendar = document.querySelector('.tabCalendar');
		let tabsCalendar = document.querySelector('.tabsCalendar');

		let tabNews = document.querySelector('.tabNews');
		let tabsNews = document.querySelector('.tabsNews');

		tabCalendar.addEventListener('click', function(){
			tabCalendar.classList.add('isActive');
			tabsCalendar.classList.add('isActive');
			tabNews.classList.remove('isActive');
			tabsNews.classList.remove('isActive');
		})
		tabNews.addEventListener('click', function(){
			tabNews.classList.add('isActive');
			tabsNews.classList.add('isActive');
			tabCalendar.classList.remove('isActive');
			tabsCalendar.classList.remove('isActive');
		})
		fetch('https://news.run-rus.com/wp-json/wp/v2/posts?per_page=2'
		).then((response) => {
			return response.json();
		}).then((resp) => {
			let main_news_item_img = document.querySelectorAll('.main_news_item_img');
			let main_news_item_head = document.querySelectorAll('.main_news_item_head');
			let main_news_item_date = document.querySelectorAll('.main_news_item_date');
			for (let i in resp) { 
				fetch(`https://news.run-rus.com/wp-json/wp/v2/media/${resp[i].featured_media}`
				).then((response) => {
					return response.json();
				}).then((resp) => {
					if (resp.source_url !== undefined) {
						main_news_item_img[i].src = resp.source_url
					}
				}).catch((err) => {
					console.log(err)
				});
				let date = new Date(resp[i].date);
				main_news_item_date[i].innerHTML = date.toLocaleDateString("ru-RU")
				main_news_item_head[i].innerHTML = resp[i].title.rendered
				main_news_item_head[i].href = resp[i].link
			}
			// resp.forEach(e => {
			// 	console.dir(e);
			// 	console.log(e.id);
			// })
		}).catch((err) => {
			console.log(err)
		});
	}
});