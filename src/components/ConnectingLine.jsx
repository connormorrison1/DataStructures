import React, {useEffect, useState} from "react";
import {connectAll} from "../algorithms/connectNodes";

const ConnectingLine = (props) => {
    const [lines, setLines] = useState([]);
    useEffect(() => {
        let attributes = [];
        if(props.left) attributes.push(connectAll(props.left, "path1"));
        if(props.right) attributes.push(connectAll(props.right, "path2"));
        if(attributes.length > 0){
            let lines = [];
            attributes.forEach(function (attribute, index) {
                let path = "path" + (index+1);
                lines.push(<path
                    key = {attribute.endX}
                    id={path}
                    d={'M'+attribute.startX+' '+attribute.startY+' V'+(attribute.startY +
                        attribute.delta)+' A' +attribute.delta + ' ' +attribute.delta + ' 0 0 ' +attribute.arc1 + ' ' + (attribute.startX +
                        attribute.delta * attribute.sigDeltaX) + ' ' + (attribute.startY + 2 * attribute.delta) + ' H' + (attribute.endX -
                        attribute.delta * attribute.sigDeltaX) + ' A' + attribute.delta + ' ' + attribute.delta + ' 0 0 ' + attribute.arc2 + ' ' + attribute.endX + ' ' +(attribute.startY +
                        3 * attribute.delta) + ' V' + attribute.endY}
                    stroke="#000"
                    fill="none"
                    strokeWidth="5px"/>);
            });
            setLines(lines);
        }
    }, []);
    return (
        <div id="svgContainer" key = {props.rand}>
            <svg id="svg1" width="100%" height="100%">
                {lines}
            </svg>
        </div>
    )
};


export default ConnectingLine;