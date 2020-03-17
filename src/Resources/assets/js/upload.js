/*!
 * upload.js v0.0.1
 * https://github.com/GetOlympus/olympus-dionysos-field-upload
 *
 * This plugin adds an Upload block thanks to the wpMedia WordPress JS bundle.
 *
 * Example of JS:
 *      $('.upload').dionysosUpload({
 *          color: '#ffaaaa',               // background color used when deleting a social network
 *          elements: '.listbox',           // node elements
 *          item: 'fieldset',               // child node item
 *          multiple: false,                // define to display multiple elements or not
 *          addbutton: '.add-button',       // node element which is used to add a new item
 *          editbutton: '.edit-button',     // node element which is used to edit item
 *          removebutton: '.remove-button', // node element which is used to remove item
 *          media: null,                    // media WordPress object used to open modal
 *          size: 'full',                   // media size to get
 *          title: false,                   // title of the media popin
 *          type: 'image',                  // define the kind of items to display in modal
 *          wpid: null,                     // contains Wordpress textarea ID
 *          source: 'template-id',          // node script element in DOM containing handlebars JS temlpate
 *      });
 *
 * Example of HTML:
 *      <div class="uploads">
 *          <input type="hidden" name="ctm" value="" />
 *
 *          <div class="listbox">
 *              <fieldset data-u="123456">
 *                  <input type="hidden" name="ctm[123456][id]" value="123456" />
 *                  <input type="hidden" name="ctm[123456][height]" value="200" />
 *                  <input type="hidden" name="ctm[123456][url]" value="https://www.domain.ext/statics/upload/my-file.jpg" />
 *                  <input type="hidden" name="ctm[123456][width]" value="600" />
 *
 *                  <a href="https://www.domain.ext/statics/upload/my-file.jpg" class="upload-url" target="_blank">
 *                      <img src="https://www.domain.ext/statics/upload/my-file.jpg" alt="" class="image" />
 *                  </a>
 *
 *                  <p class="upload-text">
 *                      <input type="text" name="ctm[123456][name]" value="My legend" class="large-text" placeholder="Legend" />
 *                  </p>
 *
 *                  <a href="#" class="edit-button">Edit</a>
 *                  <a href="#" class="remove-button">Remove</a>
 *              </fieldset>
 *          </div>
 *
 *          <div class="hide-if-no-js">
 *              <a href="#" class="add-button">Add item</a>
 *          </div>
 *      </div>
 *
 *      <script type="text/html" id="tmpl-template-id">
 *          <fieldset data-u="{{ data.id }}">
 *              <input type="hidden" name="ctm[{{ data.id }}][id]" value="" />
 *              <input type="hidden" name="ctm[{{ data.id }}][height]" value="" />
 *              <input type="hidden" name="ctm[{{ data.id }}][url]" value="" />
 *              <input type="hidden" name="ctm[{{ data.id }}][width]" value="" />
 *
 *              <a href="" class="upload-url" target="_blank">
 *                  <img />
 *              </a>
 *
 *              <p class="upload-text">
 *                  <input type="text" name="ctm[{{ data.id }}][name]" value="" class="large-text" placeholder="Legend" />
 *              </p>
 *
 *              <a href="#" class="edit-button">Edit</a>
 *              <a href="#" class="remove-button">Remove</a>
 *          </fieldset>
 *      </script>
 *
 * Copyright 2016 Achraf Chouk
 * Achraf Chouk (https://github.com/crewstyle)
 */

