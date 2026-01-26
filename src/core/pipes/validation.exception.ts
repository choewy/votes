import { BadRequestException } from '@nestjs/common';

import { ValidationError } from 'class-validator';

type ValidationDetail = {
  field: string;
  messages: string[];
};

function flattenValidationErrors(errors: ValidationError[], parentPath = ''): ValidationDetail[] {
  const result: ValidationDetail[] = [];

  for (const err of errors) {
    const path = parentPath ? `${parentPath}.${err.property}` : err.property;

    if (err.constraints) {
      result.push({
        field: path,
        messages: Object.values(err.constraints),
      });
    }

    if (err.children && err.children.length > 0) {
      result.push(...flattenValidationErrors(err.children, path));
    }
  }

  return result;
}

export class ValidationFailedException extends BadRequestException {
  constructor(errors: ValidationError[]) {
    super({
      code: 'VALIDATION_FAILED',
      message: 'Validation failed',
      details: flattenValidationErrors(errors),
    });
  }
}
