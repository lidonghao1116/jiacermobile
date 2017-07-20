/**
 * Created by hzp on 2016/11/28.
 */
var wx_openid=localStorage.getItem('wx-openid');
var invite_code=localStorage.getItem('invite-code');
alert(wx_openid+':'+invite_code);

let params = {
  mobile: $('#phone').val(),
  captchaCode: $('#iptImgCode').val(),
  smsCode: $('#message').val()
}

let [phone_state, img_state, sms_state]=[false, false, false];
const reg = {
  regExp: /^((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$/,
  regNum: /^[0-9]*$/,
  regCode: /^[A-Za-z0-9]+$/
}
function registerConfirm(self) {
  var params = {
    name: self.attr('name'),
    value: self.val()
  };
  switch (params.name) {
    case 'phone':
      if (isEmpty(params.value)) {
        $.toast('请输入手机号')
        phone_state = false;
      }
      else if (!reg.regExp.test(params.value)) {
        $.toast('请填写正确的手机号码')
        phone_state = false;
      }
      else {
        phone_state = true;
        onSuccess(self);
      }
      break;
    case 'imgCode':
      if (isEmpty(params.value)) {
        $.toast('请填图片验证码')
        img_state = false;
      }
      else if (!reg.regCode.test(params.value)) {
        $.toast('图形码不正确')
        img_state = false;
      }
      else {
        img_state = true;
        onSuccess(self);
      }
      break;
    case 'sms':
      if (isEmpty(params.value)) {
        $.toast('请填写验证码')
        sms_state = false;
      }
      else if (!reg.regNum.test(params.value)) {
        $.toast('验证码不正确')
      }
      else {
        sms_state = true;
        onSuccess(self)
      }
  }
}

//获取图形码
function getImgCode() {
  $.ajax({
    url: window.global_config.getCaptchaCode,
    type: "get",
    dataType: "json",
    headers: {
      'wx-openid': wx_openid,
      'invite-code': invite_code
    },
    success: function success(data) {
      if (data.success) {
        var img = "data:image/jpeg;base64," + data.jsonData.captcha;
        $("#imgCode").attr("src", img);
      } else {
        $.toast(data.msg);
      }
    },
    error: function (err) {
      console.log(err);
    }
  });
}

//获取验证码
function getCaptchaCode(btn) {
  let phoneNum = $('#phone').val();
  var req = new Request(window.global_config.registerSmsCode + "?mobile=" + phoneNum, {
    method: 'GET',
    headers: { // headers: fetch事实标准中可以通过Header相关api进行设置
      'Content-Type': 'application/x-www-form-urlencoded', // default: 'application/json'
      'wx-openid': wx_openid,
      'invite-code': invite_code
    }
  })
  fetch(req).then((res) => {
    return res.json()
  }).then((data) => {
    if (data.success) {
    console.log(data)
  } else {
    $.toast(data.msg);
  }
}).catch((err) => {
    console.log(err)
});
  sendCode(btn)
}
//开始绑定信息
function bindInfo() {
  let params = {
    mobile: $('#phone').val(),
    captchaCode: $('#iptImgCode').val(),
    smsCode: $('#message').val()
  }
  $.ajax({
    type : 'post',
    url : window.global_config.registerBind,
    data : params,
    dataType : 'json',
    headers: { // headers: fetch事实标准中可以通过Header相关api进行设置
      'wx-openid': wx_openid,
      'invite-code': invite_code
    },
    success : function(result) {
      if(result.success){
        console.log(result)
        window.location.href='/pages/home.html'
      } else{
        $.toast(result.msg);
      }
    }
  });
    /* let req = new Request(window.global_config.registerBind, {
     method: 'POST',
     headers: {
     'Content-Type': 'application/x-www-form-urlencoded', // default: 'application/json'
     'wx-openid': wx_openid,
     'invite-code': invite_code
     },
     body: JSON.stringify({mobile: params.mobile, captchaCode: params.captchaCode, smsCode: params.smsCode})
     })
     fetch(req).then((res) => {
     return res.json()
     })
     .then((data) => {
     if (data.success) {
     console.log(data)
     } else {
     $.toast(data.msg);
     }
     }).catch((err) => {
     console.log(err)
     })*/
}

var countDown = 5;
//倒计时
function sendCode(btn) {
  if (countDown <= 0) {
    btn.removeAttr('disabled').text('重获验证码').addClass('clickable');
    countDown = 5;
  }
  else {
    btn.attr('disabled', true).text(countDown + "秒").removeClass('clickable')
    countDown--;
    setTimeout(function () {
      sendCode(btn);
    }, 1000)
  }
}
//验证通过
function onSuccess(self) {
  if (phone_state) {
    $("#captcha").removeAttr('disabled').addClass('clickable');
  }
}
/*function getEduValue(text) {
 var result = "";
 var data = [{code: "01", text: "小学"}, {code: "02", text: "初中"},
 {code: "03", text: "高中"}, {code: "04", text: "中专"},
 {code: "05", text: "大专"}, {code: "06", text: "大学本科"},
 {code: "07", text: "硕士研究生"}, {code: "08", text: "博士生"}];
 $.each(data, function (index, item) {
 if (item.text == text) {
 result = item.code;
 return false;
 }
 });
 return result;
 }*/


$(function () {
  getImgCode();
  $(".register_info input").blur(function () {
    registerConfirm($(this));
  });
  //获取图形码
  $("#imgCode").on("click", function () {
    getImgCode();
  });
//获取验证码
  $("#captcha").on("click", function () {
    getCaptchaCode($(this));
  });
  //开始
  $('#btnStart').on('click', function () {
    //绑定信息
    bindInfo()
    // window.location.href="/schoolOnline.html"
  })
  //    获取焦点
  $('.register_info input').on('keyup', function (e) {
    var sms = $('#message').val();
    var phone = $('#phone').val();
    var imgCode = $('#iptImgCode').val();

    if (phone_state && img_state && !isEmpty(sms) && !isEmpty(phone) && !isEmpty(imgCode)) {
      $('#btnStart').removeAttr('disabled').addClass('clickable');
    } else {
      $('#btnStart').attr('disabled', true).removeClass('clickable');
    }
  })
});