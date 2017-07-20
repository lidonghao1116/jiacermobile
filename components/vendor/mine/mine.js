/**
 * userInfo js
 * Created by hzp on 2016/11/28.
 */
/**
 * 获取用户信息
 * @param data
 */
//初始化个人信息
function pageInit(){
    $(".bar-tab a").last().addClass("active").siblings("a").removeClass("active");
    $.ajax({
        url: window.global_config.userInfo,
        type: "post",
        data: {},
        dataType: "json",
        success: function success(data) {
            if(data.success){
                if(data.jsonData==null || data.jsonData==''){
                }else{
                    initUserInfo(data.jsonData);
                }
            }else if(data.code==999010){
                $.toast(data.msg);
                window.location.href="/pages/login.html";
            }else{
                $.toast(data.msg);
            }
        }
    });
}
function initUserInfo(data){
    $(".page-current").append(
        div("div","content native-scroll").append(
            div("div","mine-content-block").append(
                div("div","mine-background").append(
                    div("img","mine-logo").attr("src","../img/logo.png"),
                    div("div","userName").html(data.userName),
                    div("div","userMobile").html(data.mobile)
                )
            )
        )
    );
    $(".native-scroll").append(
        div("div","content-inner").append(
            div("div","list-block").append(
                div("ul","").append(
                    div("li","").append(
                        div("a","item-link item-content").attr("href","/pages/home.html").append(
                            div("div","item-media").append(
                                div("img").attr("src","../img/curriculum_btn.png")
                            ),
                            div("div","item-inner").append(
                                div("div","item-title").append("报名课程")
                            )
                        )
                    )
                )
            )
        ),
		div("div","content-inner").append(
            div("div","list-block").append(
                div("ul","").append(
                    div("li","").append(
                        div("a","item-content").attr("href","http://wx.jiacer.com/yyhd").append(
                            div("div","item-media").append(
                                div("img").attr("src","../img/search.png")
                            ),
                            div("div","item-inner").append(
                                div("div","item-title").append("证书查询")
                            )
                        )
                    )
                )
            )
        ),
        div("div","content-inner").append(
            div("div","list-block").append(
                div("ul","").append(
                    div("li","").append(
                        div("a","item-content").append(
                            div("div","item-media").append(
                                div("img").attr("src","../img/study_btn.png").attr("style","margin-left: -4px;")
                            ),
                            div("div","item-inner").append(
                                div("div","item-title").append("学习记录")
                            )
                        )
                    )
                )
            )
        ),
        div("div","userLearnRecordsContent")
    );
    initLearnRecord();
}

//初始化用户学习记录
function initLearnRecord(){
    $.ajax({
        url: window.global_config.userLearnRecords,
        type: "post",
        data: {},
        dataType: "json",
        success: function success(data) {
            if(data.success){
                if(data.jsonData==null || data.jsonData==''){
                }else{
                    initLearnRecordPage(data.jsonData);
                }
            }else if(data.code==999010){
                $.toast(data.msg);
                window.location.href="/pages/login.html";
            }else{
                $.toast(data.msg);
            }
        }
    });
}

//初始化用户学习记录
function initLearnRecordPage(data){
    $(".userLearnRecordsContent").html("").append(
        div("div","row table-title").append(
            div("div","col-50n").append("课程"),
            div("div","col-25n").append("答题次数"),
            div("div","col-25n").append("最高分")
        )
    );
    $.each(data, function(index, item) {
        $(".userLearnRecordsContent").append(
            div("div","row table-row").append(
                div("div","col-50n").append(item.courseName),
                div("div","col-25n").append(item.count),
                div("div","col-25n").append(item.scores)
            )
        );
    });
}



$(function(){
    pageInit();
    
    $(".more").click(function(){
    	var dis = $(".more-list").css("display");
		if (dis == "none") {
			$(".more-list").show();
		} else {
			$(".more-list").hide();
		}
	});
	
//	退出登录
	$(".more-list a").click(function(){
		var strId = localStorage.getItem("openId");
		$.ajax({
	        url: window.global_config.logout,
	        type: "post",
	        data: {openId:strId},
	        dataType: "json",
	        success: function success(data) {
	        	if(data.success){
		            if(data.code==0){
		                window.location.href="/pages/login.html";
		            }else{
		                $.toast(data.msg);
		            }
		        }
	        }
	    });
	})
});
$.init();