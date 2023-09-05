import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../models/blog-post.model';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/Models/category.model';
import { UpdateBlogPost } from '../models/update-blog-post.model';

@Component({
  selector: 'app-edit-blogpost',
  templateUrl: './edit-blogpost.component.html',
  styleUrls: ['./edit-blogpost.component.css']
})
export class EditBlogpostComponent implements OnInit, OnDestroy{
  
  id: string | null = null;
  model?: BlogPost;
  categories$?: Observable<Category[]>;
  selectedCategories?: string[];


  routeSubscription?: Subscription;
  updateBLogPostSubscription?: Subscription;
  getBLogPostSubscription?: Subscription;


  constructor(private route: ActivatedRoute, 
    private blogpostService : BlogPostService,
    private categoryServide : CategoryService,
    private router : Router)
     {

  }
  
  
  ngOnInit(): void {
    this.categories$ = this.categoryServide.getAllCategories();


   this.routeSubscription =  this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        // GET BlogPost From API
        if(this.id){
          this.getBLogPostSubscription = this.blogpostService.getBlogPostById(this.id).subscribe({
            next: (response) => {
              this.model = response;
              this.selectedCategories = response.categories.map(x => x.id);
            }
          });
          ;
        }
      }
    })
  }

  onFormSubmit(): void{
    if (this.model && this.id) {
      var updateBLogPost: UpdateBlogPost =  {
        author: this.model.author,
        content: this.model.content,
        shortDescription: this.model.shortDescription,
        featuredImageUrl: this.model.featuredImageUrl,
        isVisible: this.model.isVisible,
        publishedDate: this.model.publishedDate,
        title: this.model.title,
        urlHandle: this.model.urlHandle,
        categories: this.selectedCategories ?? []
      };

      this.updateBLogPostSubscription = this.blogpostService.updateBlogPost(this.id, updateBLogPost)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/blogposts')
        }
      });
    }

  }
  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.updateBLogPostSubscription?.unsubscribe();
    this.getBLogPostSubscription?.unsubscribe();
  }
}
