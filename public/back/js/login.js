$(function () {
  $('#form').bootstrapValidator({
    // 配置校验图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',    // 校验成功
      invalid: 'glyphicon glyphicon-remove',   // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },

    //3. 指定校验字段
    fields: {
      //校验用户名，对应input表单的name属性
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
            message: '用户名长度必须在2到6之间'
          },
        }
      },
      //验证密码
      password: {
        validators: {
          //不能为空
          notEmpty: {
            message: '密码不能为空'
          },
          //长度校验
          stringLength: {
            min: 2,
            max: 12,
            message: '密码的长度必须是2到12位'
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
  //提交请求
  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
      type:'post',
      url:'/employee/employeeLogin',
      data: $("#form").serialize(),
      dataType:'json',
      success:function(info){
        console.log(info);
        if(info.error == 1000){
          alert('用户名不存在')
        }
        if(info.error == 1001){
          alert('密码错误')
        }
        if(info.success){
          location.href = 'index.html';
        }
        
      }
    })
  });

    /*
  * 3. 重置功能, 本身重置按钮, 就可以重置内容, 需要额外的重置状态
  * */
$('[type="reset"]').click(function(){
  //resetForm(true)重置内容和状态
  //resetForm()只重置状态
  $('#form').data('bootstrapValidator').resetForm();
})

})