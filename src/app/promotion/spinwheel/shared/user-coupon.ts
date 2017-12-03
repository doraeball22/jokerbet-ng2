export interface Coupon {
    _id: string;
    couponCode: string;
}

export interface UserCoupon {
    gameUsername: string;
    coupon: Coupon;
}

export interface ValidUserCoupon {
    valid: boolean;
    userCoupon: UserCoupon;
    validCouponToken: string;
}
