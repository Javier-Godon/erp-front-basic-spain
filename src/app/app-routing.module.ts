import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonComponent } from './components/person/person.component';
import { AddressComponent } from './components/address/address.component';
import { CatalogMainComponent } from './components/catalog-main/catalog-main.component';
//import { CatalogMainComponent } from './components/catalog-main/catalog-main-old-mattree.component';
//import { CatalogMainDynamicTreeComponent } from './components/catalog-main/catalog-main-dynamic-tree/catalog-main-dynamic-tree.component';
import { CatalogProductComponent } from './components/catalog-product/catalog-product.component';
import { PersonMainAndListComponent } from './components/person/person-main-and-list/person-main-and-list.component';
import { OrderListComponent } from './components/sales/order-list/order-list.component';
import { ShipmentOrderListComponent } from './components/warehouse/shipment-order-list/shipment-order-list.component';
import { ProofOfDeliveryListComponent } from './components/delivery/proof-of-delivery-list/proof-of-delivery-list.component';


const routes: Routes = [
  // {path: 'person',component: PersonComponent},
  {path: 'person',component: PersonMainAndListComponent},  
  {path: 'address',component: AddressComponent},
  {path: 'billing',component: PersonComponent},
  {path: 'basic-catalog',component: CatalogMainComponent},
  {path: 'catalog-product', component: CatalogProductComponent},
  {path: 'collections',component: PersonComponent},
  {path: 'delivery',component: PersonComponent},
  {path: 'extended-catalog',component: PersonComponent},
  {path: 'inventory',component: PersonComponent},
  {path: 'logistics',component: PersonComponent},
  {path: 'nic-niif',component: PersonComponent},
  {path: 'operator',component: PersonComponent},
  {path: 'payments',component: PersonComponent},
  {path: 'pms',component: PersonComponent},
  {path: 'purchases',component: PersonComponent},
  {path: 'returns',component: PersonComponent},  
  {path: 'order-list',component: OrderListComponent},
  {path: 'shipment-order-list',component: ShipmentOrderListComponent},
  {path: 'delivery-list',component: ProofOfDeliveryListComponent},
  {path: 'salesforce',component: PersonComponent},
  {path: 'warehouse',component: PersonComponent},
  {path: 'warranty',component: PersonComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
