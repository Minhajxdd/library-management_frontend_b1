import { AbstractControl, ValidationErrors } from '@angular/forms';

export function imageFileValidator(
  control: AbstractControl
): ValidationErrors | null {
  const file = control.value;
  if (!file) {
    return null;
  }
  if (!(file instanceof File)) {
    return { invalidFile: true };
  }
  if (!file.type.startsWith('image/')) {
    return { invalidImageType: true };
  }
  return null;
}
