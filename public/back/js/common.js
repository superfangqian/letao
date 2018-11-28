$(document).ajaxStart(function () {
  //开启进度条
  NProgress.start();
});

$(document).ajaxStart(function () {
  //模拟网络延迟
  setTimeout(function(){
    //关闭进度条
    NProgress.done();
  },500)
});

//点击分类管理，下拉菜单展开
$(function(){
  $('.category').click(function(){
    $(this).next().stop().slideToggle();
  })

  $('.icon_left').click(function(){
    $('.lt_aside').toggleClass("hidemenu");
    $('.lt_main').toggleClass('hidemenu');
    $('.lt_toolbar').toggleClass('hidemenu');
  })



  //退出功能
  //点击退出按钮，弹出模态框
  $('.icon_right').click(function(){
    $('#outModal').modal('show');
  })

  $('#outBtn').click(function(){
    $.ajax({
      url:'/employee/employeeLogout',
      type:'get',
      dataType:'json',
      success:function(info){
        //成功的时候跳转
        console.log(info);
        location.href = 'login.html';  
      }
    })
  })
})