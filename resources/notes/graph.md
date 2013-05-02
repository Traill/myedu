# Graph

Just some note for including VivaGraph in Trailhead:


## Graph

Graph is just an abstract definition of a graph that let do a lot of things on it. It will replace the Nodelist:


### Node & Link

Abstract class. Need to be implemented to incorporate the DOM element in respected to the layout type (WebGL?, SVG)

Node of Vivagraph has:

- data:
- events:
- force_directed_body:
- id:
- links:
- position:
- ui:


## Graphics

'Graphics' deals with the way to display the graph. In our case, we will start with SVG, so that we need to implement interface of the link and node to be implement with SVG (D3js, or could we use VivaGraph svg interface? ). It is in fact the ng-display and it will be augmented with a lot more method for us.

It has the method:
- addEventListener:
- beginRender:
- endRender:
- fire:
- getSvgRoot:
- graphCenterChanged:
- init:
- initLink:
- initNode:
- inputManager:
- link:
- node: this function describe how you draw the node for this specific graphics. I need to rewrite it so that it will display the node accordingly of a template, so that each node can look different on any graph.
- placeLink:
- placeNode:
- release:
- releaseLink:
- releaseNode:
- removeAllListeners:
- removeEventListener:
- resetScale:
- scale:
- translateRel:
- updateLinkPosition:
- updateNodePosition:

!So graphics is UNIQUE! Whereas each graph has its own renderer!

## Renderer

'Renderer' is the heart of the applications. It needs:

- A graph
- A layout: By default it use the forceLayout to display the graph with default value, so it's nice.
- A View, called graphics where to put the data...


Method:

- dispose:
- off:
- on:
- pause:
- rerender:
- reset:
- resume:
- run:


