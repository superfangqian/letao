

$(function () {
  var currentPage = 1;
  var pageSize = 5

  render();
  function render() {
    $.ajax({
      url: '/category/queryTopCategoryPaging',
      type: 'get',
      dataType: 'json',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (info) {
        // console.log(info);
        var htmlStr = template('first', info);
        $('tbody').html(htmlStr);


        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: info.page,//当前页
          totalPages: Math.ceil(info.total / info.size),//总页数
          onPageClicked: function (a, b, c, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            // console.log(page);
            //更新当前页
            currentPage = page;
            //重新渲染页面
            render();
          }
        })

      }
    })
  }



  //点击添加按钮，弹出个模态框
  $('#addBtn').click(function () {
    $('#firstModal').modal('show')
  })


  //进行表单校验，不能为空
  $('#form').bootstrapValidator({
    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: '请输入一级分类名称'
          }
        }
      }
    }
  });



  //提交，阻止默认提交，用ajax提交
  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
      type:'post',
      url:'/category/addTopCategory',
      dataType:'json',
      data:$('#form').serialize(),
      success:function(info){
        if(info.success){
          //关闭模态框
          $('#firstModal').modal('hide');
          //重新渲染,渲染第一页
          currentPage = 1;
          render();

        

          //添加完成后，重置表单
          $('#form').data('bootstrapValidator').resetForm(true);//添加true表示状态和内容都重置
        }
      }
    })
});
})