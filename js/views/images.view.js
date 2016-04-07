define("images.view", ['require','exports', 'template'], 
    function(require, exports, template) {

    var ImagesView = Backbone.View.extend({
        events: {},

        initialize: function(settings) {
            this.$el = $(_.template(template['tpl/images.html'])({}));
            settings = _.extend({
                overlayBgColor      : '#000',     // (string) Background color to overlay; inform a hexadecimal value like: #RRGGBB. Where RR, GG, and BB are the hexadecimal values for the red, green, and blue values of the color.
                overlayOpacity      : 0.8,        // (integer) Opacity value to overlay; inform: 0.X. Where X are number from 0 to 9
                fixedNavigation     : false,      // (boolean) Boolean that informs if the navigation (next and prev button) will be fixed or not in the interface.
                containerBorderSize : 10,         // (integer) If you adjust the padding in the CSS for the container, #lightbox-container-image-box, you will need to update this value
                containerResizeSpeed: 400,        // (integer) Specify the resize duration of container image. These number are miliseconds. 400 is default.
                txtImage            : '',         // (string) Specify text "Image"./ Configuration related to texts in caption. For example: Image 2 of 8. You can alter either "Image" and "of" texts.
                txtOf               : '/',        // (string) Specify text "of"
                keyToClose          : 'c',        // (string) (c = close) Letter to close the jQuery lightBox interface. Beyond this letter, the letter X and the SCAPE key is used to.
                keyToPrev           : 'p',        // (string) (p = previous) Letter to show the previous image
                keyToNext           : 'n',        // (string) (n = next) Letter to show the next image.
                imageArray          : [],
                activeImage         : 0,
                collection          : null         
            }, settings);
            
            this.settings = settings;
        },

        _start : function (objClicked,jQueryMatchedObj) {
            // Hime some elements to avoid conflict with overlay in IE. These elements appear above the overlay.
            $('embed, object, select').css({ 'visibility' : 'hidden' });
            // Call the function to create the markup structure; style some elements; assign events in some elements.
            this._set_interface();

            // Call the function that prepares image exibition
            this._set_image_to_view();
        },

        _set_image_to_view : function() { // show the loading
            // Show the loading
            $('#lightbox-loading').show();
            if ( this.settings.fixedNavigation ) {
                $('#lightbox-image,#lightbox-container-image-data-box,#lightbox-image-details-currentNumber').hide();
            } else {
                // Hide some elements
                $('#lightbox-image,#lightbox-nav,#lightbox-nav-btnPrev,#lightbox-nav-btnNext,#lightbox-container-image-data-box,#lightbox-image-details-currentNumber').hide();
            }

            if (this.settings.collection){
                this.settings.collection.off("screeshot.info.success");
                this.settings.collection.off("screeshot.info.error");
                this.settings.collection.on("screeshot.info.success", $.proxy(this.onGetScreeshotInfo, this));
                this.settings.collection.on("screeshot.info.error", function(){alert("获取图片信息失败！")});

                var id = this.settings.imageArray[this.settings.activeImage].get("id")
                this.settings.collection.getScreeshotInfo({id:id})
            }
        },

        onGetScreeshotInfo : function(data){
            // Image preload process
            var objImagePreloader = new Image();
            objImagePreloader.onload = function() {
                $('#lightbox-image').attr('src', data.url);
                // Perfomance an effect in the image container resizing it
                this._resize_container_image_box(objImagePreloader.width,objImagePreloader.height);
                //  clear onLoad, IE behaves irratically with animated gifs otherwise
                objImagePreloader.onload = function(){};
            }.bind(this);
            objImagePreloader.src = data.url;
        },

        /**
         * Perfomance an effect in the image container resizing it
         *
         * @param integer intImageWidth The image's width that will be showed
         * @param integer intImageHeight The image's height that will be showed
         */
        _resize_container_image_box : function (intImageWidth,intImageHeight) {
            // Get current width and height
            var intCurrentWidth = $('#lightbox-container-image-box').width();
            var intCurrentHeight = $('#lightbox-container-image-box').height();
            // Get the width and height of the selected image plus the padding
            var intWidth = (intImageWidth + (this.settings.containerBorderSize * 2)); // Plus the image's width and the left and right padding value
            var intHeight = (intImageHeight + (this.settings.containerBorderSize * 2)); // Plus the image's height and the left and right padding value
            // Diferences
            var intDiffW = intCurrentWidth - intWidth;
            var intDiffH = intCurrentHeight - intHeight;
            // Perfomance the effect
            $('#lightbox-container-image-box').animate(
                { width: intWidth, height: intHeight }, 
                this.settings.containerResizeSpeed, 
                function() { this._show_image(); }.bind(this)
            );
            if ( ( intDiffW == 0 ) && ( intDiffH == 0 ) ) {
                if ( $.browser&&$.browser.msie ) {
                    this.___pause(250);
                } else {
                    this.___pause(100);  
                }
            } 
            $('#lightbox-container-image-data-box').css({ width: intImageWidth });
            $('#lightbox-nav-btnPrev,#lightbox-nav-btnNext').css({ height: intImageHeight + (this.settings.containerBorderSize * 2) });
        },
        /**
         * Show the prepared image
         *
         */
        _show_image : function () {
            $('#lightbox-loading').hide();
            $('#lightbox-image').fadeIn(function() {
                this._show_image_data();
                this._set_navigation();
            }.bind(this));
            //todo
            //this._preload_neighbor_images();
        },
        /**
         * Show the image information
         *
         */
        _show_image_data : function () {
            $('#lightbox-container-image-data-box').slideDown('fast');
            $('#lightbox-image-details-caption').hide();
            //TODO
            if ( this.settings.imageArray[this.settings.activeImage].get("filename")) {
                $('#lightbox-image-details-caption').html(this.settings.imageArray[this.settings.activeImage].get("filename")).show();
            }
            // If we have a image set, display 'Image X of X'
            if ( this.settings.imageArray.length > 1 ) {
                $('#lightbox-image-details-currentNumber').html(this.settings.txtImage + ' ' + ( this.settings.activeImage + 1 ) + ' ' + this.settings.txtOf + ' ' + this.settings.imageArray.length).show();
            }       
        },
        /**
         * Display the button navigations
         *
         */
        _set_navigation : function() {
            $('#lightbox-nav').show();

            // Instead to define this configuration in CSS file, we define here. And it's need to IE. Just.
            //$('#lightbox-nav-btnPrev,#lightbox-nav-btnNext').css({ 'background' : 'transparent url(' + this.settings.imageBlank + ') no-repeat' });
            
            // Show the prev button, if not the first image in set
            if ( this.settings.activeImage != 0 ) {
                if ( this.settings.fixedNavigation ) {
                    $('#lightbox-nav-btnPrev')//.css({ 'background' : 'url(' + this.settings.imageBtnPrev + ') left 15% no-repeat' })
                        .unbind()
                        .bind('click',function() {
                            this.settings.activeImage = this.settings.activeImage - 1;
                            this._set_image_to_view();
                            return false;
                        }.bind(this));
                } else {
                    // Show the images button for Next buttons
                    $('#lightbox-nav-btnPrev').unbind().show().bind('click',function() {
                        this.settings.activeImage = this.settings.activeImage - 1;
                        this._set_image_to_view();
                        return false;
                    }.bind(this));
                }
            }
            
            // Show the next button, if not the last image in set
            if ( this.settings.activeImage != ( this.settings.imageArray.length -1 ) ) {
                if ( this.settings.fixedNavigation ) {
                    $('#lightbox-nav-btnNext')
                        .unbind()
                        .bind('click',function() {
                            this.settings.activeImage = this.settings.activeImage + 1;
                            this._set_image_to_view();
                            return false;
                        });
                } else {
                    // Show the images button for Next buttons
                    $('#lightbox-nav-btnNext').unbind().show().bind('click',function() {
                        this.settings.activeImage = this.settings.activeImage + 1;
                        this._set_image_to_view();
                        return false;
                    }.bind(this));
                }
            }
            // Enable keyboard navigation
            this._enable_keyboard_navigation();
        },
        /**
         * Enable a support to keyboard navigation
         *
         */
        _enable_keyboard_navigation : function () {
            $(document).keydown(function(objEvent) {
                _keyboard_action(objEvent);
            });
        },
        /**
         * Disable the support to keyboard navigation
         *
         */
        _disable_keyboard_navigation : function () {
            $(document).unbind();
        },
        /**
         * Perform the keyboard actions
         *
         */
        _keyboard_action : function (objEvent) {
            // To ie
            if ( objEvent == null ) {
                keycode = event.keyCode;
                escapeKey = 27;
            // To Mozilla
            } else {
                keycode = objEvent.keyCode;
                escapeKey = objEvent.DOM_VK_ESCAPE;
            }
            // Get the key in lower case form
            key = String.fromCharCode(keycode).toLowerCase();
            // Verify the keys to close the ligthBox
            if ( ( key == this.settings.keyToClose ) || ( key == 'x' ) || ( keycode == escapeKey ) ) {
                _finish();
            }
            // Verify the key to show the previous image
            if ( ( key == this.settings.keyToPrev ) || ( keycode == 37 ) ) {
                // If we're not showing the first image, call the previous
                if ( this.settings.activeImage != 0 ) {
                    this.settings.activeImage = this.settings.activeImage - 1;
                    this._set_image_to_view();
                    this._disable_keyboard_navigation();
                }
            }
            // Verify the key to show the next image
            if ( ( key == this.settings.keyToNext ) || ( keycode == 39 ) ) {
                // If we're not showing the last image, call the next
                if ( this.settings.activeImage != ( this.settings.imageArray.length - 1 ) ) {
                    this.settings.activeImage = this.settings.activeImage + 1;
                    this._set_image_to_view();
                    this._disable_keyboard_navigation();
                }
            }
        },
        /**
         * Preload prev and next images being showed
         *
         */
        _preload_neighbor_images : function () {
            if ( (this.settings.imageArray.length -1) > this.settings.activeImage ) {
                objNext = new Image();
                objNext.src = this.settings.imageArray[this.settings.activeImage + 1][0];
            }
            if ( this.settings.activeImage > 0 ) {
                objPrev = new Image();
                objPrev.src = this.settings.imageArray[this.settings.activeImage -1][0];
            }
        },
        /**
         * Remove jQuery lightBox plugin HTML markup
         *
         */
        _finish : function () {
            $('#jquery-lightbox').remove();
            $('#jquery-overlay').fadeOut(function() { $('#jquery-overlay').remove(); });
            // Show some elements to avoid conflict with overlay in IE. These elements appear above the overlay.
            $('embed, object, select').css({ 'visibility' : 'visible' });
        },

        _set_interface : function() {
            // Apply the HTML markup into body tag
            this.$el.appendTo(document.body); 
            // Get page sizes
            var arrPageSizes =  this.___getPageSize();
            // Style overlay and show it
            $('#jquery-overlay').css({
                backgroundColor:    this.settings.overlayBgColor,
                opacity:            this.settings.overlayOpacity,
                width:              arrPageSizes[0],
                height:             arrPageSizes[1]
            }).fadeIn();
            // Get page scroll
            var arrPageScroll = this.___getPageScroll();
            // Calculate top and left offset for the jquery-lightbox div object and show it
            $('#jquery-lightbox').css({
                top:    arrPageScroll[1] + (arrPageSizes[3] / 10),
                left:   arrPageScroll[0]
            }).show();
            // Assigning click events in elements to close overlay
            $('#jquery-overlay,#jquery-lightbox').click(function() {
                this._finish();                                  
            }.bind(this));
            // Assign the _finish function to lightbox-loading-link and lightbox-secNav-btnClose objects
            $('#lightbox-loading-link,#lightbox-secNav-btnClose').click(function() {
                this._finish();
                return false;
            }.bind(this));
            // If window was resized, calculate the new overlay dimensions
            $(window).resize(function() {
                // Get page sizes
                var arrPageSizes =  this.___getPageSize();
                // Style overlay and show it
                $('#jquery-overlay').css({
                    width:      arrPageSizes[0],
                    height:     arrPageSizes[1]
                });
                // Get page scroll
                var arrPageScroll = this.___getPageScroll();
                // Calculate top and left offset for the jquery-lightbox div object and show it
                $('#jquery-lightbox').css({
                    top:    arrPageScroll[1] + (arrPageSizes[3] / 10),
                    left:   arrPageScroll[0]
                });
            }.bind(this));
        },

        ___getPageSize : function() {
            var xScroll, yScroll;
            if (window.innerHeight && window.scrollMaxY) {  
                xScroll = window.innerWidth + window.scrollMaxX;
                yScroll = window.innerHeight + window.scrollMaxY;
            } else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
                xScroll = document.body.scrollWidth;
                yScroll = document.body.scrollHeight;
            } else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
                xScroll = document.body.offsetWidth;
                yScroll = document.body.offsetHeight;
            }
            var windowWidth, windowHeight;
            if (self.innerHeight) { // all except Explorer
                if(document.documentElement.clientWidth){
                    windowWidth = document.documentElement.clientWidth; 
                } else {
                    windowWidth = self.innerWidth;
                }
                windowHeight = self.innerHeight;
            } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
                windowWidth = document.documentElement.clientWidth;
                windowHeight = document.documentElement.clientHeight;
            } else if (document.body) { // other Explorers
                windowWidth = document.body.clientWidth;
                windowHeight = document.body.clientHeight;
            }   
            // for small pages with total height less then height of the viewport
            if(yScroll < windowHeight){
                pageHeight = windowHeight;
            } else { 
                pageHeight = yScroll;
            }
            // for small pages with total width less then width of the viewport
            if(xScroll < windowWidth){  
                pageWidth = xScroll;        
            } else {
                pageWidth = windowWidth;
            }
            arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight);
            return arrayPageSize;
        },
        /**
         / THIRD FUNCTION
         * getPageScroll() by quirksmode.com
         *
         * @return Array Return an array with x,y page scroll values.
         */
        ___getPageScroll : function() {
            var xScroll, yScroll;
            if (self.pageYOffset) {
                yScroll = self.pageYOffset;
                xScroll = self.pageXOffset;
            } else if (document.documentElement && document.documentElement.scrollTop) {     // Explorer 6 Strict
                yScroll = document.documentElement.scrollTop;
                xScroll = document.documentElement.scrollLeft;
            } else if (document.body) {// all other Explorers
                yScroll = document.body.scrollTop;
                xScroll = document.body.scrollLeft; 
            }
            arrayPageScroll = new Array(xScroll,yScroll);
            return arrayPageScroll;
        },
         /**
          * Stop the code execution from a escified time in milisecond
          *
          */
        ___pause : function (ms) {
            var date = new Date(); 
            curDate = null;
            do { var curDate = new Date(); }
            while ( curDate - date < ms);
         }

    });

    return ImagesView;
});