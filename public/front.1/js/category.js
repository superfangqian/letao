$(function(){

  $.ajax({
    url:'/category/queryTopCategory',
    type:'get',
    dataType:'json',
    success:function(info){
      console.log(info);
      var htmlStr = template('category',info);
      $('.lt_category_left ul').html(htmlStr);
      
    }
  });

  $('.lt_category_left ul').on('click','a',function(){
    $('.lt_category_left ul a').removeClass('current');
    $(this).addClass('current');

    var id = $(this).data('id');
    render(id);
  })


  function render(id){
    $.ajax({
      url:'/category/querySecondCategory',
      type:'get',
      data:{
        id:id
      },
      dataType:'json',
      success:function(info){
        console.log(info);
        var htmlStr = template('right',info);
        $('.lt_category_right ul').html(htmlStr);
        
      }
    })
  }



})