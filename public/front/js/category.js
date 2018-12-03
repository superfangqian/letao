

$(function(){

  $.ajax({
    url:'/category/queryTopCategory',
    type:'get',
    dataType:'json',
    success:function(info){
      console.log(info);

      var htmlStr = template('category',info);
      $('.lt_category_left ul').html(htmlStr);
      // console.log(info.rows[0].id);
      render(info.rows[0].id); 

    }
  });

  $('.lt_category_left ul').on('click','a',function(){
    //让点击的高亮，排他
    $('.lt_category_left ul a').removeClass('current');
    $(this).addClass('current');

    // 获取id渲染右边
    var id = $(this).data('id');
    render(id);

  })

  //渲染右边,根据一级分类的id
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
        $('.lt_category_right ul').html(htmlStr)
      }
    })
  }
})