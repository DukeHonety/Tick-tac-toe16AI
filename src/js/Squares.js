import React,{useState} from 'react';

function Square(props)
{
    const type = props.type;
    const index = props.num;
    const lengthVal = props.lVal;
    const flag = 'asdfdsd';
    const [history, setHistory] = useState("0");
    const [cssName, setCssname] = useState("Square");
    const [squareName, setSquarename] = useState("");
    const [clicked, setClicked] = useState(false);
    const SquareClick = () => {
        if ( clicked === true )
            return;
        setClicked(true);
        const info = props.GameAction(index);
        
        if (info.pane === "ticker"){
            setCssname(cssName + " SquareTick");
            //setSquarename(1);
        }
        // if (info.pane === "tacker"){
        //     setCssname(cssName + " SquareTacker");
        //     //setSquarename(0);
        // }
    };
    return (
        <div className={cssName+" "+ lengthVal} onClick={SquareClick}>
            <div className="history">{lengthVal}</div>
        </div>
    );
}

export default Square;