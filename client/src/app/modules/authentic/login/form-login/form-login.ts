import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-form-login',
  imports: [],
  templateUrl: './form-login.html',
  styleUrl: './form-login.css',
})
export class FormLogin {
  constructor(private router: Router, private auth: AuthService) {}

    iniciarSesion(username: string, password: string) {
      const credentials = { username: (username || '').trim(), password: (password || '').trim() };
      if (!credentials.username || !credentials.password) {
        alert('Ingrese usuario y contraseña');
        return;
      }
      this.auth.login(credentials).subscribe(
        () => {
          console.log('Login OK');
          this.router.navigate(['/home']);
        },
        (err: any) => {
          console.error('Login fallido', err);
          alert('Login fallido');
        }
      );
    }
}
