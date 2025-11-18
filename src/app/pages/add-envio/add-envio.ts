
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { EnvioService } from '../../services/envios/envio-service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { INovoEnvio } from '../../interfaces/IEnvioDTO';
import { AuthService } from '../../services/auth/auth-service';


@Component({
  selector: 'app-add-envio',
  imports: [ReactiveFormsModule],
  templateUrl: './add-envio.html',
  styleUrl: './add-envio.scss',
})
export class AddEnvio {
  private auth=inject(AuthService)
   private fb = inject(FormBuilder);
  private envioService = inject(EnvioService);
  private router = inject(Router);
  private snackbar = inject(MatSnackBar);

form = this.fb.group({
  cepOrigem: ['', [Validators.required, Validators.minLength(8)]],
  cepDestino: ['', [Validators.required, Validators.minLength(8)]],
  peso: [null, [Validators.required, Validators.min(0.1)]],
  altura: [null, [Validators.required, Validators.min(1)]],
  largura: [null, [Validators.required, Validators.min(0.1)]],
  comprimento: [null, [Validators.required, Validators.min(0.1)]],
});


submit() {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

 const v = this.form.value;

const novoEnvio: INovoEnvio = {
  cepOrigem: v.cepOrigem!.trim(),
  cepDestino: v.cepDestino!.trim(),
  peso: Number(v.peso),
  altura: Number(v.altura),
  largura: Number(v.largura),
  comprimento: Number(v.comprimento),
  usuarioId: 0 
};

  this.envioService.criarEnvio(novoEnvio).subscribe({
  next: () => {
    alert("Envio criado com sucesso!");
    this.router.navigate(['/envios']);
  },
  error: (err) => {
    console.error(err);
    alert("Erro ao criar envio");
  }
});
}


  
}
