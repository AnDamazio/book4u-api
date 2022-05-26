import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator/cjs';
import { cpf } from 'cpf-cnpj-validator';

@ValidatorConstraint({ name: 'isCpf', async: false })
export class IsCpf implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    return text.includes('.' || '-') ? false : cpf.isValid(text);
  }

  defaultMessage(args: ValidationArguments) {
    return 'cpf is not a valid cpf!';
  }
}
