import { Component, inject, OnInit } from '@angular/core';
import { envios } from '../../../data/envios';
import { IEnvio } from '../../../interfaces/IEnvio';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CardEnvio } from '../../components/card-envio/card-envio';
import {CommonModule, NgFor} from "@angular/common"
import { AuthService } from '../../services/auth/auth-service';
import { IEnvioDTO } from '../../interfaces/IEnvioDTO';
import { EnvioService } from '../../services/envios/envio-service';


@Component({
  selector: 'app-envios',
  imports: [RouterLink,RouterLinkActive,CardEnvio,CommonModule],
  templateUrl: './envios.html',
  styleUrl: './envios.scss',
})
export class Envios implements OnInit {
   enviosList:IEnvioDTO[]=[]!
 private envioService = inject(EnvioService);
  private auth = inject(AuthService);
  private router = inject(Router);

  userNome = this.auth.getUserNome();
  loading = true;

 ngOnInit() {
    this.carregarEnvios();
  }

  carregarEnvios() {
    this.envioService.getEnviosDoUsuario().subscribe({
      next: (res) => {
        console.log(res)
        this.enviosList = res;
      },
      error: (error) => {
        console.error("Erro ao carregar envios");
        console.log(error.error.errors)
      }
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
    deletarEnvio(id: number) {
      this.envioService.deletar(id).subscribe({
        next: () => {
          this.carregarEnvios();
          alert("Envio deletado com sucesso!");
        }
      });
}

atualizarEnvio(id: number) {
  this.router.navigate(['/editar-envio', id]);
}
}
