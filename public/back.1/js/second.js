

$(function () {
  var currentPage = 1;
  var pageSize = 5;

  //1.渲染页面
  render();
  function render() {
    $.ajax({
      url: '/category/querySecondCategoryPaging',
      type: 'get',
      dataType: 'json',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (info) {
        console.log(info);
        var htmlStr = template('second', info);
        $('tbody').html(htmlStr);

        //2.分页
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: info.page,//当前页
          totalPages: Math.ceil(info.total / info.size),//总页数
          onPageClicked: function (a, b, c, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage = page;
            //重新渲染页面
            render();
          }
        });

      }
    })
  }


  //3.点击添加分类按钮，弹出模态框
  $('#addBtn').click(function () {
    $('#secondModal').modal('show');



    //模板渲染下拉列表
    $.ajax({
      url: '/category/queryTopCategoryPaging',
      type: 'get',
      dataType: 'json',
      data: {
        page: 1,
        pageSize: 100,
      },
      success: function (info) {
        console.log(info);
        var htmlStr = template('dropdown', info);
        $('.dropdown-menu').html(htmlStr);
      }
    })
  });


  //4.获取下拉列表的值赋值给一级分类按钮，然后把值设置给隐藏域
  $('.dropdown-menu').on('click', 'a', function () {
    var txt = $(this).text();
    $('.textinfo').text(txt);

    var id = $(this).data('id');

    //设置给隐藏域
    $('[name="categoryId"]').val(id);

    $('#form').data('bootstrapValidator').updateStatus('categoryId','VALID');
  })

  // 5. 配置文件上传插件, 让插件发送异步文件上传请求
  $("#fileupload").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      console.log(data.result);

      var picObj = data.result;

      var picUrl = picObj.picAddr;
      $('#imgBox img').attr('src', picUrl);

      $('[name="brandLogo"]').val(picUrl);

      $('#form').data('bootstrapValidator').updateStatus('brandLogo','VALID');
    }
  });

  // 6.表单校验功能
  $('#form').bootstrapValidator({
    excluded: [],// //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    fields:{
      categoryId:{
        validators:{
          notEmpty:{
            message:'请填写一级分类'
          }
        }
      },
      brandName:{
        validators:{
          notEmpty:{
            message:'请输入二级分类名称'
          }
        }
      },
      brandLogo:{
        validators:{
          notEmpty:{
            message:'请上传图片'
          }
        }
      }
    }

  })

  //7.表单提交
  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
      url:'/category/addSecondCategory',
      type:'post',
      dataType:'json',
      data:$('#form').serialize(),
      success:function(info){
        console.log(info);
        //关闭模态框
        $('#secondModal').modal('hide');

        currentPage = 1;
        render();

        //重置表单
        $('#form').data('bootstrapValidator').resetForm(true);

        $('.textinfo').text('请输入一级分类');
        $('#imgBox img').attr('src','./images/none.png');
        
      }
    })
});



})