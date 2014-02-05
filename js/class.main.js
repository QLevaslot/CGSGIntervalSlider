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

            //Text Log for first interval
            this.textNode = new CGSGNodeText(400, 20, "Value : ?");
            this.textNode.setSize(10);
            this.rootNode.addChild(this.textNode, null);

            //First interval
            this.interval = new CGSGNodeInterval(300, 300, 100, 50, 0, 10);

            this.rootNode.addChild(this.interval, null);

            var that = this;
            this.interval.onIntervalValueChanged = function (event) {
                console.log(event);
                that.textNode.setText("Value : "+ that.interval.value);
            }

        }
    }
);