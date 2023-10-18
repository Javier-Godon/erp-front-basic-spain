import { HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PersonListPickerComponent } from 'src/app/components/person/person-list-picker/person-list-picker.component';
import { CatalogItemDescription } from 'src/app/model/catalog/catalog-item-description-model';
import { CatalogItemImage } from 'src/app/model/catalog/catalog-item-image-model';
import { CatalogItem } from 'src/app/model/catalog/catalog-item-model';
import { CatalogItemRetailPrice } from 'src/app/model/catalog/catalog-item-retail-price-model';
import { Person } from 'src/app/model/person/person';
import { Currency } from 'src/app/model/currency/currency-model'
import { ItemService } from 'src/app/service/catalog/item.service';
import { PersonService } from 'src/app/service/person/person.service';
import { ItemRetailPriceService } from 'src/app/service/catalog/item-retail-price.service';
import { CurrencyService } from 'src/app/service/collections/currency.service';
import { PhotoUploadService } from 'src/app/service/photo-upload.service';
import { Price } from 'src/app/components/generic-components/input-price-component/price-model';
import { InputPriceContainerComponent } from 'src/app/components/generic-components/input-price-component/input-price-container/input-price-container.component';
import { stringify } from '@angular/compiler/src/util';
import { SwiperComponent } from "swiper/angular";
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/de';
// import Swiper core and required modules
import SwiperCore, { EffectCoverflow, Pagination } from "swiper";
import { Subscription } from 'rxjs';
import { Image } from 'src/app/model/image/image';
// install Swiper modules
SwiperCore.use([EffectCoverflow, Pagination]);

@Component({
  selector: 'app-product-detailed-card-dialog',
  templateUrl: './product-detailed-card-dialog.component.html',
  styleUrls: ['./product-detailed-card-dialog.component.scss']
})
export class ProductDetailedCardDialogComponent implements OnInit {

  constructor(private fb: FormBuilder, public dialog: MatDialog, private router: Router
    , private photoUploadService: PhotoUploadService
    , private itemService: ItemService, private personService: PersonService,
    private priceService: ItemRetailPriceService, private currencyService: CurrencyService,
    @Inject(MAT_DIALOG_DATA) public itemData: CatalogItem) {
    this.catalogItem = itemData;
    this.catalogItemPrice = new CatalogItemRetailPrice(itemData.itemId, '1', 0);
    this.catalogItemDescription = new CatalogItemDescription('', '');
    // this.inputPrice= new Price('EUR',0,0);
    // this.currency = new Currency('1','EUR');
    this.inputPrice = new Price('EUR', 0, 0);
    this.priceForm = this.fb.group({
      currency: new FormControl(this.inputPrice.currencyIso3),
      wholePrice: new FormControl(this.inputPrice.wholePrice),
      decimalPrice: new FormControl(this.inputPrice.decimalPrice),
    });
  }

  inputPrice: Price;
  inputCurrencies: string[];

  @ViewChild(InputPriceContainerComponent)
  private inputPriceContainerComponent!: InputPriceContainerComponent;

  catalogItem: CatalogItem;
  catalogItemPrice: CatalogItemRetailPrice;
  currency: Currency;
  currencies: Currency[];
  catalogItemDescription: CatalogItemDescription;
  //itemId:string;
  catalogItemImages: CatalogItemImage[];
  images: Image[] = [];
  selectedManufacturer: Person;

  selectedFile: File;
  newItemImageModel: CatalogItemImage;
  message: String;

  catalogProductForm = this.fb.group({
    manufacturerId: null,
    nameLine: null,
    manufacturerOriginalId: null,
    itemTitle: null,
    categoryId: null,
    categoryName: null,
    retailPrice: null,
    currencyPd: null,
    description: null,
    image: null
  });

  selectedCurrency: String = "EUR";

  currenciesControl = this.fb.group({
    currencyId: null,
    iso4217: null
  })

  imageForm = this.fb.group({
    image: null
  });

  priceForm: FormGroup;

  getItem() {
    this.itemService
      .getItem(this.catalogItem.itemId)
      .subscribe((response) => {
        if (response.status === 200) {
          this.catalogItem = response.body;
          console.log(response.body);
          this.message = 'Item successfully loaded';
          console.log(this.message);
        }
        else {
          this.message = 'Upps some error loading Item with itemId:' + this.catalogItem.itemId;
          console.log(this.message);
        }
      }
      );
  }

