import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { enviroment } from '../../../environment/environment';
import { Observable, retry } from 'rxjs';
import { IEnvioDTO, INovoEnvio } from '../../interfaces/IEnvioDTO';
import { AuthService } from '../auth/auth-service';

@Injectable({
  providedIn: 'root',
})
export class EnvioService {
  private http = inject(HttpClient);
  private api = `${enviroment.apiURl}/envios`;
  private auth=inject(AuthService)

  getEnviosDoUsuario(): Observable<IEnvioDTO[]> {
    const userId=this.auth.getUserId()
    return this.http.get<IEnvioDTO[]>(`${this.api}/usuario/${userId}`);
  }

  criarEnvio(data: INovoEnvio) {
    const userId=this.auth.getUserId()
    const payload={
      
         cepOrigem:data.cepOrigem!,
        cepDestino: data.cepDestino!,
        peso: data.peso,
        altura: data.altura,
        largura: data.largura,
        comprimento: data.comprimento,
        usuarioId:userId
     
    }

    return this.http.post(`${this.api}`,payload);
}
getEnvioById(id: number): Observable<IEnvioDTO> {
   const envioId= this.http.get<IEnvioDTO>(`${this.api}/${id}`);
   console.log(envioId)
   return envioId
  
  }


updateEnvio(id: number, data: INovoEnvio) {
    return this.http.put(`${this.api}/${id}`, data);
  }


deletar(id: number) {
  return this.http.delete(`${this.api}/${id}`);
}


}
