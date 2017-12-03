import { ValidatorFn, AbstractControl } from '@angular/forms';

export function confirmUsername(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        // const gameUsername = control.value;
        let gameUsername = control.get('gameUsername').value; // to get value in input tag
        let confirmGameUsername = control.get('confirmGameUsername').value; // to get value in input tag


        return gameUsername === confirmGameUsername ? {'confirmGameUsername': 'error miss match'} : null;
        // if(gameUsername !== confirmGameUsername) {
        //     console.log('false');
        //     return {confirmGameUsername: {gameUsername} };
        // } else {
        //     console.log('true');
        //     return null
        // }

        // return (gameUsername === confirmGameUsername ? 
        //         { confirmGameUsername: {gameUsername} } : null);
    }
}