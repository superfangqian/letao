// 1.渲染页面
$(function () {
  var currentPage = 1;
  var pageSize = 5;

  //存储图片对象，因为要提交三张图片，用数组存储
  var picArr = [];

  render();
  function render() {
    $.ajax({
      url: '/product/queryProductDetailList',
      type: 'get',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);

        var htmlStr = template('product', info);
        $('tbody').html(htmlStr);

        //2.分页，根据页面数据做分页
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,//版本号
          currentPage: currentPage,//当前页
          totalPages: Math.ceil(info.total / info.size),//总页数
          onPageClicked: function (a, b, c, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            console.log(info);
            //根据当前页码跳到对应页面
            currentPage = page;
            render();
          }
        })
      }
    })
  }

  // 3.点击添加商品按钮，弹出模态框
  $('#addBtn').click(function () {
    $('#productModal').modal('show');

    // 4.发送ajax请求, 请求所有的二级分类列表
    $.ajax({
      url: '/category/querySecondCategoryPaging',
      type: 'get',
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);
        var htmlStr = template('second', info);
        $('.dropdown-menu').html(htmlStr);

      }
    })
  })

  //5.给二级分类的下拉列表添加事件，
  $('.dropdown-menu').on('click', 'a', function () {
    var txt = $(this).text();
    $('#dropdownText').text(txt);

    // 获取id, 赋值给隐藏域
    var id = $(this).data('id');
    $('[name = "brandId"]').val(id);

    //手动改状态,因为不是表单元素，需要手动改
    $('#form').data('bootstrapValidator').updateStatus('brandId','VALID');
  })


  //6.配置文件上传插件  图片显示
  $("#fileupload").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      console.log(data.result);
      //获取到图片地址
      var objStr = data.result;

      // 将上传的图片对象(图片地址和名称) 添加到数组最前面
      picArr.unshift(objStr);

      //获取图片
      var objPic = objStr.picAddr;

      // 将每次上传完成的图片, 显示在结构最前面
      $('#imgBox').prepend('<img src="' + objPic + '" style="width: 100px;">')

      if (picArr.length > 3) {
        picArr.pop();//删除数组中的最后一张图片

        //最后一张图片移除
        $('#imgBox img:last-of-type').remove();

      }

      if ( picArr.length === 3 ) {
        $('#form').data("bootstrapValidator").updateStatus("picStatus", "VALID");
      }


    }
  });


  //7.表单提交
  $('#form').bootstrapValidator({
    // 重置排除项, 都校验, 不排除
    excluded: [],

    // 配置校验图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',    // 校验成功
      invalid: 'glyphicon glyphicon-remove',   // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },

    // 配置校验字段
    fields: {
      brandId: {
        validators: {
          notEmpty: {
            message: "请选择二级分类"
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: "请输入商品名称"
          }
        }
      },
      proDesc:{
        validators:{
          notEmpty:{
            message:'请输入商品描述'
          }
        }
      },
      num:{
        validators:{
          notEmpty:{
            message:'请输入商品库存'
          },
          regexp:{
            regexp:/^[1-9]\d*$/,
            message:'必须是以非零开头的数字'
          }
        }
      },
      size:{
        validators:{
          notEmpty:{
            message:'请输入商品尺码'
          },
          regexp:{
            regexp:/^\d{2}-\d{2}$/,
            message:'请输入正确的格式，例如：34-46'
          }
        }
      },
      oldPrice:{
        validators:{
          notEmpty:{
            message:'原件不能为空',
          }
        }
      },
      price:{
        validators:{
          notEmpty:{
            message:'现价不能为空'
          }
        }
      },
      picStatus:{
        validators:{
          notEmpty:{
            message:'请上传三张图片'
          }
        }
      }

    }
  });


  $('#form').on('success.form.bv',function(e){
    //阻止默认提交
    e.preventDefault();

   var paramsStr = $('#form').serialize();

    //  还需要拼接上图片数据
    // key=value&key1=value1&key2=value2;
    // 多个参数之间, 通过 & 分隔, 每个键值对, 通过 = 分开
    // paramsStr += "&picName1=xx&picAddr1=xx";
    paramsStr += "&picName1="+picArr[0].picName+"&picAddr1="+picArr[0].picAddr;
    paramsStr += "&picName2="+picArr[1].picName+"&picAddr2="+picArr[1].picAddr;
    paramsStr += "&picName3="+picArr[2].picName+"&picAddr3="+picArr[2].picAddr;

    $.ajax({
      type:'post',
      url:'/product/addProduct',
      dataType:'json',
      data:paramsStr,
      success:function(info){
        console.log(info);
        if(info.success){
          //隐藏模态框
          $('#productModal').modal('hide');
          //添加到当前页
          currentPage = 1;
          //重新渲染页面
          render();

          //重置内容和状态
          $('#form').data('bootstrapValidator').resetForm(true);


          //手动重置下拉菜单和图片
          $('#dropdownText').text('请输入二级分类')
          $('#imgBox img').remove();
          picArr = [];
        
       
        }
      }
    })
  })
})