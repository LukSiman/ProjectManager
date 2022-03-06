import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomValidators {

    // check if the name is not only whitespace
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

    // check if the file is of a correct file type
    static correctFileType(control: AbstractControl): ValidationErrors | null {
        // check if input has been touched
        if (control.touched) {
            let name = control.value;
            let extension: string = name.substring(name.lastIndexOf('.') + 1);
            // extension is valid, return null
            if (extension.toLowerCase() == 'png' ||
                extension.toLowerCase() == 'jpeg' ||
                extension.toLowerCase() == 'jpg'||
                name.length == 0) {
                return null;
            } else {
                // invalid, return error
                return { 'correctFileType': true };
            }
        }
        return null;
    }

    // check if end date is after start date
    static endDateAfterStartDate: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        const start = control.get('startDate')?.value;
        const end = control.get('endDate')?.value;

        // no end date is valid
        if (end == null || end.length === 0) {
            return null;
        }

        // check if end date is after start date
        if (start > end) {
            return { 'endDateAfterStartDate': true };
        } else {
            // valid, return null
            return null;
        }
    }
}