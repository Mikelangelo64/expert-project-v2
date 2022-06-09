$(document).ready(function(){

    //animateOn
    wow = new WOW({
        boxClass:     'wow',   
        animateClass: 'animated', 
        offset:       0,         
        mobile:       true,       
        live:         true       
      })
    wow.init();

      //parallax
      if(document.documentElement.clientWidth > 768) {
        var s = skrollr.init();
      }

    //menuToggle
    $('.contacts__toggle').click(function(e){
        $(".contacts__close__list").addClass('_active-contacts')
        $('.contacts__list').addClass('_active-contacts')
        $('body').addClass('_lock')

    })
    $('.contacts__close__list').click(function(e){
        $(this).removeClass('_active-contacts')
        $('.contacts__list').removeClass('_active-contacts')
        $('body').removeClass('_lock')

    })

    //more-info
    $('.main__more__info').click(function(e){
        $([document.documentElement, document.body]).animate({
            scrollTop: $('.main__more__info').parent().next().offset().top
        }, 500)
        
        e.preventDefault()
    })

    //package
    $('.package-way').slideUp(300)

    $('.package-list .package-list__item.package-list__item__open').click(function(event){

        //appear arrow and do active card
        $(this).toggleClass('_active-package')
        $('.package-list .package-list__item').not($(this)).removeClass("_active-package")
        
        //appear way
        const goto = $(this).attr('data-goto');


        $(goto).toggleClass('_active-package').slideToggle(300)
        $('.package-way').not($(goto)).removeClass('_active-package')
        $('.package-way').not($(goto)).slideUp(300)
        if(goto && $(goto)){
            
        
            // console.log($(goto).offset());
            // console.log($('.main__btn').offset());
            // $(goto).addClass('_active-package')
            // $('.package-way').not($(goto)).removeClass('_active-package')
        }

        //scroll to "way" on the adaptive
        if($(goto).hasClass('_active-package')){
            $([document.documentElement, document.body]).animate({
                scrollTop: $(".package-list").offset().top + $(".package-list").height()
            }, 500)
        }
        // setTimeout(()=>{
            
        // }, 300)
        
    })

    $(window).scroll(function () { 
        const packageItems = $('._active-package .package-way-list__item')
        // console.log('********************************');
        // console.log(Array.from(packageItems));

        
        Array.from(packageItems).forEach((item, index, arr) => {
            const top = item.getBoundingClientRect().top
            const windowHeight =  $(window).innerHeight();

            // console.log(windowHeight);
            // console.log(top);

            if(top < windowHeight - 200){
                $(item).addClass('_visible-way-item')
                
                if(index > 0){
                    $(arr[index -1]).addClass('_visible-prev-way-item')
                }

            }
            else{
                $(item).removeClass('_visible-way-item')
                if(index > 0){
                    $(arr[index -1]).removeClass('_visible-prev-way-item')
                }
            }
            
        })
    });

    //SCROLL-TO-TOP-------------------------------------------
    $(window).scroll(function() {
        if ($(window).scrollTop() > $('.main').height() + $('.header').height() + 50) {
            $('#btn-to-top').addClass('_btn-show');
        } else {
            $('#btn-to-top').removeClass('_btn-show');
        }
    });

    $('#btn-to-top').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop:0}, '300');
      });


    //INPUT-FILE----------------------------------------------
    let fileCalculationForm = $( '.calculation-form input[type=file]' )[0];
    let fileAuditForm = $( '.audit-form input[type=file]' )[0];
    //console.log(input);
    inputHandler(fileCalculationForm)
    inputHandler(fileAuditForm)

    //function input-file handler
    function inputHandler(input){
        let label	 = input.nextElementSibling
        let labelVal = label.innerHTML

        input.addEventListener( 'change', function( e ){
            //console.log('hui', e.target.files[0].name);
            let fileName = '';

            try{
                fileName = e.target.files[0].name
            } catch{
                fileName = ''
            }
            

            if( fileName ){
                label.querySelector( 'span' ).innerHTML = fileName;
            }else{
                label.innerHTML = labelVal;
            }
        })
    }

    

    // Array.prototype.forEach.call( inputs, function( input )
    // {
    //     let label	 = input.nextElementSibling
    //     let labelVal = label.innerHTML

    //     console.log('labelVal',labelVal);
    //     console.log('label',label);

    //     input.addEventListener( 'change', function( e )
    //     {
    //         let fileName = '';
    //         // if( this.files && this.files.length > 1 )
    //         //     fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
    //         // else
    //         //     fileName = e.target.value.split( '\' ).pop();

    //         if( fileName )
    //             label.querySelector( 'span' ).innerHTML = fileName;
    //         else
    //             label.innerHTML = labelVal;
    //     });
    // });

    //siper-gallery
    let gallerySwiper = new Swiper('.gallery-slider.swiper', {
        slidesPerView: 1,
        spaceBetween: 80,
        autoHeight: true,
        loop: false,
        pagination: {
            
            el: '.swiper-pagination',
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class=' + className + "></span>";
            }
        },
        navigation: {
                nextEl: '.gallery-slider__btns__container .swiper-button-next',
                prevEl: '.gallery-slider__btns__container .swiper-button-prev',
        },
        
    })
    let stockSwiper = new Swiper('.stock-slider.swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        autoHeight: true,
        loop: false,
        pagination: {
            
            el: '.swiper-pagination.stock-slider__pagination',
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class=' + className + "></span>";
            },
        },
        
    })
