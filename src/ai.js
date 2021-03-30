
export default function callAi(valueArray,squaresArr,picture) {

    const o = picture==='zero'?0:1;
    const x = picture==='zero'?1:0;

    const arr = [0,1,undefined];
    const arrsOneStepToVictory  = [[undefined,o,o],[o,undefined,o],[o,o,undefined]];
    const arrsOutrunTheEnemy  = [[undefined,x,x],[x,undefined,x],[x,x,undefined]];
    let iIndex, jIndex;

    if(clickUsingPattern(arrsOneStepToVictory)){
        return;
    }

    if(clickUsingPattern(arrsOutrunTheEnemy)){
        return;
    }
    

    if(clickTheCenter()){
        return;
    }

    clickRandom();
    


    
    function clickUsingPattern(arrOfArrs) {
         //Row
        for(let i=0; i<3; i++){
            jIndex = findIndexArrayInArrayOfArrays(valueArray[i],arrOfArrs);
            if(jIndex>=0){
                iIndex = i;
                click(iIndex,jIndex);
                return true;
            }
        }

        //Col
        for(let j=0; j<3; j++){
            iIndex = findIndexArrayInArrayOfArrays([valueArray[0][j],valueArray[1][j],valueArray[2][j]],arrOfArrs);
            if(iIndex>=0){
                jIndex = j;
                click(iIndex,jIndex);
                return true;
            }
        }

        //diag1

        iIndex = findIndexArrayInArrayOfArrays([valueArray[0][0],valueArray[1][1],valueArray[2][2]],arrOfArrs);
        if(iIndex>=0){
            jIndex = iIndex;
            click(iIndex,jIndex);
            return true;
        }


        //diag2
        iIndex = findIndexArrayInArrayOfArrays([valueArray[0][2],valueArray[1][1],valueArray[2][0]],arrOfArrs);
        if(iIndex>=0){
            jIndex = 2-iIndex;
            click(iIndex,jIndex);
            return true;
        }
    }



    function clickTheCenter(){
        const value = valueArray[1][1];
        if(value!=o && value!=x) {
            click(1,1);
            return true;
        } 
    }
    
    function clickRandom(){
        iIndex = Math.round(2*Math.random());
        jIndex = Math.round(2*Math.random());
        const value = valueArray[iIndex][jIndex];
        if(value!=o && value!=x) {
            click(iIndex,jIndex);
        } else {
            clickRandom();
        }
    }

    function findIndexArrayInArrayOfArrays(inputArr, arrOfArrs){
        const index =  arrOfArrs.findIndex(arr=>compareArrays(arr,inputArr));
            return index;


    }

    function compareArrays(arr1, arr2){
        return arr1.every((value1, j)=>value1===arr2[j]);

    }
    function click(i,j) {
        squaresArr[i][j].emit('pointerdown');
    }
}
