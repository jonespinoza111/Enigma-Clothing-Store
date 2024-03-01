import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeResourceUrl } from '@angular/platform-browser';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  searchIcon: SafeResourceUrl;
  bagIcon: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.searchIcon = this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/search-icon.png');
    this.bagIcon = this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/bag-icon.png');
  }

}
