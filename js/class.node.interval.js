/**
 * Created with IntelliJ IDEA.
 * User: qlevaslo
 * Date: 21/01/14
 * Time: 16:21
 */

/**
 * This class represents a interval.
 * @class CGSGInterval
 * @module Node
 * @extends CGSGNode
 * @constructor
 * @param {Number} x Relative position on X
 * @param {Number} y Relative position on Y
 * @param {Number} width Relative dimension
 * @param {Number} height Relative Dimension
 * @param {Number} min value of the interval
 * @param {Number} max value of the interval
 * @type {CGSGNodeInterval}
 */
var CGSGNodeInterval = CGSGNode.extend({

    initialize: function (x, y, width, height, min, max) {

        this._super(x, y);
        this.classType = "CGSGNodeInterval";
        this.resizeTo(width, height);
        this.backgroundColor = "#f1f1f1";

        // Min and max value of the cursor
        this.min = min;
        this.max = max;

        // Current value of the cursors
        this.minValue = (max - min)/10  ;
        this.maxValue = 9 * (max - min) /10;

        this.setHandles();

    },

    /**
     * Set default handles for this interval
     *
     * @method setHandles
     * @public
     */
    setHandles: function () {
        this.removeAll();
        if (!cgsgExist(this.handleMin)) {
            this.handleMin = new CGSGNodeIntervalHandle(this.getWidth(), this.getHeight(), 5, this.minValue, this.min, this.max);
        }
        if (!cgsgExist(this.handleMax)) {
            this.handleMax = new CGSGNodeIntervalHandle(this.getWidth(), this.getHeight(), 5, 9.5, this.maxValue, this.max);
        }
        this.addChild(this.handleMin);
        this.addChild(this.handleMax);

//        this.handle0 = new CGSGNodeIntervalHandle(this.getWidth(), this.getHeight(), 1, 0, this.min, this.max);
//        this.handle0.color = "yellow";
//        this.handle0.isDraggable = false;
//        this.addChild(this.handle0);
//
//        this.handle1 = new CGSGNodeIntervalHandle(this.getWidth(), this.getHeight(), 2, 1, this.min, this.max);
//        this.handle1.color = "yellow";
//        this.handle1.isDraggable = false;
//        this.addChild(this.handle1);
//
//        this.handle2 = new CGSGNodeIntervalHandle(this.getWidth(), this.getHeight(), 2, 2, this.min, this.max);
//        this.handle2.color = "yellow";
//        this.handle2.isDraggable = false;
//        this.addChild(this.handle2);
//
//        this.handle8 = new CGSGNodeIntervalHandle(this.getWidth(), this.getHeight(), 2, 8, this.min, this.max);
//        this.handle8.color = "yellow";
//        this.handle8.isDraggable = false;
//        this.addChild(this.handle8);
//
//        this.handle9 = new CGSGNodeIntervalHandle(this.getWidth(), this.getHeight(), 2, 9, this.min, this.max);
//        this.handle9.color = "yellow";
//        this.handle9.isDraggable = false;
//        this.addChild(this.handle9);
//
//        this.handle10 = new CGSGNodeIntervalHandle(this.getWidth(), this.getHeight(), 2, 10, this.min, this.max);
//        this.handle10.color = "yellow";
//        this.handle10.isDraggable = false;
//        this.addChild(this.handle10);

    },

    /**
     * Restrain movement to x axis
     *
     * @method onSlide
     * @protected
     */
    onSlide : function(handle) {

        var x = this.position.x;

        if (x < -this.getWidth()/2) {
            x = -this.getWidth()/2;
        } else if (x > this._parentNode.getWidth() - this.getWidth()/2) {
            x = this._parentNode.getWidth() - this.getWidth()/2;
        }
        this.translateTo(x, 0);
        var range = this._parentNode.max - this._parentNode.min;
        this.value = (x+ this.getWidth()/2) * (this._parentNode.max - this._parentNode.min)/(this._parentNode.getWidth())+this._parentNode.min;
    },

    render: function (ctx) {
        ctx.save();
        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(0, 0, this.getWidth(), this.getHeight());
        ctx.restore();
    }

});