  getItemPrice() {

    this.priceService
      .getPrice(this.catalogItem.itemId)
      .subscribe((response) => {
        if (response.status === 200) {
          this.catalogItemPrice = response.body;
          console.log("catalogItemPrice received: " + this.catalogItemPrice);
          this.inputPrice = this.mapCatalogItemPriceToPrice(response.body);

          this.priceForm = this.fb.group({
            currency: new FormControl(this.inputPrice.currencyIso3),
            wholePrice: new FormControl(this.inputPrice.wholePrice),
            decimalPrice: new FormControl(this.inputPrice.decimalPrice),
          });

          console.log("inputPrice mapped: " + this.inputPrice);
          console.log(response.body);
          this.message = 'Item price successfully loaded: ' + this.catalogItemPrice;
          console.log(this.message);
        }
        else {
          console.log("catalogItemPrice not found: response status: " + response.status);
          this.inputPrice = new Price('EUR', 0, 0);
          this.priceForm = this.fb.group({
            currency: new FormControl(this.inputPrice.currencyIso3),
            wholePrice: new FormControl(this.inputPrice.wholePrice),
            decimalPrice: new FormControl(this.inputPrice.decimalPrice),
          });
        }
      }
      );
  }

  mapCatalogItemPriceToPrice(catalogItemPrice: CatalogItemRetailPrice): Price {
    return new Price(
      catalogItemPrice.currencyId
      , this.getWholePriceFromInteger(catalogItemPrice.retailPrice)
      , this.getDecimalPriceFromInteger(catalogItemPrice.retailPrice)
    );
  }

  getCurrency(currencyId: string): Currency {
    this.currencyService
      .getCurrency(this.catalogItemPrice.currencyId)
      .subscribe((response) => {
        if (response.status === 200) {
          this.currency = response.body;
          return response.body;
          console.log(response.body);
          this.message = 'Item price successfully loaded';
          console.log(this.message);
        }
        else {
          this.message = 'Upps some error loading Item price for itemId:' + this.catalogItem.itemId;
          console.log(this.message);
        }
      }
      );
    return null;
  }

  getCurrencyFromIso(currencyIso3: string) {
    var currencyGot: Currency;
    this.currencyService
      .getCurrencyFromIso(currencyIso3)
      .subscribe((response) => {
        if (response.status === 200) {
          this.currency = response.body;
          currencyGot = response.body;
          console.log("currency got: " + currencyGot.currencyId);
          // console.log(response.body);
          // this.message = 'Item price successfully loaded';
          // console.log(this.message);

        }
        else {
          this.message = 'Upps some error loading Item price for itemId:' + this.catalogItem.itemId;
          console.log(this.message);
        }
      }
      );
  }

  getCurrencies() {
    this.currencyService
      .getCurrencies()
      .subscribe((response) => {
        if (response.status === 200) {
          var currencies: Currency[] = response.body;
          this.inputCurrencies = currencies.map(currency => currency.currencyIso3);
          console.log(response.body);
          this.message = 'Currencies list loaded';
          console.log(this.message);
        }
        else {
          this.message = 'Upps some error loading currencies list';
          console.log(this.message);
        }
      }
      );
  }

  getManufacturer() {
    this.personService
      .getPerson(this.catalogItem.manufacturerId)
      .subscribe((response) => {
        if (response.status === 200) {
          this.selectedManufacturer = response.body;
          console.log(response.body);
          this.message = 'Manufacturer successfully loaded';
          console.log(this.message);
        }
        else {
          this.message = 'Upps some error loading Manufacturer for itemId:' + this.catalogItem.itemId;
          console.log(this.message);
        }
      }
      );
  }

  getItemDescription() {
    this.itemService
      .getItemDescription(this.catalogItem.itemId)
      .subscribe((response) => {
        if (response.status === 200) {
          this.catalogItemDescription = response.body;
          console.log(response.body);
          this.message = 'Item description successfully loaded';
          console.log(this.message);
        }
        else {
          this.message = 'Upps some error loading Item description for itemId:' + this.catalogItem.itemId;
          console.log(this.message);
        }
      }
      );
  }

  getAllItemImages() {
    this.itemService
      .getAllItemImages(this.catalogItem.itemId)
      .subscribe((response) => {
        if (response.status === 200) {
          this.catalogItemImages = response.body;
          console.log(response.body);
          this.message = 'Item images successfully loaded';
          console.log(this.message);

          //  const reader = new FileReader();
          //  var image;
          //  reader.onload = (e) => image = e.target.result;
          //  reader.readAsDataURL(new Blob([this.catalogItemImages[0].image]));
          //  this.images.push (image);

          this.images = this.catalogItemImages.map(image =>
            new Image(
              image.itemImageId,
              'data:image/jpeg;base64,' + image.image)
          );

          //  console.log("catalogItemImages: "+this.catalogItemImages);
          //  console.log("catalogItemImages[0].image: "+this.catalogItemImages[0].image);
          //  console.log("catalogItemImages[1].image: "+this.catalogItemImages[1].image);

          //  console.log("images: "+this.images);
          //  console.log("images[0]: "+this.images[0]);
        }
        else {
          this.message = 'Upps some error loading Item images for itemId:' + this.catalogItem.itemId;
          console.log(this.message);
        }
      }
      );
  }

