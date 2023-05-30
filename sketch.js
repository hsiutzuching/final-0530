let points = [[0, 0],[5, -6], [5, -7], [6, -6], [4, -4], [4, 0], [6, 2], [8, 2], [9, 3], [9, 1], [8, 0], [8, -1], [10, -3], [10, -5], [9, -6], [9, -7], [7, -9], [6, -9], [5, -8], [4, -9], [0, -9], [-1, -8], [-2, -9], [-4, -9], [-3, -8], [-3, -5], [-4, -4],[-4,-1],[-3,0],[-5,0],[-8,3],[-8,4],[-5,4],[-3,6],[-3,8],[-1,6],[0,6],[0,8],[2,6],[2,2]];//狐狸
let flowers = [[0, -7], [0, -6], [-5, -5], [-6, -4], [-3, -3], [-1, -4], [0, -6], [0, -5], [3, -4], [4, -2], [2, -2], [1, -3], [0, -5], [0, -1], [1, 0], [3, 1], [4, 3], [4, 6], [3, 4], [0,7], [-3, 4], [-4, 6], [-4, 3], [-3, 1], [-1, 0], [0, -1]];//狐狸
let goast = [[0,4],[1,4],[3,3],[4,2],[5,1],[6,0],[5,0],[5,-1],[4,-1],[4,-2],[3,-2],[3,-3],[2,-3],[1,-4],[0,-3],[-1,-1],[-2,1],[-2,2],[-1,3]]

var fill_colors = "c5803-e2711d-ff9505-ffb627-f1dabf".split("-").map(a=>"#"+a)
var line_colors = "e6ccb2-ddb892-b08968-7f5539-9c6644".split("-").map(a=>"#"+a)
var flower_colors= "ffe5ec-ffc2d1-ffb3c6-ff8fab-fb6f92".split("-").map(a=>"#"+a)
//---------------設定畫point(狐狸)所有點的物件變數----------
var ball //目前要處理的物件，暫時放在 ball 變數內
var balls = [] // 把產生的"所有"物件，為物件的倉庫，所有的物件資料都在此

//---------------設定飛彈物件的定義-----------
var bullet //目前要處理的物件，暫時放在 bullet 變數內
var bullets = []

var score =0

//---------------設定怪物物件的定義-----------
var monster //目前要處理的物件，暫時放在 monster 變數內
var monsters = [] 

//---------------設定砲台的位置--------------
var shipP


function setup() {
  createCanvas(windowWidth, windowHeight);
  shipP= createVector(width/2,height/2)
  for(var i=0;i<15;i=i+1){// 
     ball= new Obj({}) // 產生一個新的obj class 元件
     balls.push(ball) //把ball的物件放入到陣列內
  }
  for(var i=0;i<6;i=i+1){// 
    monster= new Monster({}) // 產生一個新的monster class 元件
    monsters.push(monster) //把monster的物件放入到陣列內
 }
}

function draw() {
  background("#d3cdd7");
 
  if(keyIsPressed){
    if(key=="ArrowLeft" || key=="a"){//按下滑鼠的往左鍵
      shipP.x = shipP.x-2
    }
    if(key=="ArrowRight" || key=="d"){//按下滑鼠的往右鍵
      shipP.x = shipP.x+2
    }
    if(key=="ArrowUp" || key=="w"){//按下滑鼠的往上鍵
      shipP.y = shipP.y-2
    }
    if(key=="ArrowDown" || key=="s"){//按下滑鼠的往下鍵
      shipP.y = shipP.y+2
    }
  }
  
  // 狐狸顯示
  for(let ball of balls)//只要是陣列的方式，都可以利用此方式處理
  {
    ball.draw()
    ball.update()
    for(let bullet of bullets){
        if(ball.isBallInRanger(bullet.p.x,bullet.p.y)){
          balls.splice(balls.indexOf(ball),1)
          bullets.splice(bullets.indexOf(bullet),1)
          score = score+1

        
        }
    }
  }

  //飛彈顯示
  for(let bullet of bullets)//只要是陣列的方式，都可以利用此方式處理
  {
    bullet.draw()
    bullet.update()
  }

  //鬼顯示
  for(let monster of monsters)//只要是陣列的方式，都可以利用此方式處理
  {
    if(monster.get == true && monster.timenum>10){
      monsters.splice(monsters.indexOf(monster),1)
    }
    monster.draw()
    monster.update()
    for(let bullet of bullets){
      if(monster.isBallInRanger(bullet.p.x,bullet.p.y)){
        // // monsters.splice(monsters.indexOf(monster),1)
        bullets.splice(bullets.indexOf(bullet),1)
        score = score-2
        monster.get = true //鬼獲得花
        // elephant_sound.play()
        
      
      }
  }
  }
  

  textSize(50)
  text(score,50,50) //在座標為(50,50)上，顯示score分數內容
  push()
    let dx = mouseX - width/2 //設定中心隨滑鼠轉動
    let dy = mouseY - height/2 //設定中心隨滑鼠轉動
    let angle = atan2(dy,dx) //設定中心隨滑鼠轉動
    translate(shipP.x,shipP.y) //設定中心隨滑鼠轉動
    // fill("#9a8c98")
    noStroke()
    rotate(angle) //設定中心隨滑鼠轉動
    triangle(-15,15,-15,-15,30,0)
    fill("#bcb8b1")
    ellipse(0,0,90)
    fill("#d3d3d3")
    ellipse(13,27,10)
    ellipse(32,2,15)
    ellipse(20,-28,18)
   
    
    
  pop()
}

//------------------------加入滑鼠按下增加新物件
function mousePressed(){
  // ball= new Obj({
  //   p:{x:mouseX,y:mouseY}
  // }) // 在滑鼠按下的地方，產生一個新的obj class 元件
  // balls.push(ball) //把ball的物件放入到陣列內(丟到倉庫)

  //在物件上按下滑鼠，物件消失不見，分數加1
  // for(let ball of balls){ //檢查每一個物件
  //   if(ball.isBallInRanger()){
  //     balls.splice(balls.indexOf(ball),1) //<將物件資料刪除>從倉庫balls取出背滑鼠按到的物件編號(balls.indexOf(ball),1)，只取一個
  //     score=score+1
  //   }
  // }
//---------------按一下產生一個飛彈----------------------------
bullet = new Bullet({
  color:"#4f6d7a",
}) //在滑鼠按下的地方，產生一個新的 Bullet class元件(產生一個飛彈)
bullets.push(bullet) //把bullet的物件放入到bullets陣列內(丟到倉庫)
// bullet_sound.play()
}

function keyPressed(){
  if(key==" "){//按下空白鍵，發射花（與滑鼠按下的功能相同）
    bullet = new Bullet({
      color:"#4f6d7a",
    }) //在滑鼠按下的地方，產生一個新的 Bullet class元件(產生一個飛彈)
    bullets.push(bullet) //把bullet的物件放入到bullets陣列內(丟到倉庫)
    bullet_sound.play()
  }
}