import * as PIXI from 'pixi.js';

const app = new PIXI.Application({
    width : 900,
    height : 600,
    backgroundColor: 0xe9e9e9
});
document.body.appendChild(app.view);


const Graphics = PIXI.Graphics;
const Container = PIXI.Container;
const Text = PIXI.Text;






let arr = [[],[],[]],
pictureNow = 'cross',
players = {
    firstPlayer: {
        picture:'cross',
        wins: 0,
        progress:0
    },
    secondPlayer: {
        picture:'zero',
        wins: 0,
        progress:0
    }
},
playersProggres = {
    cross: 0,
    zero: 0
},
end = false;




const gameField = new Container();
gameField.x = 100;
gameField.y = 100;
app.stage.addChild(gameField);

const infoField = new Container();
infoField.x = app.renderer.width/1.8;
infoField. y = 75;
app.stage.addChild(infoField);




const winTextStyle = {
    
    fontSize: 54,
    fill: 'rgb(0,200,0)',
    stroke: 'black',
    strokeThickness: 4,
    
};
const winText = new Text( 'winText', winTextStyle);



winText.anchor.set(0.5,0.5);
winText.x = 150;
winText.y = 150;
winText.visible = false;
// gameField.addChild(winText);



const deadHeatTextStyle = {
    
    fontSize: 44,
    fill: 'rgb(200,0,0)',
    stroke: 'black',
    strokeThickness: 4,
    
};
const deadHeatText = new Text( 'dead Heat', deadHeatTextStyle);


deadHeatText.anchor.set(0.5,0.5);
deadHeatText.x = 150;
deadHeatText.y = 150;
deadHeatText.visible = false;
// gameField.addChild(deadHeatText);




const progressContainer = new Container();
infoField.addChild(progressContainer);


const progressPlayerStyle = {
    
    fontSize: 28,
    fill: 'black',
    stroke: 'black',
    strokeThickness: 1,
    
};
const progressTitle = new Text( 'Ходы:', progressPlayerStyle);
progressContainer.addChild(progressTitle);

const generalProgress = new Text( 'общие: 0', progressPlayerStyle);
progressContainer.addChild(generalProgress);

generalProgress.y = 34;
generalProgress.x = 20;

progressContainer.addChild(generalProgress);

const progressPlayer1 = new Text( 'игрок 1: 0', progressPlayerStyle);
progressPlayer1.y = 62;
progressPlayer1.x = 20;
progressContainer.addChild(progressPlayer1);

const progressPlayer2 = new Text( 'игрок 2: 0', progressPlayerStyle);
progressPlayer2.y = 92;
progressPlayer2.x = 20;
progressContainer.addChild(progressPlayer2);

const activePlayer = new Text( `ход: игрок 1 - ${players.firstPlayer.picture}`, progressPlayerStyle);
infoField.addChild(activePlayer);


progressContainer.x = infoField.width/1.5;
progressContainer.y = 60;





const winsContainer = new Container();
infoField.addChild(winsContainer);


const winsTitle = new Text( 'Победы:', progressPlayerStyle);
winsContainer.addChild(winsTitle);


const winsPlayer1 = new Text( 'игрок 1: 0', progressPlayerStyle);
winsPlayer1.y = 34;
winsPlayer1.x = 20;
winsContainer.addChild(winsPlayer1);

const winsPlayer2 = new Text( 'игрок 2: 0', progressPlayerStyle);
winsPlayer2.y = 62;
winsPlayer2.x = 20;
winsContainer.addChild(winsPlayer2);

winsContainer.y = 60;

const choiceContainer = new Container();
choiceContainer.y = 250;
choiceContainer.x = 40;

infoField.addChild(choiceContainer);

const choiceTitleText = new Text('Ваш выбор:',progressPlayerStyle);
choiceTitleText.x = 30;
choiceTitleText.y = -40;

choiceContainer.addChild(choiceTitleText);

const choicePlayer1 = new Container();
choiceContainer.addChild(choicePlayer1);

const textChoicePlayer1 = new Text('Игрок 1 это -',progressPlayerStyle);
choicePlayer1.addChild(textChoicePlayer1);

const wrapPicture1 = new Container();
wrapPicture1.scale.set(0.4);
wrapPicture1.x = 200;
drawCross(wrapPicture1);
choicePlayer1.addChild(wrapPicture1);

const choicePlayer2 = new Container();
choicePlayer2.y = 34; 
choiceContainer.addChild(choicePlayer2);

const textChoicePlayer2 = new Text('Игрок 2 это -',progressPlayerStyle);
choicePlayer2.addChild(textChoicePlayer2);

const wrapPicture2 = new Container();
wrapPicture2.scale.set(0.4);
wrapPicture2.x = 200;
drawZero(wrapPicture2);
choicePlayer2.addChild(wrapPicture2);

