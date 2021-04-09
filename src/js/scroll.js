//全屏自适应轮播
$(function () {
	var num = 0;
	$('.ui-controls ul li').click(function () {
		$(this).addClass('current').siblings().removeClass('current');
		$('.banner-main-img ul li').eq($(this).index()).fadeIn(300);
		$('.banner-main-img ul li').eq($(this).index()).siblings().fadeOut(300);
		num = $(this).index();
	})
	var myfn = function () {
		$('.ui-controls ul li').eq(num).addClass('current').siblings().removeClass('current');
		$('.banner-main-img ul li').eq(num).fadeIn(300);
		$('.banner-main-img ul li').eq(num).siblings().fadeOut(300);
	}
	$('.ui-next').click(function () {
		num++;
		if (num > 4) {
			num = 0;
		}
		myfn();
	})
	$('.ui-prev').click(function () {
		num--;
		if (num < 0) {
			num = 4;
		}
		myfn();
	})
	//基本定时器功能
	var timer01 = null;
	timer01 = setInterval(function () {
		num++;
		if (num > 4) {
			num = 0;
		}
		myfn();
	}, 3000)
	//鼠标移入/暂停定时器
	$('.banner-main').hover(function () {
		clearInterval(timer01);
	}, function () {
		timer01 = setInterval(function () {
			num++;
			if (num > 4) {
				num = 0;
			}
			myfn();
		}, 3000)
	})
})