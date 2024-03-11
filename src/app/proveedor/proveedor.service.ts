import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  readonly proveedorUrl = 'http://localhost:47283/api/proveedor/';

  constructor(private http: HttpClient) { }

  // Proveedor
  getProveedorList(): Observable<any> {
    return this.http.get<any>(this.proveedorUrl + 'GetAllProveedores');
  }

  addProveedor(proveedorModel: any): Observable<any> {
    return this.http.post<any>(this.proveedorUrl + 'AddProveedor', proveedorModel);
  }
}
