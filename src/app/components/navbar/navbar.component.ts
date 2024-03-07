import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeResourceUrl } from '@angular/platform-browser';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CartService } from '../../cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  searchIcon: SafeResourceUrl;
  bagIcon: SafeResourceUrl;
  cartSize: number = 0;

  constructor(private sanitizer: DomSanitizer, public cartService: CartService) {
    this.searchIcon = this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/search-icon.png');
    this.bagIcon = this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/bag-icon.png');
  }


  ngOnInit(): void {
    // Subscribe to the cartSizeSubject and update cartSize
    this.cartService.cartSize$.subscribe((size: number) => {
      this.cartSize = size;
    });
  }
}