/*************************************************************************** */
    //header-anchor
    $('.menu__list .menu__link').click(function(event){
        onMenuLinkClick(event);
    })

    function onMenuLinkClick(event){
        const menuLink = event.target;
	    const goto = $(menuLink).attr('data-goto');
        if(goto && $(goto)){
            $([document.documentElement, document.body]).animate({
                scrollTop: $(goto).offset().top - Math.round($('.header').height())
            }, 500)
        }
        if($('.menu__toggle').hasClass('_active-menu')){
            
            $('.menu__toggle').removeClass('_active-menu')
            $('.menu__box').removeClass('_active-menu')
            $('body').removeClass('_lock')
        }
        event.preventDefault();
    }

    //blog-anchor
    $('.blog-titles__list .blog-titles__link').click(function(event){
        onBlogLinkClick(event);
    })

    // function onBlogLinkClick(event){
    //     const menuLink = event.target;
	//     const goto = $(menuLink).attr('data-goto');
    //     if(goto && $(goto)){
    //         $([document.documentElement, document.body]).animate({
    //             scrollTop: $(goto).offset().top - Math.round($('.header').height())
    //         }, 500)
    //     }

    //     event.preventDefault();
    // }

    //accordion footer
    // if(document.body.clientWidth < 771){
    //     $('.footer__accordion__title').next().slideUp(300)

    //     $('.footer__accordion__title').click(function(e){
    //         $(this).toggleClass('_active-accordion').next().slideToggle(300)
            
    //         $('.footer__accordion__title').not($(this)).removeClass('_active-accordion')
    //         $('.footer__accordion__title').not($(this)).next().slideUp(300)
    //     })
    // }
    

    

    //SWIPER

    var galleryThumbs = new Swiper('.gallery-thumbs', {
		spaceBetween: 10,
		slidesPerView: 2,
		//loop: true,
		//freeMode: true,
		//loopedSlides: 5, //looped slides should be the same
		//watchSlidesVisibility: true,
		//watchSlidesProgress: true,
        
        /* grid:{
            rows: 3,
        }, */
	});
	var galleryTop = new Swiper('.gallery-top', {
		spaceBetween: 10,
		// loop:true,
		// loopedSlides: 5, //looped slides should be the same
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		/* thumbs: {
			swiper: galleryThumbs,
		}, */
	});

    //gallery swiper
    var swiperGAlleryMini = new Swiper('.swiper-gallery-mini', {
        slidesPerView: 5,
        grid: {
          fill: 'row',
          rows: 1
        },
        spaceBetween: 5,
        breakpoints: {
            690:{
                slidesPerView: 5,
                grid: {
                fill: 'row',
                rows: 2
                },
                spaceBetween: 5,
            },
            1020: {
                slidesPerView: 2,
                grid: {
                fill: 'row',
                rows: 5
                },
                spaceBetween: 18,
            },
        },
    })

    var swiperGAlleryMain = new Swiper('.swiper-gallery-big', {
        slidesPerView: 1,
        spaceBetween: 0,
        effect: "fade",
        navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
        thumbs: {
			swiper: swiperGAlleryMini,
		},
    })


    //product-swiper
    var swiperProductMini = new Swiper('.swiper-product-small', {
        slidesPerView: 1,
        grid: {
            fill: 'row',
            rows: 4
        },
        spaceBetween: 6,
        breakpoints: {
            761:{
                slidesPerView: 4,
                grid: {
                    fill: 'column',
                    rows: 1
                },
                spaceBetween: 6,
            },
            1020: {
                slidesPerView: 1,
                grid: {
                    fill: 'row',
                    rows: 4
                },
                spaceBetween: 18,
            },
        },
    })

    var swiperProductMain = new Swiper('.swiper-product-big', {
        slidesPerView: 1,
        spaceBetween: 0,
        effect: "fade",
        thumbs: {
			swiper: swiperProductMini,
		},
    })

    //description swiper

    var swiperDescription = new Swiper('.product-description__swiper', {
        slidesPerView: 1,
        spaceBetween: 40,
        autoHeight: true,
        loop: false,
        //effect: 'fade',
        /* grid: {
            fill: 'row',
            rows: 1
        }, */

        navigation: {
			nextEl: '.characteristic-title',
			prevEl: '.description-title',
		},
        //freeMode: false,
    })

    

})