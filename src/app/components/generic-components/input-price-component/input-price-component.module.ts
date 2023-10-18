import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputPriceContainerComponent } from './input-price-container/input-price-container.component';
import { InputPriceComponent } from './input-price/input-price.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [InputPriceContainerComponent, InputPriceComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatDividerModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  exports:[
    InputPriceContainerComponent,
    InputPriceComponent
  ]
})
export class InputPriceComponentModule { }
