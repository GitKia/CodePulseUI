import { Injectable } from '@angular/core';
import { AddcategoryRequest } from '../Models/add-category-request.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  addCategory(model: AddcategoryRequest): Observable<void>{
    return this.http.post<void>('https://localhost:7270/api/categories', model);
  }


}
