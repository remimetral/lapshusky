
import Vue from 'vue';
import { deeplink } from '../bundle';

export default class Home {
    /**
     * @constructor
     */
    constructor() {
        this.variables();
        this.init();
        this.animationIn();
    }

    /**
     * Global Variables
     */
    variables() {
        this.id = 'home';
        this.page = deeplink.$pages.eq(deeplink.current);
        this.current = this.page.find('.page_menu_id').val();
        this.$document = $(document);
    }

    /**
     * Initialize
     */
    init() {
        this.$document.on('page_change', this.check.bind(this));
        /*if (this.id == this.current) {
            this.app = new Vue({el: '#app'});
        }*/
    }

    /**
     * Check
     */
    check(e, current_page, type) {
        if( current_page.find('.page_id').val() != this.id ) return;

        this.page = current_page;

        switch(type) {
            case 'reinit':
                this.reInit();
                break;
            case 'animation_in':
                this.animationIn();
                deeplink.reInitAnimation(deeplink.delayReInit);
                break;
            case 'animation_out':
                this.animationOut();
                break;
        }
    }

    reInit() {
        //this.app = new Vue({el: '#app'});
        this.$document.title = this.page.find('.page_title').val();
    }

    animationIn() {
        TweenMax.from(this.page.find('.container_page'), 2, { scale: 1.1, alpha: 0, ease: Expo.easeOut, delay: deeplink.delayBeforeAnimIn });
        this.animationText();
    }

    animationOut() {
        TweenMax.to(this.page.find('.container_page'), 2, { alpha: 0, ease: Expo.easeOut });
    }

    animationText() {
        var section = $('.container_page.home');

        TweenMax.from(section.find('.title'), 1, { y: 100, alpha: 0, ease: Expo.easeOut, delay: 1.8 });
        TweenMax.from(section.find('.caption'), 1, { y: 100, alpha: 0, ease: Expo.easeOut, delay: 2.2 });
        //TweenMax.from(section.find('.whatido'), 1, { x: 100, alpha: 0, ease: Expo.easeOut, delay: 3 });
        TweenMax.from(section.find('.whatido .cre'), 1, { x: 100, alpha: 0, ease: Expo.easeOut, delay: 2.8 });
        TweenMax.from(section.find('.whatido .des'), 1, { x: 100, alpha: 0, ease: Expo.easeOut, delay: 3.2 });
        TweenMax.from(section.find('.whatido .dev'), 1, { x: 100, alpha: 0, ease: Expo.easeOut, delay: 3.6 });
        TweenMax.from(section.find('.whatido .exp'), 1, { x: 100, alpha: 0, ease: Expo.easeOut, delay: 4 });
    }
}
