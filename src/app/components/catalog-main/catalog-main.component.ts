import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Injectable } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { BehaviorSubject } from 'rxjs';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog'
import { NewProductDialogComponent } from '../dialogs/catalog/new-product-dialog/new-product-dialog.component';
import { FormBuilder } from '@angular/forms';
import { NewCategoryComponent } from './dialogs/new-category/new-category.component';
import { CatalogCategory } from 'src/app/model/catalog/catalog-category-model';
import { CategoryService } from 'src/app/service/catalog/category.service';
import { ItemService } from 'src/app/service/catalog/item.service';
import { ItemCategorizedService } from 'src/app/service/catalog/item-categorized.service';
import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewSubCategoryComponent } from './dialogs/new-sub-category/new-sub-category.component';
import { CatalogItem } from 'src/app/model/catalog/catalog-item-model';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatRow, MatTableDataSource } from '@angular/material/table';
import { DeleteProductDialogComponent } from '../dialogs/catalog/delete-product-dialog/delete-product-dialog.component';
import { ProductDetailedCardDialogComponent } from '../dialogs/catalog/product-detailed-card-dialog/product-detailed-card-dialog.component';
import { CatalogItemDescription } from 'src/app/model/catalog/catalog-item-description-model';
import { CatalogItemCategorized } from 'src/app/model/catalog/catalog-item-categorized-model';


@Component({
  selector: 'app-catalog-main',
  templateUrl: './catalog-main.component.html',
  styleUrls: ['./catalog-main.component.scss'],
  template: `
  <mat-accordion>
  <mat-expansion-panel hideToggle class="whiteFont" *ngFor="let mainCategory of mainCategories">
    <mat-expansion-panel-header class="whiteFont">
      <mat-panel-title>
        {{mainCategory.categoryName}}
      </mat-panel-title>
      <mat-panel-description>
        <div class="spacer"></div>
        <button mat-button color="primary" (click)="openNewCategoryDialog()">           
        <mat-icon>add</mat-icon>
        Agregar subcategoría
      </button> 
      </mat-panel-description>
    </mat-expansion-panel-header>
    <a mat-list-item routerLink="person" class="whiteFontSubLevel">personas</a>
    <mat-action-row>
      <button mat-button color="primary" (click)="openNewSubCategoryDialog()">Next</button>
    </mat-action-row>
  </mat-expansion-panel>
</mat-accordion>
    `
})

export class CatalogMainComponent implements OnInit, AfterViewInit {

  message: string;
  selectedCategory: any;
  selectedItem: any;
  mainCategories: [];
  childrenCategories: [];
  hasChildren: boolean;
  parentsCategories: CatalogCategory[];
  parentsCategoriesString: string;
  itemsByCategory: CatalogItem[];
  //for items created
  itemId: string;

  //Table
  // CatalogItem-->itemTitle: string,manufacturerId: string,manufacturerOriginalId: string

