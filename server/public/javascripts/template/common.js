(function common() {
    'use strict';

    function addTemplateNavTitleEvent() {
        var $item;
        // 밑에 제목 내용 변경되면 위에 에디터 툴 제목 내용도 변경되도록 이벤트 바인딩!
        $('.template-nav-menu > .is-edit-mode').children().each(function(idx, item) {
            $item = $(item);
            $('#toolbar_nav_title_container a:eq('+idx+')').text($item.val());
            $item.blur(function() {
                $('#toolbar_nav_title_container a:eq('+idx+')').text($(this).val());
            });
        });
    }

    function addEditorEvent() {
        // 템플릿 수정하기 버튼 클릭
        $('#template_editor_modify_btn').click(function() {
            $('.is-view-mode').addClass('hide');
            $('.is-edit-mode').removeClass('hide');
            addTemplateNavTitleEvent();
        });

        $('#template_editor_save_btn').click(function() {
            var portfolioId = $('body').data('portfolio');
            var $editItemParent, $viewItemParent, $editItem, $viewItem;
            var savedHtml, params;
            // TODO: is-edit-mode에 있는 내용들 is-view-mode로 복사!
            $('.edit-item-parent').each(function(pidx, pitem) {
                $editItemParent = $(pitem);
                $viewItemParent = $editItemParent.parent().children('.view-item-parent');
                $editItemParent.children().each(function(cidx, citem) {
                    $editItem = $(citem);
                    $viewItem = $viewItemParent.children().eq(cidx);
                    $viewItem.text($editItem.val());
                });
            });
            $('.edit-item').each(function(idx, item) {
                $editItem = $(item);
                $viewItem = $editItem.parent().children('.view-item');
                if ($editItem[0].tagName === "INPUT") {
                    $viewItem.text($editItem.val());
                }
                if ($editItem[0].tagName === "TEXTAREA") {
                    $viewItem.html(Util.makeTextareaValueToHtmlTag($editItem.val()));
                }
            });
            $('.edit-image-item').each(function(idx, item) {
                $editItem = $(item);
                $viewItem = $editItem.parent();
                $viewItem.attr('data-image', $editItem.attr('src'));
            });

            $('#template_editor_save_btn').trigger('TEMPLATE_SAVE_EVENT');
            $('.is-view-mode').removeClass('hide');
            $('.is-edit-mode').addClass('hide');

            savedHtml = $('html').prop('outerHTML');
            params = {
                html: savedHtml
            };
            $.ajax({
                url: '/ajax/portfolio/save/' + portfolioId,
                type: 'POST',
                data: params,
                error: function errorHandler(jqXHR, textStatus, errorThrown) {
                    alert("Save fail! (Server error)");
                },
                success: function successHandler(data, status, xhr) {
                    if (data.code === 1) {
                        alert(data.msg);
                        return;
                    }
                }
            });
        });

        $('#template_editor_cancel_btn').click(function() {
            location.reload(true);  // 취소 버튼 클릭시 페이지 다시 로딩
        });
    }

    function initCommon() {
        addEditorEvent();
    }

    initCommon();
}());