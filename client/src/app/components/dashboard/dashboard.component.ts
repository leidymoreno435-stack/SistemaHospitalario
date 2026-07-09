import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  usuario: any = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    const userData = localStorage.getItem('usuario');
    if (userData) {
      this.usuario = JSON.parse(userData);
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
