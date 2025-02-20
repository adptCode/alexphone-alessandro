import { Component, Input } from '@angular/core';
import { Sku } from '../../models/sku.model';
import { RouterLink } from '@angular/router';
import { GradeFormatPipe } from "../../pipes/grade-format.pipe";
import { CapitalizePipe } from "../../pipes/capitalize.pipe";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, GradeFormatPipe, CapitalizePipe, CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() product!: Sku;
}
