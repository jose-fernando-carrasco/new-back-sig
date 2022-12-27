/*! JointJS+ v3.5.0 - HTML5 Diagramming Framework - TRIAL VERSION

Copyright (c) 2022 client IO

 2022-10-13 


This Source Code Form is subject to the terms of the JointJS+ Trial License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at http://jointjs.com/license/rappid_v2.txt
 or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/
const BotonCargar = document.getElementById("BotoncitoX");
var btnClick = document.getElementById('btnClick');
var startTime, endTime;



var App = window.App || {};

(function(_, joint) {

    'use strict';

    App.MainView = joint.mvc.View.extend({

        className: 'app',

        events: {
            'mouseup input[type="range"]': 'removeTargetFocus',
            'mousedown': 'removeFocus',
            'touchstart': 'removeFocus'
        },

        removeTargetFocus: function(evt) {
            evt.target.blur();

        },

        removeFocus: function(evt) {
            // console.log('moviendo objectos pero no enlaces');
            // do not lose focus on right-click
            if (evt.button === 2) return;

            // do not lose focus if clicking current element for a second time
            var activeElement = document.activeElement;
            var target = evt.target;
            if ($.contains(activeElement, target) || (activeElement === target)) return;

            activeElement.blur();
            window.getSelection().removeAllRanges();
        },

        init: function() {

            this.initializePaper();
            this.initializeStencil();
            this.initializeSelection();
            this.initializeToolsAndInspector();
            this.initializeNavigator();
            this.initializeToolbar();
            this.initializeKeyboardShortcuts();
            this.initializeTooltips();
        },

        // Create a graph, paper and wrap the paper in a PaperScroller.
        initializePaper: function() {

            var graph = this.graph = new joint.dia.Graph;



            this.commandManager = new joint.dia.CommandManager({ graph: graph });

            var paper = this.paper = new joint.dia.Paper({
                width: 2000,
                height: 2000,
                gridSize: 10,
                /* drawGrid: true, */
                drawGrid: {
                    name: 'mesh',
                    args: [
                        { color: '#D1CBCA', thickness: 0.5 }, // settings for the primary mesh
                        { color: '#DEDEDE', scaleFactor: 5, thickness: 2 } //settings for the secondary mesh
                    ]
                },
                model: graph,
                defaultLink: new joint.shapes.app.Link,
                defaultConnectionPoint: joint.shapes.app.Link.connectionPoint,
                interactive: { linkMove: false },
                async: true,
                sorting: joint.dia.Paper.sorting.APPROX,
                background: { color: '#F3F7F6' },

            });

            paper.on('blank:mousewheel', _.partial(this.onMousewheel, null), this);
            paper.on('cell:mousewheel', this.onMousewheel, this);

            this.snaplines = new joint.ui.Snaplines({ paper: paper });

            var paperScroller = this.paperScroller = new joint.ui.PaperScroller({
                paper: paper,
                autoResizePaper: true,
                scrollWhileDragging: true,
                cursor: 'grab'
            });

            this.$('.paper-container').append(paperScroller.el);
            paperScroller.render().center();

            joint.dia.Element.define('custom.Actor', {
                attrs: {
                    body: {
                        //refD: 'M 0 130 C 0 78 0 52 60 52 C 20 52 20 0 60 0 C 100 0 100 52 60 52 C 120 52 120 78 120 130 Z',
                        // refD: 'M 0 130 C 0 78 0 52 60 52 C 20 52 20 0 60 0 C 100 0 100 52 60 52 C 120 52 120 78 120 130 Z',
                        refD: 'M 140.5 40.5 A 40.5 40.5 0 0 1 100 81 A 40.5 40.5 0 0 1 59.5 40.5 A 40.5 40.5 0 0 1 100 0 A 40.5 40.5 0 0 1 140.5 40.5 Z M 0 105.3 C 0 82.93 18.13 64.8 40.5 64.8 L 159.5 64.8 C 181.87 64.8 200 82.93 200 105.3 L 200 139.5 C 200 161.87 181.87 180 159.5 180 L 40.5 180 C 18.13 180 0 161.87 0 139.5 Z M 140.5 40.5 A 40.5 40.5 0 0 1 100 81 A 40.5 40.5 0 0 1 59.5 40.5 A 40.5 40.5 0 0 1 100 0 A 40.5 40.5 0 0 1 140.5 40.5 Z',
                        strokeWidth: 2,
                        stroke: '#31d0c6',
                        fill: {
                            type: 'linearGradient',
                            stops: [
                                { offset: '0%', color: 'rgb(49, 208, 198)' },
                                { offset: '100%', color: 'rgb(55, 235, 223)' },
                            ]
                        },
                        strokeDasharray: '0'
                    },
                    titulo: {
                        textVerticalAnchor: 'middle',
                        textAnchor: 'middle',
                        text: 'Titulo',
                        refX: '50%',
                        refY: '60%',
                        fontSize: 30,
                        fontWeight: 'bold',
                        fill: '#333333',
                    },
                    subtitulo: {
                        ref: 'titulo',
                        textAnchor: 'middle',
                        text: '[Subtitulo]',
                        refX: '50%',
                        refY: '100%',
                        fontSize: 14,
                        // fontFamily: 'sans serif',
                        fill: '#333333',
                    },
                    contenido: {
                        ref: 'subtitulo',
                        textAnchor: 'middle',
                        text: 'Contenido de la figura',
                        refX: '50%',
                        refY: '180%',
                        fontSize: 20,
                        fontFamily: 'Roboto Condensed',
                        fill: '#333333',
                    },
                }
            }, {
                markup: [{
                        tagName: 'path',
                        selector: 'body'
                    },
                    {
                        tagName: 'text',
                        selector: 'subtitulo'
                    },
                    {
                        tagName: 'text',
                        selector: 'titulo'
                    },
                    {
                        tagName: 'text',
                        selector: 'contenido'
                    },
                ]
            });

            joint.dia.Element.define('custom.penta', {
                attrs: {
                    body: {
                        refD: 'M 25 42.5 L 44.93 8.62 Q 50 0 60 0 L 140 0 Q 150 0 155.07 8.62 L 194.93 76.38 Q 200 85 194.93 93.62 L 155.07 161.38 Q 150 170 140 170 L 60 170 Q 50 170 44.93 161.38 L 5.07 93.62 Q 0 85 5.07 76.38 Z',
                        strokeWidth: 2,
                        stroke: '#31d0c6',
                        fill: {
                            type: 'linearGradient',
                            stops: [
                                { offset: '0%', color: 'rgb(49, 208, 198)' },
                                { offset: '100%', color: 'rgb(55, 235, 223)' },
                            ]
                        },
                        strokeDasharray: '0'
                    },
                    titulo: {
                        textVerticalAnchor: 'middle',
                        textAnchor: 'middle',
                        text: 'Titulo',
                        refX: '50%',
                        refY: '30%',
                        fontSize: 30,
                        fontWeight: 'bold',
                        fill: '#333333',
                    },
                    subtitulo: {
                        ref: 'titulo',
                        textAnchor: 'middle',
                        text: '[Subtitulo]',
                        refX: '50%',
                        refY: '120%',
                        fontSize: 14,
                        fill: '#333333',
                    },
                    contenido: {
                        ref: 'subtitulo',
                        textAnchor: 'middle',
                        text: 'Contenido de la figura',
                        refX: '50%',
                        refY: '150%',
                        fontSize: 20,
                        fontFamily: 'Roboto Condensed',
                        fill: '#333333',
                    },
                }
            }, {
                markup: [{
                        tagName: 'path',
                        selector: 'body'
                    },
                    {
                        tagName: 'text',
                        selector: 'subtitulo'
                    },
                    {
                        tagName: 'text',
                        selector: 'titulo'
                    },
                    {
                        tagName: 'text',
                        selector: 'contenido'
                    },
                ]
            });

            joint.dia.Element.define('custom.web', {
                attrs: {
                    body: {
                        refD: 'M 0 8 C 0 3.58 3.58 0 8 0 L 232 0 C 236.42 0 240 3.58 240 8 L 240 152 C 240 156.42 236.42 160 232 160 L 8 160 C 3.58 160 0 156.42 0 152 Z M 5 8 C 5 6.34 6.34 5 8 5 L 181 5 C 182.66 5 184 6.34 184 8 L 184 14 C 184 15.66 182.66 17 181 17 L 8 17 C 6.34 17 5 15.66 5 14 Z M 189 8 C 189 6.34 190.34 5 192 5 L 198 5 C 199.66 5 201 6.34 201 8 L 201 14 C 201 15.66 199.66 17 198 17 L 192 17 C 190.34 17 189 15.66 189 14 Z M 206 8 C 206 6.34 207.34 5 209 5 L 215 5 C 216.66 5 218 6.34 218 8 L 218 14 C 218 15.66 216.66 17 215 17 L 209 17 C 207.34 17 206 15.66 206 14 Z M 223 8 C 223 6.34 224.34 5 226 5 L 232 5 C 233.66 5 235 6.34 235 8 L 235 14 C 235 15.66 233.66 17 232 17 L 226 17 C 224.34 17 223 15.66 223 14 Z M 5 30 C 5 25.58 8.58 22 13 22 L 227 22 C 231.42 22 235 25.58 235 30 L 235 147 C 235 151.42 231.42 155 227 155 L 13 155 C 8.58 155 5 151.42 5 147 Z',
                        strokeWidth: 2,
                        stroke: '#31d0c6',
                        fill: {
                            type: 'linearGradient',
                            stops: [
                                { offset: '0%', color: 'rgb(49, 208, 198)' },
                                { offset: '100%', color: 'rgb(55, 235, 223)' },
                            ]
                        },
                        strokeDasharray: '0',
                    },
                    titulo: {
                        textVerticalAnchor: 'middle',
                        textAnchor: 'middle',
                        text: 'Titulo',
                        refX: '50%',
                        refY: '30%',
                        fontSize: 30,
                        fontWeight: 'bold',
                        fill: '#333333',
                    },
                    subtitulo: {
                        ref: 'titulo',
                        textAnchor: 'middle',
                        text: '[Subtitulo]',
                        refX: '50%',
                        refY: '120%',
                        fontSize: 14,
                        fill: '#333333',
                    },
                    contenido: {
                        ref: 'subtitulo',
                        textAnchor: 'middle',
                        text: 'Contenido de la figura',
                        refX: '50%',
                        refY: '150%',
                        fontSize: 20,
                        fontFamily: 'Roboto Condensed',
                        fill: '#333333',
                    },
                }
            }, {
                markup: [{
                        tagName: 'path',
                        selector: 'body'
                    },
                    {
                        tagName: 'text',
                        selector: 'subtitulo'
                    },
                    {
                        tagName: 'text',
                        selector: 'titulo'
                    },
                    {
                        tagName: 'text',
                        selector: 'contenido'
                    },
                ]
            });

            joint.shapes.standard.Cylinder.define('custom.BD', {
                attrs: {
                    body: {
                        fill: 'transparent'
                    },
                    top: {
                        fill: 'transparent',
                    },
                    titulo: {
                        textVerticalAnchor: 'middle',
                        textAnchor: 'middle',
                        text: 'Titulo',
                        refX: '50%',
                        refY: '50%',
                        fontSize: 30,
                        fontWeight: 'bold',
                        fill: '#333333',
                    },
                    subtitulo: {
                        ref: 'titulo',
                        textAnchor: 'middle',
                        text: '[Subtitulo]',
                        refX: '50%',
                        refY: '100%',
                        fontSize: 14,
                        // fontFamily: 'sans serif',
                        fill: '#333333',
                    },
                    contenido: {
                        ref: 'subtitulo',
                        textAnchor: 'middle',
                        text: 'Contenido de la figura',
                        refX: '50%',
                        refY: '180%',
                        fontSize: 20,
                        fontFamily: 'Roboto Condensed',
                        fill: '#333333',
                    },
                }
            }, {
                markup: [{
                        tagName: "path",
                        selector: "body"
                    },
                    {
                        tagName: "ellipse",
                        selector: "top"
                    },
                    {
                        tagName: "text",
                        selector: "titulo"
                    },
                    {
                        tagName: 'text',
                        selector: 'subtitulo'
                    },
                    {
                        tagName: 'text',
                        selector: 'contenido'
                    },
                ]
            });

            joint.shapes.standard.Rectangle.define('custom.Rectangulo', {
                attrs: {
                    body: {
                        fill: 'transparent'
                    },
                    titulo: {
                        textVerticalAnchor: 'middle',
                        textAnchor: 'middle',
                        text: 'Titulo',
                        refX: '50%',
                        refY: '35%',
                        fontSize: 30,
                        fontWeight: 'bold',
                        fill: '#333333',
                    },
                    subtitulo: {
                        ref: 'titulo',
                        textAnchor: 'middle',
                        text: '[Subtitulo]',
                        refX: '50%',
                        refY: '100%',
                        fontSize: 14,
                        fill: '#333333',
                    },
                    contenido: {
                        ref: 'subtitulo',
                        textAnchor: 'middle',
                        text: 'Contenido de la figura',
                        refX: '50%',
                        refY: '180%',
                        fontSize: 20,
                        fontFamily: 'Roboto Condensed',
                        fill: '#333333',
                    },
                }
            }, {
                markup: [{
                        tagName: "rect",
                        selector: "body"
                    },
                    {
                        tagName: "text",
                        selector: "titulo"
                    },
                    {
                        tagName: 'text',
                        selector: 'subtitulo'
                    },
                    {
                        tagName: 'text',
                        selector: 'contenido'
                    },
                ]
            });

            joint.shapes.standard.Rectangle.define('custom.Bum', {
                attrs: {
                    body: {
                        fill: 'transparent'
                    },
                }
            }, {
                markup: [{
                    tagName: "rect",
                    selector: "body"
                }, ]
            });
        },

        // Create and populate stencil.
        initializeStencil: function() {

            var stencil = this.stencil = new joint.ui.Stencil({
                paper: this.paperScroller,
                snaplines: this.snaplines,
                scaleClones: true,
                width: 240,
                groups: App.config.stencil.groups,
                dropAnimation: true,
                groupsToggleButtons: true,
                /* search: {
                    '*': ['type', 'attrs/text/text', 'attrs/root/dataTooltip', 'attrs/label/text'],
                    'org.Member': ['attrs/.rank/text', 'attrs/root/dataTooltip', 'attrs/.name/text']
                }, */
                // Use default Grid Layout
                layout: true,
                // Remove tooltip definition from clone
                dragStartClone: function(cell) {
                    return cell.clone().removeAttr('root/dataTooltip');
                }
            });

            this.$('.stencil-container').append(stencil.el);
            stencil.render().load(App.config.stencil.shapes);

            stencil.on('element:drop', function(elementView) {
                this.selection.collection.reset([elementView.model]);
            }, this);
        },

        initializeKeyboardShortcuts: function() {

            this.keyboard = new joint.ui.Keyboard();
            this.keyboard.on({

                'ctrl+c': function() {
                    // Copy all selected elements and their associated links.
                    this.clipboard.copyElements(this.selection.collection, this.graph);
                },

                'ctrl+v': function() {

                    var pastedCells = this.clipboard.pasteCells(this.graph);

                    var elements = _.filter(pastedCells, function(cell) {
                        return cell.isElement();
                    });

                    // Make sure pasted elements get selected immediately. This makes the UX better as
                    // the user can immediately manipulate the pasted elements.
                    this.selection.collection.reset(elements);
                },

                'ctrl+x shift+delete': function() {
                    this.clipboard.cutElements(this.selection.collection, this.graph);
                },

                'delete backspace': function(evt) {
                    evt.preventDefault();
                    this.graph.removeCells(this.selection.collection.toArray());
                },

                'ctrl+z': function() {
                    this.commandManager.undo();
                    this.selection.collection.reset([]);
                },

                'ctrl+y': function() {
                    this.commandManager.redo();
                    this.selection.collection.reset([]);
                },

                'ctrl+a': function() {
                    this.selection.collection.reset(this.graph.getElements());
                },

                'ctrl+plus': function(evt) {
                    evt.preventDefault();
                    this.paperScroller.zoom(0.2, { max: 5, grid: 0.2 });
                },

                'ctrl+minus': function(evt) {
                    evt.preventDefault();
                    this.paperScroller.zoom(-0.2, { min: 0.2, grid: 0.2 });
                },

                'keydown:shift': function(evt) {
                    this.paperScroller.setCursor('crosshair');
                },

                'keyup:shift': function() {
                    this.paperScroller.setCursor('grab');
                }

            }, this);
        },

        initializeSelection: function() {


            this.clipboard = new joint.ui.Clipboard({
                translate: { dx: 20, dy: 20 },
                useLocalStorage: true
            });

            this.selection = new joint.ui.Selection({
                paper: this.paper,
                handles: App.config.selection.handles,
                useModelGeometry: true
            });

            this.selection.collection.on('reset add remove', this.onSelectionChange.bind(this));

            // Initiate selecting when the user grabs the blank area of the paper while the Shift key is pressed.
            // Otherwise, initiate paper pan.
            this.paper.on('blank:pointerdown', function(evt, x, y) {

                if (this.keyboard.isActive('shift', evt)) {
                    this.selection.startSelecting(evt);

                } else {
                    this.selection.collection.reset([]);
                    this.paperScroller.startPanning(evt, x, y);
                    this.paper.removeTools();
                }
                //FUNCIONA PERO NO ME CONVENCE BotonCargar.click();
            }, this);

            this.paper.on('element:pointerdown', function(elementView, evt) {

                // Select an element if CTRL/Meta key is pressed while the element is clicked.
                if (this.keyboard.isActive('ctrl meta', evt)) {

                    if (this.selection.collection.find(function(cell) { return cell.isLink() })) {
                        // Do not allow mixing links and elements in the selection
                        this.selection.collection.reset([elementView.model]);

                    } else {

                        this.selection.collection.add(elementView.model);

                    }

                }

            }, this);

            this.graph.on('remove', function(cell) {

                // If element is removed from the graph, remove from the selection too.
                if (this.selection.collection.has(cell)) {
                    this.selection.collection.reset(this.selection.collection.models.filter(c => c !== cell));
                }
                BotonCargar.click();
            }, this);

            this.selection.on('selection-box:pointerdown', function(elementView, evt) {

                // Unselect an element if the CTRL/Meta key is pressed while a selected element is clicked.
                if (this.keyboard.isActive('ctrl meta', evt)) {

                    evt.preventDefault();
                    this.selection.collection.remove(elementView.model);

                }

            }, this);
        },

        onSelectionChange: function() {
            console.log('moviendo XD...');
            //console.log('yeiii');



            var paper = this.paper;
            var selection = this.selection;
            var collection = selection.collection;
            paper.removeTools();
            joint.ui.Halo.clear(paper);
            joint.ui.FreeTransform.clear(paper);
            joint.ui.Inspector.close();
            //los botones aqui son para cuando se crean
            if (collection.length === 1) {
                var primaryCell = collection.first();
                var primaryCellView = paper.requireView(primaryCell);
                selection.destroySelectionBox(primaryCell);
                this.selectPrimaryCell(primaryCellView);
                BotonCargar.click();
            } else if (collection.length === 2) {
                collection.each(function(cell) {
                    selection.createSelectionBox(cell);
                });
                BotonCargar.click();
            }


        },

        //ya verificado
        selectPrimaryCell: function(cellView) {
            var cell = cellView.model

            if (cell.isElement()) {
                this.selectPrimaryElement(cellView);
            } else {
                this.selectPrimaryLink(cellView);
            }
            this.createInspector(cell);

        },

        selectPrimaryElement: function(elementView) {

            var element = elementView.model;

            new joint.ui.FreeTransform({
                cellView: elementView,
                allowRotation: false,
                preserveAspectRatio: !!element.get('preserveAspectRatio'),
                allowOrthogonalResize: element.get('allowOrthogonalResize') !== false
            }).render();

            new joint.ui.Halo({
                cellView: elementView,
                handles: App.config.halo.handles,
                useModelGeometry: true
            }).render();
        },

        selectPrimaryLink: function(linkView) {

            var ns = joint.linkTools;
            var toolsView = new joint.dia.ToolsView({
                name: 'link-pointerdown',
                tools: [
                    new ns.Vertices(),
                    new ns.SourceAnchor(),
                    new ns.TargetAnchor(),
                    new ns.SourceArrowhead(),
                    new ns.TargetArrowhead(),
                    new ns.Segments,
                    new ns.Boundary({ padding: 15 }),
                    new ns.Remove({ offset: -20, distance: 40 })
                ]
            });

            linkView.addTools(toolsView);

        },

        createInspector: function(cell) {

            return joint.ui.Inspector.create('.inspector-container', _.extend({
                cell: cell
            }, App.config.inspector[cell.get('type')]));
        },

        initializeToolsAndInspector: function() {

            this.paper.on({


                //para cada cambio de un objeto ya creado
                'cell:pointerup': function(cellView) {
                    //SIII BotonCargar.click();
                    var cell = cellView.model;
                    var collection = this.selection.collection;
                    if (collection.includes(cell)) return;
                    collection.reset([cell]);
                },

                'link:mouseenter': function(linkView) {
                    //funciona pero solo para los enlaces
                    //BotonCargar.click();
                    // Open tool only if there is none yet
                    if (linkView.hasTools()) return;

                    var ns = joint.linkTools;
                    var toolsView = new joint.dia.ToolsView({
                        name: 'link-hover',
                        tools: [
                            new ns.Vertices({ vertexAdding: false }),
                            new ns.SourceArrowhead(),
                            new ns.TargetArrowhead()
                        ]
                    });

                    linkView.addTools(toolsView);
                },

                'link:mouseleave': function(linkView) {
                    // Remove only the hover tool, not the pointerdown tool
                    if (linkView.hasTools('link-hover')) {
                        linkView.removeTools();
                    }
                    //se ejecuta cuando el cursos esta en el enlace
                    console.log('Saliste XD');
                    //BotonCargar.click();
                }

            }, this);

            this.graph.on('change', function(cell, opt) {

                /*Cuando se haga clic*/
                btnClick.onmousedown = function() {
                    startTime = new Date();
                };

                /*Cuando se deje de hacer clic*/
                btnClick.onmouseup = function() {
                    endTime = new Date();
                    var timeDiff = endTime - startTime; //en ms
                    BotonCargar.click();
                };
                //BotonCargar.click();

                if (!cell.isLink() || !opt.inspector) return;

                var ns = joint.linkTools;
                var toolsView = new joint.dia.ToolsView({
                    name: 'link-inspected',
                    tools: [
                        new ns.Boundary({ padding: 15 }),
                    ]
                });


                cell.findView(this.paper).addTools(toolsView);


            }, this)


        },

        initializeNavigator: function() {

            var navigator = this.navigator = new joint.ui.Navigator({
                width: 240,
                height: 115,
                paperScroller: this.paperScroller,
                zoom: {
                    grid: 0.2,
                    min: 0.2,
                    max: 5
                },
                paperOptions: {
                    async: true,
                    sorting: joint.dia.Paper.sorting.NONE,
                    elementView: joint.shapes.app.NavigatorElementView,
                    linkView: joint.shapes.app.NavigatorLinkView,
                    cellViewNamespace: { /* no other views are accessible in the navigator */ }
                }
            });

            this.$('.navigator-container').append(navigator.el);
            navigator.render();
        },

        initializeToolbar: function() {

            var toolbar = this.toolbar = new joint.ui.Toolbar({
                autoToggle: true,
                groups: App.config.toolbar.groups,
                tools: App.config.toolbar.tools,
                references: {
                    paperScroller: this.paperScroller,
                    commandManager: this.commandManager
                }
            });

            toolbar.on({
                'svg:pointerclick': this.openAsSVG.bind(this),
                'png:pointerclick': this.openAsPNG.bind(this),
                'to-front:pointerclick': this.applyOnSelection.bind(this, 'toFront'),
                'to-back:pointerclick': this.applyOnSelection.bind(this, 'toBack'),
                // 'layout:pointerclick': this.layoutDirectedGraph.bind(this),
                // 'snapline:change': this.changeSnapLines.bind(this),
                'clear:pointerclick': this.graph.clear.bind(this.graph),
                'print:pointerclick': this.paper.print.bind(this.paper),
                // 'grid-size:change': this.paper.setGridSize.bind(this.paper)
            });

            this.$('.toolbar-container').append(toolbar.el);
            toolbar.render();
        },

        applyOnSelection: function(method) {
            this.graph.startBatch('selection');
            this.selection.collection.models.forEach(function(model) { model[method](); });
            this.graph.stopBatch('selection');
        },

        changeSnapLines: function(checked) {

            if (checked) {

                this.snaplines.startListening();
                this.stencil.options.snaplines = this.snaplines;
            } else {

                this.snaplines.stopListening();
                this.stencil.options.snaplines = null;
            }
        },

        initializeTooltips: function() {

            new joint.ui.Tooltip({
                rootTarget: document.body,
                target: '[data-tooltip]',
                direction: 'auto',
                padding: 10,
                animation: true
            });
        },

        // backwards compatibility for older shapes
        exportStylesheet: '.scalable * { vector-effect: non-scaling-stroke }',

        openAsSVG: function() {
            console.log('click en png');
            var paper = this.paper;
            paper.hideTools().toSVG(function(svg) {
                /* new joint.ui.Lightbox({
                    image: 'data:image/svg+xml,' + encodeURIComponent(svg),
                    downloadable: true,
                    fileName: 'Rappid'
                }).open();
                paper.showTools(); */
                joint.util.downloadDataUri(`data:image/svg+xml,${encodeURIComponent(svg)}`, "diagram.svg");
            }, {
                preserveDimensions: true,
                convertImagesToDataUris: true,
                useComputedStyles: false,
                stylesheet: this.exportStylesheet
            });
        },

        openAsPNG: function() {

            var paper = this.paper;
            paper.hideTools().toPNG(function(dataURL) {

                /* new joint.ui.Lightbox({
                    image: dataURL,
                    downloadable: true,
                    fileName: 'Rappid'
                }).open();
                
                paper.showTools(); */
                console.log(dataURL);
                joint.util.downloadDataUri(dataURL, "diagram.png");
            }, {
                padding: 10,
                useComputedStyles: false,
                stylesheet: this.exportStylesheet
            });
        },

        onMousewheel: function(cellView, evt, x, y, delta) {

            if (this.keyboard.isActive('alt', evt)) {
                evt.preventDefault();
                this.paperScroller.zoom(delta * 0.2, { min: 0.2, max: 5, grid: 0.2, ox: x, oy: y });
            }
        },

        layoutDirectedGraph: function() {

            joint.layout.DirectedGraph.layout(this.graph, {
                setLinkVertices: true,
                rankDir: 'TB',
                marginX: 100,
                marginY: 100
            });

            this.paperScroller.centerContent({ useModelGeometry: true });
        }
    });

})(_, joint);