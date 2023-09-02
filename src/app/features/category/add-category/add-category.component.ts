import { Component, OnDestroy } from '@angular/core';
import { AddcategoryRequest } from '../Models/add-category-request.model';
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnDestroy{

  model: AddcategoryRequest;
  private addCategorySubscription?: Subscription;

  constructor(private categoriService: CategoryService) {
    this.model = {
      name: '',
      urlHandle: ''
    }
  }
  
  onFormSubmit(): void {
    this.addCategorySubscription = this.categoriService.addCategory(this.model)
    .subscribe({
      next: (response) => {
        console.log('This Was Successfull')
      }
    })
  }

    ngOnDestroy(): void {
      this.addCategorySubscription?.unsubscribe();
    }
  
}
