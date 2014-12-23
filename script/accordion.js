$(function(){

    function Accordion(item, clickable, sliding, classOpen, shown) {
         this.clickable = $(clickable);
         this.sliding = $(sliding);
         this.classOpen = classOpen;
         this.item = $(item);
         this.shown = shown - 1;
         var self = this;

       this.sliding.hide().eq(this.shown).show();
       this.item.eq(this.shown).addClass(this.classOpen);

       this.clickable.on('click', function(){
           var container = $(this).closest(self.item);
           if(container.hasClass(self.classOpen)) {
               container.find(self.sliding).slideUp(function(){
                   container.removeClass(self.classOpen)
               })
           } else {
               self.sliding.slideUp();
               self.item.removeClass(self.classOpen);
               container.addClass(self.classOpen).find(self.sliding).slideDown();
           }
       })
    }

    var eventAccordion = new Accordion('.event-item', '.event-item__header', '.event-slider-wrap', 'event-item--open');
    var widgetAccordion = new Accordion('.program-widget__item', '.widget-item__header', '.widget-item__content', 'widget-item--open', 2)

});

