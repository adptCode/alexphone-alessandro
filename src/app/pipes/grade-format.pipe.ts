import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gradeFormat',
})
export class GradeFormatPipe implements PipeTransform {
  transform(value: string): string {
    const gradeMap: Record<string, string> = {
      excellent: 'Excelente',
      very_good: 'Muy Bueno',
      good: 'Bueno',
    };

    return gradeMap[value] || value;
  }
}
