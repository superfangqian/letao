$(function () {
  // 验证用户名和密码
  $('#form').bootstrapValidator({
    //指定校验时的图标显示，默认是bootstarp风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      //校验用户名
      username: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
          //长度校验
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名长度必须是2到6位'
          },
          callback:{
            message:'用户名不存在'
          }
        }
      },
      password: {
        validators: {
          //不能为空
          notEmpty: {
            message: '密码不能为空'
          },
          //长度校验
          stringLength: {
            min: 6,
            max: 12,
            message: '密码长度必须是6到12位'
          },
          callback:{
            message:'密码错误'
          }
        }
      }

    }
  })



  /*
* 2. 校验成功后, 会触发一个事件, 表单校验成功事件
*    默认是会提交表单的, 页面就跳转了,
*    我们需要注册表单校验成功事件, 在成功事件中, 阻止默认的提交, 通过 ajax 提交
* */
  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
      type: 'post',
      url: '/employee/employeeLogin',
      dateType: 'json',
      data: $('#form').serialize(),
      success: function (info) {
        console.log(info);
        if (info.error == 1000) {
          // alert('用户名不存在');
          $('#form').data("bootstrapValidator").updateStatus( "username", "INVALID", 'callback');
          return;
        }
        if (info.error == 1001) {
          // alert('密码错误');
          // 更新当前input的校验状态, 更新成失败
          // updateStatus
          // 参数1: filed  字段名称
          // 参数2: status 状态
          //        NOT_VALIDATED(未校验), VALIDATING(校验中), INVALID(校验失败) or VALID(校验成功)
          // 参数3: validator 配置校验规则, 用来配置输出的提示信息
          $('#form').data('bootstrapValidator').updateStatus('password','INVALID','callback');
          return;
        }
        if (info.success) {
          location.href = 'index.html'
        }

      }
    })
  });


  /*
* 3. 重置功能, 本身重置按钮, 就可以重置内容, 需要额外的重置状态
* */
  $('[type = "reset"]').click(function () {
    $('#form').data('bootstrapValidator').resetForm()
  })


})