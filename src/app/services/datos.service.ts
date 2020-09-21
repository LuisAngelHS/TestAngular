import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatosService {
  datos: any[] = [];
  persona:any[]=[];
  activo: any = {};

  constructor(private http: HttpClient) { }

//Obtener respuesta de la API
  getAll() {
    return new Promise((resolve, rejec) => {
    this.http.get(environment.url+'/api/73eaf2d11fd458f9f2052a31c0fbf9b5').subscribe(response => {
      const datos = response['results'];
      this.datos=datos['0'];
      this.persona = Object.values(this.datos)
      resolve();
    });
    });
  }
}
