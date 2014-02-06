/**
 * Created with IntelliJ IDEA.
 * User: qlevaslo
 * Date: 21/01/14
 * Time: 17:27
 * To change this template use File | Settings | File Templates.
 */

var CGSGNodeIntervalSliderHandle = CGSGNode.extend({

    initialize: function (parentWidth, parentHeight, handleWidth, value, min, max) {
        this._super((((value - min) /(max - min)) * (parentWidth - handleWidth)) , 0);

        this.classType = "CGSGNodeIntervalSliderHandle";

        this.resizeTo(handleWidth, parentHeight);
        this.color = "#cdcdcd";

        this.isClickable = false;
        this.isDraggable = true;
        this.onDrag = this.onSlide;

        this.selectionLineColor = 'rgba(0,0,0,0)';
        this.selectionHandleColor = 'rgba(0,0,0,0)';

        this.value = value;
    },

    /**
     * Restrain movement to x axis
     *
     * @method onSlide
     * @protected
     */
    onSlide : function() {

        var x = this.position.x;

        var intendedValue = (x) * (this._parentNode.max - this._parentNode.min)/(this._parentNode.getWidth()-this.getWidth())+this._parentNode.min;
        this.setValue(intendedValue);

    },

    setValue: function (value) {
        this.value = this._parentNode.moveHandle(this, value);
//        alert((((this.value - this._parentNode.min) /(this._parentNode.max - this._parentNode.min)) * this._parentNode.getWidth() - this.getWidth() / 2));
        this.translateTo((((this.value - this._parentNode.min) /(this._parentNode.max - this._parentNode.min)) * (this._parentNode.getWidth() - this.getWidth())) , 0);
    },

    /**
     * Default handle rendering
     *
     * @method render
     * @protected
     * @param {CanvasRenderingContext2D} context the context into render the node
     */
    render: function (context) {
        context.save();
        context.fillStyle = this.color;
        context.fillRect(0,0, this.getWidth(), this.getHeight());
        context.restore();

    }
});
