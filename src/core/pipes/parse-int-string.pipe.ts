import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

export interface ParseIntStringPipeOptions {
  allowZero?: boolean;
  positiveOnly?: boolean;
  allowLeadingZeros?: boolean;
}

@Injectable()
export class ParseIntStringPipe implements PipeTransform<string, string> {
  constructor(private readonly options: ParseIntStringPipeOptions = {}) {}

  transform(value: string): string {
    const v = (value ?? '').trim();

    if (v.length === 0) {
      throw new BadRequestException('id must not be empty');
    }

    const allowLeadingZeros = this.options.allowLeadingZeros ?? false;
    const regex = allowLeadingZeros ? /^\d+$/ : /^(0|[1-9]\d*)$/;

    if (!regex.test(v)) {
      throw new BadRequestException('id must be an integer string');
    }

    try {
      const n = BigInt(v);
      const allowZero = this.options.allowZero ?? true;
      const positiveOnly = this.options.positiveOnly ?? true;

      if (!allowZero && n === 0n) {
        throw new BadRequestException('id must not be zero');
      }

      if (positiveOnly && n < 0n) {
        throw new BadRequestException('id must be positive');
      }
    } catch {
      throw new BadRequestException('id must be a valid integer string');
    }

    return v;
  }
}
