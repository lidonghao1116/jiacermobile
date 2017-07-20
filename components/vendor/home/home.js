/**
 * Created by hzp on 2016/11/28.
 */
//初始化数据--课程学习
var wx_openid = localStorage.getItem('wx-openid');
var invite_code = localStorage.getItem('invite-code');

function initLearn() {
  $(".content-block").html("");
  var params = {};
  $.ajax({
    url: window.global_config.courseOwn,
    type: "get",
    headers: {
      'wx-openid': wx_openid,
      'invite-code': invite_code,
      'test-mobile': '15026856424'//
    },
    data: params,
    dataType: "json",
    success: function success(data) {
      if (data.success) {
        if (data.jsonData == null || data.jsonData == '') {
          $('#recommend').addClass("activeTab").siblings().removeClass("activeTab");
          recommend();
        } else {
          $('#purchase').addClass("activeTab").siblings().removeClass("activeTab");
          $(".content-block").html(initEnrolled());
          initEnrolledList("courseOwn", data.jsonData);
        }
      } else if (data.code == 20004) {
        $.toast(data.msg);
        window.location.href = "/pages/register.html";
      } else {
        $.toast(data.msg);
      }
    }
  });
};


/*//已报名课程
 function enrolled() {
 $(".content-block").html("");
 var $this = $(".buttons-tab a").first();
 //  $($this).addClass("active").siblings().removeClass("active");
 $this.addClass("active").siblings().removeClass("active");
 var params = {};
 $.ajax({
 url: window.global_config.enrolled,
 type: "post",
 data: params,
 headers: {
 'wx-openid': wx_openid,
 'invite-code': invite_code
 },
 dataType: "json",
 success: function success(data) {
 if (data.success) {
 if (data.jsonData == null || data.jsonData == '') {
 $(".content-block").html(initNothing());

 } else {
 $(".content-block").html(initEnrolled(data.jsonData))
 initEnrolledList("recommendR", data.jsonData)
 }
 } else if (data.code == 999010) {
 $.toast(data.msg);
 window.location.href = "/pages/register.html";
 } else {
 $.toast(data.msg);
 }
 }
 });
 };*/

//推荐课程
function recommend() {
  $(".content-block").html("");
  var $this = $(".buttons-tab a").last();
  $this.addClass("activeTab").siblings().removeClass("activeTab");
  var params = {};
  $.ajax({
    url: window.global_config.recommendOnline,
    type: "get",
    data: params,
    dataType: "json",
    headers: {
      'wx-openid': wx_openid,
      'invite-code': invite_code,
      'test-mobile': '15026856424'//
    },
    success: function success(data) {
      if (data.success) {
        if (data.jsonData == null || data.jsonData == '') {
          $(".content-block").html(initNothing());
        } else {
          $(".content-block").html(initRecommend());
          initRecommendList("recommendC", data.jsonData);
        }

      } else if (data.code == 20004) {
        $.toast(data.msg);
        window.location.href = "/pages/register.html";
      } else {
        $.toast(data.msg);
      }
    }
  });
}

function enrolled() {
  $(".content-block").html("");
  var $this = $(".buttons-tab a").last();
//  $($this).addClass("active").siblings().removeClass("active");
  $this.addClass("active").siblings().removeClass("active");
  var params = {};
  $.ajax({
    url: window.global_config.courseOwn,
    type: "get",
    data: params,
    dataType: "json",
    headers: {
      'wx-openid': wx_openid,
      'invite-code': invite_code,
      'test-mobile': '15026856424'//
    },
    success: function success(data) {
      if (data.success) {
        console.log(data.code)
        if (data.jsonData == null || data.jsonData == '') {
          $(".content-block").html(initNothing());
        } else {
          $(".content-block").html(initEnrolled());
          initEnrolledList("courseOwn", data.jsonData);
        }
      } else if (data.code == 20004) {
        $.toast(data.msg);
        window.location.href = "/pages/register.html";
      } else {
        $.toast(data.msg);
      }
    }
  });
}

//初始化推荐课程
function initRecommend() {
  return div("div", "content native-scroll").append(
      div('div', 'card').append(
          div("div", "card-content").append(
              div("div", "list-block media-list courseList").append(
                  div("ul", "").attr("id", "recommendC")
              )
          )
      ),
      div("div", "").attr("id", "modal")
  );
}

