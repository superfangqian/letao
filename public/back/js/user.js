

$(function () {
  var currantPage = 1;
  var pageSize = 5;

  var currentId;//获取当前用户的ID
  var isDelete; //修改的状态

  //渲染页面
  render();
  function render() {
    $.ajax({
      type: 'get',
      url: '/user/queryUser',
      dataType: 'json',
      data: {
        page: currantPage,
        pageSize: pageSize
      },
      success: function (info) {
        console.log(info);
        var htmlStr = template('tmp', info);
        $('tbody').html(htmlStr);


        // 分页   在ajax请求回来后, 根据最新的数据, 进行初始化分页插件
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: info.page,//当前页
          totalPages: Math.ceil(info.total/info.size),//总页数
          // size:"small",//设置控件的大小，mini, small, normal,large
          onPageClicked: function (a, b, c, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            console.log(page);
            //更新当前页
            currantPage = page;
            //重新渲染
            render();
          }
        });
      }

    })
  };




  //点击禁用按钮，弹出模态框
  $('tbody').on('click','.btn',function(){
    $('#userModal').modal('show');


    //获取用户的ID 
    currentId = $(this).parent().data('id');
    // alert(currentId);

    // //根据按钮的类名，决定修改成什么状态  
    //判断是禁用按钮吗？0:1
    isDelete = $(this).hasClass('btn-danger') ? 0:1;
    // alert(isDelete);


    //模态框确认按钮被点击，发送ajax请求，进行修改用户状态
    $('#comfirm').click(function(){
      $.ajax({
        type:'post',
        url:'/user/updateUser',
        data:{
          id:currentId,
          isDelete:isDelete
        },
        dataType:'json',
        success:function(info){
          console.log(info);
          if(info.success){
            //关闭模态框
            $('#userModal').modal('hide');

            //重新渲染页面
            render();

          }
          
        }
        
      })
    })



  })

 





})