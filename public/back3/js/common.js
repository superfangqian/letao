// 进度条
$(document).ajaxStart(function () {
  //开启进度条
  NProgress.start();
});

$(document).ajaxStart(function () {
  setTimeout(function(){
    //关闭进度条
    NProgress.done();
  },500)
});



$(function(){
  //点击导航，展开列表
  $('.category').click(function(){
    $(this).next().stop().slideToggle('active');
  })


  $('.icon_left').click(function(){
    $('.lt_aside').toggleClass('hideMenu');
    $('.lt_toolbar').toggleClass('hideMenu');
    $('.lt_main').toggleClass('hideMenu');
  })


  //模态框退出功能
  $('.icon_right').click(function(){
    $('#logouModal').modal('show');
  })

  $('#logoutBtn').click(function(){
    $.ajax({
      type:'get',
      url:'/employee/employeeLogout',
      dataType:'json',
      success:function(info){
        console.log(info);
        if(info.success){
          location.href='login.html';
        } 
      }
    })
  })


})