function initRecommendList(em, data) {
  var html = ""
  $.each(data, function (idx, obj) {
    html += `
              <li>
              <a data-id="${obj.courseId}" data-own="${obj.isOwn}" data-price="${obj.price}" data-type="${obj.courseType}">
					<img src="/img/courses/jzfw.png" />
					<div class="cl-content" >
						<h1 class="clearfix">
							<p>${obj.courseName}</p>
							<span>￥${obj.price}/永久</span>
						</h1>
						<p class="clc1">适合工种：${obj.fitService}</p>
						<p class="clc2">
							<label>膳食</label>
							<span>健康膳食、起居护理</span>
						</p>
						<p class="clc3">
               <label>日常</label>
               <span>身体护理、健康喂养</span>
            </p>
					</div>
					</a>
				</li>
            `
    $('#' + em).html(html);
    $('[data-own=1]').find('h1 span').html('已购买');
    /* $("#" + em).append(
     div("li", "item-content").append(
     div("div", "item-media").append(
     div("img", "list-cover").attr("src", getProductImg(item.productId))
     ),
     div("div", "item-inner").append(
     div("div", "card-bt").append(item.productName),
     div("div", "card-nr").append(item.summary),
     div("div", "card-yj").attr("id", "footer" + index).append(
     div("span", "n_price").html("<span style='color:red;'>¥" + item.price + "</span>"),
     div("span", "o_price").html("<s>¥" + item.originalPrice + "</s> "),
     div("span", "yh"),
     div("span", "order-btn").attr("id", "bmBtn" + index)
     )
     )
     )
     );*/
    /* if (item.isDiscount == '1') {
     var discount = $("#footer" + index).find(".yh");
     discount.append(
     div("img", "discount").attr("src", "../img/discount.png")
     );
     }
     if (item.status == '01') {
     $("#bmBtn" + index).append(
     div("a", "button").css({
     "float": "right",
     "color": "#ffffff",
     "background-color": "#ff0000",
     "border-color": "#ff0000"
     }).attr("onclick", "javascript:applyConfirm(" + item.productId + ")")
     .html("立即报名")
     )
     }
     if (item.status == '02') {
     $("#bmBtn" + index).append(
     div("a", "button").css({"float": "right", "color": "#ffc000", "border-color": "#ffc000"}).html("待审核")
     )
     }
     if (item.status == '03') {
     $("#bmBtn" + index).append(
     div("a", "button").css({
     "float": "right",
     "color": "#ffffff",
     "background-color": "#dedede",
     "border-color": "#dedede"
     }).html("停售")
     )
     }
     if (item.status == '04') {
     $("#bmBtn" + index).append(
     div("a", "button").css({"float": "right", "color": "#ff0000", "border-color": "#ff0000"}).html("已报名")
     )
     }
     if (item.status == '05') {
     $("#bmBtn" + index).append(
     div("a", "button").css({
     "float": "right",
     "color": "#ffffff",
     "background-color": "#dedede",
     "border-color": "#dedede"
     }).attr("onclick", "javascript:$.toast(\"该产品下有课程已报名\")").html("不可报名")
     )
     }*/

  });
}
//初始化已报课程
function initEnrolled() {
  return div("div", "content native-scroll").append(
      div('div', 'card').append(
          div("div", "card-content").append(
              div("div", "list-block media-list courseList").append(
                  div("ul", "").attr("id", "courseOwn")
              )
          )
      )
  );
}

