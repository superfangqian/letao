//进度条
$( document ).ajaxStart(function() {
  // 开启进度条
  NProgress.start();
})

$( document ).ajaxStop(function() {
  // 模拟网络延迟
  setTimeout(function() {
    // 关闭进度条
    NProgress.done();
  },500)
});



// 点击分类管理展开列表
$(function () {
  $('.category').click(function () {
    $(this).next().stop().slideToggle();
  })




  //左侧侧边栏切换
  $('.icon-left').click(function () {
    $('.lt_aside').toggleClass('hidemenu');
    $('.lt_toolbar').toggleClass('hideMenu');
    $('.lt_main').toggleClass('hideMenu');

  })


  $('.icon-right').click(function () {
    $('#logoutModel').modal('show');
  })

  // (2) 点击退出模态框的退出按钮, 完成退出功能
  // 发送ajax请求, 让后台销毁当前用户的登录状态

  $('#logoutBtn').click(function(){
    $.ajax({
      type:'get',
      url:'/employee/employeeLogout',
      dataType:'json',
      success:function(info){
        console.log(info);
        if(info.success){
          //退出成功跳到登录页
          location.href='login.html';
        }
      }
    })
  })
})

