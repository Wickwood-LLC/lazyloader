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
             
    // Load on refresh
    loadActualImages(images, settings);

    // Load on scroll
    $(window).bind('scroll', function(e){
      loadActualImages(images, settings);
    }); 
       
    return this;
  };
    
  // Defaults
  $.fn.lazyloader.defaults = {distance: 0};
 
 
  // Loading actual images
  function loadActualImages(images, options){
    images.each(function(){
      if (windowView(this, options) && ($(this).attr('actual-src'))){
        loadImage(this);
      }
      $(this).fadeIn('slow');
    });
  };
        
    
  // Check if the images are within the window view
  function windowView(image, options){
    var view = $(window).height() + $(window).scrollTop(), image_pos = $(image).offset();     
    return view >= (image_pos.top - options['distance']);
  };
    
    
  // Load the image
  function loadImage(image){
    $(image).attr('src', $(image).attr('actual-src')).removeAttr('actual-src');
  };
     
})(jQuery);





