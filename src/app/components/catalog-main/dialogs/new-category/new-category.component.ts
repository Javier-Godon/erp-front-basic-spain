import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/service/catalog/category.service';
import { CatalogCategory } from 'src/app/model/catalog/catalog-category-model';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss']
})
export class NewCategoryComponent implements OnInit {

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, private categoryService: CategoryService) { }

  catalogCategory = new CatalogCategory('', '', '');
  message: String;

  categoryProductForm = this.fb.group({
    categoryName: [null, Validators.required],
    categoryDescription: null
  });  

  
  ngOnInit(): void {
  }

  onSubmit(){  
    this.categoryService
    .newCategory(this.catalogCategory)
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Category successfully added';
          console.log(this.message);
        } else {
          this.message = 'Upps some error adding price';
          console.log(this.message);
        }
      }
      );
  }

}
