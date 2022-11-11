import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './Employee';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentsService {

  apiUrl='linkAqui'

  constructor(private http:HttpClient) { }

  GetEmployee(): Observable<Employee>{
    return this.http.get<Employee>(`${this.apiUrl}/getall`);
  }
}
