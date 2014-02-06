var CGMain = CGSGView.extend(
    {
        initialize : function(canvas) {
            this._super(canvas);

            ////// INITIALIZATION /////////
            this.initializeCanvas();
            this.createScene();

            this.startPlaying();
        },

        initializeCanvas : function() {
            //redimensionnement du canvas pour être full viewport en largeur
            this.viewDimension = cgsgGetRealViewportDimension();
            this.setCanvasDimension(this.viewDimension);
        },

        /**
         * create example
         *
         */
        createScene : function() {
            //create a first root node.
            this.rootNode = new CGSGNode(0, 0);
            CGSG.sceneGraph.addNode(this.rootNode, null);

            //Text Log for min intervalSlider
            this.textNodeMin = new CGSGNodeText(400, 20, "Min Value : ?");
            this.textNodeMin.setSize(10);
            this.rootNode.addChild(this.textNodeMin, null);

            //Text Log for min intervalSlider
            this.textNodeMax = new CGSGNodeText(400, 70, "Max Value : ?");
            this.textNodeMax.setSize(10);
            this.rootNode.addChild(this.textNodeMax, null);

            //intervalSlider
            this.intervalSlider = new CGSGNodeIntervalSlider(300, 300, 100, 50, 0, 10);
            this.intervalSlider.setMinValue(9);
            this.intervalSlider.setMaxValue(9);


            this.rootNode.addChild(this.intervalSlider, null);

            this.textNodeMin.setText("Min Value : "+this.intervalSlider.getMinValue());
            this.textNodeMax.setText("Max Value : "+this.intervalSlider.getMaxValue());



            var that = this;
            this.intervalSlider.onMinValueChanged = function (event) {
                that.textNodeMin.setText("Min Value : "+ Math.round(that.intervalSlider.getMinValue() * 10)/10);
            }
            this.intervalSlider.onMaxValueChanged = function (event) {
                that.textNodeMax.setText("Max Value : "+ Math.round(that.intervalSlider.getMaxValue() * 10)/10);
            }



        }
    }
);