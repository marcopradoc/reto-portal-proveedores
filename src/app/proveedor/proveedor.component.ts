import { Component, OnInit} from '@angular/core';
import { ProveedorService } from 'src/app/proveedor/proveedor.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

export interface Proveedor {
  ruc: number;
  nombre: string;
  direccion: string;
  contacto: string;
}

const ELEMENT_DATA: Proveedor[] = [
  {ruc: 1, nombre: 'Hydrogen', direccion: 'xxxxxxxxxx', contacto: 'H'},
  {ruc: 2, nombre: 'Helium', direccion: 'xxxxxxxxxx', contacto: 'He'},
  {ruc: 3, nombre: 'Lithium', direccion: 'xxxxxxxxxx', contacto: 'Li'},
  {ruc: 4, nombre: 'Beryllium', direccion: 'xxxxxxxxxx', contacto: 'Be'},
  {ruc: 5, nombre: 'Boron', direccion: 'xxxxxxxxxx', contacto: 'B'},
  {ruc: 6, nombre: 'Carbon', direccion: 'xxxxxxxxxx', contacto: 'C'},
  {ruc: 7, nombre: 'Nitrogen', direccion: 'xxxxxxxxxx', contacto: 'N'},
  {ruc: 8, nombre: 'Oxygen', direccion: 'xxxxxxxxxx', contacto: 'O'},
  {ruc: 9, nombre: 'Fluorine', direccion: 'xxxxxxxxxx', contacto: 'F'},
  {ruc: 10, nombre: 'Neon', direccion: 'xxxxxxxxxx', contacto: 'Ne'},
];

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit {
  displayedColumns: string[] = ['ruc', 'nombre', 'direccion', 'contacto', 'partnership'];
  dataSource = ELEMENT_DATA;
  clickedRows = new Set<Proveedor>();
  proveedorForm: FormGroup;
  proveedorModel: ProveedorModel;

  constructor(private service: ProveedorService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.proveedorForm = this.formBuilder.group({
      ruc: [{ value: '', disabled: false }, [Validators.required]],
      nombre: [{ value: '', disabled: false }, [Validators.required]],
      direccion: [{ value: '', disabled: false }, [Validators.required]],
      contacto: [{ value: '', disabled: false }, [Validators.required]],
      partnership: [false, Validators.required]
    });

    this.loadProveedores();

    this.proveedorModel = new ProveedorModel();
  }

  loadProveedores(){
    this.service.getProveedorList().subscribe(data => {
      this.dataSource = data.result;
      //console.log(data.result);
    });
  }

  saveProveedor() {
    //alert('Prueba');
    if (this.proveedorForm.invalid) {
      alert('Por favor, ingrese todo los datos');
      return;
    }

    this.proveedorModel.ruc = this.proveedorForm.get('ruc').value;
    this.proveedorModel.nombre = this.proveedorForm.get('nombre').value;
    this.proveedorModel.direccion = this.proveedorForm.get('direccion').value;
    this.proveedorModel.contacto = this.proveedorForm.get('contacto').value;
    this.proveedorModel.partnership = this.proveedorForm.get('partnership').value ? 1 : 0;
    console.log(this.proveedorModel);

    this.addProveedor();
  }

  addProveedor(){
    this.service.addProveedor(this.proveedorModel)
        .subscribe((data) => {
          if (data.hasError) {
            alert(data.message);
          } else {
            alert('Proveedor creado');
            this.proveedorForm.reset();
            this.loadProveedores();
          }
        });
  }

  getCheckbox(checkbox: any){
    /*this.checked = []; // resetting each Time new event is fire.
    // filtering only checked vlaue and assign to checked variable.
    const checked = this.checkBox?.filter(checkbox => checkbox.checked);

    // then, we make object array of checked, and value by checked variable  
    checked?.forEach(data => {
      this.checked.push ({ 
        'checked' : data.checked,
        'value':  data.value
      });
    });*/
  }

}

export class ProveedorModel {
  public ruc: string;
  public nombre: string;
  public direccion: string;
  public contacto: string;
  public partnership: number;
}
