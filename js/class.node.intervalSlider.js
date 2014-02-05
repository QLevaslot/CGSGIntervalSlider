/**
 * Created with IntelliJ IDEA.
 * User: qlevaslo
 * Date: 21/01/14
 * Time: 16:21
 */

/**
 * This class represents a intervalSlider.
 * @class CGSGIntervalSlider
 * @module Node
 * @extends CGSGNode
 * @constructor
 * @param {Number} x Relative position on X
 * @param {Number} y Relative position on Y
 * @param {Number} width Relative dimension
 * @param {Number} height Relative Dimension
 * @param {Number} min value of the intervalSlider
 * @param {Number} max value of the intervalSlider
 * @type {CGSGNodeIntervalSlider}
 */
var CGSGNodeIntervalSlider = CGSGNode.extend({

    initialize: function (x, y, width, height, min, max) {

        this._super(x, y);
        this.classType = "CGSGNodeIntervalSlider";
        this.resizeTo(width, height);
        this.backgroundColor = "#f1f1f1";

        // Min and max value of the cursor
        this.min = min;
        this.max = max;

        // Default value for min diff between 2 intervals (to avoid handle overlaping each others)
        this.minDiff = (max - min) * 5 / 100;
        this.maxDiff = null;

        // Current value of the cursors
        this.minValue = (max - min)/10  ;
        if((this.maxValue - this.minValue) > this.minDiff){
            this.maxValue = 9 * (max - min) /10;
        } else if(){

        }
        this.setHandles();

    },

    /**
     * Set default handles for this intervalSlider
     *
     * @method setHandles
     * @public
     */
    setHandles: function () {
        this.removeAll();
        if (!cgsgExist(this.handleMin)) {
            this.handleMin = new CGSGNodeIntervalSliderHandle(this.getWidth(), this.getHeight(), 5, this.minValue, this.min, this.max);
        }
        if (!cgsgExist(this.handleMax)) {
            this.handleMax = new CGSGNodeIntervalSliderHandle(this.getWidth(), this.getHeight(), 5, 9.5, this.maxValue, this.max);
        }
        this.addChild(this.handleMin);
        this.addChild(this.handleMax);
    },

    render: function (ctx) {
        ctx.save();
        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(0, 0, this.getWidth(), this.getHeight());
        ctx.restore();
    }

});