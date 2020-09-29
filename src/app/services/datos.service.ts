import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import Swal from 'sweetalert2';
import { productos } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class DatosService {
  datos: any[] = [];
  persona:any[]=[];
  activo: any = {};
  prod:productos={};

  constructor(private http: HttpClient) { }

//Obtener respuesta de la API
getAll() {
  return new Promise((resolve, rejec) => {
  this.http.get(environment.url+'Productos').subscribe(response => {
    const datos = response;
    this.persona = Object.values(this.datos)
    resolve();
  });
  });
}


  AddProducto(prod:any){
    console.log(prod);
    return new Promise((resolve, rejec) => {
      this.http.post(environment.url+'AddProducto',prod).subscribe(response => {  
        console.log(response['id']);
        // this.persona.push(response);
        resolve();
      });
      });
  }

  update(id:number,dat:any){
    console.log(dat);
    return new Promise((resolve, rejec) => {
      this.http.put(environment.url+'UpdateProdcuto/' + id, dat).subscribe(response => {  
        console.log(response);
        Swal.fire(
          response['Mensaje'],
          'Éxito!',
          'success'
        )
        resolve();
      });
      });
  }

  eliminar (id:number){
    return new Promise((resolve, rejec) => {
      this.http.delete(environment.url+'delete/'+id).subscribe(response => {  
        console.log(response);
        resolve();
      });
      });
  }
}
  
