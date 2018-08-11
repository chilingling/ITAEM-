
//声明分页对象
const page = {
    total: 20,
    current: 0,
    groupCount: 5,
    startPage: 0,
    ajax: null,
    currentPage:0
};



function success(res) {
    console.log(res);
    // console.log(res.books);
    let ul = $('<ul></ul>');
    for (let item of res.books) {
        let html = `<li>${item.id}</li>`;
        ul.append(html);
    }
    $('.content').html('');
    $('.content').append(ul);
    page.total = res.total % 20 == 0 ? (res.total / 20) - 1 : parseInt(res.total / 20) ;
    renderGroupPage(page.total, page.startPage);
}


$(document).ready(function() {
    page.ajax = getMovie;
    // ajax请求函数
    function getMovie(page) {
        console.log("getMovie");
        let startCount = page * 20;
        let URL = 'https://api.douban.com/v2/book/search?q=js';
        $('body').append($(`<script src="https://api.douban.com/v2/book/search?q=css&start=${startCount}&callback=success"><\/script>`));
    }
    getMovie(0);
     // $('.num').eq(0).addClass('active');   
    page.prototype = {
        getCurrentPage: function() { //获取当前页

        },

        init: function() { //初始化

        },
    };



});


function eventClick() {
    // 点击具体页码 跳转
    $('.num').each(function() {
        $(this).click(function() {
            $('.num').each(function() { $(this).removeClass('active'); });
            // $(this).addClass('active');
            page.currentPage = Number($(this).attr("page-index"));
            if(Number($(this).attr("page-index")) >= page.total - 2){
                 page.startPage = page.total - 4;
                 renderGroupPage(page.total, page.startPage);
            }
            page.ajax(Number($(this).attr("page-index")));
        });
    });

    // 点击上一页
    $('.pre-page').click(function() {
        // console.log(getCurrentPage());
        let currentPage = getCurrentPage();
        if (currentPage - 1 < 0) {
            return;
        }
        $('.num').each(function() {
            $(this).removeClass('active');
        });
        // $('.num').eq(currentPage - 1).addClass('active');

        // 判断当前页是否可以回滚
        if (currentPage - 1 < page.startPage && currentPage - 1 > 0) {
            page.startPage = currentPage - 5;
            renderGroupPage(page.total, page.startPage);
            // $('.num').eq(4).addClass('active');
        } else {
            // $('.num').eq(currentPage % 5 - 1).addClass('active');
        }
        if (currentPage - 1 >= 0) {
            page.ajax(currentPage - 1);
        }
        page.currentPage = currentPage - 1;

    });

    // 点击下一页
    $('.next-page').click(function() {
        // console.log(getCurrentPage());
        let currentPage = getCurrentPage();
        if (currentPage + 1 > page.total) {
            return;
        }
        $('.num').each(function() {
            $(this).removeClass('active');
        });

        if (currentPage + 1 === page.startPage + 5 && currentPage + 1 < page.total) { //进入下一横条
            page.startPage = currentPage + 1;
            renderGroupPage(page.total, currentPage + 1);
            // $('.num').eq(0).addClass('active');
        } else if (currentPage + 1 >= page.total) {
            // $('.num').eq(currentPage % 5).addClass('active');
        } else {
            // $('.num').eq(currentPage % 5 + 1).addClass('active');
        }
        
        if (currentPage + 1 <= page.total) {
            page.ajax(currentPage + 1);
        }
        page.currentPage = currentPage + 1;
    });
}


function getCurrentPage() { //获取当前页
    return Number($('.active').attr("page-index"));
}


//渲染分页
function renderGroupPage(total, startPage) {
    let prePageBtn = `<li class="pagination-item"><a href="#" class="pre-page">上一页</a></li>`;
    let nextPageBtn = `<li class="pagination-item"><a href="#" class="next-page">下一页</a></li>`;
    let breakPoint = `<li class="pagination-item"><a href="#" class="break">...</a></li>`;
    $('.pagination').html('');
    let pageUl = $('.pagination');
    pageUl.append(prePageBtn);

    if (total - startPage > 7) {
        for (let i = startPage; i < startPage + 5; i++) {
            pageUl.append(_renderPerPage(i));
        }
        pageUl.append(breakPoint);
        for (let i = 1; i >= 0; i--) {
            pageUl.append(_renderPerPage(total - i));
        }
    } else {
        for (let i = startPage; i <= total; i++) {
            pageUl.append(_renderPerPage(i));
        }
    }
    pageUl.append(nextPageBtn);
    if(page.currentPage < total - 4){
        $('.num').eq(page.currentPage % 5).addClass('active');	
    }else{
        let num = [4,3,2,1,0];
        $('.num').eq(num[total - page.currentPage]).addClass('active');
    }
    eventClick();
}


function _renderPerPage(pageIndex) {
    return `<li class="pagination-item"><a href="#" class="num" page-index="${pageIndex}">${pageIndex + 1}</a></li>`;
}

(function(global,$){

    if(typeof $ === 'undefined'){ //检测当前环境是否存在jQuery
        throwError('Pagination requires jQuery');
    }
    

})(this.window.jQuery)