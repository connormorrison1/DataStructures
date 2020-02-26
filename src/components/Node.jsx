import React from 'react';
import '../css/Node.css';

const Node = (props) => {
    return (
        <div>
            <div id={props.value}
                 className={props.type !== "root" && (!props.isLeftOverlap && !props.isRightOverlap) ? "circle childNodes " + props.value : ((props.isLeftOverlap || props.isRightOverlap)) ? ("overlapCircle childNodes " + props.value) : "root circle"}
                 style={{
                     left: (props.isRightOverlap ? props.style.left - 50 : props.isLeftOverlap ? props.style.left + 50 : props.letter ? props.style.left - 600 : props.style.left),
                     top: (props.isRightOverlap || props.isLeftOverlap) ? props.style.top - 50 : props.style.top
                 }}>
                <h3>{props.letter ? props.letter : props.value}</h3>
            </div>
        </div>
    );
};

export default Node;