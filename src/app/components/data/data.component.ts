import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,FormArray} from '@angular/forms';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent {
  forma:FormGroup;
  usuario:Object = {
    nombrecompleto: {
      nombre:"Rafael",
      apellido:"Manjarres"
    },
    correo:"rafael_skap@hotmail.com",
    //pasatiempos:["correr,dormir,comer"]
  }

  constructor() {
    console.log(this.usuario);

    this.forma = new FormGroup({

      'nombrecompleto': new FormGroup({
        'nombre': new FormControl('',   [
                                           Validators.required,
                                           Validators.minLength(3)
                                         ]),
        'apellido': new FormControl('', [
                                          Validators.required,
                                          this.noManjarres

                                        ])
      }),

        'correo': new FormControl('' ,   [Validators.required,
                                          Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")
                                        ]),
        'pasatiempos': new FormArray([
          new FormControl('correr', Validators.required)
        ]),
        'username': new FormControl('',Validators.required, this.existeUsuario),
        'password1': new FormControl('',Validators.required),
        'password2': new FormControl()
      })
      //this.forma.setValue( this.usuario );
      this.forma.controls['password2'].setValidators([
      Validators.required,
      this.noIgual.bind(this.forma)
    ])

    }
    noManjarres( control: FormControl ): { [s:string]:boolean} {

      if (control.value === "manjarres"){
        return {
          nomanjarres:true
        }
      }
        return null;
    }



   agregarPasatiempo(){
     (<FormArray>this.forma.controls['pasatiempos']).push(
       new FormControl(' ', Validators.required)
     )

   }


   noIgual( control: FormControl ): { [s:string]:boolean} {
     console.log(this);
     let forma:any = this;

     if (control.value !== forma.controls['password1'].value ){
       return {
         noIgual:true
       }
     }
     return null;
   }

   existeUsuario(control:FormControl): Promise<any>|Observable<any>{
    let promesa = new Promise(
    (resolve, reject)=>{
      setTimeout(()=>{
        if(control.value === "rafa"){
          resolve({existe:true})
        }else{
          resolve(null)
        }
      },3000)
    }
    )
    return promesa;
   }






   guardarCambios(){
     console.log(this.forma.value);
     console.log(this.forma);

     //this.forma.reset({
       //nombrecompleto:{
         //nombre:"",
         //apellido:""
       //},
       //correo:""
     //});

   }




}
