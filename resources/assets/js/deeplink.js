
import $ from 'jquery';
import TweenMax from 'gsap';
import Parallax from 'parallax-js';
import { TextPlugin } from 'gsap/TextPlugin';


export default class Deeplink {
    /**
     * @constructor
     */
    constructor() {
        this.variables();
        this.initEls();
        this.init();
    }

    /**
     * Global Variables
     */
    variables() {
        this.$main              = $('#pt-main');
        this.$pages             = this.$main.children('div.pt-page');
        this.pagesCount         = this.$pages.length;
        this.$page              = '';
        this.current            = 0;
        this.zindex             = 1;
        this.$nextPage          = '';
        this.$currPage          = '';
        this.isAnimating        = false;
        this.delayBeforeAnimIn  = 1;
        this.delayReInit        = 2;
        this.$document          = $(document);
        this.firstload          = true;
        this.draggable          = null;
        this.chrome_ios         = (navigator.userAgent.match('CriOS')) ? false : true;
        this.eventLoad          = new CustomEvent('load', { detail: 'test' });
    }

    /**
     * Initialize elements
     */
    initEls() {
      this.els = {
        /* Navigation */
        ajax: document.getElementsByClassName("ajax")
      };
    }

    /**
     * Initialize
     */
    init() {
        this.$pages.each(function() {
            this.$page = $(this);
            this.$page.data('originalClassList', this.$page.attr('class'));
        });

        this.$pages.eq(this.current).addClass('pt-page-current');

        this.updateBtnLang(this.$pages.eq(this.current).find('.page_lang_url_id').val());
        this.hightlightMenu(this.$pages.eq(this.current).find('.page_menu_id').val());
        this.customScrollbar(this.$pages.eq(this.current).find('.content_scroll'));

        this.deeplinkEvent();

        //$(window).resize(this.onResize);
        document.addEventListener('resize', this.onResize.bind(this));

        window.dispatchEvent(this.eventLoad);
        //this.$document.trigger('page_init', [this.$pages.eq(this.current)]);
    }

    deeplinkEvent() {
        let _this = this;

        $(document).on('click', ".ajax", function(e) {
            var currentPage = _this.$pages.eq(_this.current).find('.page_menu_id').val();
            if (this.className.indexOf(currentPage) != -1) return false;
            if (_this.isAnimating) return false;
            _this.isAnimating = true;
            history.pushState(null, null, this.href );
            _this.ajaxCall(this.href);
            e.preventDefault();
        });

        $(window).on('popstate', function(e) {
            if (_this.firstload) return;
            var returnLocation = history.location || document.location;
            _this.ajaxCall(returnLocation.href);
        });
    }

    ajaxCall(url) {
        let _this = this;
        this.firstload = false;

        $.ajax({
            url: url,
            beforeSend: function() {
                // Show Loader
                TweenMax.killAll();
            },
            cache: this.chrome_ios,
            success: function(html) {
                _this.onBeforeReInit(html);
            }
        });
    }

    updateBtnLang(url) {
        $('#navigation .lang').attr('href', url);
    }

    hightlightMenu(menu) {
        TweenMax.to($('#navigation .ajax'), 1, {className:"-=active is-active"});
        TweenMax.to($('#navigation .ajax.' + menu), 1, {className:"+=active is-active"});
    }

    updatePageTitle(title) {
        document.title = title;
    }

    customScrollbar(page) {
        this.verifScrollBar(page);
    }

    verifScrollBar(page) {
        if( page.find('.content').width() !=  page.width() ) {
            this.hideScrollBar(page)
        } else {
            this.showScrollBar(page);
        }
    }

    hideScrollBar(page) {
        page.css({'right' : page.find('.content').width() - page.width() + 'px' })
    }

    showScrollBar(page) {
        page.css({'right' : '0px' })
    }

    onResize() {
        this.verifScrollBar(this.$pages.eq(this.current).find('.content_scroll'));
    }

    onBeforeReInit(html) {
        $('.pt-page').not('.pt-page-current').css({opacity: 0}).html(html);

        this.$currPage = this.$pages.eq(this.current);
        ( this.current < this.pagesCount - 1 ) ? ++this.current : this.current = 0;
        this.$nextPage = this.$pages.eq(this.current).addClass('pt-page-current');

        this.$nextPage.css({ zIndex: this.zindex++ });

        TweenMax.to(this.$nextPage, .2, {opacity: 1});

        this.customScrollbar(this.$nextPage.find('.content_scroll'))
        this.updateBtnLang(this.$nextPage.find('.page_lang_url_id').val());
        this.hightlightMenu(this.$nextPage.find('.page_menu_id').val());
        this.updatePageTitle(this.$nextPage.find('.page_title').val());

        this.$document.trigger('page_change', [ this.$currPage, 'animation_out' ] );
        this.$document.trigger('page_change', [ this.$nextPage, 'animation_in' ] );
        this.$document.trigger('page_change', [ this.$nextPage, 'reinit' ] );
    }

    reInitAnimation(delay) {
        var _this = this;
        TweenMax.delayedCall(delay, function() {
            _this.isAnimating = false;

            _this.$currPage.attr('class', _this.$currPage.data('originalClassList')).empty();
            //_this.$nextPage.attr('class', _this.$nextPage.data('originalClassList') + 'pt-page-current');
        });
    }
}
