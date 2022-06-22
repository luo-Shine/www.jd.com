import $ from '../jQuery/jquery.js';

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
}).catch(xhr => {
  console.log(xhr.status);
});