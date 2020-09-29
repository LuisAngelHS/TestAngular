import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DatosService } from '../../services/datos.service';
import { productos } from '../../services/interfaces';

@Component({
  selector: 'app-home-persona',
  templateUrl: './home-persona.component.html',
  styleUrls: ['./home-persona.component.css']
})
export class HomePersonaComponent implements OnInit {
  forma: FormGroup;
  submited = false;
  nombres:any[]=[];
  Update:any={};

  constructor(private fb: FormBuilder, public rout: Router, public datos:DatosService) {
    this.datos.getAll();
    
   }

  ngOnInit() {
    this.createF();
   
  }

  //Método para crear validaciones..
  createF() {
    this.forma = this.fb.group({
      name: [null, Validators.required],
      precio: [null, Validators.required],
    });
  }
  
  get nameRequired() { return this.forma.get('name').invalid; }
  get precioRequired() { return this.forma.get('precio').invalid; }


  //Método para Guardar en la bd..
 save(){
   this.submited=true
  if (this.forma.valid === false) { // Verificamos si todos los campos estan llenos..
    Swal.fire('¡Atención!', 'Los campos son obligatorios', 'error');
    return;
  }
  else {
    this.submited = false;
    this.datos.AddProducto(this.forma.value).then(succ=>{
      console.log(succ);
      this.datos.getAll();
    })
    Swal.fire(
      'Agregado Correctamente!',
      'Éxito!',
      'success'
    )
      this.forma.reset(); 
  }
 }

 //Obtiene la posición..
 update(item,i){
   console.log(item);
   this.Update= item;
   console.log(this.Update);
 }

 //Actulizar registro..
 actualizar(){
   console.log(this.Update.Producto);
   this.datos.update(this.Update.Producto,this.Update).then(succ=>{
     console.log(succ);
   })
   document.getElementById('editClose').click();
 }

 //Eliminar registro por medio del ID..
 eliminar(item,i){
  Swal.fire({
    title: 'Está seguro en eliminar?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Eliminar!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.datos.eliminar(item.Producto).then(succ=>{
        console.log(succ);
        this.datos.persona.splice(i,1);
      })
      Swal.fire(
        'Producto Eliminado!',
        'Éxito!'
      )
    }
  })

 }
}
