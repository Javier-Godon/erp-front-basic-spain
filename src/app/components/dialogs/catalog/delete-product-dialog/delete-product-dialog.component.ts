import { Component, Inject, OnInit } from '@angular/core';
import { CatalogItem } from 'src/app/model/catalog/catalog-item-model';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-product-dialog',
  templateUrl: './delete-product-dialog.component.html',
  styleUrls: ['./delete-product-dialog.component.scss']
})
export class DeleteProductDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {selectedItem: CatalogItem}) { 
    this.catalogItem=data;
  }
  catalogItem : any;
  manufacturer : string;

  ngOnInit(): void {
  }

  deleteItem(catalogItem : CatalogItem){

  }

  cancelDeletion(){

  }

}