(function ($, wp) {
    "use strict";

    /**
     * Constructor
     * @param {nodeElement} $el
     * @param {array}       options
     */
    var Upload = function ($el,options) {
        // vars
        var _this = this;

        // this plugin works ONLY with WordPress wpTemplate and wpMedia functions
        if (!wp || !wp.template || !wp.media) {
            return;
        }

        _this.$el = $el;
        _this.options = options;

        // update elements list
        _this.$elements = _this.$el.find(_this.options.elements);

        // set wp id
        _this.options.wpid = wp.media.model.settings.post.id;

        // update add button
        _this.$addbutton = _this.$el.find(_this.options.addbutton);
        _this.$submitbox = _this.$addbutton.parent();

        // bind click event
        _this.$addbutton.on('click', $.proxy(_this.add_block, _this));
        _this.$elements.find(_this.options.editbutton).on('click', $.proxy(_this.edit_block, _this));
        _this.$elements.find(_this.options.removebutton).on('click', $.proxy(_this.remove_block, _this));

        // update buttons
        _this.update_buttons();
    };

    /**
     * @type {nodeElement}
     */
    Upload.prototype.$addbutton = null;

    /**
     * @type {nodeElement}
     */
    Upload.prototype.$el = null;

    /**
     * @type {array}
     */
    Upload.prototype.$elements = null;

    /**
     * @type {Object}
     */
    Upload.prototype.media = null;

    /**
     * @type {array}
     */
    Upload.prototype.options = null;

    /**
     * @type {Object}
     */
    Upload.prototype.selections = null;

    /**
     * @type {nodeElement}
     */
    Upload.prototype.$submitbox = null;

    /**
     * Creates a new block element in the items list, based on source template
     * @param {event} e
     */
    Upload.prototype.add_block = function (e){
        e.preventDefault();
        var _this = this;

        // open medialib modal
        _this._open_medialib({
            library: {
                type: _this.options.type,
            },
            multiple: _this.options.multiple,
            title: _this.options.title
        });
    };

    /**
     * Edits an item block contents
     * @param {event} e
     */
    Upload.prototype.edit_block = function (e){
        e.preventDefault();
        var _this = this;

        // vars
        var $self = $(e.target || e.currentTarget),
            $parent = $self.closest(_this.options.item);

        // open medialib modal
        _this._open_medialib({
            library: {
                type: _this.options.type,
            },
            multiple: false,
            title: _this.options.title
        }, $parent);
    };

    /**
     * Removes an item block contents
     * @param {event} e
     */
    Upload.prototype.remove_block = function (e){
        e.preventDefault();
        var _this = this;

        // vars
        var $self = $(e.target || e.currentTarget),
            $parent = $self.closest(_this.options.item);

        // deleting animation
        $parent.css('background', _this.options.color);
        $parent.animate({
            opacity: '0'
        }, 'slow', function (){
            // remove parent and update buttons
            $parent.remove();
            _this.update_buttons();
        });
    };

    /**
     * Displays or hides interactive buttons
     */
    Upload.prototype.update_buttons = function (){
        var _this = this,
            _count = _this.$elements.find(_this.options.item).length;

        // single case
        if (1 <= _count && !_this.options.multiple) {
            _this.$submitbox.hide();
        }

        // other cases
        if (!_count || _this.options.multiple) {
            _this.$submitbox.show();
        }
    };

    /**
     * Attach items to HTML
     * @param {array} items
     */
    Upload.prototype._attach_items = function (items){
        var _this = this;

        // check attachments
        if (!items.length) {
            return;
        }

        var _template = wp.template(_this.options.source);

        // iterate
        $.each(items, function (ind,elm) {
            // check if element already exists
            if (_this.$elements.find(_this.options.items + '[data-u="' + elm.id + '"]').length) {
                return;
            }

            // in single case, remove all medias
            if (!_this.options.multiple) {
                _this.$elements.find(_this.options.removebutton).click();
            }

            // build response from type
            var resp = {
                display: elm.icon,
                height: 0,
                id: elm.id,
                name: '' != elm.caption ? elm.caption : elm.filename,
                url: elm.url,
                width: 0
            };

            if ('image' == _this.options.type && elm.sizes) {
                resp.display = elm.sizes[_this.options.size] ? elm.sizes[_this.options.size].url : elm.url;
                resp.height  = elm.sizes[_this.options.size] ? elm.sizes[_this.options.size].height : elm.height;
                resp.url     = elm.sizes[_this.options.size] ? elm.sizes[_this.options.size].url : elm.url;
                resp.width   = elm.sizes[_this.options.size] ? elm.sizes[_this.options.size].width : elm.width;
            }

            //update modal content
            var $html = $(_template(resp));

            // bind events and append
            $html.find(_this.options.editbutton).on('click', $.proxy(_this.edit_block, _this));
            $html.find(_this.options.removebutton).on('click', $.proxy(_this.remove_block, _this));
            _this.$elements.append($html);
        });

        // update buttons
        _this.update_buttons();
    };

    /**
     * Open medialib modal with options
     * @param {Object}      options
     * @param {nodeElement} $item
     */
    Upload.prototype._open_medialib = function (options,$item){
        var _this = this;

        // check if the medialib object has already been created
        if (_this.media) {
            _this._update_selectlist($item);
            _this.media.open();

            return;
        }

        // create and open medialib
        _this.media = wp.media.frames.file_frame = wp.media(options);

        // check selection
        _this._update_selectlist($item);

        // bind event when medias are selected
        _this.media.on('select', function () {
            // get all selected medias
            _this.selections = _this.media.state().get('selection');

            // JSONify and display them
            _this._attach_items(_this.selections.toJSON());

            // restore the main post ID
            wp.media.model.settings.post.id = _this.options.wpid;
        });

        // open the modal
        _this.media.open();
    };

    /**
     * Attach items to select list
     * @param {nodeElement} $item
     */
    Upload.prototype._update_selectlist = function ($item){
        var _this = this;

        //bind event when medialib popin is opened
        _this.media.on('open', function () {
            var $items = null != $item ? $item : _this.$elements.find(_this.options.item);

            //check selections
            if (!$items.length) {
                return;
            }

            // get selected items
            _this.selections = _this.media.state().get('selection');

            // get all selected medias on multiple choices
            $.each($items, function (){
                var _id = $(this).attr('data-u'),
                    _attach = wp.media.attachment(_id);

                _attach.fetch();
                _this.selections.add(_attach ? [_attach] : []);
            });
        });
    };

    var methods = {
        init: function (options) {
            if (!this.length) {
                return false;
            }

            var settings = {
                // configurations
                color: '#ffaaaa',
                elements: '.listbox',
                item: 'fieldset',
                multiple: false,
                // buttons
                addbutton: '.add-button',
                editbutton: '.edit-button',
                removebutton: '.remove-button',
                // options usefull for WordPress medialib
                media: null,
                title: false,
                type: 'image',
                wpid: null,
                size: 'full',
                // source
                source: 'template-id',
            };

            return this.each(function () {
                if (options) {
                    $.extend(settings, options);
                }

                new Upload($(this), settings);
            });
        }
    };

    $.fn.dionysosUpload = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method '+method+' does not exist on dionysosUpload');
            return false;
        }
    };
})(window.jQuery, window.wp);
