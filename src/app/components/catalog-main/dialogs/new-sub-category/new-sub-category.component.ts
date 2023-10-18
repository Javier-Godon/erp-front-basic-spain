import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CatalogCategory } from 'src/app/model/catalog/catalog-category-model';
import { CatalogLink } from 'src/app/model/catalog/catalog-link-model';
import { CategoryService } from 'src/app/service/catalog/category.service';
import { CategoryLinkService } from 'src/app/service/catalog/category-link.service';

@Component({
  selector: 'app-new-sub-category',
  templateUrl: './new-sub-category.component.html',
  styleUrls: ['./new-sub-category.component.scss']
})
export class NewSubCategoryComponent implements OnInit {

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public mainCatalogCategory: CatalogCategory
  , private categoryService: CategoryService, private categoryLinkService: CategoryLinkService) { }
  
  linkedCatalogCategory = new CatalogCategory('', '', '');
  catalogLink=new CatalogLink('','','');  
  message: String;

  subCategoryProductForm = this.fb.group({
    categoryName: [null, Validators.required],
    categoryDescription: null
  });  

  
  ngOnInit(): void {
  }

  onSubmit(){  
    this.categoryService
    .newCategory(this.linkedCatalogCategory)
      .subscribe((response) => {
        if (response.status === 200) {
          this.linkedCatalogCategory=response.body;
          this.catalogLink.linkedCategoryId=this.linkedCatalogCategory.categoryId;
          this.catalogLink.mainCategoryId=this.mainCatalogCategory.categoryId;
          this.message = 'Category successfully added';
          console.log(this.message);
          console.log(this.catalogLink);
          this.addLink();
        } else {
          this.message = 'Upps some error adding sub category';
          console.log(this.message);
        }
      }
      );

  
  }

  addLink(){
    console.log("link before call service: "+this.catalogLink);
    this.categoryLinkService    
    .newCategoryLink(this.catalogLink)
      .subscribe((response)=> {
        if (response.status === 200) {
          this.message = 'Sub Category successfully linked';
          console.log(this.message);
        } else {
          this.message = 'Upps some error linking subcategory';
          console.log(this.message);
        }
      })  
  }

}
