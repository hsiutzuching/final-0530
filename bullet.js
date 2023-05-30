//定義一個bullet 物件的class
class Bullet{
    constructor(args){//預設值，基本資料(物件的顏色，移動的速度，大小，初始顯示位置)
        this.r = args.r || 10 //設計的飛彈有大有小時，就傳參數，args.r來設定飛彈大小，沒有傳參數，就以10為主
        this.p = args.p || shipP.copy() //createVector(width/2,height/2,mouseY-height/2) //建立一個向量{x:width/2,y:height/2}
        this.v = args.v || createVector(mouseX-width/2,mouseY-height/2).limit(5)
        this.size = random(2,4)
        this.color = random(flower_colors) 
    }
  draw(){ //繪出物件程式碼
    push()
       translate(this.p.x,this.p.y)
       scale(1,-1)
       fill(this.color)
       noStroke()
       beginShape()
       for(var k=0;k<flowers.length;k=k+1){
        curveVertex(flowers[k][0]*this.size,flowers[k][1]*this.size)
       }
       endShape() 
       
       
    pop()
  
  }
  update(){ //計算出移動後的位置
     this.p.add(this.v)
  }
}