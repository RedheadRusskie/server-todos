import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseStringPipe implements PipeTransform<number, string> {
  transform(value: string | number) {
    if (typeof value === 'string') return value;

    if (typeof value !== 'string' && typeof value === 'number')
      return value.toString();

    throw new BadRequestException('ID value must be a string.');
  }
}
