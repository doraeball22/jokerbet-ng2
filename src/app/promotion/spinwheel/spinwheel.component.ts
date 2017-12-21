import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';

import { SpinwheelService } from './shared/spinwheel.service';

declare var Spin2WinWheel: any; 
declare var TweenMax: any; 

@Component({
  selector: 'app-spinwheel',
  templateUrl: './spinwheel.component.html',
  styleUrls: ['./spinwheel.component.css']
})
export class SpinwheelComponent implements OnInit {

  private wheelData = {
    "colorArray":[ "#364C62", "#F1C40F", "#E67E22", "#E74C3C", "#673AB7", "#95A5A6", "#16A085", "#27AE60", "#2980B9", "#8E44AD", "#2C3E50", "#F39C12", "#D35400", "#C0392B", "#BDC3C7","#1ABC9C", "#2ECC71", "#E87AC2", "#3498DB", "#9B59B6", "#7F8C8D"],
    
    "segmentValuesArray" : [
      {"probability":0, "type": "image", "value": "../../../assets/spinwheel/img/motorcycle.png", "win": true, "resultText": "คุณได้รับมอเตอร์ไซต์", "userData": {"score":0, "prize":"มอเตอร์ไซค์"}},
      {"probability":5, "type": "string", "value": "฿10", "win": true, "resultText": "คุณได้รับเครดิต 10 บาท", "userData": {"score":20, "prize":"เครดิต 10 บาท"}},
      {"probability":0, "type": "image", "value": "../../../assets/spinwheel/img/iphone-8.png", "win": true, "resultText": "คุณได้รับ iPhone", "userData": {"score":0.01, "prize":"iPhone"}},
      {"probability":30, "type": "string", "value": "โชคไม่ดี", "win": false, "resultText": "โชคไม่ดีเลย!!", "userData": {"score":-1, "prize":"โชคไม่ดี"}},
      {"probability":0, "type": "image", "value": "../../../assets/spinwheel/img/gold-necklace.png", "win": true, "resultText": "คุณได้รับทองคำ 25 สตางค์", "userData": {"score":0.02, "prize":"ทองคำ 25 สตางค์"}},
      {"probability":3, "type": "string", "value": "฿50", "win": true, "resultText": "คุณได้รับเครดิต 50 บาท", "userData": {"score":10, "prize":"เครดิต 50 บาท"}},
      {"probability":30, "type": "string", "value": "โชคไม่ดี", "win": false, "resultText": "โชคไม่ดีเลย!!", "userData": {"score":-1, "prize":"โชคไม่ดี"}},     
      {"probability":0, "type": "image", "value": "../../../assets/spinwheel/img/ticket-movie.png", "win": true, "resultText": "คุณได้รับตั๋วหนัง", "userData": {"score":4, "prize":"ตั๋วหนัง"}},
      {"probability":1, "type": "string", "value": "฿100", "win": true, "resultText": "คุณได้รับเครดิต 100 บาท", "userData": {"score":4, "prize":"เครดิต 100 บาท"}},
      {"probability":0, "type": "image", "value": "../../../assets/spinwheel/img/ticket-tour.png", "win": true, "resultText": "แพคเกจทัวร์เกาหลี 2 ที่นั่ง", "userData": {"score":0.2, "prize":"แพคเกจทัวร์เกาหลี 2 ที่นั่ง"}},
      {"probability":1, "type": "string", "value": "฿200", "win": true, "resultText": "คุณได้รับเครดิต 200 บาท", "userData": {"score":1.95, "prize":"เครดิต 200 บาท"}},
      {"probability":30, "type": "string", "value": "โชคไม่ดี", "win": false, "resultText": "โชคไม่ดีเลย!!", "userData": {"score":-1, "prize":"โชคไม่ดี"}}      
    ],
    
    "svgWidth": 1024,
    "svgHeight": 768,
    "wheelStrokeColor": "#D0BD0C",
    "wheelStrokeWidth": 18,
    "wheelSize": 700,
    "wheelTextOffsetY": 80,
    "wheelTextColor": "#EDEDED",  
    "wheelTextSize": "2.3em",
    "wheelImageOffsetY": 40,
    "wheelImageSize": 110,
    "centerCircleSize": 360,
    "centerCircleStrokeColor": "#F1DC15",
    "centerCircleStrokeWidth": 12,
    "centerCircleFillColor": "#EDEDED",
    "segmentStrokeColor": "#E2E2E2",
    "segmentStrokeWidth": 4,
    "centerX": 512,
    "centerY": 384,  
    "hasShadows": true,
    "numSpins": 1,
    "spinDestinationArray":[],
    "minSpinDuration":6,
    "gameOverText":"ขอบคุณที่ร่วมกิจกรรมกับเรา<br>กลับไปหน้าแรก <a href='/promotions/spinwheel'>เพื่อใส่คูปองใหม่!</a> :)",
    "invalidSpinText":"INVALID SPIN. PLEASE SPIN AGAIN.",
    "introText":"ใช้<span style='color:#F282A9;'> 1 </span>คูปอง",
    "hasSound":true,
    "gameId":"9a0232ec06bc431114e2a7f3aea03bbe2164f1aa",
    "clickToSpin":true
    }