  displayedColumns: string[] = ['item', 'manufacturer', 'manufacturerOriginalId', 'price', 'delete'];
  dataSource: MatTableDataSource<CatalogItem>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private fb: FormBuilder, public dialog: MatDialog, private categoryService: CategoryService
    , private itemService: ItemService, private itemCategorizedService: ItemCategorizedService,
    private route: ActivatedRoute, private router: Router,) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.hasChildren = true;
    this.dataSource = new MatTableDataSource(this.itemsByCategory);
  }

  openNewCategoryDialog(): void {
    const dialogRef = this.dialog.open(NewCategoryComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Ok');
      this.ngOnInit();
      //refresh page -->trick the Router into believing it's last link wasn't previously loaded
      this.router.navigated = false;
      // if you need to scroll back to top, here is the right place
      window.scrollTo(0, 0);
    });
  }


  openNewSubCategoryDialog(selectedCategory: CatalogCategory): void {
    this.selectedCategory = selectedCategory;
    console.log("selected category on dialog is: " + selectedCategory)
    const dialogRef = this.dialog.open(NewSubCategoryComponent, this.newSubCategoryDialogConfig());

    dialogRef.afterClosed().subscribe(result => {
      console.log('Ok');
      this.ngOnInit();
      //refresh page -->trick the Router into believing it's last link wasn't previously loaded
      this.router.navigated = false;
      // if you need to scroll back to top, here is the right place
      window.scrollTo(0, 0);
    });
  }

  openDeleteProductDialog(selectedRow: CatalogItem) {
    console.log("selected item to delete (row): " + selectedRow.itemId);
    this.selectedItem = selectedRow;
    const dialogRef = this.dialog.open(DeleteProductDialogComponent, this.deleteProductDialogConfig());

    dialogRef.afterClosed().subscribe(result => {
      console.log('Ok');
      this.ngOnInit();
      //refresh page -->trick the Router into believing it's last link wasn't previously loaded
      this.router.navigated = false;
      // if you need to scroll back to top, here is the right place
      window.scrollTo(0, 0);
    });
  }

  openCreateProductOnCategoryDialog() {
    const dialogRef = this.dialog.open(NewProductDialogComponent, this.createProductOnCategoryConfig());

    dialogRef.afterClosed().subscribe(data => {
      console.log('item created: ' + data.itemId);
      this.itemCategorizedService
        .newItemCategorized(new CatalogItemCategorized('', data.itemId, this.selectedCategory.categoryId))
        .subscribe((response) => {
          if (response.status === 200) {
            this.message = 'Item successfully categorized';
            console.log(this.message + " with itemId: " + this.itemId);
          } else {
            this.message = 'UUUps something went wrong';
            console.log(this.message);
          }
        }
        );
      this.ngOnInit();
      //refresh page -->trick the Router into believing it's last link wasn't previously loaded
      this.router.navigated = false;
      // if you need to scroll back to top, here is the right place
      window.scrollTo(0, 0);
    });
  }

  openProductDetailedCardDialog(selectedRow: CatalogItem) {
    console.log("selected item (row): " + selectedRow.itemId);
    this.selectedItem = selectedRow;
    const dialogRef = this.dialog.open(ProductDetailedCardDialogComponent, this.productDetailedCardConfig());

    dialogRef.afterClosed().subscribe(result => {
      console.log('item created with id: ' + result.itemId);
      this.ngOnInit();
      //refresh page -->trick the Router into believing it's last link wasn't previously loaded
      this.router.navigated = false;
      // if you need to scroll back to top, here is the right place
      window.scrollTo(0, 0);
    });
  }

  closeNewCategoryDialog(): void {

  }

  getMainCategories() {
    this.categoryService
      .getAllMainCategories()
      .subscribe((response) => {
        if (response.status === 200) {
          this.mainCategories = response.body;
          console.log(response.body);
          this.message = 'Main categories successfully loaded';
          console.log(this.message);
        } else {
          this.message = 'Upps some error loading main categories';
          console.log(this.message);
        }
      }
      );

  }

  getAllChildrenForACategory(selectedCategory: CatalogCategory) {
    this.selectedCategory = selectedCategory;
    console.log(selectedCategory);
    this.categoryService
      .getAllChildrenForACategory(selectedCategory.categoryId)
      .subscribe((response) => {
        if (response.status === 200) {
          this.childrenCategories = response.body;
          console.log(response.body);
          this.message = 'Children categories successfully loaded';
          console.log(this.message);
          if (this.childrenCategories.length == 0) {
            this.hasChildren = false;
            console.log("hasChildren==false")
            this.getAllItemsForACategory(selectedCategory);
          }
          else {
            this.hasChildren = true;
            console.log("hasChildren==true")
          }
          this.getAllParentsForACategory(selectedCategory);
        } else {
          this.message = 'Upps some error loading children categories';
          console.log(this.message);
        }
      }
      );

  }

  getAllParentsForACategory(selectedCategory: CatalogCategory) {
    console.log(selectedCategory);
    this.categoryService
      .getAllParentsForACategory(selectedCategory.categoryId)
      .subscribe((response) => {
        if (response.status === 200) {
          this.parentsCategories = response.body;
          console.log(response.body);
          this.message = 'Parents categories successfully loaded';
          console.log(this.message);
          this.parentsToString(selectedCategory);
        } else {
          this.message = 'Upps some error loading parents categories';
          console.log(this.message);
        }
      }
      );
  }

  parentsToString(selectedCategory: CatalogCategory) {
    this.parentsCategoriesString = "";
    if (this.parentsCategories.length > 0) {
      this.parentsCategoriesString = this.parentsCategories.slice(0).reverse().map(x => x.categoryName).join("->");
      this.parentsCategoriesString = this.parentsCategoriesString + "->" + selectedCategory.categoryName
    }
    console.log("parents list string: " + this.parentsCategoriesString);
  }

  getAllItemsForACategory(selectedCategory: CatalogCategory) {
    console.log(selectedCategory);
    this.itemService
      .getAllItemsByCategory(selectedCategory.categoryId)
      .subscribe((response) => {
        if (response.status === 200) {
          this.itemsByCategory = response.body;
          this.dataSource = new MatTableDataSource(this.itemsByCategory);
          console.log(response.body);
          this.message = 'Items for category ' + selectedCategory.categoryName +
            'successfully loaded';
          console.log(this.message);
        } else {
          this.message = 'Upps some error loading Itemf for category ' + selectedCategory.categoryName;
          console.log(this.message);
        }
      }
      );
  }

  ngOnInit() {
    this.getMainCategories();
  }

  deleteProductDialogConfig(): MatDialogConfig {
    const dialogConfig = new MatDialogConfig();
    this.dialogConfig(dialogConfig);
    dialogConfig.data = this.selectedItem;
    return dialogConfig;

  }

  newSubCategoryDialogConfig(): MatDialogConfig {
    const dialogConfig = new MatDialogConfig();
    this.dialogConfig(dialogConfig);
    dialogConfig.data = this.selectedCategory;
    return dialogConfig;

  }

  createProductOnCategoryConfig(): MatDialogConfig {
    const dialogConfig = new MatDialogConfig();
    this.dialogConfig(dialogConfig);
    dialogConfig.data = { category: this.selectedCategory, itemId: this.itemId };
    return dialogConfig;

  }

  productDetailedCardConfig(): MatDialogConfig {
    const dialogConfig = new MatDialogConfig();
    this.dialogConfig(dialogConfig);
    dialogConfig.disableClose = false;
    dialogConfig.width = "70%";
    dialogConfig.height = "90%";
    dialogConfig.data = this.selectedItem;
    return dialogConfig;

  }

  dialogConfig(dialogConfig: MatDialogConfig) {
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}





