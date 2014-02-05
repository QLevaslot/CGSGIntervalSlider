/**
 * Created with IntelliJ IDEA.
 * User: qlevaslo
 * Date: 21/01/14
 * Time: 17:27
 * To change this template use File | Settings | File Templates.
 */

var CGSGNodeIntervalSliderHandle = CGSGNode.extend({

    initialize: function (parentWidth, parentHeight, handleWidth, value, min, max) {
        this._super((((value - min) /(max - min)) * parentWidth - handleWidth / 2) , 0);

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

        if (x < -this.getWidth()/2) {
            x = -this.getWidth()/2;
        } else if (x > this._parentNode.getWidth() - this.getWidth()/2) {
            x = this._parentNode.getWidth() - this.getWidth()/2;
        }
        this.translateTo(x, 0);
        var range = this._parentNode.max - this._parentNode.min;
        this.value = (x+ this.getWidth()/2) * (this._parentNode.max - this._parentNode.min)/(this._parentNode.getWidth())+this._parentNode.min;
    },

    /**
     * Default handle rendering (A rounded square with some "volume" effect)
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
