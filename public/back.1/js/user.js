
$(function () {

  var currentPage = 1;
  var pageSize = 5;

  var currentId;//获取当前用户 的id
  var isDelete; //获取当前按钮的状态

  render();
  function render() {
    $.ajax({
      type: 'get',
      url: '/user/queryUser',
      dataType: 'json',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (info) {
        console.log(info);
        var htmlStr = template('tmp', info);
        $('tbody').html(htmlStr);

        //分页
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage:info.page,//当前页
          totalPages:Math.ceil(info.total/info.size),//总页数
          // size:"small",//设置控件的大小，mini, small, normal,large
          onPageClicked:function(a, b,c,page){
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage = page;
            render();
          }
        });
        

      }
    })
  }


  $('tbody').on('click', '.btn', function () {
    // console.log(111);

    $('#userModel').modal('show');

    currentId = $(this).parent().data('id');
    // alert(currentId);

    isDelete = $(this).hasClass('btn-danger') ? '0' : '1';
    // alert(idDelete)


    $('#comfirm').click(function () {
      $.ajax({
        url: '/user/updateUser',
        type: 'post',
        dataType: 'json',
        data: {
          id: currentId,
          isDelete: isDelete
        },
        success: function (info) {
          console.log(info);

          if (info.success) {
            //关闭模态框
            $('#userModel').modal('hide');
            //重新渲染
            render();
          }
        }
      })
    })
  })
})