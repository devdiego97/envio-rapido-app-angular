export interface IFreteDTO {
  valorPac: number;
  prazoPac: string;
  valorSedex: number;
  prazoSedex: string;
}

export interface IEnvioDTO {
  id: number;
  nomeRemetente: string;
  endereco: string;
  largura:number,
  peso:number,
  altura:number,
  comprimento:number,
  cepOrigem: string;
  cepDestino: string;
  frete: IFreteDTO;
  mensagem: string;
}


export interface INovoEnvio{
   cepOrigem:string,
    cepDestino:string,
    peso:number,
    altura:number,
    largura:number,
    comprimento:number,
    usuarioId:number
    
}
