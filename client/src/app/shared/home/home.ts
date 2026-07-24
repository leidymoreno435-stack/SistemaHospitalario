import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {
  username: string | null = null;
  role: string | null = null;
  private sub?: Subscription;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
     this.updateTime();
  setInterval(() => {
    this.updateTime();
  }, 1000);
    this.sub = this.auth.user$.subscribe(user => {
      this.username = user?.username || null;
      this.role = user?.rol ? String(user.rol).toLowerCase() : null;
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  isReceptionist(): boolean {
    return this.role === 'recepcionista';
  }

  currentDate: Date = new Date();
currentTime: string = '';


updateTime() {
  const now = new Date();
  this.currentDate = now;
  this.currentTime = now.toLocaleTimeString();
}

}