function initEnrolledList(em, data) {
  var html = ""
  $.each(data, function (idx, obj) {
    html += `
              <li >
              <a data-id="${obj.courseId}" data-own="${obj.isOwn}" data-price="${obj.price}" data-type="${obj.courseType}">
					<img src="/img/courses/jzfw.png" />
					<div class="cl-content">
						<h1 class="clearfix">
							<p>${obj.courseName}</p>
						</h1>
						<p class="clc1">适合工种：${obj.fitService}</p>
						<p class="clc2">
							<label>膳食</label>
							<span>健康膳食、起居护理</span>
						</p>
						<p class="clc3">
               <label>日常</label>
               <span>身体护理、健康喂养</span>
            </p>
					</div>
					</a>
				</li>
            `
    $('#' + em).html(html);
  })
}
//加载无数据
function initNothing() {
  return div("div", "content native-scroll").html('<div class="center" style="font-size:16px">暂无数据，请报名课程或等待审核</div>');
}
//课程订单申请操作--加载上课时间
function applyConfirm(productId) {
  $("#modal").hide();
  var params = {productId: productId};
  $.ajax({
    url: window.global_config.courseTimes,
    type: "post",
    data: params,
    async: false,
    dataType: "json",
    success: function success(data) {
      if (data.success) {
        if (data.jsonData == null || data.jsonData == '') {
          $.toast("数据异常");
        } else {
          $("#modal").html("").append(
              div("form", "").attr("id", "form-1").attr("style", "margin-bottom: 20px;")
          );

          if (productId == 10 || productId == 4 || productId == 7) {
            $("#form-1").append(
                div("div", "list-block").append(
                    div("ul", "ul").append(
                        div("li", " item-content times").append(
                            div("div", "item-inner").attr("id", "times_").append(
                                div("div", "item-title label").append("上课时间").attr("style", "font-size: 0.7rem;width:40%;"),
                                div("div", "").attr("style", "width: 30%;").append(
                                    div("label", 'label-checkbox item-content').attr("style", "padding-left: 0;").append(
                                        div("input", '').attr("type", "radio").attr("code", "01").attr("name", "my-radio"),
                                        div("div", 'item-media').append(
                                            div("i", 'icon icon-form-checkbox'),
                                            div("span", "").attr("style", "font-size: 12px;").append("&nbsp;周末班")
                                        )
                                    )
                                ),
                                div("div", "").attr("style", "width: 30%;").append(
                                    div("label", 'label-checkbox item-content').attr("style", "padding-left: 0;").append(
                                        div("input", '').attr("type", "radio").attr("code", "02").attr("name", "my-radio"),
                                        div("div", 'item-media').append(
                                            div("i", 'icon icon-form-checkbox'),
                                            div("span", "").attr("style", "font-size: 12px;").append("&nbsp;连续班")
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            )

          }
          $("#form-1").append(div("div", "content_detail").attr("id", "form_content"));
          $.each(data.jsonData, function (index, item) {
            if (item.isNeedHasPf == '1') {
              $("#form_content").append(
                  div("div", "content-block-title").append(item.courseName),
                  div("div", "list-block").append(
                      div("ul", "ul").append(
                          div("li", "").append(
                              div("div", "item-content hasPf").append(
                                  div("div", "item-inner").append(
                                      div("div", "item-title label").append("上海交社保").attr("style", "font-size: 0.7rem;width:40%;"),
                                      div("div", "").attr("style", "width: 30%;").append(
                                          div("label", 'label-checkbox item-content').attr("style", "padding-left: 0;").append(
                                              div("input", '').attr("type", "radio").attr("code", '1').attr("name", "hasPf-radio" + index),
                                              div("div", 'item-media').append(
                                                  div("i", 'icon icon-form-checkbox'),
                                                  div("span", "").attr("style", "font-size: 12px;").append("&nbsp;有")
                                              )
                                          )
                                      ),
                                      div("div", "").attr("style", "width: 30%;").append(
                                          div("label", 'label-checkbox item-content').attr("style", "padding-left: 0;").append(
                                              div("input", '').attr("type", "radio").attr("code", '0').attr("name", "hasPf-radio" + index),
                                              div("div", 'item-media').append(
                                                  div("i", 'icon icon-form-checkbox'),
                                                  div("span", "").attr("style", "font-size: 12px;").append("&nbsp;无")
                                              )
                                          )
                                      )
                                  )
                              )
                          ).attr("courseId", item.courseId).attr("isNeedHasPf", item.isNeedHasPf)
                      )
                  )
              );
            } else {
              $("#form_content").append(
                  div("div", "list-block").append(
                      div("ul", "ul").append(
                          div("li", "").append().attr("courseId", item.courseId).attr("isNeedHasPf", item.isNeedHasPf)
                      )
                  ).attr("style", "display: none;")
              )
            }
          });

          $('body').popup({
            title: '订单确认信息'
            , id: 'pop-1'
            , formId: 'form-1'
            , closeOnOk: false
            , ok: '提交'
            , onOk: function () {
              applyComplete(productId);
            }
          });
        }
      } else if (data.code == 999010) {
        $.toast(data.msg);
        window.location.href = "/pages/login.html";
      } else {
        $.toast(data.msg);
      }
    }
  });

}

//课程订单申请完成
function applyComplete(productId) {
  var params = new Object();
  var times = $(".times").find("input[name='my-radio']:checked").attr("code");
  $("#form_content .list-block").each(function (index) {
    params["applys[" + index + "].productId"] = productId;
    params["applys[" + index + "].courseId"] = $(this).find("li").first().attr("courseId");
    var isNeedHasPf = $(this).find("li").first().attr("isNeedHasPf");
    if (isNeedHasPf == '1') {
      params["applys[" + index + "].isHasPf"] = $(this).find("input[name='hasPf-radio" + index + "']:checked").attr("code");
    } else {
      params["applys[" + index + "].isHasPf"] = '0'
    }
    if (isEmpty(times) == null || typeof(times) == "undefined") {
      params["applys[" + index + "].classTimes"] = '03'
    } else {
      params["applys[" + index + "].classTimes"] = times;
    }


  });


  if (!validate(params)) {
    return;
  }

  $.showPreloader();

  $.ajax({
    url: window.global_config.applyOrders,
    type: "post",
    data: params,
    dataType: "json",
    success: function success(data) {
      if (data.success) {
        window.location.href = "/pages/home.html";
      } else if (data.code == 999010) {
        $.toast(data.msg);
        window.location.href = "/pages/login.html";
      } else {
        $.toast(data.msg);
        recommend();
      }
      $.hidePreloader();
    },
    error: function () {
      $.hidePreloader();
    }
  });
}


function validate(params) {
  var result = true;
  $.each(params, function (index, item) {
    if (typeof(params[index]) == "undefined" || isEmpty(params[index])) {
      $.toast("请填写用户订单确认信息", 2000, "");
      result = false;
      return result;
    }
  });
  return result;
}

$(function () {
  initLearn();
  $(".courseTab a").on("click", function () {
    $(this).addClass("activeTab").siblings().removeClass("activeTab");
    if ($(this).index() == 0) {
      enrolled();
    } else {
      recommend();
    }
  });
  $('body').on('click', '.card-content a', function () {
    var params = {
      price: $(this).data('price'),
      courseId: $(this).data('id'),
      isOwn: $(this).data('own'),
      courseType: $(this).data('type')
    };
    var str = JSON.stringify(params);
    sessionStorage.obj = str;
    // var price=$(this).find('[data-price]').data('price');
    // window.postMessage(price,'')
    window.location.href = '/pages/courses.html';
  })
})

