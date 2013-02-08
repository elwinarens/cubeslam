var $ = require('jquery')
  , settings = require('../settings')
  , keys = require('mousetrap')
  , see = require('../support/see');

var Mobile = exports;

var RE_DBG_MOBILE = /[&?]mobile/g;
Mobile.enter = function(ctx){
  if( !RE_DBG_MOBILE.exec(window.location.href) ){
    // TODO also check for 3d transforms
    if(window.WebGLRenderingContext){
      try {
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        var exts = context.getSupportedExtensions();
        console.log(exts)
        return;
      } catch(e){}
    }
  }

  ctx.mobile = true;

  $('html').addClass('mobile')
  $('html').css('paddingBottom', 64);
  window.scrollTo(0,0)
  $('html').css('paddingBottom', 0)

  $('#gamepad .button:first')
    .on('mousedown touchstart', function(){ keys.trigger('left,a','keydown'); $(this).addClass('down'); return false; })
    .on('mouseup touchend', function(){ keys.trigger('left,a','keyup'); $(this).removeClass('down'); return false; })
  $('#gamepad .button:last')
    .on('mousedown touchstart', function(){ keys.trigger('right,d','keydown'); $(this).addClass('down'); return false; })
    .on('mouseup touchend', function(){ keys.trigger('right,d','keyup'); $(this).removeClass('down'); return false; })

  $('#canv-css .background img')
    .attr('src', $('#canv-css .background img').data( $(document).width() > 800 ? 'src-tablet' : 'src-mobile'));
  $(window).on('resize', function(){
    var rect = {w: 1200, h: 800}
      , dw = $(document).width()
      , dh = $(document).height()
      , w = dw / rect.w
      , h = dh / rect.h
      , scale = (w > h) ? h : w;
    document.getElementById('canv-css').style.webkitTransform = 'scale('+scale+')';
    if( scale < 1)
      settings.data.mouseSensitivity = 1.5-scale;
    document.getElementsByTagName('body')[0].style.clip = 'rect(0, '+dw+'px, '+dh+'px, 0)'
  }).resize();
}

Mobile.leave = function(ctx){
  // Nothing to do...
}