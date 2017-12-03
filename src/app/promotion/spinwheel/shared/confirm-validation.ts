import {AbstractControl} from '@angular/forms';
export class ConfirmValidation {

    static MatchPassword(AC: AbstractControl) {
       let gameUsername = AC.get('gameUsername').value; // to get value in input tag
       let confirmGameUsername = AC.get('confirmGameUsername').value; // to get value in input tag
        if(gameUsername !== confirmGameUsername) {
            // console.log('false');
            AC.get('confirmGameUsername').setErrors( {MatchPassword: true} )
        } else {
            // console.log('true');
            return null
        }
    }
}

