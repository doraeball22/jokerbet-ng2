export interface Coupon {
    _id: string;
    couponCode: string;
}

export interface Result {
    message: string;
    prize: string;
    score: number;
    win: boolean;
}

export interface UserSpinWheelResult {
    user: string;
    coupon: Coupon;
    result: Result;
    isProvidePrize: Boolean;
}

// {
//     "user":"User1",
//     "coupon":{
//        "_id":"5a12a115e9f9371dd0b6e4a6",
//        "couponCode":"jokerbet-vSAMzyZB-2017"
//     },
//     "result":{
//        "message":"โชคไม่ดีเลย!!",
//        "prize":"โชคไม่ดี",
//        "score":-1,
//        "win":false
//     }
//  }