/***************** Waypoints ******************/

$(document).ready(function() {
	setWaypoint();
});

function setWaypoint() {
	$('.wp-text.wp-down,.wp-text.wp-down').waypoint(function() {
		$(this).addClass('animated fadeInDown');
	}, {
		offset: '90%'
	});
	$('.wp-talk.wp-left').waypoint(function() {
		$(this).addClass('animated fadeInLeft');
	}, {
		offset: '90%'
	});
	$('.wp-talk.wp-right').waypoint(function() {
		$(this).addClass('animated fadeInRight');
	}, {
		offset: '90%'
	});
}

/***************** Slide-In Nav ******************/

$(window).load(function() {

	$('#nav-toggle').click(function() {
		$('#top-nav-pull').slideToggle();
	});

});

/***************** Smooth Scrolling ******************/

$(function() {

	$('a[href*=#]:not([href=#])').click(function() {
		if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {

			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 2000);
				return false;
			}
		}
	});

});

/***************** Nav Transformicon ******************/

document.querySelector("#nav-toggle").addEventListener("click", function() {
	this.classList.toggle("active");
});

