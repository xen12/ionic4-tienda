import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token:string;
  id_usuario:string;

  constructor() { }
}
