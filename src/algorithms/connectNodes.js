// helper functions, it turned out chrome doesn't support Math.sgn()
export const signum = x => (x < 0 ? -1 : 1);
export const absolute = x => (x < 0 ? -x : x);

export const drawPath = (svg, path, startX, startY, endX, endY) => {
    // get the path's stroke width (if one wanted to be  really precize, one could use half the stroke size)

    const deltaX = (endX - startX) * 0.15;
    const deltaY = (endY - startY) * 0.15;

    // for further calculations which ever is the shortest distance
    const delta = deltaY < absolute(deltaX) ? deltaY : absolute(deltaX);

    // set sweep-flag (counter/clock-wise)
    // if start element is closer to the left edge,
    // draw the first arc counter-clockwise, and the second one clock-wise
    let arc1 = 0;
    let arc2 = 1;
    if (startX > endX) {
        arc1 = 1;
        arc2 = 0;
    }

    // draw tha pipe-like path
    // 1. move a bit down, 2. arch,  3. move a bit to the right, 4.arch, 5. move down to the end
    return {startX:startX, startY:startY, delta:delta, arc1:arc1, deltaX:deltaX, endX:endX, arc2:arc2, endY:endY, sigDeltaX: signum(deltaX)};
};

export const connectElements = (container, svg, path, startElem, endElem) => {
    // if first element is lower than the second, swap!
    if (
        startElem.getBoundingClientRect().top > endElem.getBoundingClientRect().top
    ) {
        const temp = startElem;
        startElem = endElem;
        endElem = temp;
    }

    // get (top, left) corner coordinates of the svg container
    const svgTop = container.getBoundingClientRect().top;
    const svgLeft = container.getBoundingClientRect().left;

    // get (top, left) coordinates for the two elements
    const startCoord = startElem.getBoundingClientRect();
    const endCoord = endElem.getBoundingClientRect();

    // calculate path's start (x,y)  coords
    // we want the x coordinate to visually result in the element's mid point
    const startX = startCoord.left + 0.5 * startCoord.width - svgLeft; // x = left offset + 0.5*width - svg's left offset
    const startY = startCoord.top + startCoord.height - svgTop; // y = top offset + height - svg's top offset

    // calculate path's end (x,y) coords
    const endX = endCoord.left + 0.5 * endCoord.width - svgLeft;

    const endY = endCoord.top - svgTop;

    // call function for drawing the path
    return drawPath(svg, path, startX, startY, endX, endY);
};

export const connectAll = (node,path, parent = null) => {
    // connect all the paths you want!
    // console.log(left + " " + right);
    if(document.getElementById(node)!== null) {
        return connectElements(document.getElementById("svgContainer"), document.getElementById("svg1"), document.getElementById(path), (parent === null ? document.getElementById("root") : document.getElementById(parent)), document.getElementById(node));
    }
}