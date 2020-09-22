import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DatosService } from '../../services/datos.service';

@Component({
  selector: 'app-home-persona',
  templateUrl: './home-persona.component.html',
  styleUrls: ['./home-persona.component.css']
})
export class HomePersonaComponent implements OnInit {
  forma: FormGroup;
  submited = false;
  nombres:any[]=[];

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
      edad: [null, Validators.required],
      sexo: [null, Validators.required],
      file: [null, Validators.required],
    });
  }
  
  get nameRequired() { return this.forma.get('name').invalid; }
  get edadRequired() { return this.forma.get('edad').invalid; }
  get sexoRequired() { return this.forma.get('sexo').invalid; }
  get fileRequired() { return this.forma.get('file').invalid; }


  //Método para Guardar en el LocalStorage..
 save(){
   this.submited=true
  if (this.forma.valid === false) { // Verificamos si todos los campos estan llenos..
    Swal.fire('¡Atención!', 'Los campos son obligatorios', 'error');
    return;
  }
  else {
    this.submited = false;
    this.datos.persona.push(this.forma.value);
    localStorage.setItem('KeyPersona', JSON.stringify(this.datos.persona)); //Guardamos el registro..
    Swal.fire(
      'Agregado Correctamente!',
      'Éxito!',
      'success'
    )
    const obtener = localStorage.getItem('KeyPersona'); // Obtenemos el resgistro del LocalStorage..
      let datos= JSON.parse(obtener);
      console.log(datos);
      this.forma.reset();
      
  }
 }
}
