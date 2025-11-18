import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth-service';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoadingModal } from '../../components/loading-modal/loading-modal';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink,CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {

  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  form = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(12)]],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(12)]]
  });

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // ABRE O MODAL DE LOADING
    const modalRef = this.dialog.open(LoadingModal, {
      disableClose: true,     // impede fechar clicando fora
      panelClass: 'custom-dialog'
    });

    const payload = {
      nome:this.form.value.nome!.trim(),
      email: this.form.value.email!,
      senha: this.form.value.senha!
    };

    this.auth.register(payload).subscribe({
      next: (res) => {
        modalRef.close();  // fecha o modal
        this.auth.saveSession(res);
        this.router.navigate(['/envios']);  // redireciona
      },
      error: () => {
        modalRef.close();  // fecha o modal
        alert("Erro ao criar conta. Verifique seu email ou tente novamente.");
      }
    });
  }
}