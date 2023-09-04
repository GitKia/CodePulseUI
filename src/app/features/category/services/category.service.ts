import { Injectable } from '@angular/core';
import { AddcategoryRequest } from '../Models/add-category-request.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Category } from '../Models/category.model';
import { environment } from 'src/environments/environment.development';
import { UpdateCategoryRequest } from '../Models/update-category-request.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  addCategory(model: AddcategoryRequest): Observable<void>{
    return this.http.post<void>(`${environment.apiBaseUrl}/api/categories`, model);
  }

  getAllCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(`${environment.apiBaseUrl}/api/categories`);
  }

  getCategoryById(id: string): Observable<Category>{
    return this.http.get<Category>(`${environment.apiBaseUrl}/api/categories/${id}`);
  }

  updateCategory(id: string, updateCategoryRequest: UpdateCategoryRequest) : 
  Observable<Category> {
    return this.http.put<Category>(`${environment.apiBaseUrl}/api/categories/${id}`, 
    updateCategoryRequest);

  }
}
