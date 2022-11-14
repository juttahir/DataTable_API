import { ListPaymentDTO } from '../app/payment.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, pluck, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

baseUrl = environment.baseUrl;
baseUrlAdmin = environment.baseUrlAdmin;

  constructor(private httpClient: HttpClient) { }

  getItemByEmailOrDocument(email: string): Observable<ListPaymentDTO> {
    return this.httpClient.get<ListPaymentDTO>(`${this.baseUrl}/find/${email}`);
  }

  getItemById(id: string): Observable<ListPaymentDTO> {
    return this.httpClient.get<ListPaymentDTO>(`${this.baseUrl}/find/${id}`);
  }

  getAll(): Observable<ListPaymentDTO[]> {
    return this.httpClient.get<ListPaymentDTO[]>(`${this.baseUrlAdmin}/getall`);
  }

  postItem(item: ListPaymentDTO): Observable<ListPaymentDTO> {
    return this.httpClient.post<ListPaymentDTO>(`${this.baseUrl}/insert`, item)
  }

  updateItem(item: ListPaymentDTO): Observable<ListPaymentDTO> {
    return this.httpClient.put<ListPaymentDTO>(`${this.baseUrlAdmin}/updatebyid`, item)
  }

  deleteItemById(id: any): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrlAdmin}/deletebyid/${id}`)
  }
  getByPagination(page: number, quantity: number){
    return this.httpClient
    .get<any>(`${this.baseUrlAdmin}/getbypagination?page=${page}&quantity=${quantity}`);
  }

  private ordenaPorCodigo(acaoA:ListPaymentDTO , acaoB:ListPaymentDTO){
    if(acaoA.id > acaoB.id){
      return 1;
    }
    if(acaoA.id < acaoB.id){
      return -1;
    }

    return 0;
  }

  getAllCount(): Observable<any>{
    return this.httpClient.get<any>(`${this.baseUrlAdmin}/getAllCount`)
  }

  search(term: string): Observable<Array<ListPaymentDTO>> {
    return this.httpClient.get<Array<ListPaymentDTO>>(`${this.baseUrlAdmin}/search?searchQuery=${term}`)
  }

}