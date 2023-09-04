import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, subscribeOn } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { Category } from '../Models/category.model';
import { UpdateCategoryRequest } from '../Models/update-category-request.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  id: string | null = null;
  paramsSubscription? : Subscription;
  editCategorySubscription? : Subscription;
  category?: Category;

  constructor(private route: ActivatedRoute,
    private categoryService : CategoryService,
    private router : Router){

  }
  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        if (this.id){
          this.categoryService.getCategoryById(this.id)
          .subscribe({
            next: (response) => {
              this.category = response;
            }
          })
        }
      }
    });
  }
  
  onFormSubmit(): void{
   const updateCategoryRequest: UpdateCategoryRequest = {
    name: this.category?.name ?? '',
    urlHandle: this.category?.urlHandle ?? ''
   };

   if(this.id){
     this.categoryService.updateCategory(this.id, updateCategoryRequest)
     .subscribe({
      next: (response) => {
        this.router.navigateByUrl('/admin/categories');
      }
     });
   }

  }

  onDelete(): void{
    if(this.id){
      this.categoryService.deteleCategory(this.id)
      .subscribe({
        next: Response => {
          this.router.navigateByUrl('/admin/categories');
        }
      })
    }
  }
  
  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editCategorySubscription?.unsubscribe();
  }



}
