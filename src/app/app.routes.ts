import { Routes, CanActivate, ActivatedRoute } from '@angular/router';

// Other...
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

/** Jokerbet spinwheel component and service**/
import { SpinwheelComponent } from './promotion/spinwheel/spinwheel.component';
import { SpinwheelService } from './promotion/spinwheel/shared/spinwheel.service';
import { CouponSpinwheelFormComponent } from './promotion/spinwheel/coupon-spinwheel-form/coupon-spinwheel-form.component';
import { PromotionComponent } from './promotion/promotion.component';

/** END Jokerbet spinwheel component and service**/

/** Admin Jokerbet component and service**/
import { AdminComponent } from './admin/admin.component';
import { CouponComponent } from './admin/admin-promotion/coupon/coupon.component';
import { CouponService } from './admin/admin-promotion/coupon/shared/coupon.service';
import { AdminPromotionComponent } from './admin/admin-promotion/admin-promotion.component';
import { CouponFormComponent } from './admin/admin-promotion/coupon/coupon-form/coupon-form.component';
import { SpinwheelResultComponent } from './admin/admin-promotion/spinwheel/spinwheel-result/spinwheel-result.component';
/** END Admin Jokerbet component and service**/

/**
 * Auth
 */
import { AuthService } from './auth/shared/auth.service';
import { AuthHttpService } from './auth/shared/auth-http.service';
import { AuthGuard } from './auth/shared/auth.guard';
import { AuthFormComponent } from './auth/auth-form/auth-form.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { FlashMessageComponent } from './flash-message/flash-message.component';
import { FlashMessageService } from './flash-message/shared/flash-message.service';
import { HeaderComponent } from './header/header.component';



export const ROUTES: Routes = [
    { path: '', 
      component: CouponSpinwheelFormComponent
    },
    { path: 'promotions', 
      children: [
        {
          path: 'spinwheel', 
          component: CouponSpinwheelFormComponent
        }        
      ]
    },

    { path: 'admin',
      component: AdminComponent,
      canActivate: [AuthGuard],
      children: [
        {
          path: 'promotions',
          children: [
            {
              path: 'coupons/new', 
              component: CouponFormComponent,
              data: { formType: 'new' }
            },
            {
              path: 'spinwheel', 
              component: SpinwheelResultComponent
            }
          ]
        }     
     ]
    },


    {
      path: 'sign-in',
      component: SignInComponent
    },

    {
      path: 'sign-up',
      component: SignUpComponent
    },

    { path: '**', component: PageNotFoundComponent }
    
  ];