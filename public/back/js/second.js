

$(function () {
  var currentPage = 1;
  var pageSize = 5;

  render();
  //1.渲染页面
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
            //渲染页面
            render();
          }
        });
      }

    })
  }


  //3.点击按钮，弹出模态框
  $('#addBtn').click(function () {
    $('#secondModal').modal('show');

    $.ajax({
      url: '/category/queryTopCategoryPaging',
      type: 'get',
      dataType: 'json',
      data: {
        page: 1,
        pageSize: 100
      },
      success: function (info) {
        console.log(info);

        var htmlStr = template('dropdown', info);
        $('.dropdown-menu').html(htmlStr);

      }
    })
  })

  //4.点击，给下拉列表的 a 添加点击事件(通过事件委托实现)
  $('.dropdown-menu').on('click', 'a', function () {
    //获取文本值
    var txt = $(this).text();
    //设置给按钮
    $('#dropdownText').text(txt);

    // 获取下拉菜单的选择，赋值给隐藏域
    var id = $(this).data('id');
    $('[name = "categoryId"]').val(id);

    //下拉菜单的校验状态
    $('#form').data('bootstrapValidator').updateStatus('categoryId','VALID');


  })

  $("#fileupload").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      console.log(data);

      //获取返回的图片地址
      var imgUrl = data.result;
      //获取后台返回的数据
      var picUrl = imgUrl.picAddr;
      //赋值给img 的src
      $('#imgBox img').attr('src', picUrl);


      //给隐藏域设置图片地址
      $('[name = "brandLogo"]').val(picUrl);

       // 调用updateStatus更新隐藏域 校验状态成 VALID
       $('#form').data('bootstrapValidator').updateStatus('brandLogo','VALID')

    }
  });

  $('#form').bootstrapValidator({
    excluded: [],
    // 配置校验图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',    // 校验成功
      invalid: 'glyphicon glyphicon-remove',   // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },

    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message: '请输入一级分类'
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: '请输入二级分类名称'
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: '请上传图片'
          }
        }
      },
    }
  })










})