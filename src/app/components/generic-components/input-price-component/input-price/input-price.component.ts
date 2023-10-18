import { FocusMonitor } from '@angular/cdk/a11y';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostBinding, Input, OnDestroy, OnInit, Optional, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field'
import { Price } from '../price-model'
import { MatInput } from '@angular/material/input';
import { Observable, Subject } from 'rxjs';
import { stringify } from '@angular/compiler/src/util';

export interface FormFieldValue {
  currency: string;
  wholePrice: string;
  decimalPrice: string;
}

@Component({
  selector: 'app-input-price',
  templateUrl: './input-price.component.html',
  styleUrls: ['./input-price.component.scss'],
  providers: [{
    provide: MatFormFieldControl,
    useExisting: InputPriceComponent
  }

  ]
})
export class InputPriceComponent implements OnInit, AfterViewInit, OnDestroy,
  MatFormFieldControl<FormFieldValue>, ControlValueAccessor {  

  @Input()
  currencies: string[]

  static nextId = 0;
  @ViewChild('mainPriceInput', { read: ElementRef, static: true })
  mainPriceInput: ElementRef;

  @ViewChild('decimalPriceInput', { read: ElementRef, static: true })
  decimalPriceInput: ElementRef;

  @ViewChild('currencySelect', { read: ElementRef, static: true })
  currencySelect: ElementRef;

  @Input()
  set value(value: FormFieldValue) {
    this.priceForm.patchValue(value);
    this.stateChanges.next();
  }
  get value() {
    return this.priceForm.value;
  }

  stateChanges = new Subject<void>();

  @HostBinding()
  id = `input-price-id-${InputPriceComponent.nextId++}`;

  @Input()
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  get placeholder() {
    return this._placeholder;
  }
  private _placeholder: string;

  @Input()
  set placeholderWhole(value: number) {
    this._placeholderWhole = value;
    this.stateChanges.next();
  }
  get placeholderWhole() {
    return this._placeholderWhole;
  }
  private _placeholderWhole: number;

  @Input()
  set placeholderDecimal(value: number) {
    this._placeholder_decimal = value;
    this.stateChanges.next();
  }
  get placeholderDecimal() {
    return this._placeholder_decimal;
  }
  private _placeholder_decimal: number;

  @Input()
  set placeholderCurrency(value: string) {
    this._placeholder_currency = value;
    this.stateChanges.next();
  }
  get placeholderCurrency() {
    return this._placeholder_currency;
  }
  private _placeholder_currency: string;

  focused: boolean;

  get empty(): boolean {
    return !this.value.currency && !this.value.wholePrice && !this.value.decimalPrice;
  }

  @HostBinding('class.floated')
  get shouldLableFloat(): boolean {
    return true;
  }

  @Input()
  required: boolean;
  disabled: boolean;

  get errorState() {
    return false;
  };

  controlType = "input-price";
  autofilled?: boolean;

  onChange: (value: FormFieldValue) => void;
  onTouch: () => void;

  form: FormGroup;
  priceForm: FormGroup;
  

  @Input()
  price: Price;

  constructor(private focusMonitor: FocusMonitor, @Optional() @Self() public ngControl: NgControl,
    private fb: FormBuilder, private rootFormGroup: FormGroupDirective, private changeDetectorRef: ChangeDetectorRef
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }    
  }
  
  
  writeValue(obj: FormFieldValue): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.priceForm.disable();
    this.stateChanges.next();
  }
  shouldLabelFloat: boolean;
  setDescribedByIds(ids: string[]): void {
    // throw new Error('Method not implemented.');
  }
  onContainerClick(event: MouseEvent): void {
    // throw new Error('Method not implemented.');
  }

  onMainPriceChange(newInput: any) {
    //console.log("you've clicked: "+newInput.key);
    //console.log("you've clicked: "+newInput.target.value);
    if (newInput.key === ",") {
      this.priceForm.value.wholePrice = (this.priceForm.value.wholePrice).replace(",", "");
      this.priceForm.value.wholePrice = this.formatNumber(this.priceForm.value.wholePrice);
      this.value.wholePrice = this.priceForm.value.wholePrice;
      this.price.wholePrice = this.integerFromString(this.value.wholePrice);
      this.decimalPriceInput.nativeElement.focus();
      this.decimalPriceInput.nativeElement.select();
      console.log(this.price);

    }
    else if (newInput.key === ".") {
      this.priceForm.value.wholePrice = (this.priceForm.value.wholePrice).replace(".", "");
      this.value.wholePrice = this.priceForm.value.wholePrice;
      this.priceForm.value.wholePrice = this.formatNumber(this.priceForm.value.wholePrice);
      this.price.wholePrice = this.integerFromString(this.value.wholePrice);
      this.decimalPriceInput.nativeElement.focus();
      this.decimalPriceInput.nativeElement.select();
      console.log(this.price);
    }
    else {
      this.reFormatWholePrice();

      this.price.wholePrice = this.integerFromString(this.value.wholePrice);
      //console.log(this.form.value);
      console.log(this.value.wholePrice);
      console.log(this.priceForm.value.wholePrice);
      //console.log(newMainPrice);
      //console.log(this.formatter.format(this.value.wholePrice));
      console.log(this.formatNumber(this.value.wholePrice));
      //console.log(this.value.wholePrice.toLocaleString('de-DE', {maximumFractionDigits: 2})); 
      // if(!this.form.value.wholePrice.isNaN){
      //  this.form.value.wholePrice=this.formatter.format(this.form.value.wholePrice) 
      console.log(this.price);
    }



  }

  onDecimalPriceChange(newInput: any) {
    this.reFormatWholePrice();

    this.priceForm.value.decimalPrice = (this.priceForm.value.decimalPrice).replace(",", "");
    this.priceForm.value.decimalPrice = (this.priceForm.value.decimalPrice).replace(/[^0-9]*/g, '');
    this.priceForm.value.decimalPrice = (this.priceForm.value.decimalPrice).replace(".", "");
    this.priceForm.value.decimalPrice = this.formatNumber(this.priceForm.value.decimalPrice);
    this.value.decimalPrice = this.priceForm.value.decimalPrice;
    this.price.decimalPrice = this.integerFromString(this.value.decimalPrice);
    console.log(this.price);
  }
  onCurrencyChange(newCurrency: any) {
    this.reFormatWholePrice();
    this.value.wholePrice = this.priceForm.value.wholePrice;
    console.log(newCurrency.value);
    this.value.currency = newCurrency.value;
    console.log(this.value.currency);
    this.price.currencyIso3 = this.value.currency;
    console.log(this.price);
    // this.value.currency = this.form.value.currency;
    // console.log(this.form.value);
    // console.log(this.value.currency);
    // console.log(newCurrency);
  }

  reFormatWholePrice (){
    this.priceForm.value.wholePrice = (this.priceForm.value.wholePrice).replace(",", "");
    this.priceForm.value.wholePrice = (this.priceForm.value.wholePrice).replace(".", "");
    this.priceForm.value.wholePrice = (this.priceForm.value.wholePrice).replace(/[^0-9]*/g, '');   
    this.priceForm.value.wholePrice = this.formatNumber(this.priceForm.value.wholePrice);
    this.value.wholePrice = this.priceForm.value.wholePrice;
  }

  formatter = new Intl.NumberFormat('de-DE')

  formatNumber(myNumber: string): string {
    return myNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  formatTwoDecimal(myNumber: number): string {
    return myNumber.toLocaleString('de-DE', {
      minimumIntegerDigits: 2
    });
  }

  integerFromString(stringNumber: string): number {
    stringNumber = stringNumber.replace(",", "");
    stringNumber = stringNumber.replace(".", "");
    stringNumber = stringNumber.replace(/[^0-9]*/g, '');
    return +stringNumber;
  }

  ngOnInit(): void {
    this.priceForm = this.rootFormGroup.control;
    this.form = this.fb.group({
      currency: new FormControl(this.price.currencyIso3),
      wholePrice: new FormControl(this.price.wholePrice),
      decimalPrice: new FormControl(this.price.decimalPrice),
    }); 
    // this.price = new Price('EUR', 2000, 22);
    // this.currencies = ['EUR', 'USD', 'MEX']
    this.value.currency = this.price.currencyIso3;
    this.priceForm.value.currency=this.price.currencyIso3;
    console.log("this.value.currency: "+this.value.currency);
    console.log("this.price.currencyIso3: "+this.price.currencyIso3);
    

    this.focusMonitor.monitor(this.mainPriceInput)
      .subscribe((focused) => {
        this.focused = !!focused;
        this.stateChanges.next();
      });
    this.priceForm.valueChanges.subscribe(value => this.onChange(value));
    this.priceForm.valueChanges.subscribe(currencies => this.onChange(currencies));
  }

  ngAfterViewInit(): void {
    this.priceForm.value.wholePrice = this.formatNumber((this.priceForm.value.wholePrice).toString());
    console.log("this.priceForm.value.wholePrice : "+this.formatNumber((this.priceForm.value.wholePrice).toString()));
    this.form.value.wholePrice =this.formatNumber((this.form.value.wholePrice ).toString());
    console.log("this.form.value.wholePrice : "+this.formatNumber((this.form.value.wholePrice ).toString()));
    this.value.wholePrice = this.priceForm.value.wholePrice;
    this.price.wholePrice = this.integerFromString((this.value.wholePrice).toString());
    console.log("this.price.wholePrice : " + this.price.wholePrice);
    //this.value.wholePrice =this.formatNumber((this.form.value.wholePrice ).toString());
    //console.log("this.price.value.wholePrice : "+this.formatNumber(this.price.wholePrice ));
    this.priceForm.value.decimalPrice = ("0" + (this.priceForm.value.decimalPrice).toString()).slice(-2);
    this.form.value.decimalPrice =("0" + (this.form.value.decimalPrice).toString()).slice(-2);
    this.value.decimalPrice = this.priceForm.value.decimalPrice;
    this.price.decimalPrice = this.integerFromString((this.value.decimalPrice).toString());
    //Focus
    this.mainPriceInput.nativeElement.focus();
    this.mainPriceInput.nativeElement.select();
    this.changeDetectorRef.detectChanges();    
   
  }

  ngOnDestroy() {
    this.focusMonitor.stopMonitoring(this.mainPriceInput);
    this.stateChanges.complete();
  }

}
