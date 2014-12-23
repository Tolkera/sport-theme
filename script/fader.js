function Fader(slider, slide, speed, firstSlide) {
    this.speed = speed;
    this.slider = $(slider);
    this.slides = this.slider.find(slide);
    this.firstSlide = firstSlide || 0;
    this.slides.hide().eq(this.firstSlide).show();
    this.slidesAll = this.slides.length;
    this.current = this.firstSlide;
    this.lastSlide = this.slidesAll - 1;
    this.nextSlide = this.firstSlide;
}

Fader.prototype.changeSlides = function(){
    var self = this;
    this.slides.eq(this.current).fadeOut(this.speed, function(){
        self.slides.eq(self.nextSlide).fadeIn(self.speed);
    });
};

Fader.prototype.createArrowNav = function(arrowItem) {
    this.arrowItem = this.slider.find(arrowItem);
    var self = this;

    this.arrowItem.on('click', function(){
        self.arrowNav($(this).data('dir'));
    })
};

Fader.prototype.createBulletNav = function(container, navItem, navActiveClass, html) {
    this.navContainer = this.slider.find(container);
    var bulletsHtml = "";
    for ( var i = 0; i < this.slidesAll; i++ ){
        bulletsHtml += html;
    }

    this.navContainer.html(bulletsHtml);
    this.bullet = this.navContainer.find(navItem);
    this.bullet.eq(0).addClass(navActiveClass);
    var self = this;

    this.bullet.on('click', function(){
        self.clickedBulletIndex = $(this).index();
        self.slideBullet();
        self.bullet.removeClass(navActiveClass);
        $(this).addClass(navActiveClass);
    })
};

Fader.prototype.arrowNav = function(direction) {
    if(direction == "next") {
        this.nextSlide = (this.current == this.lastSlide) ? 0 : this.current + 1;
    } else {
        this.nextSlide = (this.current == 0) ? this.lastSlide : this.current - 1;
    }
    this.changeSlides();
    this.current = this.nextSlide;
};

Fader.prototype.slideBullet = function(){
    if(!(this.clickedBulletIndex == this.current)) {
        this.nextSlide = this.clickedBulletIndex;
        this.changeSlides();
        this.current = this.nextSlide;
    }
};

