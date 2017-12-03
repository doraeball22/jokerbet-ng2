import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';
// import { HttpClientModule }    from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { ROUTES } from './app.routes';

// ng2-materialize
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterializeModule } from 'ng2-materialize';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './header/header.component';

/** Jokerbet spinwheel component and service**/
import { PromotionComponent } from './promotion/promotion.component';
import { SpinwheelComponent } from './promotion/spinwheel/spinwheel.component';
import { SpinwheelService } from './promotion/spinwheel/shared/spinwheel.service';
import { CouponSpinwheelFormComponent } from './promotion/spinwheel/coupon-spinwheel-form/coupon-spinwheel-form.component';
/** END Jokerbet spinwheel component and service**/

/** Admin Jokerbet component and service**/
import { AdminComponent } from './admin/admin.component';
import { CouponComponent } from './admin/admin-promotion/coupon/coupon.component';
import { CouponService } from './admin/admin-promotion/coupon/shared/coupon.service';
import { AdminPromotionComponent } from './admin/admin-promotion/admin-promotion.component';
import { CouponFormComponent } from './admin/admin-promotion/coupon/coupon-form/coupon-form.component';
import { SpinwheelResultComponent } from './admin/admin-promotion/spinwheel/spinwheel-result/spinwheel-result.component';
import { AdminSpinwheelService } from './admin/admin-promotion/spinwheel/shared/admin-spinwheel.service';
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



@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    SpinwheelComponent,
    CouponSpinwheelFormComponent,
    PromotionComponent,
    AdminComponent,
    CouponComponent,
    AdminPromotionComponent,
    CouponFormComponent,
    // auth
    SignInComponent,
    SignUpComponent,
    AuthFormComponent,
    FlashMessageComponent,
    HeaderComponent,
    SpinwheelResultComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    // HttpClientModule,
    RouterModule.forRoot(ROUTES),
    BrowserAnimationsModule,
    MaterializeModule.forRoot()
  ],
  providers: [
    AuthService,
    AuthHttpService,
    AuthGuard,
    FlashMessageService,
    SpinwheelService,
    CouponService,
    AdminSpinwheelService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
