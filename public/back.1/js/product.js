


$(function () {

  var currentPage = 1;
  var pageSize = 5;

  var picArr = [];//定义一个空数组，存放图片
  render();
  function render() {
    $.ajax({
      url: '/product/queryProductDetailList',
      type: 'get',
      dataType: 'json',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (info) {
        console.log(info);

        var htmlStr = template('product', info);
        $('tbody').html(htmlStr);

        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: info.page,//当前页
          totalPages: Math.ceil(info.total / info.size),//总页数
          onPageClicked: function (a, b, c, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage = page;
            render();
          }
        });


      }
    })
  }

  //点击添加商品按钮，弹出模态框
  $('#addBtn').click(function () {
    $('#productModal').modal('show');

    //点击下拉菜单，渲染请选择二级分类
    $.ajax({
      url: '/category/querySecondCategoryPaging',
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

  //给请选择二级分类的下拉菜单注册点击事件，让下拉菜单的内容能跟着选择替换
  $('.dropdown-menu').on('click', 'a', function () {
    var txt = $(this).text();

    $('.textinfo').text(txt);
    //获取id
    var id = $(this).data('id');

    //赋值给隐藏域
    $('[name="brandId"]').val(id);

    $('#form').data('bootstrapValidator').updateStatus('brandId','VALID');
  })

  $("#fileupload").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      console.log(data.result);

      var picObj = data.result;
      //在数组的最前面添加图片
      picArr.unshift(picObj);

      var picUrl = picObj.picAddr;

      $('#imgBox').prepend('<img src="' + picUrl + '" style="width: 100px;">');
      // console.log(111);


      if (picArr.length > 3) {
        //大于3就删除数组里最后一张
        picArr.pop();

        $('#imgBox img:last-of-type').remove();//移除最后一张图片

      }

      if(picArr.length == 3){
        $('#form').data('bootstrapValidator').updateStatus('picStatus','VALID')
      }
    }
  });

  //表单校验
  $('#form').bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    excluded: [],
    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      brandId:{
        validators:{
          notEmpty:{
            message:'请选择二级分类'
          }
        }
      },
      proName:{
        validators:{
          notEmpty:{
            message:'请输入商品名称'
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
            message:'请输入商品描述'
          },
          regexp:{
            regexp:/^[1-9]\d*$/,
            message:'必须是非零开头的数字'
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
            message:'尺码格式, 必须是 xx-xx格式, xx为两位数字, 例如 36-44'
          }
        }
      },
      oldPrice:{
        validators:{
          notEmpty:{
            message:'请输入商品原价'
          }
        }
      },
      price:{
        validators:{
          notEmpty:{
            message:'请输入商品现价'
          }
        }
      },
      picStatus:{
        validators:{
          notEmpty:{
            message:'请上传3张图片'
          }
        }
      },
    }
  })

  //提交表单，阻止默认提交，用ajax提交
  $('#form').on('success.form.bv',function(e){
    e.preventDefault();//阻止默认提交

    var paramsStr = $('#form').serialize();//表单中所有的元素

    paramsStr +='&picName1='+picArr[0].picName+'&picAddr1='+picArr[0].picAddr;
    paramsStr +='&picName2='+picArr[1].picName+'&picAddr2='+picArr[1].picAddr;
    paramsStr +='&picName3='+picArr[2].picName+'&picAddr3='+picArr[2].picAddr;

    $.ajax({
      url:'/product/addProduct',
      type:'post',
      data:paramsStr,
      dataType:'json',
      success:function(info){
        console.log(info);
        //关闭模态框
        $('#productModal').modal('hide');
        currentPage = 1;
        render();


        //重置表单
        $('#form').data('bootstrapValidator').resetForm(true);

        //下拉菜单和图片需要手动重置
        $('.textinfo').text('请选择二级分类');
        $('#imgBox img').remove();
        picArr = []; 
      }
    })
  })
})