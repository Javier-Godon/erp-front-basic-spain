import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { InputPriceComponent } from '../input-price/input-price.component';
import { Price } from '../price-model'

@Component({
  selector: 'app-input-price-container',
  templateUrl: './input-price-container.component.html',
  styleUrls: ['./input-price-container.component.scss']
})
export class InputPriceContainerComponent implements OnInit {

  // @ViewChild(InputPriceComponent)
  // private inputPriceComponent!: InputPriceComponent;

  // outputPrice: Price;

  priceForm: FormGroup;

  @Input()
  price: Price;

  @Input()
  currencies: string[]  

  formControl: FormControl;
  
  constructor(private rootFormGroup: FormGroupDirective) {      
  }
  
  // ngAfterViewInit(): void {
  //   this.outputPrice=this.inputPriceComponent.price;
  //   console.log ("price got from input-price in container: "+this.outputPrice);
  // }

  ngOnInit(): void {
    // this.price= new Price("USD", 2.222, 22);  
    // this.currencies = ['EUR', 'USD', 'MEX']; 
    this.formControl = new FormControl({ value: this.price, disabled: false });
    this.priceForm = this.rootFormGroup.control;
  }

}
