/**
 * @file
 * Lazyloader echo integration.
 */

(function($){
  // Cache the icon and it's dimensions.
  var lazyloader_icon;

  Drupal.behaviors.lazyloader = {
    attach: function (context, settings) {
      if ($(context).is('body.overlay') || $(context).parent('body.overlay').length) {
        return;
      }
      if (lazyloader_icon == undefined) {
        lazyloader_icon = new Image();

        $(lazyloader_icon).attr({src: settings.lazyloader.icon}).addClass('lazyloader-icon');
      }

      // add the loader icon
      if(settings.lazyloader.icon != '') {
        $('img[data-echo]', context).each(function() {
          var $img = $(this);
          var $icon = $(lazyloader_icon).clone();
          $icon.css({
            position: 'relative',
            top: '-' + Math.floor($img.height() / 2 - settings.lazyloader.offsetY) + 'px',
            left: '-'+ Math.floor($img.width() / 2 + settings.lazyloader.offsetX) + 'px',
          });
          $($icon).insertAfter($img);
        });
      }

      // Initialize echo.
      echo.init({
        offset: settings.lazyloader.offset,
        throttle: settings.lazyloader.throttle,
        unload: settings.lazyloader.unload,
        debounce: settings.lazyloader.debounce,
        callback: function (element, op) {
          // Remove the loader icon when the image is loaded.
          $(element).next('.lazyloader-icon').remove();
          if (element.complete && element.naturalWidth > 0) {
            $( document ).trigger( 'lazyloader-image-load', [element, op] );
          }
          else {
            $(element).load(function() {
              $( document ).trigger( 'lazyloader-image-load', [element, op] );
            });
          }
        }
      });

      // Add a scroll eventlistener to every parent element with overflow:scroll; so we can trigger echo when the
      // element is scrolled.
      $('img[data-echo], [data-echo-background]', context).each(function() {
        $(this).parents().each(function() {
          if ($(this).css('overflow') == 'scroll') {
            $(this).bind('scroll', function() {
              lazyloaderDebounceOrThrottle(settings.lazyloader.debounce, settings.lazyloader.throttle)
            });
          }
        });
      });
    },

    detach: function (context, settings) {
      // Detach echo.
      echo.detach();
    },

    // Variable for throttling.
    poll: null
  };

})(jQuery);

function lazyloaderDebounceOrThrottle(debounce, throttle) {
  if(!debounce && !!Drupal.behaviors.lazyloader.poll) {
    return;
  }
  clearTimeout(Drupal.behaviors.lazyloader.poll);
  Drupal.behaviors.lazyloader.poll = setTimeout(function(){
    echo.render();
    Drupal.behaviors.lazyloader.poll = null;
  }, throttle);
}
