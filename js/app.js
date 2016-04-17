$(function() {
    // 轮播图的图li和小索引li循环生成
    var creatCarHtml = function() {
        var picItemHtml = '';
        var indexItemHtml = '';
        var picItem =
            '<li class="carPicItem">' +
            '<div class="picItemWrap">' +
            '<img src="img/1.jpg" alt="">' +
            '</div>' +
            '</li>';
        var indexItem =
            '<li class="carItemIndex">' +
            '<span class="circle"></span>' +
            '</li>';
        for (var i = 0; i < 3; i++) {
            picItemHtml += picItem;
            indexItemHtml += indexItem;
        }
        $('.carPicList ul').html(picItemHtml);
        $('.carIndexlist ol').html(indexItemHtml);
        var jpgs = ['img/1.jpg', 'img/2.jpg', 'img/3.jpg'];
        $.each($('.picItemWrap img'), function(index, imgObj) {
            // 每个img的src是jpgs相对应的值
            imgObj.src = jpgs[index];
            console.log(imgObj.src)
        })
        $('.carPicItem').eq(0).addClass('cur');
        $('.carItemIndex').eq(0).addClass('cur');

    };
    creatCarHtml();



    // 轮播
    
    var picIndex = 0;
    var circleIndex = 0;
    var carNum = $('.carPicItem').length;
    /**
     * [arrClick description]
     * @param  {[type]} whichArr                [左箭头或右箭头]
     * @param  {[type]} picItemClassSelector    [轮播图片的li上的类名选择器,注意加点]
     * @param  {[type]} littleItemClassSelector [小索引的li上的类名选择器,注意加点]
     * @param  {[type]} oprator                 [左箭头一般写'-',右箭头写'+']
     * @return {[type]}                         [description]
     */
    var arrClick = function(whichArr, picItemClassSelector, littleItemClassSelector, oprator) {
        $(whichArr).on('click', function() {
            // stop,动画排队
            $(picItemClassSelector).eq(picIndex).stop().fadeOut().removeClass('cur');
            $(littleItemClassSelector).eq(circleIndex).removeClass('cur');
            // 数组的索引为-1的时候,指最后一个元素
            if (oprator == '+') {
                picIndex = (picIndex + 1) % carNum;
                circleIndex = (circleIndex + 1) % carNum;
            } else {
                picIndex = (picIndex - 1) % carNum;
                circleIndex = (circleIndex - 1) % carNum;
            }
            $(picItemClassSelector).eq(picIndex).stop().fadeIn().addClass('cur');
            $(littleItemClassSelector).eq(circleIndex).addClass('cur');
        });

    }
    arrClick('.rightArr', '.carPicItem', '.carItemIndex', '+');
    arrClick('.leftArr', '.carPicItem', '.carItemIndex', '-');
    // 点击小圆点,圆点变换,图片变换,
    $('.carItemIndex').on('click', function() {
        var curIndex = $(this).index();
        circleIndex = curIndex;
        $(this).addClass('cur').siblings().removeClass('cur');
        // 正显示的图片索引是picIndex
        $('.carPicItem').eq(picIndex).removeClass('cur').stop().fadeOut();
        // 正点击的圆圈索引 赋给图片的索引,然后显示出来
        picIndex = curIndex;
        $('.carPicItem').eq(picIndex).addClass('cur').stop().fadeIn();
    })
})
