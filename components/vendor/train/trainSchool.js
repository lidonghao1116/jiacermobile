var params = {
  wx_openid: localStorage.getItem('wx-openid'),
  invite_code: localStorage.getItem('invite-code')
}

var obj={
  init:function () {
    obj.initSchool();
    $('body').on('click','.mobile',function () {
      var mobile=$(this).parent().siblings('.phone').text();
      console.log(mobile);
      $(".contact-pop .cp-content p").eq(1).text(mobile);
      $(".contact-pop .cp-btn .cpb-call").attr("href","tel:"+mobile)
      $(".contact-pop,#layer").show();
    })
    $(".cpb-cancel").click(function(){
      $(".contact-pop,#layer").hide();
    });
  },
  initSchool:function () {
    var req = new Request(window.global_config.school, {
      method: 'GET',
      headers: { // headers: fetch事实标准中可以通过Header相关api进行设置
        'wx-openid': params.wx_openid,
        'invite-code': params.invite_code,
        'test-mobile': '15026856424'//
      }
    })
    var json = new getJsonData(req);
    json.fetch();
  },
  getInfo:function (data) {
    var html=``;
    $.each(data,function (index,item) {
      html+=`
  <div class="school">
      <div class="school_top">
        <div class="school_l">
          <img src="../img/xuexiaologo1.png">
        </div>
        <div class="school_r">
          <h1>${item.schoolName}<i class="mobile"></i></h1>
          <p class="people">${item.contacts}</p>
          <p class="phone">${item.contactPhone}</p>
          <p class="address">${item.schoolAddress}</p>
        </div>
      </div>
      <h2><a href="/pages/studyList.html?id=${item.id}">查看课程</a></h2>
    </div>
`
    })
    $('.school_box').html(html)
  }
}

function responseData(data) {
      obj.getInfo(data);
}

$(function () {
  obj.init(params);
})