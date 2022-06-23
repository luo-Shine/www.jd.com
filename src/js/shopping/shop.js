import $ from '../jQuery/jquery.js';
import cookie from '../cookie/cookie.js';

let shop = cookie.get('shop');

shop = JSON.parse(shop);
console.log(shop);

let idList = shop.map(el => el.id).join();

$.ajax({
  type: "get",
  url: "../interface/shop.php",
  data: { idList },
  dataType: "json"
}).then(res => {
  let template = '';
  res.forEach((el, i) => {
    let pic = JSON.parse(el.picture);

    let current = shop.filter(elm => elm.id === el.id);

    template += ` <div class="goods_tbody">
    <div class="goods_shop">
      <div class="goods_checkbox">
        <input type="checkbox">
      </div>
      <span class="shop_text">
        <a href="#">人民邮电出版社</a>
        <i></i>
      </span>
    </div>
    <div class="goods_item">
      <div class="item_list">
        <div class="item_form">
          <div class="cell p-checkbox">
            <div><input type="checkbox" id='checked'></div>
          </div>
          <div class="cell p-goods">
            <div class="p-goods-ite">
              <div class="p-img">
                <a href="#"><img src="./${pic[0].src}" alt=""></a>
              </div>
              <div class="p-msg">
                <div class="p-name"><a href="#">${el.title}</a></div>
                <div class="p-extend"><img src="./img/jd_shopping9.png" alt=""></div>
              </div>
            </div>
          </div>
          <div class="cell p-props">
            <div class="props_txt">JavaScript忍者秘籍 第2版</div>
          </div>
          <div class="cell p-price">
            <span class="price_count">￥${(+el.price).toFixed(2)}</span>
          </div>
          <div class="cell p-quantity">
            <div class="cart_number">
              <button class="cart_dec">
                <i>-</i>
              </button>
              <div class="cart_input">
                <input type="" class="cart-input-o" min="1" max="1000" value="${current[0].num}">
              </div>
              <button class="cart_int">
                <i>+</i>
              </button>
            </div>
          </div>
          <div class="cell p-sum">
            <strong>￥${(el.price * current[0].num).toFixed(2)}</strong>
          </div>
          <div class="cell p-ops">
            <a href="#none" class="removeitem" data-id="${el.id}">删除</a>
            <a href="#none">移入关注</a>
          </div>
        </div>
      </div>
    </div>
  </div>`;
  });

  $('.goods_shops').html(template);

  $('.goods_shops .removeitem').on('click', function () {
    let res = shop.filter(el => el.id != $(this).attr('data-id')); // 筛选被点击的元素
    cookie.set('shop', JSON.stringify(res)); // 剩余内容写回cookie
    location.reload();// 刷新页面
    
  });

  $('#money_countall').on('click',function(){
    console.log($('.countall').text());
    console.log($('.price_count'));
  })

}).catch(xhr => {
  console.log(xhr.status);
});

window.onload = function(){  //结算鼠标滑动事件
  let btn = document.querySelector('#money_countall');
  let countsum = document.querySelector('.countall');
  let check = document.querySelector('#checked');
  btn.onmouseover = function(){
    btn.style.background = 'yellowgreen';
  }
  btn.onmouseout = function(){
    btn.style.background = '#e54346'
  }
}
