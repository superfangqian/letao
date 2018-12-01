

$(function(){

  var currentPage = 1;
  var pageSize = 5;
  render();
  function render(){
    $.ajax({
      url:'/product/queryProductDetailList',
      type:'get',
      dataType:'json',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function(info){
        console.log(info);

        var htmlStr = template('product',info);
        $('tbody').html(htmlStr);

        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage:info.page,//当前页
          totalPages:Math.ceil(info.total/info.size),//总页数
          onPageClicked:function(a, b, c,page){
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage = page;
            render();
          }
        });
        
        
      }
    })
  }

  //点击添加商品按钮，弹出模态框
  $('#addBtn').click(function(){
    $('#productModal').modal('show');
  })
})