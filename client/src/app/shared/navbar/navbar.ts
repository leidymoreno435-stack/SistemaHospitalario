import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit, OnDestroy {
   role: string | null = null;
    username: string | null = null;
    private sub?: Subscription;
   @Output() toggle = new EventEmitter<void>();
   constructor(private auth: AuthService, private router: Router) {}
 ngOnInit(): void {
     this.sub = this.auth.user$.subscribe(user => {
       this.role = user?.rol ? String(user.rol).toLowerCase() : null;
       this.username = user?.username || null;
     });
   }

   ngOnDestroy(): void {
     this.sub?.unsubscribe();
   }
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  


}
