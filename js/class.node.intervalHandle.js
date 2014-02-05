/**
 * Created with IntelliJ IDEA.
 * User: qlevaslo
 * Date: 21/01/14
 * Time: 17:27
 * To change this template use File | Settings | File Templates.
 */

var CGSGNodeIntervalHandle = CGSGNode.extend({

    initialize: function (parentWidth, parentHeight, handleWidth, value, min, max) {
        this._super((((value - min) /(max - min)) * parentWidth - handleWidth / 2) , 0);

        this.classType = "CGSGNodeIntervalHandle";

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
