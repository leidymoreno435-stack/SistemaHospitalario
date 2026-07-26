import { Component, Input } from '@angular/core';
import { Sidebar } from "../../shared/sidebar/sidebar";
import { Navbar } from "../../shared/navbar/navbar";
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [Sidebar, Navbar, RouterOutlet,CommonModule],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
 collapsed = false;
  sidebarOpen = true;

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

}
