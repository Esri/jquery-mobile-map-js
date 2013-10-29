/**
 * Helper library for building mobile mapping applications with jQuery mobile.
 * Specifically designed for use in multiple view applications.
 * Requires: jQuery Mobile 1.3+ and ArcGIS API for JavaScript v3.5+
 * @author Andy Gup
 * @param map esri.Map
 */
var jQueryHelper = function(/* Map */ map){
    this.map = map;
    this.mapId = map.id;
    this.basemap = map._basemap;
    this.currentPageID = pageId;
    this.orientation = null;
    this.slider = this.map._slider;

    /**
     * By default the library will automatically recenter the map
     * after an orientation event in a child view.
     * Override this if you wish to handle your own recentering
     * when the view is returned to home.
     * If you override, then listen for the jquery "helper-map-loaded" event.
     * @type {boolean}
     */
    this.autoCenter = true;

    /**
     * Detects if phone was rotated while app view is on a child screen.
     * @type {boolean}
     */
    this.rotatedFlag = false;

    /**
     * Local Storage ENUMs
     * @type {Object}
     */
    this.localStorageEnum = (function(){
        var values = {
            ZOOM_LEVEL:"zoom_level",
            LAT:"lat",
            LON:"lon",
            MAP_WIDTH:"map_width",
            MAP_HEIGHT:"map_height",
            PORTRAIT:"portrait",
            LANDSCAPE:"landscape"
        }

        return values;
    });

    this.setZoom = function(/* int */ zoom){
        localStorage.setItem("_zoomLevel",zoom);
    }

    this.getZoom = function(){
        var value = null;

        try{
            value = localStorage.getItem("_zoomLevel");
        }
        catch(err)
        {
            console.log("getZoom: " + err.message);
        }

        return value;
    }

    this.setWidth = function(/* int */ value){
        localStorage.setItem("_width",value);
    }

    this.getWidth = function(){
        var value = null;

        try{
            value = localStorage.getItem("_width");
        }
        catch(err)
        {
            console.log("getZoom: " + err.message);
        }

        return value;
    }

    this.setHeight = function(/* int */ value){
        localStorage.setItem("_height",value);
    }

    this.getHeight = function(){
        var value = null;

        try{
            value = localStorage.getItem("_height");
        }
        catch(err)
        {
            console.log("getZoom: " + err.message);
        }

        return value;
    }

    /**
     * Determines if phone is in PORTRAIT or LANDSCAPE mode
     * See localStorageEnum() for constant values
     * @returns {string}
     */
    this.getOrientation = function(){
       return  window.innerHeight > window.innerWidth ?
            this.localStorageEnum().PORTRAIT :
            this.localStorageEnum().LANDSCAPE;
    }

    /**
     * Uses localStorage to save a location.
     * @param lat
     * @param lon
     * @param spatialReference
     */
    this.setCenterPt = function(lat,lon,spatialReference){
        localStorage.setItem("_centerPtX", lat);
        localStorage.setItem("_centerPtY", lon);
        localStorage.setItem("_spatialReference", spatialReference);
    }

    /**
     * Pulls a saved location from localStorage
     * @returns {null}
     */
    this.getCenterPt = function(){
        var value = null;

        try{
            value = localStorage.getItem("_centerPtX") + "," + localStorage.getItem("_centerPtY") + "," +
                localStorage.getItem("_spatialReference");
        }
        catch(err)
        {
            console.log("getCenterFromLocalStorage: " + err.message);
        }

        return value;
    }

    this.setOrientationListener = function(){
        //Handle orientation events to allow for resizing the map and working around
        //jQuery mobile bugs related to how and when the view settles after such an event
        var supportsOrientationChange = "onorientationchange" in window,
            orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";

        window.addEventListener(orientationEvent, function () {
            if(this._getActivePage() == this.currentPageID){
                this.rotateScreen(400);
                this.rotatedFlag = false;
            }
            else{
                this.rotatedFlag = true;
            }
        }.bind(this), false);
    }

    this.setPanListener = function(){
        this.map.on("pan-end",function(){
            var center = this.map.extent.getCenter();
            this.setCenterPt(center.x,center.y);
        }.bind(this))
    }

    this.setZoomListener = function(){
        this.map.on("zoom-end",function(){
            var center = this.map.extent.getCenter();
            this.setCenterPt(center.x,center.y);
            this.setZoom(this.map.getZoom());
        }.bind(this))
    }

    this.setPageChangeListener = function(pageId){
        $('#' + pageId).on("pagebeforehide",function(){
            this.orientation = this.getOrientation();
            console.log("orientation before hide = " + this.orientation)
        }.bind(this));

        $('#' + pageId).on("pageshow",function(){
            console.log("home pageshow event");
            var currentOrientation = this.getOrientation();
            if(currentOrientation != this.orientation || this.rotatedFlag == true){
                this.map.destroy();
                this._createNewMap(false);
                this.rotatedFlag = false;

                console.log("home pageshow complete")
            }
            else{
                console.log("orientation is equal: " + this.orientation + ", " + currentOrientation)
                this.map.resize();
                this.map.reposition();
            }
        }.bind(this))
    }

    this.rotateScreen = function(/* int */ timerDelay){
        var timeout = null;
        timerDelay != "undefined" ? timeout = timerDelay : timeout = 500;
        setTimeout((function(){
            console.log("rotate timer complete");
            this._centerMap();
        }).bind(this),timeout);
    }

    this.resetMap = function(height,width,zoom,callback){
        if(this.getOrientation() == this.localStorageEnum().PORTRAIT){
            this.map.width = width;
            this.map.height = height;
        }
        else{
            this.map.width = height;
            this.map.height = width;
        }

        return callback(true);
    }

    this._createNewMap = function(/* boolean */ autoCenter){
        var locationStr = this.getCenterPt().split(",");
        if(locationStr instanceof Array){
            var slider = this.slider != null ? "small" : false;
            this.map = new esri.Map(this.mapId, {
                basemap: this.basemap,
                center: [locationStr[1],locationStr[0]], // long, lat
                zoom: this.getZoom(),
                sliderStyle: slider
            });

            if(autoCenter == false){
                this.map.on("load",function(){
                    $.event.trigger({
                        type: "helper-map-loaded",
                        message: "jQueryHelper map loaded",
                        time: new Date()
                    })
                }.bind(this));
            }
            else{
                this._centerMap();
            }
        }
    }

    this._centerMap = function(){
        var locationStr = this.getCenterPt().split(",");
        if(locationStr instanceof Array){
            var wgsPt = null;
            if(locationStr[2] = 4326){
                wgsPt = new esri.geometry.Point(locationStr[1],locationStr[0]);
            }
            else{
                wgsPt = new esri.geometry.Point(locationStr[0],locationStr[1], new esri.SpatialReference({ wkid: locationStr[2] }));
            }

            this.map.centerAt(wgsPt);
        }

        console.log("map centered");
    }

    this._getActivePage = function(){
        return $.mobile.activePage[0].id;
    }

    this._init = function(){
        this.currentPageID = this._getActivePage();

        this.setOrientationListener();
        this.setPageChangeListener(this.currentPageID);

//        Set these listeners from within your application!
//        this.setPanListener();
//        this.setZoomListener();

        this.setWidth((this.map).width);
        this.setHeight((this.map).height);

    }.bind(this)()
}