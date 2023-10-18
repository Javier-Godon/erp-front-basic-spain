import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonComponent } from './components/person/person.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MainToolbarComponent } from './components/main-toolbar/main-toolbar.component';
import { MatInputModule } from '@angular/material/input';
import { BasicCatalogComponent } from './components/basic-catalog/basic-catalog.component';
import { AddressComponent } from './components/address/address.component';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { AddressDialogComponent } from './components/dialogs/address-dialog/address-dialog.component';
import { PersonLinksDialogComponent } from './components/dialogs/person-links-dialog/person-links-dialog.component';
//import { CatalogMainComponent } from './components/catalog-main/catalog-main-old-mattree.component';
import { CatalogMainComponent } from './components/catalog-main/catalog-main.component'; 
//import { CatalogMainDynamicTreeComponent } from './components/catalog-main/catalog-main-dynamic-tree/catalog-main-dynamic-tree.component';
import { CatalogProductComponent } from './components/catalog-product/catalog-product.component';
import { CatalogProductVendorComponent } from './components/catalog-product-vendor/catalog-product-vendor.component';
import { NewProductDialogComponent } from './components/dialogs/catalog/new-product-dialog/new-product-dialog.component';
import { NewProductCategoryDialogComponent } from './components/dialogs/catalog/new-product-category-dialog/new-product-category-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { PhotoUploadService } from './service/photo-upload.service';
import { NewCategoryComponent } from './components/catalog-main/dialogs/new-category/new-category.component';
import { NewSubCategoryComponent } from './components/catalog-main/dialogs/new-sub-category/new-sub-category.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DeleteProductDialogComponent } from './components/dialogs/catalog/delete-product-dialog/delete-product-dialog.component';
import { ProductDetailedCardDialogComponent } from './components/dialogs/catalog/product-detailed-card-dialog/product-detailed-card-dialog.component';
import { PersonMainAndListComponent } from './components/person/person-main-and-list/person-main-and-list.component';
import { PersonDetailedCardComponent } from './components/person/person-detailed-card/person-detailed-card.component';
import { DeletePersonDialogComponent } from './components/person/delete-person-dialog/delete-person-dialog.component';
import { NewPersonComponent } from './components/person/new-person/new-person.component';
import { PersonListPickerComponent } from './components/person/person-list-picker/person-list-picker.component';
import {InputPriceComponentModule} from './components/generic-components/input-price-component/input-price-component.module';
import { SwiperModule } from 'swiper/angular';
import { OrderListComponent } from './components/sales/order-list/order-list.component';
import { OrderComponent } from './components/sales/order/order.component';
import { ProofOfDeliveryComponent } from './components/delivery/proof-of-delivery/proof-of-delivery.component';
import { ProofOfDeliveryListComponent } from './components/delivery/proof-of-delivery-list/proof-of-delivery-list.component';
import { ShipmentOrderComponent } from './components/warehouse/shipment-order/shipment-order.component';
import { ShipmentOrderListComponent } from './components/warehouse/shipment-order-list/shipment-order-list.component';


@NgModule({
  declarations: [
    AppComponent,
    PersonComponent,
    AddressComponent,
    MainNavComponent,
    MainToolbarComponent,
    BasicCatalogComponent,
    AddressComponent,
    AddressDialogComponent,
    PersonLinksDialogComponent,
    CatalogMainComponent,
    //CatalogMainDynamicTreeComponent,
    CatalogProductComponent,
    CatalogProductVendorComponent,
    NewProductDialogComponent,
    NewProductCategoryDialogComponent,
    NewCategoryComponent,
    NewSubCategoryComponent,
    DeleteProductDialogComponent,
    ProductDetailedCardDialogComponent,
    PersonMainAndListComponent,
    PersonDetailedCardComponent,
    DeletePersonDialogComponent,
    NewPersonComponent,
    PersonListPickerComponent,
    OrderListComponent,
    OrderComponent,
    ShipmentOrderComponent,
    ShipmentOrderListComponent,
    ProofOfDeliveryComponent,
    ProofOfDeliveryListComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    InputPriceComponentModule,
    SwiperModule
  ],
  providers: [PhotoUploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
