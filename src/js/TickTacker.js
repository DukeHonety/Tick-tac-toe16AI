import React,{useEffect, useState} from 'react';
import reactDom from 'react-dom';
import Square from './Squares.js';

function TickTacker(props) {
    const total = props.boxnum * props.boxnum;
    const [cVal] = useState("ticker");
    const [fillNum, setFillNum] = useState(0);
    const [gamePlay, setGamePlay] = useState(true);
    const winLen = props.winnum;
    const gameAI = false;
    const direction = [{r: 1, c: 0}, {r: 1, c: -1}, {r: 0, c: 1}, {r: 1, c: 1}];
    const depthVal = 3;
    let fieldAry,i;
    fieldAry = [total]; // it's value array for AI
    for ( i = 0; i < total; i++)
        fieldAry[i] = -1;

    // const getValue = (row, col) => {
    //     let value = 0,i,j;
    //     for ( i = 0; i < direction.length; i++){
    //         for ( j = 0; j < winLen; j++ ){
    //             let srow = row + j * direction[i].r;
    //             let scol = col + j * direction[i].c;
    //             let startPos = {r: srow, c:scol};
    //             value += checkLen(startPos, direction[i], winLen-1);
    //         }
    //     }
    //     return value;
    // }
    // const checkLen = (pos, dir, len) => {
    //     if ( pos.r < 0 || pos.c < 0 || pos.r > 15 || pos.c > 15 )
    //         return 0;
    //     if ( pos.r - dir.r*len < 0 || pos.c - dir.c*len < 0 )
    //         return 0;
    //     return 1;
    // }
    for ( i = 0; i < total; i++){
        //let row = parseInt(i/16);
        //let col = i%16;
        fieldAry[i] = 0; // disable first start;
        //fieldAry[i] = getValue(row,col);
    }
    let [bestValAIStart, setBestValAIStart] = useState(fieldAry);
    const GameAction = (n)=>{ // nth pane clicked
        if ( !gamePlay )
            return {pane: "none", play: "finish"};
        if ( gameAI ) return;
        let changeAry = bestValAIStart;
        changeAry[ n ] = "U";
        setBestValAIStart(changeAry);
        // if (cVal === "tacker")
        //     setCvalue("ticker");
        // else
        //     setCvalue("tacker");

        // Test game is to be finished
        if ( total-1 === fillNum || GameTest(n) )
        {
            GameFinished("Game Over");
            setGamePlay(false);
            return {pane: cVal, play: "finish"};
        }
        else
            setFillNum( fillNum + 1 );
        //DecreaseBestValAIStart(n);
        AIAction(changeAry);
        return {pane: cVal, play: "on"}; // return prev cVal
    }
    const AIAction = (field)=>{
        //let i, maxValueId = -1, max = -1;
        // for ( i = 0; i < total; i++){
        //     if ( max < bestValAIStart[i] ){
        //         max = bestValAIStart[i];
        //         maxValueId = i;
        //     }
        // }

        let maxValueId = GetBestValue(field);
        let changeAry = bestValAIStart;
        bestValAIStart[maxValueId] = "AI";
        setBestValAIStart(changeAry);

    }
    useEffect(() => {
        //AIAction();
        console.log("start");
    });
    // const DecreaseBestValAIStart = (n) => {
    //     let row = parseInt(n/16);
    //     let col = n%16;
    //     let value = 0,i,j;
    //     let changeAry = bestValAIStart;
    //     for ( i = 0; i < direction.length; i++){
    //         for ( j = 0; j < winLen*2-1; j++ ){
    //             let srow = row - (winLen-1) * direction[i].r + (j) * direction[i].r;
    //             let scol = col - (winLen-1)* direction[i].c  + (j) * direction[i].c;
    //             if (!testInGamePane(srow, scol)) continue;
    //             let index = srow*16 + scol;
    //             if ( typeof changeAry[ index ] !== "string" )
    //                 changeAry[ index ] -= 1;
    //         }
    //     }
    //     setBestValAIStart(changeAry);
    // }
    const GameTest = (n) => {
        return false;
    }
    
    const GameFinished = (str)=>{
        reactDom.render(
            <div className="gameResult">
                <h1>{str}</h1>
            </div>
            ,
            document.getElementById("result")
        );
        // reactDom.render(
        //     <div>
        //     </div>
        //     ,
        //     document.getElementById("root")
        // );
    }    
    const GetBestValue = (field) =>{
        let i,j,workAry1, workAry2;
        workAry1 = Array(total).fill(0);
        workAry2 = Array(total).fill(0);;
        for (i = 0; i < props.boxnum; i++){
            for ( j = 0; j < props.boxnum; j++){
                let index = i*16+j;
                if ( typeof field[ index ] !== "number" ){
                    workAry1[index] = bestValAIStart[index];
                    workAry2[index] = bestValAIStart[index];
                    continue;
                }
                workAry1[index] = getBestCheck(i,j,field,"U");
                workAry2[index] = getBestCheck(i,j,field,"AI");
            }
        }
        // setBestValU(workAry1);
        // setBestValAI(workAry2);
        let maxValueId1 = -1, max1 = -1;
        let maxValueId2 = -1, max2 = -1;
        for ( i = 0; i < total; i++){
            if ( max1 < workAry1[i] ){
                max1 = workAry1[i];
                maxValueId1 = i;
            }
            if ( max2 < workAry2[i] ){
                max2 = workAry2[i];
                maxValueId2 = i;
            }
        }
        let changeAry = workAry1, AISelect;
        if ( max1 >= max2 )
            AISelect = maxValueId1;
        else
            AISelect = maxValueId2;
        //workAry1[AISelect] = "AI";
        setBestValAIStart(changeAry);
        return AISelect;
    }
    const getBestCheck = (row, col, field, type) =>{
        let i,j,k,bestVal = 0;
        for ( i = 0; i < direction.length; i++)
        {
            let depth, passFlag;
            // direction search
            for ( j = 0; j < winLen; j++ ){
                depth = 0;
                passFlag = 0;
                let srow = row + (winLen-1) * direction[i].r - j * direction[i].r;
                let scol = col + (winLen-1) * direction[i].c  - j * direction[i].c;
                for ( k = 0; k < winLen; k++){
                    let currentRow = srow - k * direction[i].r;
                    let currentCol = scol - k * direction[i].c;
                    if (!testInGamePane(currentRow, currentCol)) continue;
                    let index = currentRow*16 + currentCol;
                    if ( currentRow === row && currentCol === col)
                        passFlag = true;
                    if ( typeof field[ index ] !== "string" )
                        continue;
                    if ( field[ index ] !== type && passFlag === false){
                        depth = 0;
                        passFlag = false;
                        break;
                    }
                    if ( field[ index ] === type ){
                        //bestVal++;
                        //depth += depth*2;
                        depth = depth === 0 ? 1 : depth * depthVal;
                    }
                }
                // if there is no 'AI' in the line
                // for this case it will counted dobule : direction search, convert direction search
                if ( passFlag )
                    depth = depth/2;
                bestVal += depth;
            // direction convert
                depth = 0;
                passFlag = false;
                srow = row - (winLen-1) * direction[i].r + j * direction[i].r;
                scol = col - (winLen-1) * direction[i].c  + j * direction[i].c;
                for ( k = 0; k < winLen; k++){
                    let currentRow = srow + k * direction[i].r;
                    let currentCol = scol + k * direction[i].c;
                    if (!testInGamePane(currentRow, currentCol)) continue;
                    let index = currentRow*16 + currentCol;
                    if ( currentRow === row && currentCol === col)
                        passFlag = true;
                    if ( typeof field[ index ] !== "string" )
                        continue;
                    if ( field[ index ] !== type && passFlag === false){
                        depth = 0;
                        passFlag = false;
                        break;
                    }
                    if ( field[ index ] === type ){
                        //bestVal++;
                        //depth += depth*2;
                        depth = depth === 0 ? 1 : depth * depthVal;
                    }
                }
                if ( passFlag )
                    depth = depth/2;
                bestVal += depth;
            }
        }
        if ( bestVal < 0 ) bestVal = 0;
        if (bestVal !== 0)
            console.log(row,col,bestVal);
        return bestVal;
    }
    const testInGamePane = (row, col) =>{
        if ( typeof row !== "number" || typeof col !== "number" ) return false;
        if ( row < 0 || col < 0 ) return false;
        if ( row >= props.boxnum || col >= props.boxnum ) return false;
        return true;
    }
    var field = Array(total).fill(0).map((num,index)=>
        <Square className="Square" num = {index} lVal = {bestValAIStart[ index ]} type={cVal} GameAction = {GameAction} ></Square>
    );
    var gamePaneCss = "GamePane GamePane"+ props.boxnum;
    return (
        <div className={gamePaneCss}>
            {field}
        </div>
    );
}
export default TickTacker;