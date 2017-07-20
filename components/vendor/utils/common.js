/**
 * 公用方法
 * Created by hzp on 2016/11/28.
 */
var div = function (e, classN) {
    return $(document.createElement(e)).addClass(classN);
};
var params = {
  wx_openid: localStorage.getItem('wx-openid'),
  invite_code: localStorage.getItem('invite-code')
}
/**
 * 初始化分类
 */
var N = [
    "一", "二", "三", "四", "五", "六", "七", "八", "九","十",
    "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九","二十",
    "二十一", "二十二", "二十三", "二十四", "二十五", "二十六", "二十七", "二十八", "二十九",
    "三十一", "三十二", "三十三", "三十四", "三十五", "三十六", "三十七", "三十八", "三十九"
];
var examAreaName=[
    '孕产妇护理','婴儿生活护理与意外事故预防急救','营养与防病','小儿神经系统发育与体格锻炼'
]
var M = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I"
];

//创建标题
function createTitleName(titleName){
    $(".title").html("").html(titleName)
}

/*保存本地临时数据*/
function saveStorage(key,value){
    sessionStorage.setItem(key,value);/*临时保存*/
}

/*获取本地临时数据*/
function loadStorage(key){
    var value = sessionStorage.getItem(key);
    return value;
}

/*清除本地临时数据*/
function clearStorage(){
    sessionStorage.clear();
    sessionStorage.removeItem()
}
/*移除指定缓存数据*/
function removeStorage(key){
    sessionStorage.removeItem(key)
}

$("footer a").on("click",function(){
    $(this).addClass("active").siblings("a").removeClass("active");
    if($(this).index()==0){
        window.location.href="/pages/home.html";
    }else{
        window.location.href="/pages/mine.html";
    }
});

//判断是否为空
function isEmpty(param){
    if($.trim(param)!="" && $.trim(param)!=null){
        return false;
    }else{
        return true;
    }
};

//获取当前产品的封面
function getProductImg(id){
    var result="../img/muying.jpg";
    switch(id)
    {
        case 3:
            result="../img/jzfw.png";
            break;
        case 4:
            result="../img/ysb.png";
            break;
        case 5:
            result="../img/myhly.jpg";
            break;
        case 6:
            result="../img/jtyys.jpg";
            break;
        case 7:
            result="../img/yyyc.png";
            break;
        case 8:
            result="../img/yyy.png";
            break;
        case 9:
            result="../img/yyy.png";
            break;
        case 10:
            result="../img/szb.png";
            break;
        case 11:
            result="../img/jpys.jpg";
            break;
        case 12:
            result="../img/gjcrs.png";
            break;
        case 13:
            result="../img/myhly.jpg";
            break;
        case 14:
            result="../img/jpystc.png";
            break;
        default:
            result="../img/muying.jpg";
    }
    return result;
}

function getCourseImg(id){
    id=parseInt(id);
    var result="../img/muying.jpg";
    switch(id)
    {
        case 1:
            result="../img/myhly.jpg";
            break;
        case 2:
            result="../img/jzfw.png";
            break;
        case 3:
            result="../img/jtyys.jpg";
            break;
		case 4:
            result="../img/yyyc.png";
            break;
        case 5:
            result="../img/yyy.png";
            break;
        case 6:
            result="../img/yyy.png";
            break;
        
        case 8:
            result="../img/myhly.jpg";
            break;
        case 9:
            result="../img/gjcrs.png";
            break;
        case 10:
            result="../img/jpys.jpg";
            break;
        default:
            result="../img/muying.jpg";
    }
    return result;
}

function getCourseBigImg(id){
    id=parseInt(id);
    var result="../img/ysb_b.png";
    switch(id)
    {
        case 1:
            result="../img/myhly_b.png";
            break;
        case 2:
            result="../img/jzfw_b.png";
            break;
        case 3:
            result="../img/jtyys_b.png";
            break;
		case 4:
            result="../img/yyy_b.png";
            break;
        case 5:
            result="../img/yyy_b.png";
            break;
        case 6:
            result="../img/yyy_b.png";
            break;
        
        case 8:
            result="../img/myhly_b.png";
            break;
        case 9:
            result="../img/gjcrs_b.png";
            break;
        case 10:
            result="../img/jpys_b.png";
            break;
        default:
            result="../img/ysb_b.png";
    }
    return result;
}


function getJsonData(req) {
    this.req=req;
}

getJsonData.prototype={
 constructor:getJsonData,
  // teacher:"mike",
  fetch:function () {
     var req=this.req;
    fetch(req).then((res) => {
      return res.json()
    })
        .then((data) => {
          if (data.success) {
              responseData(data.jsonData,req.url);
          } else if (data.code == 20004) {
            $.toast(data.msg);
            window.location.href = "/pages/register.html";
          } else {
            $.toast(data.msg);
          }
        }).catch((err) => console.log(err))
  },
}
