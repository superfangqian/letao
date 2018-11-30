

$(function () {

  var currentPage = 1;//获取当前页
  var pageSize = 5; //当前页的数量
  render();
  function render() {
    $.ajax({
      url: '/category/queryTopCategoryPaging',
      type: 'get',
      data: {
        page: currentPage,
        pageSize: pageSize,
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);


        // 渲染到页面
        var htmlStr = template('first', info);
        $('tbody').html(htmlStr)

        // 根据数据渲染页数
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: info.page,//当前页
          totalPages: Math.ceil(info.total / info.size),//总页数
          onPageClicked: function (a, b, c, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            //渲染当前页
            // console.log(page);
            currentPage = page;
            render();
          }
        });

      }
    })
  };


  //点击添加分类按钮，弹出模态框
  $('#addBtn').click(function () {
    $('#addModal').modal('show');


  })

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
            message: '请填写一级分类'
          }
        }

      }
    }
  })

  
 $('#form').on('success.form.bv',function(e){
   //阻止默认提交
  e.preventDefault();
  //发送ajax
  $.ajax({
    url:'/category/addTopCategory',
    type:'post',
    data:$('#form').serialize(),
    dataType:'json',
    success:function(info){
      console.log(info);
      if(info.success){
        $('#addModal').modal('hide');
        currentPage = 1;
        render();


        $('#form').data('bootstrapValidator').resetForm(true);
      } 
    }
  })


 })

})