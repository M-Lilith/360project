// 二级菜单
$(".catebox .cateitem .cate-list li").mouseenter(function () {
    $("#right-mask").css("display", "block");
});
$(".catebox .cateitem .cate-list li").mouseleave(function () {
    $("#right-mask").css("display", "none");
});
$("#right-mask").mouseenter(function () {
    $("#right-mask").css("display", "block");
});
$("#right-mask").mouseleave(function () {
    $("#right-mask").css("display", "none");
});

// 热门活动
let activeimg = $(".activeimg");
$.ajax({
    type: 'GET',
    url: '../json/index.json',
    dataType: 'json',
    success: function (result) {
        $.each(result.activeValue, function (index, value) {
            let actimg = value.img;
            $(`<a href="${value}" class="activeitem"><img class="actimg" src="${actimg}"></a>`).appendTo(activeimg);
        });
    }
})

// 安全驾驶
let protect = $(".protect");
$.ajax({
    type: 'GET',
    url: '../json/index.json',
    dataType: 'json',
    success: function (result) {
        $.each(result.protectValue, function (index, value) {
            let pro = value.proimg;
            $(`<a href="${value}" class=""><img class="" src="${pro}"></a>`).appendTo(protect);
        });
    }
})

// 查看更多
let more = $(".more");
$.ajax({
    type: 'GET',
    url: '../json/index.json',
    dataType: 'json',
    success: function (result) {
        $.each(result.moreValue, function (index, value) {
            let moreimg = value.moreimg;
            $(`<a href="${value}" class=""><img class="" src="${moreimg}"></a>`).appendTo(more);
        });
    }
})

// 抢购商品
let pannic = $(".pannic-body");
$.ajax({
    type: 'GET',
    url: '../json/index.json',
    dataType: 'json',
    success: function (result) {
        $.each(result.pannicValue, function (index, value) {

            $(`<div class="pannic">
            <img src=${value.pannicimg}>
            <em>${value.pannicname}</em>
            <span>${value.pannicvalue}</span>
            <a href="${value.src}"><i>马上抢</i></a>`).appendTo(pannic);
        });
    }
})