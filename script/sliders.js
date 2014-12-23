$(function(){
    var mainSlider = new Fader('.main-slider', '.slider__item', 250);
    mainSlider.createArrowNav('.slider__nav-item');
    var blogSlider = new Fader('.blog-slider-wrap', '.blog-slider__item', 300);
    blogSlider.createArrowNav('.blog-slider__nav-item');

    $('.event-slider-wrap').each(function(){
        var eventSlider = $(this);
        eventSlider = new Fader(eventSlider, '.event-slider__item', 250);
        eventSlider.createBulletNav('.event-slider__nav', '.event-slider__nav-item', 'event-slider__nav-item--active', '<li class="event-slider__nav-item"></li>');
    });
});