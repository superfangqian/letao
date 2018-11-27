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
          }
        }
      },
      password: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
          //长度校验
          stringLength: {
            min: 6,
            max: 12,
            message: '用户名长度必须是6到12位'
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
          alert('用户名不存在');
          return;
        }
        if (info.error == 1001) {
          alert('密码错误');
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