    constructor(private spinwheelService: SpinwheelService,
                private route: ActivatedRoute,
                private location: Location){
    }
        
    ngOnInit() {
    //if you want to spin it using your own button, then create a reference and pass it in as spinTrigger
    const mySpinBtn: any = document.querySelector('.spinBtn');
    //create a new instance of Spin2Win Wheel and pass in the vars object
    const myWheel  = new Spin2WinWheel();    
    //WITH your own button
     myWheel.init({data:this.wheelData, onResult:this.myResult, onGameEnd:this.myGameEnd, onError:this.myError, spinTrigger:mySpinBtn});      
    }

    self = this;
    //your own function to capture the spin results
    myResult = (e) => {
    //e is the result object
    // console.log('Spin Count: ' + e.spinCount + ' - ' + 'Win: ' + e.win + ' - ' + 'Message: ' +  e.msg);
    // if you have defined a userData object...
    if(e.userData){      
      // console.log('User defined score: ' + e.userData.score)
    }
    const sendSpinWheelResult = (spinResult) => {
      this.spinwheelService
      .createSpinwheelResult(spinResult);
    // console.log(spinResult);
    }

    let spinResult = {
      message: e.msg,
      prize: e.userData.prize,
      score: e.userData.score,
      win: e.win
    }

    // console.log(JSON.stringify(spinResult));
    sendSpinWheelResult(spinResult);


    // this.spinwheelService.createSpinWheelResult(this.spinResult)
    


  //if(e.spinCount == 3){
    //show the game progress when the spinCount is 3
    //console.log(e.target.getGameProgress());
    //restart it if you like
    //e.target.restart();
  //}  

}

//your own function to capture any errors
myError = (e) => {
  //e is error object
  console.log('Spin Count: ' + e.spinCount + ' - ' + 'Message: ' +  e.msg);
}

myGameEnd = (e) => {
  //e is gameResultsArray
  // console.log(e);
  TweenMax.delayedCall(5, function(){
    // this.location.reload();
  })
}

}


  // private wheelData = {
  //   "colorArray":[ "#364C62", "#F1C40F", "#E67E22", "#E74C3C", "#673AB7", "#95A5A6", "#16A085", "#27AE60", "#2980B9", "#8E44AD", "#2C3E50", "#F39C12", "#D35400", "#C0392B", "#BDC3C7","#1ABC9C", "#2ECC71", "#E87AC2", "#3498DB", "#9B59B6", "#7F8C8D"],
    
  //   "segmentValuesArray" : [
  //     {"probability":0, "type": "string", "value": "มอเตอร์ไซค์", "win": true, "resultText": "คุณได้รับมอเตอร์ไซต์", "userData": {"score":0, "prize":"มอเตอร์ไซค์"}},
  //     {"probability":20, "type": "string", "value": "฿10", "win": true, "resultText": "คุณได้รับเครดิต 10 บาท", "userData": {"score":20, "prize":"เครดิต 10 บาท"}},
  //     {"probability":0.01, "type": "string", "value": "iPhone", "win": true, "resultText": "คุณได้รับ iPhone", "userData": {"score":0.01, "prize":"iPhone"}},
  //     {"probability":20, "type": "string", "value": "โชคไม่ดี", "win": false, "resultText": "โชคไม่ดีเลย!!", "userData": {"score":-1, "prize":"โชคไม่ดี"}},
  //     {"probability":0.02, "type": "string", "value": "ทองคำ", "win": true, "resultText": "คุณได้รับทองคำ 25 สตางค์", "userData": {"score":0.02, "prize":"ทองคำ 25 สตางค์"}},
  //     {"probability":10, "type": "string", "value": "฿50", "win": true, "resultText": "คุณได้รับเครดิต 50 บาท", "userData": {"score":10, "prize":"เครดิต 50 บาท"}},
  //     {"probability":20, "type": "string", "value": "โชคไม่ดี", "win": false, "resultText": "โชคไม่ดีเลย!!", "userData": {"score":-1, "prize":"โชคไม่ดี"}},     
  //     {"probability":4, "type": "string", "value": "ตั๋วหนัง", "win": true, "resultText": "คุณได้รับตั๋วหนัง", "userData": {"score":4, "prize":"ตั๋วหนัง"}},
  //     {"probability":4, "type": "string", "value": "฿100", "win": true, "resultText": "คุณได้รับเครดิต 100 บาท", "userData": {"score":4, "prize":"เครดิต 100 บาท"}},
  //     {"probability":0.02, "type": "string", "value": "ทัวร์เกาหลี", "win": true, "resultText": "แพคเกจทัวร์เกาหลี 2 ที่นั่ง", "userData": {"score":0.2, "prize":"แพคเกจทัวร์เกาหลี 2 ที่นั่ง"}},
  //     {"probability":1.95, "type": "string", "value": "฿200", "win": true, "resultText": "คุณได้รับเครดิต 200 บาท", "userData": {"score":1.95, "prize":"เครดิต 200 บาท"}},
  //     {"probability":20, "type": "string", "value": "โชคไม่ดี", "win": false, "resultText": "โชคไม่ดีเลย!!", "userData": {"score":-1, "prize":"โชคไม่ดี"}}      
  //     // {"probability":5, "type": "image", "value": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/35984/tip_hex.svg", "win": false, "resultText": "A HEXAGON IS A LOSE", "userData": {"score":0}},
      
  //   ],
    
  //   "svgWidth": 1024,
  //   "svgHeight": 768,
  //   "wheelStrokeColor": "#D0BD0C",
  //   "wheelStrokeWidth": 18,
  //   "wheelSize": 700,
  //   "wheelTextOffsetY": 80,
  //   "wheelTextColor": "#EDEDED",  
  //   "wheelTextSize": "2.3em",
  //   "wheelImageOffsetY": 40,
  //   "wheelImageSize": 50,
  //   "centerCircleSize": 360,
  //   "centerCircleStrokeColor": "#F1DC15",
  //   "centerCircleStrokeWidth": 12,
  //   "centerCircleFillColor": "#EDEDED",
  //   "segmentStrokeColor": "#E2E2E2",
  //   "segmentStrokeWidth": 4,
  //   "centerX": 512,
  //   "centerY": 384,  
  //   "hasShadows": true,
  //   "numSpins": 1,
  //   "spinDestinationArray":[],
  //   "minSpinDuration":6,
  //   "gameOverText":"ขอบคุณที่ร่วมกิจกรรมกับเรา<br>กลับไปหน้าแรก <a href='/promotions/spinwheel'>เพื่อใส่คูปองใหม่!</a> :)",
  //   "invalidSpinText":"INVALID SPIN. PLEASE SPIN AGAIN.",
  //   "introText":"ใช้<span style='color:#F282A9;'> 1 </span>คูปอง",
  //   "hasSound":true,
  //   "gameId":"9a0232ec06bc431114e2a7f3aea03bbe2164f1aa",
  //   "clickToSpin":true
  //   }