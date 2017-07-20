/**
 * Created by hasee on 2017/7/19.
 */
var params = {
  wx_openid: localStorage.getItem('wx-openid'),
  invite_code: localStorage.getItem('invite-code')
}

var obj = {
  init: function () {
    obj.initMyInfo();
    $('body').on('click','.revise',()=> {
      obj.mnickName=$('[name="nickName"]').val();
      obj.update()
    })
    $('#confirm').click(()=>{
      console.log(111);
      obj.username=$('[name="username"]').val();
      obj.certNo=$('[name="certNo"]').val();
      obj.update();
      window.location.href='/pages/myInformation.html'
    })
  },
  myInfo: {
    nickName: null,
    mnickName: null,
    avator: null,
    username: null,
    certNo: null,
    inviteCode: null,
    mobile: null
  },
  initMyInfo: function () {
    var req = new Request(window.global_config.userInfo, {
      method: 'GET',
      headers: { // headers: fetch事实标准中可以通过Header相关api进行设置
        'wx-openid': params.wx_openid,
        'invite-code': params.invite_code,
        'Content-Type': 'application/x-www-form-urlencoded',
        'test-mobile': '15026856424'//
      }
    })
    var json = new getJsonData(req);
    json.fetch();
  },
  getInfo: function (data) {
    console.log(data);
    obj.nickName = data.nickname;
    obj.avator = data.headImg;
    obj.mnickName = data.nickname;
    obj.username = data.username;
    obj.certNo = data.certNo;
    obj.inviteCode = data.inviteCode;
    obj.mobile = data.mobile;
    $('.nickName').html(data.nickname);
    $('.info_right img').attr('src', data.headImg);
    $('[name="nickName"]').val(data.nickname);
    $('#username').html(data.username);
    $('#certNo').html(data.certNo)
    $('#inviteCode').html(data.inviteCode)
    $('#mobile').html(data.mobile)
    if (obj.inviteCode==null){
      $('#inviteCode').html('（注册后才有邀请码）');
    }
  },
  update:function (data) {
    var req = new Request(window.global_config.update, {
      method: 'post',
      headers: { // headers: fetch事实标准中可以通过Header相关api进行设置
        'wx-openid': params.wx_openid,
        'invite-code': params.invite_code,
        'Content-Type': 'application/x-www-form-urlencoded',
        'test-mobile': '15026856424'//
      },
      body:`username=${obj.username}&nickName=${obj.mnickName}&certNo=${obj.certNo}`,
    })
    var json = new getJsonData(req);
    json.fetch();
  },
  updateInfo:function (data) {
    $.toast('保存成功');
  }
}

function responseData(data, url) {
  switch (url) {
    case window.global_config.userInfo:
      obj.getInfo(data);
      break;
    case window.global_config.update:
      obj.updateInfo(data);
    default:
      break;
  }

}
$(function () {
  obj.init(params);
})