  upsertItem() {
    this.itemService
      .updateItem(this.catalogItem)
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Item successfully updated';
          console.log(this.message);
        } else {
          this.message = 'Item not successfully updated';
          console.log(this.message);
        }
      }
      );
  }

  upsertItemDescription() {
    this.catalogItemDescription.itemId = this.catalogItem.itemId;
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

  upsertItemPrice() {

    this.catalogItemPrice.itemId = this.catalogItem.itemId;
    this.priceToIntegerFormat();
    console.log("saving price: catalogItemPrice " + this.catalogItemPrice.retailPrice);
    console.log("saving price: catalogItemPrice itemId " + this.catalogItemPrice.itemId);
    console.log("saving price: catalogItemPrice currencyId " + this.catalogItemPrice.currencyId);
    console.log("saving price: inputPrice.wholePrice " + this.inputPrice.wholePrice);
    console.log("saving price: inputPrice.decimalPrice " + this.inputPrice.decimalPrice);
    console.log("saving price: inputPrice.currencyIso3 " + this.inputPrice.currencyIso3);


    console.log("updating price: catalogItemPrice: " + this.catalogItemPrice);
    console.log("updating price: catalogItemPrice.currencyId: " + this.catalogItemPrice.currencyId);
    console.log("updating price: catalogItemPrice.itemId: " + this.catalogItemPrice.itemId);
    console.log("updating price: catalogItemPrice.retailPrice: " + this.catalogItemPrice.retailPrice);
    this.priceService
      .updatePrice(this.catalogItemPrice)
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

  priceToIntegerFormat() {
    console.log("currency got from ISO: " + this.currency);
    this.catalogItemPrice.currencyId = this.inputPrice.currencyIso3;
    this.catalogItemPrice.retailPrice = this.concatInteger(this.inputPrice.wholePrice, this.inputPrice.decimalPrice);
  }

  inputPriceFromInteger() {
    this.inputPrice.currencyIso3 = this.currency.currencyIso3;
    this.inputPrice.wholePrice = this.getWholePriceFromInteger(this.catalogItemPrice.retailPrice);
    this.inputPrice.decimalPrice = this.getDecimalPriceFromInteger(this.catalogItemPrice.retailPrice);
  }

  getWholePriceFromInteger(fullInteger: number): number {
    return parseInt(fullInteger.toString().substring(0, fullInteger.toString().length - 2));
  }

  getDecimalPriceFromInteger(fullInteger: number): number {
    return parseInt(fullInteger.toString().substring((fullInteger.toString().length - 2), fullInteger.toString().length));
  }

  formatTwoDecimals(decimal: number): number {
    return parseInt(("0" + decimal).slice(-2));
  }

  concatInteger(whole: number, decimal: number): number {
    return parseInt((whole.toString()).concat(("0" + decimal).slice(-2)));
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

  onFileSelected(event: { target: { files: File[]; }; }) {
    this.selectedFile = <File>event.target.files[0];
    // this.imageForm.get('image').setValue(this.selectedFile);
  }

  uploadProgress: number;
  uploadSub: Subscription;

  onUploadFile() {
    const imageUploadData = new FormData();
    console.log('selected file: ' + this.selectedFile);
    imageUploadData.append('image', this.selectedFile, this.selectedFile.name);
    imageUploadData.append('itemId', this.catalogItem.itemId);
    //this.newItemImageModel = new NewItemImage(this.selectedFile,'itemId');
    this.uploadSub = this.photoUploadService
      .sendNewImage(imageUploadData)
      .subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * (event.loaded / event.total));
          //console.log (event.loaded);
          //console.log("inside event");
        }
        if (event.type === HttpEventType.Response && event.status === 200) {
          this.message = 'Image uploaded successfully';
          console.log(this.message);
          //refresh page -->trick the Router into believing it's last link wasn't previously loaded
          //this.router.navigated = false;
          // if you need to scroll back to top, here is the right place
          //window.scrollTo(0, 0);
          this.ngOnInit();

        }
        if (event.type === HttpEventType.Response && event.status !== 200) {
          this.message = 'Image not uploaded successfully';
          console.log(this.message);
        }
      }
      );
  }

  cancelUpload() {
    this.uploadSub.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = null;
    this.uploadSub = null;
  }

  // onFileSelected(event: { target: { files: File[]; }; }) {
  //   this.selectedFile = <File>event.target.files[0];

  //   // this.imageForm.get('image').setValue(this.selectedFile);
  // }


  deleteFile(imageId: string): void {
    if (confirm("Se va a borrar la imágen seleccionada")) {
      this.itemService
        .deleteImage(imageId)
        .subscribe((response) => {
          if (response.status === 200) {
            this.ngOnInit();
            this.message = 'Image successfully deleted';
            console.log(this.message);
          } else {
            this.ngOnInit();
            this.message = 'Upps some error deleting an image number';
            console.log(this.message);
          }
        }
        );
    }
  }

  ngOnInit() {
    this.getItem();
    this.getItemDescription();
    this.getItemPrice();
    this.getAllItemImages();
    this.getManufacturer();
    this.getCurrencies();
    registerLocaleData(localeFr, 'de-DE');
  }

}
