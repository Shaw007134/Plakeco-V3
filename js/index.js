layui.use(['carousel', 'element'], function() {
  var carousel = layui.carousel;
  var element = layui.element;
  var $ = layui.jquery;

  // 轮播实例
  carousel.render({
    elem: '#banner',
    width: '100%',
    height: '649px',
    arrow: 'always'
  });

  // 滚动监听
  $(window).scroll(function() {
    var scr = $(document).scrollTop();
    scr > 0 ? $('.nav').addClass('scroll') : $('.nav').removeClass('scroll');
  });

  // 关于内容
  $('.main-about')
    .find('.aboutab')
    .children('li')
    .each(function(index) {
      $(this).on('click', function() {
        $(this)
          .addClass('layui-this')
          .siblings()
          .removeClass('layui-this');
        $('.aboutab')
          .siblings()
          .fadeOut('fast');
        $('.aboutab')
          .siblings()
          .eq(index)
          .fadeIn('');
      });
    });

  // 导航切换
  var btn = $('.nav')
    .find('.nav-list')
    .children('button');

  var spa = btn.children('span');

  var ul = $('.nav')
    .find('.nav-list')
    .children('.layui-nav');

  // 回到顶部
  var topBtn = $('.layui-fixbar-top');
  var setScrollTop = function(thisItem, elemScroll) {
    if (thisItem[0]) {
      var itemTop = thisItem.offset().top,
        winHeight = $(window).height();
      console.log(itemTop);
      console.log(winHeight);
      if (itemTop > winHeight - 120) {
        elemScroll.animate(
          {
            scrollTop: itemTop / 2
          },
          200
        );
      }
    }
  };
  // setScrollTop(topBtn, $("#container"))
  $(window).on('scroll', function() {
    // var winTop = $(window).height();
    // console.log("winTop " + winTop);
    // console.log("topBtn " + topBtn.offset().top);
    if ($(window).scrollTop() > 300) {
      topBtn.removeClass('hidden');
      topBtn.addClass('show');
    } else {
      topBtn.removeClass('show');
      topBtn.addClass('hidden');
    }
  });
  topBtn.on('click', function() {
    console.log('clicked');
    $('html,body').animate(
      {
        scrollTop: 0
      },
      200
    );
  });

  // 头图动画
  $(function() {
    $('.banner')
      .children('.title')
      .addClass('active');
  });

  btn.on('click', function() {
    if (!$(spa[0]).hasClass('spa1')) {
      spa[0].className = 'spa1';
      spa[1].style.display = 'none';
      spa[2].className = 'spa3';
      ul.css('display', 'block');
      ul.addClass('lay-nav-coll');
      ul.children('.layui-nav-item').addClass('lay-nav-coll-item');
      // ul.children('.layui-nav-item').css('line-height', '40px')
      $('.nav')[0].style.height = 90 + ul[0].offsetHeight + 'px';
      console.log($('.nav')[0].style.height);
    } else {
      spa[0].className = '';
      spa[1].style.display = 'block';
      spa[2].className = '';
      ul.removeClass('lay-nav-coll');
      // ul.addClass('lay-nav-hide');
      ul.children('.layui-nav-item').removeClass('lay-nav-coll-item');
      ul.css('display', 'none');
      $('.nav')[0].style.height = 80 + 'px';
    }
  });
});
