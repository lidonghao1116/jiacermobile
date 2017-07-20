/**
 * Created by hzp on 2016/11/28.
 */

//推荐课程
function recommend(id){
    $(".content").html("");
    var params={id:id};
    $.ajax({
        url: window.global_config.recommend,
        type: "post",
        data: params,
        dataType: "json",
        headers:{
          "test-mobile":"15026856424"
        },
        success: function success(data) {
            if(data.success){
                if(data.jsonData==null || data.jsonData==''){
                    $(".content").html(initNothing());
                }else{
                    $(".content").html(initRecommend());
                    initRecommendList("recommendC",data.jsonData);
                }

            }else if(data.code==999010){
                $.toast(data.msg);
                window.location.href="/pages/register.html";
            }else{
                $.toast(data.msg);
            }
        }
    });
}


//初始化推荐课程
function initRecommend(){
    return div("div","content-block").append(
        div("ul","study_list_box").attr("id","recommendC"),
        div("div","").attr("id","modal")
    );
}

function initRecommendList(em,data){
    $.each(data, function(index, item){
        $("#"+em).append(
          div("li","study_list").append(
            div("div","study_list_pannel").append(
              div("h2","").append(item.productName),
              // div("h3","").append("适合工种"+item.workType),
              div("h3","").append("适合工种:"),
              div("p","").append(item.summary)
            ),
            div("div","price_box").attr("id","footer"+index).append(
              div("div","price").append(
                div("h4","price_num").append("¥"+item.price),
                div("span","original").html("¥"+item.originalPrice)
              ),
              div("span","status")
            )
          )
        );
        if(item.isDiscount=='1'){
            var discount=$("#footer"+index).find(".price_num");
            discount.append(
                div("span","privilege").html("优惠")
            );
        }
        var status = $("#footer"+index).find(".status");
        if(item.status=='01'){
          status.addClass("daibao").attr("onclick","javascript:applyConfirm("+item.productId+")").html("立即报名")
        }
        if(item.status=='02'){
          status.addClass("daishen").html("待审核")
        }
        if(item.status=='04'){
          status.addClass("yibao").html("已报名")
        }
        if(item.status=='05'){
          status.addClass("bubao").attr("onclick","javascript:$.toast(\"该产品下有课程已报名\")").html("不可报名")
        }

    });
}
//初始化已报课程

//加载无数据
function initNothing(){
    return div("div","content native-scroll").html('<div class="no_info" style="font-size:16px">暂无数据，请报名课程或等待审核</div>');
}
//课程订单申请操作--加载上课时间
function applyConfirm(productId){
    $("#modal").hide();
    var params={productId:productId};
    $.ajax({
        url: window.global_config.courseTimes,
        type: "post",
        data: params,
        async: false,
        dataType: "json",
        success: function success(data) {
            if(data.success){
                if(data.jsonData==null || data.jsonData==''){
                    $.toast("数据异常");
                }else{
                    $("#modal").html("").append(
                        div("form","").attr("id","form-1").append(
                          div("ul","select_list")
                        )
                    );
                    $.each(data.jsonData,function(index,item){
                      $(".select_list").append(
                        div("li","select").append(
                          div("p","").append(item.courseName)
                        ).attr("id","selectLi"+index).attr("courseId",item.courseId)
                      )
                      $.each(item.classTimes,function(i,item0){
                        $("#selectLi"+index).append(
                          div("div","select_l").append(
                            div("input","").attr("type","radio").attr("name","my-radio"+index).attr("id","times"+index+i).attr("code",item0.templateId),
                            div("label","").attr("for","times"+index+i).append(item0.templateName)
                          )
                        )
                      })
                    })

                    $('body').popup({
                        title:'选择上课时间'
                        ,id:'pop-1'
                        ,formId:'form-1'
                        ,closeOnOk:false
                        ,ok:'提交'
                        ,onOk:function(){
                            applyComplete(productId);
                        }
                    });
                }
            }else if(data.code==999010){
                $.toast(data.msg);
                window.location.href="/pages/register.html";
            }else{
                $.toast(data.msg);
            }
        }
    });

}

//课程订单申请完成
function applyComplete(productId){
    var params=new Object();
    $(".select_list li").each(function(index){
        params["applys["+index+"].productId"]=productId;
        params["applys["+index+"].courseId"]=$(this).attr("courseId");
        params["applys["+index+"].times"]=$(this).find("input[name='my-radio"+index+"']:checked").attr("code");
    });
    if(!validate(params)){
        return;
    }

    $.showPreloader();

    $.ajax({
        url: window.global_config.applyOrders,
        type: "post",
        data: params,
        dataType: "json",
        success: function success(data) {
            if(data.success){
                window.location.href="/pages/studyList.html";
            }else if(data.code==999010){
                $.toast(data.msg);
                window.location.href="/pages/register.html";
            }else{
                $.toast(data.msg);
                recommend(id);
            }
            $.hidePreloader();
        },
        error:function(){
            $.hidePreloader();
        }
    });
}


function validate(params){
    var result=true;
    $.each(params, function(index, item){
        if(typeof(params[index]) == "undefined" || isEmpty(params[index])){
            $.toast("请填写用户订单确认信息",2000,"");
            result=false;
            return result;
        }
    });
    return result;
}

$(function(){
        var url=window.location.href;
        var id=url.substr(1).split('=')[1];

        recommend(id);
});
 $.init();
