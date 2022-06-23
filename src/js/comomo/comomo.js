import $ from '../jQuery/jquery.js';
import cookie from '../cookie/cookie.js';

// 详情页commo渲染
let id = location.search.split('=')[1];
console.log(id);
$.ajax({
  type: "get",
  url: "../interface/getcomomo.php",
  data: { id },
  dataType: "json"
}).then(res => {
  let pic = JSON.parse(res.picture);
  console.log(pic);

  let template = `<div class="title_price">￥<span>${res.price}.00</span></div>
  <img src="./${pic[0].src}" alt="">
  <span class="titlena">${res.title}</span>`;

  $('.get_title').html(template);

  $('#additem').on('click',function(){
    addItem(res.id, $('#num').val());
  });

}).catch(xhr => {
  console.log(xhr.status);
});

function addItem(id, num) {
  let product = { id, num };
  // console.log(product)

  let shop = cookie.get('shop'); // 从cookie中获得数据


  if (shop) { // 判断是否获得到数据
    shop = JSON.parse(shop);

    // 当商品id在cookie数据中已经存在时 需要修改数量 而不是添加商品
    if (shop.some(el => el.id == id)) {
      let index = shop.findIndex(elm => elm.id == id); // 获得商品对象在数组中的索引
      let count = parseInt(shop[index].num);
      count += parseInt(num);
      shop[index].num = count;
    } else {
      shop.push(product);
    }


  } else {
    shop = [];
    shop.push(product);
  }

  cookie.set('shop', JSON.stringify(shop));  // 将数组转换成JSON字符串存入cookie
}

window.onload = function(){   //购物车鼠标滑动事件
  let add = document.querySelector('#additem');
  add.onmouseover = function(){
    add.style.backgroundColor = 'yellowgreen';
  }
  add.onmouseout = function(){
    add.style.backgroundColor = '#e54346'
  }
}