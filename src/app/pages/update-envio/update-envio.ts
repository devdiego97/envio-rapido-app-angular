import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { INovoEnvio } from '../../interfaces/IEnvioDTO';
import { AuthService } from '../../services/auth/auth-service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EnvioService } from '../../services/envios/envio-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-envio',
  imports: [RouterLink,RouterLink,RouterLinkActive,FormsModule,ReactiveFormsModule],
  templateUrl: './update-envio.html',
  styleUrl: './update-envio.scss',
})
export class UpdateEnvio implements OnInit {
private fb = inject(FormBuilder);
  private envioService = inject(EnvioService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private snackbar = inject(MatSnackBar);

  envioId!: number;

  form = this.fb.group({
  cepOrigem: this.fb.control<string>('', { validators: [Validators.required, Validators.minLength(8)] }),
  cepDestino: this.fb.control<string>('', { validators: [Validators.required, Validators.minLength(8)] }),
  peso: this.fb.control<number | null>(null, { validators: [Validators.required, Validators.min(0.1)] }),
  altura: this.fb.control<number | null>(null, { validators: [Validators.required, Validators.min(1)] }),
  largura: this.fb.control<number | null>(null, { validators: [Validators.required, Validators.min(0.1)] }),
  comprimento: this.fb.control<number | null>(null, { validators: [Validators.required, Validators.min(0.1)] }),
});

  ngOnInit(): void {
    this.envioId = Number(this.route.snapshot.paramMap.get('id'));

    this.envioService.getEnvioById(this.envioId).subscribe(envio => {
      this.form.patchValue(envio); // Preenche automaticamente
      console.log(envio)
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const v = this.form.value;

    const payload: INovoEnvio = {
      cepOrigem: v.cepOrigem!.trim(),
      cepDestino: v.cepDestino!.trim(),
      peso: Number(v.peso),
      altura: Number(v.altura),
      largura: Number(v.largura),
      comprimento: Number(v.comprimento),
      usuarioId: 0 
    };

    this.envioService.updateEnvio(this.envioId, payload).subscribe({
      next: () => {
        this.snackbar.open('Envio atualizado com sucesso!', 'OK', { duration: 3000 });
        this.router.navigate(['/envios']);
      },
      error: () => {
        this.snackbar.open('Erro ao atualizar envio', 'Fechar', { duration: 3000 });
      }
    });
  }

}
