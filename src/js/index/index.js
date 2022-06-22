import Swiper from '../swiper-7.4.1/swiper/swiper-bundle.esm.browser.js';
import $ from '../jQuery/jquery.js';

let mySwiper1 = new Swiper('.swiper1',{
 loop: true,
 autoplay: {
  delay: 2000, //2秒切换一次
},
 navigation: {
  nextEl: '.swiper-button-next',
  prevEl: '.swiper-button-prev',
},
 pagination: {
  el: '.swiper-pagination',
},
});

let mySwiper2 = new Swiper('.swiper2',{
  loop: true,
  autoplay: {
    delay: 3000, //3秒切换一次
  },
 });

 let mySwiper3 = new Swiper('.swiper3',{
  slidesPerView: 4,
  slidesPerGroup: 4,
  loop: true,
  loopFillGroupWithBlank: true,
  navigation: {
   nextEl: '.swiper-button-next',
   prevEl: '.swiper-button-prev',
 },
 });

 let mySwiper4 = new Swiper('.swiper4',{
  loop: true,
  autoplay: {
    delay: 1000, //1秒切换一次
  },
  pagination: {
    el: '.swiper-pagination',
  },
 });

 let mySwiper5 = new Swiper('.swiper5', {
  effect: 'coverflow',
  slidesPerView: 3,
  centeredSlides: true,
  loop: true,
  autoplay: {
    delay: 2000, //2秒切换一次
  },
});

let mySwiper6 = new Swiper('.swiper6', {
  loop: true,
  autoplay: {
    delay: 2000, //2秒切换一次
  },
});

let mySwiper7 = new Swiper('.swiper7', {
  spaceBetween: 10,		
        centeredSlides: false,
	slidesPerView: 5,
        touchRatio: 0.2,
        slideToClickedSlide: true,
	autoplay: {
			delay:0,
			disableOnInteraction: false,
	},
	freeMode:true,
	speed: 3000,
	loop: true,		
	breakpoints: {
            1024: {
                slidesPerView: 4
            },
            768: {
                slidesPerView: 3
            }
        },
  scrollbar: {
      el: '.swiper-scrollbar',
      hide: true,
  },      
});
mySwiper7.el.onmouseover = function(){
  mySwiper7.autoplay.stop();
};
mySwiper7.el.onmouseout = function(){
  mySwiper7.autoplay.start();
};

$.fn.extend({      // 选项卡插件
  tabs(options){
    const defaults = {
      ev: 'click',
      active: 'active',
      display: 'display'
    }
    $.extend(defaults,options);
    let btns = this.children('ul').children('li');
    let contents = this.children('div');
    btns.on(defaults.ev,function(){
      let index = btns.index(this);
      $(this).addClass(defaults.active).siblings().removeClass(defaults.active);
      contents.eq(index).addClass(defaults.display).siblings().removeClass(defaults.display);
    });
  }
});
$(function(){
  $('.part1_tabs').tabs({ev: 'mouseover', display: 'disp'});
  $('.part3_tabs').tabs({ev: 'mouseover', display: 'disp'});
});

$(function () {    //楼梯效果
  $('#menu>li>a').on('click', function () {
    let target = $('#' + $(this).attr('data-id'));
    let top = target.offset().top;  // 元素距离视口顶部的距离
    $('html,body').animate({
      scrollTop: top
    }, 600);
  });

  $(window).on('scroll', function () {
    let scrollTop = $(document).scrollTop();// 获得滚动距离
    let index = Math.round(scrollTop / 1000);// 计算出div的索引

    // $('#elevator').removeClass('elevator_fix');
    // $('#elevator>a').removeClass('elevator_gotop');
    // if($('#elevator').offset().top == 75 + 'px'){
    //   $('#elevator').addClass('elevator_fix');
    //   $('#elevator>a').addClass('elevator_gotop');
    // }
    $('#menu>li>a').removeClass('active');
    $('#menu>li>a:eq(' + index + ')').addClass('active');
  });
});

window.onload = function(){     // 倒计时效果
  let hour = document.querySelector('.timmer_hour');
  let minute = document.querySelector('.timmer_minute');
  let second = document.querySelector('.timmer_second');
  let timer = document.querySelector('.part1_timer');
  setInterval(() => {
    let future = new Date(2022,11,11,0,0,0);
    let now = new Date();
    let count = future - now;
    let t = new Date(count);
    let h = t.getHours();
    let m = t.getMinutes();
    let s = t.getSeconds();
    hour.innerHTML = '' + h;
    minute.innerHTML = '' + m;
    second.innerHTML = '' + s;
    timer.innerHTML = ''.concat(h + "&nbsp;" +  ':' + "&nbsp;" + m + "&nbsp;" + ':' + "&nbsp;" + s)
  }, 1000);
}   

// 首页recom渲染
$.ajax({
  type: "get",
  url: "../interface/getindex.php",
  dataType: "json"
}).then(res => {

  let template = '';

  res.forEach(el => {
    let pic = JSON.parse(el.picture);
    console.log(pic);
    template += ` <li class="recom_shop">
    <a href="./commo.html?id=${el.id}" target="_blank" class="shop_superlink">
      <div class="shop_shopimage"><img src="./${pic[0].src}" alt=""></div>
      <div class="shop_introduce">
        <p class="introduce_content">${el.title}</p>
        <div class="introduce_price">
          <i>￥</i>
          <span class="price_text">${el.price}.
            <span class="price_float">00</span>
          </span>
        </div>
      </div>
      <div class="shop_hover">
        <div class="shop_close"></div>
        <div class="shop_similar">
          <div class="similar_bor">
            <i class="eye"></i>
            <span>找相似</span>
          </div>
        </div>
      </div>
    </a>
  </li>`;
  });

  $('.block_text').html(template);

}).catch(xhr => {
  console.log(xhr.status);
});