choiceContainer.interactive = true;
choiceContainer.on('pointerdown', ()=>{
    const progressFirst = playersProggres[players.firstPlayer.picture];
    const progressSecond = playersProggres[players.secondPlayer.picture];
    if(Math.max(progressFirst,progressSecond)===0){
        if(players.firstPlayer.picture == 'cross'){
            players.firstPlayer.picture = 'zero';
            players.secondPlayer.picture = 'cross';
            wrapPicture1.removeChildren();
            drawZero(wrapPicture1);
            wrapPicture2.removeChildren();
            drawCross(wrapPicture2);
            pictureNow = 'zero';
            updateText();
        } else {
            players.firstPlayer.picture = 'cross';
            players.secondPlayer.picture = 'zero';
            wrapPicture1.removeChildren();
            drawCross(wrapPicture1);
            wrapPicture2.removeChildren();
            drawZero(wrapPicture2);
            pictureNow = 'cross';
            updateText();


        }
    }
    
});

createPlayField(gameField,winText,deadHeatText);

function createPlayField(box, winText, deadHeatText){
    const gameContainer = new Container();
    box.addChild(gameContainer);
    box.interactive = false;
    box.interactiveChildren = true; 
    box.addChild(winText);
    box.addChild(deadHeatText);

    end = false;
    arr = [[],[],[]];
    playersProggres.cross = 0;
    playersProggres.zero = 0;
    winText.visible = false;
    deadHeatText.visible = false;
    updateText();


    
    for(let i=0; i<3; i++){
        for(let j=0; j<3; j++){
            const wrappSquare = new Container();
            const square = new Graphics();

            square.beginFill(0xe9e9e9);
            square.lineStyle(2);
            square.drawRect(0,0,100,100);
            square.endFill();


            wrappSquare.x = 100*j;
            wrappSquare.y = 100*i;


            wrappSquare.addChild(square);
            gameContainer.addChild(wrappSquare);

            

            wrappSquare.interactive = true;
            wrappSquare.on('pointerdown', ()=>{
                console.log('click');
                if(arr[i][j]==undefined){
                    if(pictureNow == 'zero'){
                        drawZero(wrappSquare);
                        arr[i][j] = 0;
                        playersProggres.zero +=1;
                        pictureNow = 'cross';
                        updateText();

                        
                    } else if(pictureNow == 'cross') {
                        drawCross(wrappSquare);
                        arr[i][j] = 1;
                        playersProggres.cross +=1;
                        pictureNow = 'zero';
                        updateText();


                    }
                    if(checkWin() && !end){
                        end = true;
                        if(pictureNow === players.firstPlayer.picture) {
                            players.secondPlayer.wins += 1;
                            winText.text = `Игрок 2 win`;
                        } else {
                            players.firstPlayer.wins += 1;
                            winText.text = `Игрок 1 win`;

                        }
                        updateText();

                        winText.visible = true;
                        box.interactive = true;

                        box.on('pointerdown', function restartBox(){                            
                            box.removeChild(gameContainer);
                            createPlayField(box,winText,deadHeatText);
                            box.off('pointerdown', restartBox);
                        });

                    } else if(checkDeadHeat()){
                        end = true;
                        deadHeatText.visible = true;
                        box.interactive = true;

                        box.on('pointerdown', function restartBox(){
                            box.removeChild(gameContainer);
                            createPlayField(box,winText,deadHeatText);
                            box.off('pointerdown', restartBox);
                        });


                    }
                    
                }
                // console.log(arr);
                
            });
        }

    }
}

function updateText(){
    const progressFirst = playersProggres[players.firstPlayer.picture];
    const progressSecond = playersProggres[players.secondPlayer.picture];
    const progressGeneral = Math.max(progressFirst,progressSecond);

    generalProgress.text = `общие:  ${progressGeneral}`;
    progressPlayer1.text = `игрок 1: ${progressFirst}`;
    progressPlayer2.text = `игрок 2: ${progressSecond}`;

    if(pictureNow === players.firstPlayer.picture ) {
        activePlayer.text = `ход: игрок 1 - ${players.firstPlayer.picture}`;
    } else {
        activePlayer.text = `ход: игрок 2 - ${players.secondPlayer.picture}`;

    }
        console.log('update');
    winsPlayer1.text = `игрок 1: ${players.firstPlayer.wins}`;
    winsPlayer2.text = `игрок 2: ${players.secondPlayer.wins}`;

}


function drawCross(box){
    const cross = new Graphics();
    cross.lineStyle(6);
    cross.moveTo(0,0);
    cross.lineTo(100,100);
    cross.moveTo(100,0);
    cross.lineTo(0,100);
    box.addChild(cross);
}
function drawZero(box){
    const zero = new Graphics();
    zero.lineStyle(6);
    zero.drawCircle(50,50,44);

    box.addChild(zero);
}



function checkWin(){

    for(let i=0; i<3; i++){

            if((arr[i][0] === arr[i][1] && arr[i][1] === arr[i][2]) && arr[i][0] !== undefined ){
                return true;
            }          
        
    }
    for(let j=0; j<3; j++){

        if((arr[0][j] === arr[1][j] && arr[1][j] === arr[2][j]) && arr[0][j] !== undefined ){
            return true;
        }          
    
}
    if (arr[0][0] === arr[1][1] && arr[1][1] === arr[2][2]  && arr[0][0] !== undefined){
        return true;
    }
    if (arr[0][2] === arr[1][1] && arr[1][1] === arr[2][0]  && arr[1][1] !== undefined){
        return true;
    }
    return false;
}

function checkDeadHeat(){
    if(playersProggres.zero ===5 || playersProggres.cross === 5){
        return true;
    }
    return false;
}