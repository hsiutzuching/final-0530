class Obj{// 宣告一個類別，針對一個畫的圖案，
    constructor(args){//預設值，基本資料(物件的顏色，移動的速度，大小，初始顯示位置)
      // this.p = args.p || {x:random(width), y:random(height)}//該物件初始位置，產生亂數，螢幕視窗大小中隨意產生。||(or)當產生一個物件時，有傳給位置參數，則使用該參數，如果沒有
      this.p = args.p || createVector(random(width),random(height))
      // this.v = {x:random(-1,1),y:random(-1,1)}//物件移動的速度
      this.v = createVector(random(-1,1),random(-1,1)) //把原本的({X:...,Y:...}改成向量方式呈現
      this.size = random(5,10)//物件放大之倍率
      this.color = random(fill_colors) 
      this.stroke = random(line_colors)//物件框線顏色
    }
    //-----------------------------------------------------------------
  
    //------------------------------畫圖--------------------------------
    draw(){//畫出單一個物件形狀
      push()//執行push()的指令後，依照我的設定，設定原點(0，0)的位置
       translate(this.p.x,this.p.y)// 以該物件位置為原點
       scale(this.v.x<0?1:-1,-1)//前方條件成立 1 ，否則為-1 
       fill(this.color)
       stroke(this.stroke)
       strokeWeight(3)
       beginShape()
       for(var k=0;k<points.length;k=k+1){
        // vertex(points[k][0]*this.size,points[k][1]*this.size)//只要設定一個點，當指令到endShape()，會把所有的點串接再一起
        curveVertex(points[k][0]*this.size,points[k][1]*this.size)
       }
       endShape(CLOSE) 
      pop()//執行pop()，原點(0，0)的設定，回到視窗的左上角
    }
  //---------------------------物件碰到視窗周圍，改變方向------------------------
    update(){ //移動程式碼內容
    // this.p.x=this.p.x+this.v.x //改變新位置，X軸目前位置(this.p.x)加上X軸的移動速度
    // this.p.y=this.p.y+this.v.y //Y軸目前位置(this.p.y)加上Y軸的移動速度
    this.p.add(this.v) // 設定好向量後，使用add，就可以與上面兩行指令一樣的效果
    //向量用sub==>減號
  
    //知道滑鼠的位置，並建立滑鼠的向量
    // let mouseV = createVector(mouseX,mouseY) // 把滑鼠的位置轉換成一個向量值
    // let delta = mouseV.sub(this.p).limit(this.v.mag()*2)//sub計算出滑鼠所在位置的向量(mouseV)到物件向量(this.p)的距離，每次以3移動靠近
    // //this.v.mag() 代表該物件的速度大小(一個向量值有大小與方向)
    // this .p.add(delta)
  
    if(this.p.x<=0 || this.p.x>=width){ // X軸碰到左邊(<=0)，或是碰到右邊(>=width)
      this.v.x = -this.v.x //把速度方向改變
    }
    if(this.p.y<=0 || this.p.y>=height){ //Y軸碰到上邊(<=0)，或是碰到下邊(>=height)
      this.v.y = -this.v.y //把速度方向改變
    }
  } 
    isBallInRanger(x,y){ //功能:判斷滑鼠按下的位置是否在物件的範圍內
      let d = dist(x,y,this.p.x,this.p.y)  //計算兩點(滑鼠按下的點與物件中心點)之間的距離，放到d變數內
      if(d<10*this.size){//d<? 要依照自己畫的圖形的座標值大小判斷 ? 要填寫多少 
         return true //滑鼠與物件的距離小於物件的寬度，代表碰觸了，則傳回true的值(碰觸)
      } else{
         return false //滑鼠與物件的距離大於物件的寬度，代表沒有碰觸，則傳回false的值(未碰觸)
  }
  }
  }
  