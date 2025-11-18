import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth-service';
import { RouterLink } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoadingModal } from '../../components/loading-modal/loading-modal';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatDialogModule,   // 👈 NECESSÁRIO
    LoadingModal       // 👈 Para funcionar como standalone component dentro do dialog
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(12)]]
  });

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const modalRef = this.dialog.open(LoadingModal, {
      disableClose: true,
      panelClass: 'custom-dialog'
    });

    this.auth.login(this.form.value).subscribe({
      next: (res) => {
        modalRef.close();
        this.auth.saveSession(res);
        this.router.navigate(['/envios']);
      },
      error: () => {
        modalRef.close();
        alert("Email ou senha inválidos!");
      }
    });
  }
}