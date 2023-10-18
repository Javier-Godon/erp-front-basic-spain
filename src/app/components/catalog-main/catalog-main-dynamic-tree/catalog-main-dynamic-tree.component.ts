import { CollectionViewer, SelectionChange, DataSource } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { ConstantPool } from '@angular/compiler';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog'
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CatalogCategory } from 'src/app/model/catalog/catalog-category-model';
import { CategoryService } from 'src/app/service/catalog/category.service';


/** Flat node with expandable and level information */
export class DynamicFlatNode {
  constructor(public item: CatalogCategory,
    public level = 1, public expandable = false,
    public isLoading = false) { }
}

/**
 * Database for dynamic data. When expanding a node in the tree, the data source will need to fetch
 * the descendants data from the database.
 */
// @Injectable({ providedIn: 'root' })
// export class DynamicDatabase {

//   constructor(private categoryService: CategoryService) { };

//   message: string;
//   selectedCategory: any;
//   mainCategories: [];
//   childrenCategories: [];

//   dataMap = new Map<CatalogCategory, CatalogCategory[]>([
//     [new CatalogCategory('1', '1', '1'), [new CatalogCategory('2', '2', '2'), new CatalogCategory('3', '3', '3')]],
//     [new CatalogCategory('11', '11', '11'), [new CatalogCategory('22', '22', '22'), new CatalogCategory('33', '33', '33')]]
//   ]);

//   rootLevelNodes: CatalogCategory[] = [new CatalogCategory('1', '1', '1'), new CatalogCategory('11', '11', '11')];

//   /** Initial data from database */
//   initialData(): DynamicFlatNode[] {    
//     return this.mainCategories.map(category => new DynamicFlatNode(category, 0, true));
//   }

//   getChildren(node: CatalogCategory): CatalogCategory[] | undefined {
//     return this.dataMap.get(node);
//   }

//   isExpandable(node: CatalogCategory): boolean {
//     return this.dataMap.has(node);
//   }



// }
/**
 * File database, it can build a tree structured Json object from string.
 * Each node in Json object represents a file or a directory. For a file, it has filename and type.
 * For a directory, it has filename and children (a list of files or directories).
 * The input will be a json object string, and the output is a list of `FileNode` with nested
 * structure.
 */
// @Component({
//   template: ''
// })
export class DynamicDataSource implements DataSource<DynamicFlatNode> {

  dataChange = new BehaviorSubject<DynamicFlatNode[]>([]);
  startData: DynamicFlatNode[];

  get data(): DynamicFlatNode[] { return this.dataChange.value; }
  set data(value: DynamicFlatNode[]) {
    this._treeControl.dataNodes = value;
    this.dataChange.next(value);
  }

  constructor(private _treeControl: FlatTreeControl<DynamicFlatNode>, private categoryService: CategoryService) {
    this.getMainCategories();
  }

  message: string;
  selectedCategory: any;
  mainCategories: [];
  childrenCategories: [];

  connect(collectionViewer: CollectionViewer): Observable<DynamicFlatNode[]> {
    this._treeControl.expansionModel.changed.subscribe(change => {
      if ((change as SelectionChange<DynamicFlatNode>).added ||
        (change as SelectionChange<DynamicFlatNode>).removed) {
        this.handleTreeControl(change as SelectionChange<DynamicFlatNode>);
      }
    });

    return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
  }

  disconnect(collectionViewer: CollectionViewer): void { }

  /** Handle expand/collapse behaviors */
  handleTreeControl(change: SelectionChange<DynamicFlatNode>) {
    if (change.added) {
      change.added.forEach(node => this.toggleNode(node, true));
    }
    if (change.removed) {
      change.removed.slice().reverse().forEach(node => this.toggleNode(node, false));
    }


  }

