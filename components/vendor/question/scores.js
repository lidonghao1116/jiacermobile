function pageInit(){
    $.ajax({
        url: window.global_config.getScore,
        type: "post",
        data: {batchId:loadStorage("batchId")},
        dataType: "json",
        success: function success(data) {
            if(data.success){
                //初始化得分数据页面
                initUserScore(data.jsonData);
            }else{
                $.toast(data.msg);
            }
        }
    });
}

//初始化用户得分数据
function initUserScore(userScoreBean){
    $(".score").append(
        div('div', 'center').append(
            div("div","").append(
                div("img","").attr("src","../img/complete_btn.png")
            ),
            div("div","scores-title").text("恭喜你完成答题！"),
            div("div","hx").append("成绩单")
        ),
        div('div', '').append(
            div("div","row").append(
                div("div","col-40 right").text("答题科目"),
                div("div","col-60 left").text(userScoreBean.typeName)
            ),
            div("div","row").append(
                div("div","col-40 right").text("答题时长"),
                div("div","col-60 left").text(userScoreBean.useTime)
            ),
            div("div","row").append(
                div("div","col-40 right").text("成绩"),
                div("div","col-60 left").html("<span style='color: #FC708B'>"+userScoreBean.score+"分</span")
            )
        ),
        div('div', 'row scoresBtn').append(
            div("div","col-50").append(
                div("a","button button-big button-fill").attr("href","javascript:window.location.href='/pages/answerSheets.html'").text("查看答题卡")
            ),
            div("div","col-50").append(
                div("a","button button-big white_btn").attr("href","javascript:window.location.href='/pages/home.html'").text("返回首页")
            )
        )
    )
}

$(function(){
    pageInit()
});
$.init();