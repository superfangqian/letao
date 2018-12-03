

$(function(){
  currentPage = 1;
  pageSize = 5;

  var picArr = [];//存放图片的数组



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

        //分页
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

  //点击按钮，弹出模态框
  $('#addBtn').click(function(){
    $('#productModal').modal('show');

    $.ajax({
      url:'/category/querySecondCategoryPaging',
      type:'get',
      data:{
        page:1,
        pageSize:100
      },
      dataType:'json',
      success:function(info){
        console.log(info);

        var htmlStr = template('dropdown',info);
        $('.dropdown-menu').html(htmlStr);  
      }
    })
  })

  //点击添加二级分类，选择元素
  $('.dropdown-menu').on('click','a',function(){
    var txt = $(this).text();
    $('#dropdownText').text(txt);

    var id = $(this).data('id');
    $('[name="brandId"]').val(id);
  })


  //添加图片
  $("#fileupload").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      console.log(data.result);

      var picObj = data.result;

      picArr.unshift(picObj)


      
    }
});


})