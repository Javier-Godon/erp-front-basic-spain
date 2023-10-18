import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhotoUploadService } from '../../service/photo-upload.service';
import { CatalogItemImage } from '../../model/catalog/catalog-item-image-model'
import { ItemService } from 'src/app/service/catalog/item.service';
import { CatalogItem } from 'src/app/model/catalog/catalog-item-model';
import { Observable } from 'rxjs';
import { getLocaleTimeFormat } from '@angular/common';
import { getInterpolationArgsLength } from '@angular/compiler/src/render3/view/util';
import { CatalogItemRetailPrice } from 'src/app/model/catalog/catalog-item-retail-price-model';
import { CatalogItemDescription } from 'src/app/model/catalog/catalog-item-description-model';

@Component({
  selector: 'app-catalog-product',
  templateUrl: './catalog-product.component.html',
  styleUrls: ['./catalog-product.component.scss']
})
export class CatalogProductComponent implements OnInit {

  constructor(private fb: FormBuilder
    , private photoUploadService: PhotoUploadService
    , private itemService: ItemService) { }

  catalogItem = new CatalogItem('0', '0', '0', '0','0');
  catalogItemPrice = new CatalogItemRetailPrice('0', '0', 0);
  catalogItemDescription = new CatalogItemDescription('0', '0');
  itemId = '5872dc5a51a1d7c842f3b64875ed834ccfa38f63ecf3b454f448daed69c4eccf';
  CatalogItemImages: CatalogItemImage[]=[];

  catalogProductForm = this.fb.group({
    manufacturer_id: [null, Validators.required],
    name_line: [null, Validators.required],
    manufacturer_original_id: [null, Validators.required],
    item_title: [null, Validators.required],
    category_id: [null, Validators.required],
    category_name: null,
    retail_price: [null, Validators.required],
    currency_id: null,
    description: null,
    image: null
  });

  imageForm = this.fb.group({
    image: null
  });


  manufacturerIds = [
    { id: 'xxxxxxx' },
    { id: 'yyyyyyy' }
  ]

  nameLines = [
    { name: 'Huawey' },
    { name: 'Apple' }
  ]

  onSubmit() {
    this.upsertItemPrice ();
    this.upsertItemDescription();
  }

  getItem() {
    this.itemService.getItem('5872dc5a51a1d7c842f3b64875ed834ccfa38f63ecf3b454f448daed69c4eccf')
      .subscribe(data =>
        this.catalogItem = data);
  };

  getItemPrice() {
    this.itemService.getItemPrice('5872dc5a51a1d7c842f3b64875ed834ccfa38f63ecf3b454f448daed69c4eccf')
      .subscribe(data =>
        this.catalogItemPrice = data);
  }

  getItemDescription() {
    this.itemService.getItemDescription('5872dc5a51a1d7c842f3b64875ed834ccfa38f63ecf3b454f448daed69c4eccf')
      .subscribe(data =>
        this.catalogItemDescription = data);
  }

  getAllItemImages(){
    this.itemService.getAllItemImages('5872dc5a51a1d7c842f3b64875ed834ccfa38f63ecf3b454f448daed69c4eccf')
    .subscribe(data =>
      this.CatalogItemImages = data);
  }

  upsertItemDescription() {    
    if (this.catalogItemDescription.itemId == '0') {
      this.catalogItemDescription.itemId = this.itemId;
      this.itemService
      .newItemDescription(this.catalogItemDescription)
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Description successfully created';
          console.log(this.message);
        } else {
          this.message = 'Description not successfully created';
          console.log(this.message);
        }
      }
      );
    } else {
      this.itemService
      .updateItemDescription(this.catalogItemDescription)
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Description successfully updated';
          console.log(this.message);
        } else {
          this.message = 'Description not successfully created';
          console.log(this.message);
        }
      }
      );
    }
  }

  upsertItemPrice() {    
    if (this.catalogItemPrice.itemId == '0') {
      this.catalogItemPrice.itemId = this.itemId;
      this.itemService
      .newItemPrice(this.catalogItemPrice)
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Price successfully added';
          console.log(this.message);
        } else {
          this.message = 'Upps some error adding price';
          console.log(this.message);
        }
      }
      );
    } else {
      this.itemService
      .updateItemPrice(this.catalogItemPrice)
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Price successfully updated';
          console.log(this.message);
        } else {
          this.message = 'Upps some error updating price';
          console.log(this.message);
        }
      }
      );
    }
  }


  selectedFile: File;
  newItemImageModel: CatalogItemImage;
  message: String;

  onFileSelected(event: { target: { files: File[]; }; }) {
    this.selectedFile = <File>event.target.files[0];
    // this.imageForm.get('image').setValue(this.selectedFile);
  }

  onUploadFile() {
    const imageUploadData = new FormData();
    console.log(this.selectedFile);
    imageUploadData.append('image', this.selectedFile, this.selectedFile.name);
    imageUploadData.append('itemId', 'itemId');
    //this.newItemImageModel = new NewItemImage(this.selectedFile,'itemId');
    this.photoUploadService
      .sendNewImage(imageUploadData)
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Image uploaded successfully';
          console.log(this.message);
        } else {
          this.message = 'Image not uploaded successfully';
          console.log(this.message);
        }
      }
      );
  }

  ngOnInit() {
    this.getItem();
    this.getItemDescription();
    this.getItemPrice();
    this.catalogItem.itemId=this.itemId;
    // console.log(this.catalogItem);
  }


}
