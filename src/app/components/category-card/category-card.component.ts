import { Component, Input } from '@angular/core';
import { Category } from '../../models/category.model';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Collection } from '../../models/collection';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css'
})
export class CategoryCardComponent {
  @Input() category!: Category;
  @Input() collection!: Collection;
}
