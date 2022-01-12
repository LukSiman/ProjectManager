import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomValidators {

    static notOnlyWhitespace(control: AbstractControl): ValidationErrors | null {
        // check if string contains only whitespace
        if ((control.value != null) && (control.value.trim().length === 0)) {
            // invalid, return error object
            return { 'notOnlyWhitespace': true };
        } else {
            // valid, return null
            return null;
        }
    }

    static endDateAfterStartDate: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        const start = control.get('startDate')?.value;
        const end = control.get('endDate')?.value;
        return start > end ? { endDateAfterStartDate: true } : null;
    }
}