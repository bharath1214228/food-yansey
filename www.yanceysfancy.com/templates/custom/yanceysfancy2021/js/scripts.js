(function ($) {

  // Global Variables
  var $window = $(window);
  var windowWidth = $window.innerWidth();
  var scrollY = $window.scrollTop();
  var $body = $('body');
  var $topBar = $('.top-bar');
  var $header = $('.navbar');
  var topBarHeight = $topBar.outerHeight();
  var headerHeight = $header.outerHeight();


  /*
  ==============================================================================
  DOM READY
  ==============================================================================
  */
  $(function () {
    createSideBySide();
    createSplit5050();
    detectObjectFit();
    handleNavDropdown();
    // setHeaderSize();
    // setStickyHeader();
  });

  var $body = $(document.body);
  var navHeight = $('.nav-wrap').outerHeight(true) + 10;

  $('.theme-sticky-menu').affix({
    offset: {
      top: 100,
      bottom: navHeight
    }
  });


  $body.scrollspy({
    target: '.aside-right',
    offset: navHeight
  });





  $('.menu-link').on('click', function (e) {
    e.stopPropagation();
    $('.menu-link, #menu, .fullcontent').toggleClass('active');
  });

  // if menu is open, clicking anywhere on the "fullcontent" should close the menu
  $('.fullcontent').on('click', function (e) {
    if ($(this).hasClass('active')) {
      e.stopPropagation();
      $('.menu-link, #menu, .fullcontent').toggleClass('active');
    }
  });

  jQuery(function ($) {
    var windowSize = $(window).width();
    if (windowSize < 768) {
      $('.navbar .sub > a').one("click", function (event) {
        event.preventDefault();
        $(this).parent().toggleClass('item-on');
        $(this).parent().children('ul').slideDown('fast');
      });
    }
  });


  $(window).scroll(function () {
    $('#parallax-bg-1').css('background-position-Y', -Math.round($(this).scrollTop() * 0.5) + 'px');
  });

  /*
  ==============================================================================
  ON LOAD                                                     (including images)
  ==============================================================================
  */
  $(window).load(function () {

    jQuery('.flexslider').flexslider({
      animation: "fade",
      slideshow: true,
      animationSpeed: 2000,
      slideshowSpeed: 7000
    });

    // AutoScroll to form error
    if ($('.form-error-1').length) {
      $('html, body').animate({
        scrollTop: $('.form-error-1').offset().top - headerHeight
      }, 1000);
    }

    // Equal Height Elements
    var temph = 0;
    jQuery('#section04 .eqh').each(function () {
      maxh = jQuery(this).height();
      if (maxh > temph) {
        temph = maxh;
      }
    });
    jQuery('.eqh').height(temph);

  });


  /*
  ==============================================================================
  ON SCROLL
  ==============================================================================
  */
  $(window).on('scroll', function () {
    scrollY = $window.scrollTop(); // new scroll position

    // setHeaderSize();
    // setStickyHeader();
    check_if_in_view();
  });


  /*
  ==============================================================================
  ON RESIZE
  ==============================================================================
  */
  $(window).on('resize', function () {
    windowWidth = $(window).innerWidth(); // new width
    scrollY = $window.scrollTop(); // new scroll position

    // setHeaderSize();
    // setStickyHeader();
    check_if_in_view();
  });


  /*
  ==============================================================================
  YOUR CUSTOM FUNCTIONS
  ==============================================================================
  */

  /*
  Check If In View
  ------------------------------------------------------------------------------
  */
  var $animation_elements = $('.animation-element');

  function check_if_in_view() {
    var window_height = $window.height();
    var window_top_position = $window.scrollTop();
    var window_bottom_position = (window_top_position + window_height);

    $.each($animation_elements, function () {
      var $element = $(this);
      var element_height = $element.outerHeight();
      var element_top_position = $element.offset().top;
      var element_bottom_position = (element_top_position + element_height);

      // check to see if this current container is within viewport
      if ((element_bottom_position >= window_top_position) &&
        (element_top_position <= window_bottom_position)) {
        $element.addClass('in-view');
      } else {
        $element.removeClass('in-view');
      }
    });
  }

  /*
  setHeaderSize
  ------------------------------------------------------------------------------
  */
  // function setHeaderSize() {
  //   scrollY > ($window.height() / 2) ? $header.addClass('is-condensed') : $header.removeClass('is-condensed');
  // }


  /*
  setStickyHeader
  ------------------------------------------------------------------------------
  */
  // function setStickyHeader() {
  //   // if the topBar exists, use its height to set the scroll amount before the sticky kicks in.
  //   if ($topBar.length > 0) {
  //     if (scrollY > topBarHeight) {
  //       $header.addClass('is-fixed');
  //       $body.css('paddingTop', headerHeight);
  //     } else {
  //       $header.removeClass('is-fixed');
  //       $body.css('paddingTop', '');
  //     }
  //   } else {
  //     $header.addClass('is-fixed');
  //     $body.css('paddingTop', headerHeight);
  //   }
  // }


  /*
  Dynamic Side-By-Side Columns
  ------------------------------------------------------------------------------
  */
  function createSideBySide() {
    // Configuration -------------------------------------------------
    var bootstrap_version = 3; // 2 or 3
    var system_is_fission = true; // true or false
    // End Configuration ---------------------------------------------

    // No need to edit below this line -------------------------------
    var $side_by_side = (system_is_fission == true) ? $('.theme-side-by-side') : $('.block-style-side-by-side');
    var $parent_container = $side_by_side.parent();

    $parent_container.each(function (i, el) {
      var $target_divs = $(el).find($side_by_side);
      var num_of_divs = $target_divs.length;

      // console.log( "i: " + i + ": " + $(this).attr('class') );

      // wrap all target DIVs with a "js-row"
      $target_divs.wrapAll('<div class="' + ((bootstrap_version == 2) ? 'row-fluid' : 'row') + ' js-row">');

      // number of DIVs in each container
      $target_divs.each(function (i, element) {
        if (num_of_divs >= 5) {
          $(element).addClass((bootstrap_version == 2) ? 'span2' : 'col-sm-2');
        }
        if (num_of_divs >= 4) {
          $(element).addClass((bootstrap_version == 2) ? 'span3' : 'col-sm-3');
        }
        if (num_of_divs == 3) {
          $(element).addClass((bootstrap_version == 2) ? 'span4' : 'col-sm-4');
        }
        if (num_of_divs == 2) {
          $(element).addClass((bootstrap_version == 2) ? 'span6' : 'col-sm-6');
        }
        if (num_of_divs == 1) {
          $(element).addClass((bootstrap_version == 2) ? 'span12' : 'col-sm-12');
        }
      });
    });
  }


  /*
   * Split 50-50
   * ---------------------------------------------------------------------------
   * Lays out your Modules in a 50-50 split.
   * Unlike "side-by-side", these modules will always take 50% of screen.
   */
  function createSplit5050() {
    // Config
    var bootstrapVersion = 3; // 2 or 3
    var systemIsFission = true; // true or false

    // No need to edit below this line
    // -------------------------------
    var $splitModule = (systemIsFission === true) ? $('.theme-split-50-50') : $('.block-style-split-50-50');
    var $parentContainer = $splitModule.parent();

    $parentContainer.each(function (i, el) {
      var $targetDivs = $(el).find($splitModule);
      var numOfDivs = $targetDivs.length;

      // wrap all target DIVs with a new "js-row"
      $targetDivs.wrapAll('<div class="' + ((bootstrapVersion == 2) ? 'row-fluid' : 'row') + ' js-split-row">');

      // apply the proper class based on the number of DIVs
      // $targetDivs.each(function(i, element) {
      //   $(element).addClass( (bootstrapVersion == 2) ? 'span6' : 'col-sm-6' );
      // });
    });
  }

  /*
   * Open/Close subMenu
   * ---------------------------------------------------------------------------
   * Fixes Android submenu click issue
   */
  function handleNavDropdown() {
    var $dropdownLink = $("li.sub > a");
    $dropdownLink.append('<i class="js-dropdown-icon fa fa-angle-down" />');
    var $dropdownIcon = $(".js-dropdown-icon");

    if (windowWidth < 991) {
      // clone link and insert it into the child UL > LI
      $dropdownLink.each(function (i) {
        $(this).next("ul").prepend('<li class="js-li-' + i + '"/>');
        var $clonedDropdownLink = $(this).clone().addClass("js-" + i + "-clone");
        $(".js-li-" + i).html($clonedDropdownLink);
        $clonedDropdownLink.find(".fa").remove(); // remove arrow icon

        // toggle submenu
        $(this).on("click", function (e) {
          e.preventDefault();
          console.log("clicked: ", $(this));
          $(this).next("ul").slideToggle();
        });
      });
    }
  }


  // collapse the "mainbody" if it's empty
  if ($('.main .col-sm-12').children().length === 0) {
    $('.main').addClass('js-is-empty');
  } else {
    $('.main').removeClass('js-is-empty');
  }

  $(".main:has(.category-page)").addClass("category-style");
  $(".main:has(.collection-center-page)").addClass("collection-center-style");
  $(".main:has(.flavor-page)").addClass("flavor-style");
  $(".main:has(.custom_recipecard_search_item)").addClass("js-recipe-list");
  $(".main:has(.custom_recipe_block)").addClass("js-wood-bg");
  $(".main:has(.grid.locations)").addClass("js-grid-locations");
  $(".main:has(.wood-bg)").addClass("js-wood-bg");

  /*
  Make Div clickable
  ------------------------------------------------------------------------------
  */
  makeDivClickable('.featured-products .item-wrapper');

  function makeDivClickable(div) {
    $(div).each(function () {
      var url = $(this).find('a').attr('href');
      if (url) {
        $(this).css('cursor', 'pointer');
        $(this).on('click', function () {
          window.location = url;
        });
      }
    });
  }

  // $(".aside-top .col-sm-4").click(function() {
  //   window.location = $(this).find("a").attr("href");
  //   return false;
  // });


  $(function () {
    $('.product-description h4').matchHeight({
      property: 'min-height'
    });
    $('.catalog-list-item-details a h3').matchHeight({
      property: 'min-height'
    });
    $('.product-description').matchHeight({
      property: 'min-height'
    });
    $('.custom_recipecard_search_item .recipe_name_search').matchHeight({
      property: 'min-height'
    });
    $('.slide-content').matchHeight({
      property: 'min-height'
    });
    $('.match-height').matchHeight({
      property: 'min-height'
    });
  });


  /*
  Set module image as background on parent
  ------------------------------------------------------------------------------
  */

  var getImageSrc = $('.banner .banner-img img').attr('src');
  $('.banner .theme-split-50-50:nth-of-type(odd)').css('background-image', 'url(' + getImageSrc + ')');

  // Scroll to an Anchor on the same page
  //
  $('a[href*="#"]:not(a[href="#"], [data-toggle="tab"])').on('click', function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[id=' + this.hash.slice(1) + ']') || $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top - (headerHeight + 100)
        }, 1000);
        return false;
      }
    }
  });


  /*
  Detect objectFit support / Edge & IE fallback
  ------------------------------------------------------------------------------
  */
  function detectObjectFit() {
    if ('objectFit' in document.documentElement.style === false) {
      var container = document.getElementsByClassName('image-wrapper');
      for (var i = 0; i < container.length; i++) {
        var imageSource = container[i].querySelector('img').src;
        container[i].querySelector('img').style.display = 'none';
        container[i].style.backgroundSize = 'cover';
        container[i].style.backgroundImage = 'url(' + imageSource + ')';
        container[i].style.backgroundPosition = 'center center';
        container[i].style.width = '260px';
        container[i].style.height = '260px';
      }
    }
  }


  // site alert
  $(".site-alert .close").on("click", function (e) {
    $('.site-alert').remove();
  })


})(jQuery);