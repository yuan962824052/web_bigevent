$(function () {
    gitUserInfo()
    var layer = layui.layer
    //退出到登录页面
    $('#exit').on('click', function () {

        layer.confirm('确定退出?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            localStorage.removeItem('token')
            location.href = '/login.html'

            layer.close(index);
        });
    })
})
//获取用户基本信息
function gitUserInfo() {
    $.ajax({
        method: "GET",
        url: "/my/userinfo",

        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            //调用renderAvater方法
            renderAvater(res.data)
        }
    });
}
//渲染用户头像
function renderAvater(user) {
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp&nbsp;' + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show()

    }


}