var monster_colors ="f7b267-f79d65-f4845f-f27059".split("-").map(a=>"#"+a)
class Monster{//宣告一個怪物類別，名稱為Monster
    constructor(args){//預設值，基本資料(物件的顏色，移動的速度，大小，初始顯示位置)
        this.r = args.r || random(45,130) //設計怪物的主體，如果傳參數args.r來設定怪物大小，沒有傳參數，就以100為主
        this.p = args.p || createVector(random(width),random(height)) //建立一個向量，由電腦亂數抽取顯示的初始位置
        this.v = args.v || createVector(random(-1,1),random(-1,1))//移動的速度，如果沒有傳參數args參數，就會利用亂數(-1~1之間)抽出X，Y軸的移動速度
        this.color = args.color || random(monster_colors)
        this.size = random(6,12)
        // this.mode = random(["happy","bad"])
        this.get = false // 代表沒得到花
        this.timenum = 0
    }
    draw(){//畫出元件
        if(this.get == false){
        push()//重新設定圓點位置
             translate(this.p.x,this.p.y)//將原點座標移動到物件中心
             scale(1,-1)
             fill(255)
             noStroke()
             beginShape()
             for(var k=0;k<goast.length;k=k+1){
             curveVertex(goast[k][0]*this.size,goast[k][1]*this.size)
             }
             endShape(CLOSE) 
        pop()//原點恢復到視窗左上角
        }
        else{//怪物獲得花畫面
            this.timenum=this.timenum+1
            push()
            translate(this.p.x,this.p.y)//將原點座標移動到物件中心
            scale(1,-1)
            // zoom() 
             fill(0)
             beginShape()
             for(var k=0;k<goast.length;k=k+1){
             curveVertex(goast[k][0]*this.size,goast[k][1]*this.size)
             }
             endShape(CLOSE) 
            //  noStroke()
            //  ellipse(0,0,this.r)
            //  stroke(255)
            //  line(-this.r/2,0,this.r/2,0)
            //  stroke(this.color)
             strokeWeight(4)
             noFill()
            //  for(var j=0;j<6;j++){//怪物6隻腳
            //     rotate(PI/3) //旋轉60度 180/3
            //     line(this.r/2,0,this.r,0)
            //  }
            pop()
    }
}

    update(){//計算出移動元件後的位置
        this.p.add(this.v)
        if(this.p.x<=0 || this.p.x>=width){ // X軸碰到左邊(<=0)，或是碰到右邊(>=width)
            this.v.x = -this.v.x //把速度方向改變
          }
          if(this.p.y<=0 || this.p.y>=height){ //Y軸碰到上邊(<=0)，或是碰到下邊(>=height)
            this.v.y = -this.v.y //把速度方向改變
          }

    }
    isBallInRanger(x,y){ //功能:判斷飛彈是否在怪物的範圍內
        let d = dist(x,y,this.p.x,this.p.y)  //計算兩點(滑鼠按下的點與物件中心點)之間的距離，放到d變數內
        if(d<10*this.r/2){//d<? 要依照自己畫的圖形的座標值大小判斷 ? 要填寫多少 
           return true //飛彈(x,y)與怪物的距離小於物件（怪物）的半徑，代表碰觸了，則傳回true的值(碰觸)
        } else{
           return false //飛彈（x,y）與物件的距離大於物件（怪物）的半徑，代表沒有碰觸，則傳回false的值(未碰觸)
    }
    }
}
