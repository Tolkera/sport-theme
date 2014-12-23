(function($){

    function Carouselira(element, options){
        this.options = $.extend({}, {
            slide: '',
            speed: 1500,
            firstSlide: 0,
            bulletNav: {
                enable: false,
                container: '',
                bulletHtml: '',
                bulletActive: ''
            },
            arrowNav: {
                enable: false,
                navNext: '',
                navPrev: ''
            },
            effect: 'fade'

        }, options);

        this.slider = $(element);
        this.init();
    }

    Carouselira.prototype = {
        init: function(){
            this.slides = this.slider.find(this.options.slide);
            this.slidesLen = this.slides.length;
            this.lastSlide = this.slidesLen - 1;
            this.current = this.options.firstSlide;
            this.nextSlide = this.current;
            this.setInitialDisplay();
        },

        setInitialDisplay: function(){

            this.slides.hide().eq(this.options.firstSlide).show();

            if(this.options.bulletNav.enable) {
                this.bulletActiveClass = this.options.bulletNav.bulletActive;
                this.createBulletNav();
            }

            if(this.options.arrowNav.enable) {
                var navPrev = this.slider.find(this.options.arrowNav.navPrev);
                var navNext = this.slider.find(this.options.arrowNav.navNext);
                this.createArrowNav(navPrev, navNext);
            }

            if(this.options.effect == "slide"){
                this.slideContainer = this.slides.parent();
                this.slideContainer.css({'position': 'relative', height: this.slides.height(), overflow: 'hidden'});
                this.slides.css({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%'
                })
            }

        },

        createArrowNav: function(prev, next){
            var self = this;

            passDirection(prev, 'prev');
            passDirection(next, 'next');

            function passDirection(btn, dir){
                btn.on('click', function(){
                    self.findNextSlide({direction: dir, method: 'arrow'})
                })
            }
        },

        createBulletNav: function() {
            var bulletsHtml = "";
            var bullet = this.options.bulletNav.bulletHtml;
            var navContainer = this.slider.find(this.options.bulletNav.container);
            for ( var i = 0; i < this.slidesLen; i++ ){
                bulletsHtml += bullet;
            }
            navContainer.html(bulletsHtml);
            this.bullet = navContainer.children();
            this.updateCurrent();
            var self = this;

            this.bullet.on('click', function(){
                var clickedBulletIndex = $(this).index();

                if(clickedBulletIndex != self.current) {

                    if(self.options.effect == "slide") {
                        var dir = '';
                        if (self.current == 0) {
                            (clickedBulletIndex == self.lastSlide) ? dir = "prev" : dir = "next"
                        } else if (self.current == self.lastSlide) {
                            (clickedBulletIndex == 0) ? dir = "next" : dir = "prev"
                        } else {
                            (clickedBulletIndex > self.current) ? dir = "next" : dir = "prev"
                        }
                    }

                    self.findNextSlide({nextSlide: clickedBulletIndex + "", direction: dir, method: 'bullet'});
                }
            })
        },

        findNextSlide: function(options){

            if(options.method == "arrow"){
                if(options.direction == "next") {
                    this.nextSlide = (this.current == this.lastSlide) ? 0 : this.current + 1;
                } else {
                    this.nextSlide = (this.current == 0) ? this.lastSlide : this.current - 1;
                }
            }

            if(options.method == "bullet") {
                this.nextSlide = options.nextSlide;
            }

            this.changeSlides(options.direction);
        },

        changeSlides: function(options){

            var self = this;
            if(this.options.effect == "fade") {
                this.slides.eq(this.current).fadeOut(this.options.speed, function(){
                    self.slides.eq(self.nextSlide).fadeIn(self.options.speed);
                });
            }

            if(this.options.effect == "slide") {
                if(options == "next"){
                    this.slides.eq(this.nextSlide).css('left', '100%').show();
                    this.slides.eq(this.current).animate({left: '-100%'}, this.options.speed);
                    this.slides.eq(this.nextSlide).animate({left: '0'},this.options.speed)
                } else {
                    this.slides.eq(this.nextSlide).css('left', '-100%').show();
                    this.slides.eq(this.current).animate({left: '100%'},this.options.speed);
                    this.slides.eq(this.nextSlide).animate({left: '0'},this.options.speed)
                }
            }

            this.updateCurrent()
        },

        updateCurrent: function(){
            this.current = this.nextSlide;
            if(this.options.bulletNav.enable) {
                this.bullet.removeClass(this.bulletActiveClass);
                this.bullet.eq(this.current).addClass(this.bulletActiveClass);
            }
        }
    };

    $.fn.carouselira = function(options){
        return this.each(function(){
            new Carouselira(this, options)
        })
    }

}(jQuery));

