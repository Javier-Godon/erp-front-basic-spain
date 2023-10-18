import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CatalogItemImage } from 'src/app/model/catalog/catalog-item-image-model';
import { CatalogCategory } from '../../../../model/catalog/catalog-category-model';
import { CatalogItemDescription } from '../../../../model/catalog/catalog-item-description-model';
import { CatalogItemRetailPrice } from '../../../../model/catalog/catalog-item-retail-price-model';
import { CatalogItem } from '../../../../model/catalog/catalog-item-model';
import { Person } from '../../../../model/person/person';
import { ItemService } from '../../../../service/catalog/item.service'
import { PersonListPickerComponent } from 'src/app/components/person/person-list-picker/person-list-picker.component';

@Component({
  selector: 'app-new-product-dialog',
  templateUrl: './new-product-dialog.component.html',
  styleUrls: ['./new-product-dialog.component.scss']
})
export class NewProductDialogComponent {

  constructor(private fb: FormBuilder, public dialog: MatDialog, private router: Router,
     @Inject(MAT_DIALOG_DATA) public data: any, private itemService: ItemService) { 
       this.selectedManufacturer = new Person('',true,'','','','','','','','','','','','','','','','',);
       this.catalogItem = new CatalogItem('','','','','');
     }

  selectedPerson: Person;
  selectedManufacturer: Person;
  catalogItem: CatalogItem;
  // catalogCategory = new CatalogCategory(null, null, null);
  // catalogItemImage = new CatalogItemImage(null, null, null);
  // catalogItemDescription = new CatalogItemDescription(null, null);
  // catalogItemRetailPrice = new CatalogItemRetailPrice(null, null, null);

  personForm = this.fb.group({
    isCompany: false,
    idCardNumber: null,
    nationalInsuranceNumber: null,
    taxRegistrationNumber: null,
    nameLine: null,
    firstName: null,
    middleName: null,
    lastName: null,
    organisationName: null,
    address: null,
    address2: null,
    city: null,
    phoneNumber: null,
    emailAddress: null,
    postalCode: null,
    shipping: null
  });


 productForm = this.fb.group({
    itemId: null,
    itemTitle: null,
    manufacturerId: null,
    manufacturerOriginalId: null    
  });  

  message: String;
  itemId: String;
  

  createItem() {
    console.log(this.catalogItem)
    this.itemService
      .newItem(this.catalogItem)
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Item successfully created';
          this.itemId=response.body;
          this.data.itemId=response.body;
          console.log(this.message + " with itemId: "+ this.itemId);
        } else {
          this.message = 'UUUps something went wrong';
          console.log(this.message);
        }
      }
      );
  }

  openEditManufacturerDialog(): void {
    const dialogRef = this.dialog.open(PersonListPickerComponent, {
      data: { person: this.selectedManufacturer }
    });   

    dialogRef.afterClosed().subscribe(result => {
      console.log('manufacturer selected: ' + result);
      this.selectedManufacturer = result;
      console.log('manufacturer selectedPerson: ' + this.selectedManufacturer);     
      this.catalogItem.manufacturerId = result.personId;
      this.catalogItem.manufacturerNameLine = result.nameLine;
      console.log('item: ' + this.catalogItem.manufacturerId);
      console.log('item: ' + this.catalogItem.manufacturerNameLine);
      //refresh page -->trick the Router into believing it's last link wasn't previously loaded
      this.router.navigated = false;
      // if you need to scroll back to top, here is the right place
      window.scrollTo(0, 0);
    });
  }

  
  
  onSubmit() {
    alert('Saved');
  }

}
