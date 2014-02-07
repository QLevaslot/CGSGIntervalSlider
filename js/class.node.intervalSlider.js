/**
 * Created with IntelliJ IDEA.
 * User: qlevaslo
 * Date: 21/01/14
 * Time: 16:21
 */

cgsgEventTypes.ON_MIN_VALUE_CHANGED = "onMinValueChanged";
cgsgEventTypes.ON_MAX_VALUE_CHANGED = "onMaxValueChanged";

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

        // Default value for min diff between 2 intervals to avoid handle overlaping each others or min getting bigger than max
        this.minDiff = (max - min) * 5 / 100;

//        Just an idea for later to avoid having a too large range
//        this.maxDiff = null;

        // Current value of the cursors (arbitrary default values)
        this.minValue = (max - min)/10  ;
        this.maxValue =  this.minValue * 4;

        this.setHandles();

        /**
         * Event
         * @property ON_MIN_VALUE_CHANGED
         * @default null
         * @type {Function}
         */
        this.onMinValueChanged = null;

        /**
         * Event
         * @property ON_MAX_VALUE_CHANGED
         * @default null
         * @type {Function}
         */
        this.onMaxValueChanged = null;

    },

    /**
     * Limitation of handle move (making sure min is always < to max, no overlapping of the two)
     * @protected
     * @param {intervalSliderHandle} Current handle being moved
     * @param {Number} intended new value
     * @return {Number} approved new value
     */
    moveHandle: function (handle, intendedValue){
        var newValue = intendedValue;
        var that = this;
        // Identify which handle is being moved and adjust new value if needed
        if(handle.value === this.handleMin.value){
            if(intendedValue > (this.handleMax.value-this.minDiff)){
                newValue = (this.handleMax.value-this.minDiff)
            } else if(intendedValue < this.min){
                newValue = this.min;
            }
            this.minValue = newValue;
            if ( cgsgExist(that.onMinValueChanged)) {
                CGSG.eventManager.dispatch(that, cgsgEventTypes.ON_MIN_VALUE_CHANGED, new CGSGEvent(that, null));
            }
        } else {
            if(intendedValue < (this.handleMin.value+this.minDiff)){
                newValue = (this.handleMin.value+this.minDiff)
            } else if(intendedValue > this.max){
                newValue = this.max;
            }
            this.maxValue = newValue;
            if ( cgsgExist(that.onMaxValueChanged)) {
                CGSG.eventManager.dispatch(that, cgsgEventTypes.ON_MAX_VALUE_CHANGED, new CGSGEvent(that, null));
            }
        }

        return newValue;
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
            this.handleMin = new CGSGNodeIntervalSliderHandle(this.getWidth(), this.getHeight(), 5, this.minValue, this.min, this.max)
        }
        if (!cgsgExist(this.handleMax)) {
            this.handleMax = new CGSGNodeIntervalSliderHandle(this.getWidth(), this.getHeight(), 5, this.maxValue, this.min, this.max);
        }
        this.addChild(this.handleMin);
        this.addChild(this.handleMax);
    },

    /**
     * Perform checking then set min handle of the slider;
     * @param {Number} value
     * @returns {CGSGIntervalSlider} this
     */
    setMinValue: function (value) {
        if(value >= this.maxValue){
            this.setMaxValue(value+this.minDiff);
        }
        this.handleMin.setValue(value);
        var that = this;
        if ( cgsgExist(that.onMinValueChanged)) {
            CGSG.eventManager.dispatch(that, cgsgEventTypes.ON_MIN_VALUE_CHANGED, new CGSGEvent(that, null));
        }
        return this;
    },

    getMinValue: function () {
        return this.minValue;
    },

    /**
     * Perform checking then set max handle of the slider;
     * @param value
     * @returns {*}
     */
    setMaxValue: function (value) {
        if(value <= this.minValue){
            this.setMinValue(value-this.minDiff);
        }
        this.handleMax.setValue(value);
        var that = this;
        if ( cgsgExist(that.onMaxValueChanged)) {
            CGSG.eventManager.dispatch(that, cgsgEventTypes.ON_MAX_VALUE_CHANGED, new CGSGEvent(that, null));
        }
        return this;
    },

    getMaxValue: function () {
        return this.maxValue;
    },

    render: function (ctx) {
        ctx.save();
        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(0, 0, this.getWidth(), this.getHeight());
        ctx.restore();
    }

});