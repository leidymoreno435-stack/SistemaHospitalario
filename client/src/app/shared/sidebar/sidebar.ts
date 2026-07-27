import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
//import { Pacient } from '../../model/pacient';
import { AuthService } from '../../core/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit, OnDestroy {
  @Input() collapsed = false;
  role: string | null = null;
  username: string | null = null;
  private sub?: Subscription;
isPacientesOpen = false;
isPersonalOpen = false;
isConsultasOpen = false;
isCirugiasOpen = false;
isFacturacionOpen = false;

togglePacientes() { this.isPacientesOpen = !this.isPacientesOpen; }
togglePersonal() { this.isPersonalOpen = !this.isPersonalOpen; }
toggleConsultas() { this.isConsultasOpen = !this.isConsultasOpen; }
toggleCirugias() { this.isCirugiasOpen = !this.isCirugiasOpen; }
toggleFacturacion() { this.isFacturacionOpen = !this.isFacturacionOpen; }



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

   hasRole(...allowed: string[]) {
     if (!this.role) return false;
     return allowed.map(r => r.toLowerCase()).includes(this.role);
   }

   isMedico() {
     return this.role === 'medico';
   }

   isEnfermero() {
     return this.role === 'enfermero';
   }

   isReceptionist() {
     return this.role === 'recepcionista';
   }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  onConsultasPaciente() {
    
  }

}
