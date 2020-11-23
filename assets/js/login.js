$(function () {
    //切换注册&登录账号
    $('#login').on('click', function () {
        $('.login_box').hide();
        $('.reg_box').show();
    })
    $('#reg').on('click', function () {
        $('.reg_box').hide();
        $('.login_box').show();
    })
    //自定义验证输入的内容
    var form = layui.form;
    const layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],


        //验证注册密码
        regpwd: function (value) {
            var pwd = $('.reg_box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }

    })
    //为注册按钮注册点击事件
    $('#form-reg').submit(function (e) {

        //阻止默认提交行为
        e.preventDefault();

        //发起Ajax请求
        $.ajax({
            type: 'post',
            url: 'http://ajax.frontend.itheima.net/api/reguser',
            data: {
                username: $('#form-reg [name=username]').val(),
                password: $('#form-reg [name=password]').val()
            },

            success: function (reg) {
                if (reg.status !== 0) {
                    return layui.msg('注册失败')
                }
                layer.msg('注册成功,请登录')
                $('#form_reg').click()
            }
        })
    })
    //给登录表单注册点击事件
    $('#form_login').submit(function (e) {
        //阻止默认提交行为
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/login',
            //快速获取表单里的数据
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('登陆失败')
                }
                layer.msg('登录成功!')
                localStorage.setItem('token', res.token);
                location.href = '/index.html'

            }
        })
    })
})