  /**
   * Toggle the node, remove from display list
   */
  toggleNode(node: DynamicFlatNode, expand: boolean) {
    const children = this.getAllChildrenForACategory(node.item);
    const index = this.data.indexOf(node);
    if (!this.childrenCategories || index < 0) { // If no children, or cannot find the node, no op
      return;
    }

    node.isLoading = true;

    setTimeout(() => {
      if (expand) {
        const nodes = this.childrenCategories.map(name =>
          new DynamicFlatNode(name, node.level + 1, this.isExpandable(name)));
        this.data.splice(index + 1, 0, ...nodes);
      } else {
        let count = 0;
        for (let i = index + 1; i < this.data.length
          && this.data[i].level > node.level; i++, count++) { }
        this.data.splice(index + 1, count);
      }

      // notify the change
      this.dataChange.next(this.data);
      node.isLoading = false;
    }, 1000);
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
          console.log("main categories loaded in DynamicDataSource: " + this.mainCategories);
        } else {
          this.message = 'Upps some error loading main categories';
          console.log(this.message);
        }
      }
      );

  }

  getAllChildrenForACategory(selectedCategory: CatalogCategory) {
    console.log(selectedCategory);
    this.categoryService
      .getAllChildrenForACategory(selectedCategory.categoryId)
      .subscribe((response) => {
        if (response.status === 200) {
          this.childrenCategories = response.body;
          console.log(response.body);
          this.message = 'Children categories successfully loaded';
          console.log(this.message);
        } else {
          this.message = 'Upps some error loading children categories';
          console.log(this.message);
        }
      }
      );

  }

  isExpandable(node: CatalogCategory): boolean {
    this.getAllChildrenForACategory(node);
    if (this.childrenCategories.length != 0) {
      return true;
    }
    return false;
  }
    
       
    //return this.mainCategories.map(category => new DynamicFlatNode(category, 0, true));
  

  returnDinamicMain(): DynamicFlatNode[]{
    return this.mainCategories.map(category => new DynamicFlatNode(category, 0, true));
  }

  // ngOnInit() {
  //   //this.getMainCategories();
  // } 


}

@Component({
  selector: 'app-catalog-main-dynamic-tree',
  templateUrl: './catalog-main-dynamic-tree.component.html',
  styleUrls: ['./catalog-main-dynamic-tree.component.scss']
})
export class CatalogMainDynamicTreeComponent implements OnInit {

  constructor(private fb: FormBuilder, public dialog: MatDialog, private categoryService: CategoryService
    , private route: ActivatedRoute, private router: Router) {

    //  this.chargeData();
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource =  new DynamicDataSource(this.treeControl, this.categoryService);
    console.log("this.datasource: "+this.dataSource);
    this.getMainCategories();
    console.log("maincategories in CatalogMainDynamicTreeComponent: "+this.mainCategories);
    this.dataSource.data=this.mainCategories;
        
    // console.log("this.datasource: "+this.dataSource.data);
    // console.log("maincategories: "+this.maincategories);
    // //this.dataSource.data = database.initialData();
    // //To allow refreshing
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  message: string;
  selectedCategory: any;
  mainCategories: [];
  childrenCategories: [];

  //Tree management

  treeControl: FlatTreeControl<DynamicFlatNode>;

  dataSource: DynamicDataSource;

  getLevel = (node: DynamicFlatNode) => node.level;

  isExpandable = (node: DynamicFlatNode) => node.expandable;

  hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.expandable;

  getMainCategories() {
    this.categoryService
      .getAllMainCategories()
      .subscribe((response) => {
        if (response.status === 200) {
          this.mainCategories = response.body;
          console.log(response.body);
          this.message = 'Main categories successfully loaded';
          console.log(this.message);
          this.chargeData();
        } else {
          this.message = 'Upps some error loading main categories';
          console.log(this.message);
        }
      }
      );

  }

  getAllChildrenForACategory(selectedCategory: CatalogCategory) {
    console.log(selectedCategory);
    this.categoryService
      .getAllChildrenForACategory(selectedCategory.categoryId)
      .subscribe((response) => {
        if (response.status === 200) {
          this.childrenCategories = response.body;
          console.log(response.body);
          this.message = 'Children categories successfully loaded';
          console.log(this.message);
        } else {
          this.message = 'Upps some error loading children categories';
          console.log(this.message);
        }
      }
      );

  }

  ngOnInit() {
    // this.dataSource.initialData().then (
    //   (value)=>{this.dataSource.data=this.dataSource.startData;
    //   console.log("this.datasource initial data: "+this.dataSource.data);    
    //   console.log("this.datasource initial data main categories: "+this.dataSource.mainCategories);
    //   });
    //this.chargeData();
  }

  async chargeData() {
    this.treeControl = await new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = await new DynamicDataSource(this.treeControl, this.categoryService);
    //this.dataSource.data = await this.dataSource.initialData();
    console.log("this.datasource: " + this.dataSource.data);
    //this.dataSource.data = database.initialData();
  }

  dialogConfig(): MatDialogConfig {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = this.selectedCategory
    return dialogConfig;
  }

}
