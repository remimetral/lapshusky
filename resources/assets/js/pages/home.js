
import Vue from 'vue';
const Parallax = require('parallax-js')
import { deeplink } from '../bundle';

export default class Home {
    /**
     * @constructor
     */
    constructor() {
        this.var();
        this.init();
        this.animationIn();
    }

    /**
     * Variables
     */
    var() {
        this.id = 'home';
        this.direction = '';
        this.page = deeplink.$pages.eq(deeplink.current);
        this.current = this.page.find('.page_menu_id').val();
        this.section = $('.container_page.home');
        this.$document = $(document);
    }

    /**
     * Initialize
     */
    init() {
        this.$document.on('page_change', this.check.bind(this));
        this.$document.on('mousewheel DOMMouseScroll', this.scroll.bind(this));
        /*if (this.id == this.current) {
            this.app = new Vue({el: '#app'});
        }*/
    }

    /**
     * Scroll
     */
    scroll(e) {
        if (typeof e.originalEvent.detail == 'number' && e.originalEvent.detail !== 0) {
            if (e.originalEvent.detail > 0) {
                console.log('Down');
            } else if (e.originalEvent.detail < 0){
                console.log('Up');
            }
        } else if (typeof e.originalEvent.wheelDelta == 'number') {
            if (e.originalEvent.wheelDelta < 0) {
                if (this.direction != 'down') {
                    TweenMax.to(this.section.find('.columns'), 1, { alpha: 0, ease: Expo.easeOut });
                    TweenMax.to(this.section.find('.gradient'), 1, { alpha: 0, ease: Expo.easeOut });
                    TweenMax.to(this.section.find('.scroll_down'), 1, { alpha: 0, ease: Expo.easeOut });
                    TweenMax.to(this.section.find('.bg_page'), 1, { scale: 1.1, ease: Expo.easeOut });
                    this.$document.mousemove(this.move.bind(this));
                    this.direction = 'down';
                }

            } else if (e.originalEvent.wheelDelta > 0) {
                if (this.direction != 'up') {
                    TweenMax.to(this.section.find('.columns'), 1, { alpha: 1, ease: Expo.easeOut });
                    TweenMax.to(this.section.find('.gradient'), 1, { alpha: 1, ease: Expo.easeOut });
                    TweenMax.to(this.section.find('.scroll_down'), 1, { alpha: 1, ease: Expo.easeOut });
                    TweenMax.to(this.section.find('.bg_page'), 1, { x: 0, y: 0, scale: 1, ease: Expo.easeOut });
                    this.$document.off('mousemove');
                    this.direction = 'up';
                }
            }
        }
    }

    /**
     * Mouse Move
     */
    move(e) {
        this.parallax(e, this.section.find('.bg_page'), -20);
        /*x_acceleration = _calculateDistance(mouse_move_reference, e.pageX, e.pageY, step_x, step_x);
        x_acceleration_abs = Math.abs(x_acceleration.x);

        if(x_acceleration.x > 0) {
          TweenMax.to(bg, .1, { overwrite:"all", x: '-=' + x_acceleration_abs, ease: Linear.easeNone, onUpdate: _verifBorder, onComplete: _continueSlide, onCompleteParams: ['-', x_acceleration_abs] });
        }
        else {
          TweenMax.to(bg, .1, { overwrite:"all", x: '+=' + x_acceleration_abs, ease: Linear.easeNone, onUpdate: _verifBorder, onComplete: _continueSlide, onCompleteParams: ['+', x_acceleration_abs] });
      }*/
    }

    /**
     * Parallax
     */
    parallax(e, target, movement) {
        var $this = $('.container_page.home');
        var relX = e.pageX - $this.offset().left;
        var relY = e.pageY - $this.offset().top;

        TweenMax.to(target, 1, {
            x: (relX - $this.width() / 2) / $this.width() * movement,
            y: (relY - $this.height() / 2) / $this.height() * movement
        });
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
        TweenMax.from(section.find('.whatido .cre'), 1, { x: 100, alpha: 0, ease: Expo.easeOut, delay: 2.8 });
        TweenMax.from(section.find('.whatido .des'), 1, { x: 100, alpha: 0, ease: Expo.easeOut, delay: 3.2 });
        TweenMax.from(section.find('.whatido .dev'), 1, { x: 100, alpha: 0, ease: Expo.easeOut, delay: 3.6 });
        TweenMax.from(section.find('.whatido .exp'), 1, { x: 100, alpha: 0, ease: Expo.easeOut, delay: 4 });
        TweenMax.from(section.find('.scroll_down'), 1, { alpha: 0, ease: Expo.easeOut, delay: 4 });
        TweenMax.from(section.find('.scroll_down'), 1, { y: -10, ease: Back.easeIn, repeat: -1, yoyo: true, delay: 5 });

        var timeline = new TimelineMax({ repeat: -1, yoyo: false, repeatDelay: 0 });

        timeline.to(section.find('.whatido .exp'), 0.8, { text:{ value: "Explore.", padSpace: true,  ease:Linear.easeNone }, delay:2 });
        timeline.to(section.find('.whatido .exp'), 0.8, { text:{ value: "Experiment.", padSpace: true, ease:Linear.easeNone }, delay:2 });
        timeline.to(section.find('.whatido .exp'), 0.8, { text:{ value: "Experience.", padSpace: true, ease:Linear.easeNone }, delay:2 });

        /*
        TweenMax.fromTo(section.find('.compass'), 2, { rotation: 20 },
                                                     { rotation: -20, delay: 1, repeat: -1, yoyo: true, ease:Expo.easeInOut });
        */
    }

    calculateDistance(elem, mouseX, mouseY, maxX, maxY) {
      var x = Math.floor(Math.sqrt(Math.pow(mouseX - (elem.offset().left+(elem.width()/2)), 2)));
      var y = Math.floor(Math.sqrt(Math.pow(mouseY - (elem.offset().top+(elem.height()/2)), 2)));

      if(mouseX < document_width/2) x = x*-1;
      if(mouseY > document_height/2) y = y*-1;

      maxX = (x/document_width)*maxX*2;
      maxY = (y/document_height)*maxY*2;

      return { x: maxX, y: maxY }
      // return Math.floor(Math.sqrt(Math.pow(mouseX - (elem.offset().left+(elem.width()/2)), 2) + Math.pow(mouseY - (elem.offset().top+(elem.height()/2)), 2)));
    }
}
