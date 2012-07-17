// $Id$

/**
 * @file
 * Lazyloader
 *
 * @author: Daniel Honrade http://drupal.org/user/351112
 *
 */

(function($){
    
  // Process lazyloader
  $.fn.lazyloader = function(options){
    var settings = $.extend($.fn.lazyloader.defaults, options);
    var images = this;
    
    // add the wait icon
    $('img[actual-src]').parent().css({ position: 'relative', display: 'block'}).prepend('<img class="lazyloader-wait" src="' + settings['icon'] + '" />');
                     
    // Load on refresh
    loadActualImages(images, settings);

    // Load on scroll
    $(window).bind('scroll', function(e){
      loadActualImages(images, settings);
    }); 
       
    return this;
  };
    
  // Defaults
  $.fn.lazyloader.defaults = { 
    distance: 0, // the distance (in pixels) of image when loading of the actual image will happen
    icon: ''     // display animating icon
  };
 
 
  // Loading actual images
  function loadActualImages(images, settings){
    images.each(function(){
      var imageHeight = $(this).height(), imageWidth = $(this).width();
      var waitTop = Math.round(imageHeight/2), waitLeft = Math.round(imageWidth/2), waitFactor = Math.round($(this).siblings('.lazyloader-wait').height()/2);
      $(this).siblings('.lazyloader-wait').css({ top: waitTop - waitFactor, left: waitLeft - waitFactor });
      
      if (windowView(this, settings) && ($(this).attr('actual-src'))){
        loadImage(this);
        $(this).fadeIn('slow');
      }
    });
  };
        
    
  // Check if the images are within the window view
  function windowView(image, settings){
    var windowHeight = $(window).height(),
        windowBottom = windowHeight + $(window).scrollTop(), 
        windowTop    = windowBottom - windowHeight,
        imagePos     = $(image).offset().top - settings['distance'];

    return ((windowBottom >= imagePos) && (windowTop <= imagePos));
  };
    
    
  // Load the image
  function loadImage(image){
    $(image).hide().attr('src', $(image).attr('actual-src')).removeAttr('actual-src');
    $(image).load(function(){
      $(this).siblings('img.lazyloader-wait').remove();
    });
  };
     
})(jQuery);





