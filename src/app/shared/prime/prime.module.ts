import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from "primeng/button";
import {CheckboxModule} from "primeng/checkbox";
import {InputTextModule} from "primeng/inputtext";
import {InputNumberModule} from "primeng/inputnumber";
import {InputSwitchModule} from "primeng/inputswitch";
import {MultiSelectModule} from "primeng/multiselect";
import {CardModule} from "primeng/card";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DropdownModule} from "primeng/dropdown";
import {CalendarModule} from "primeng/calendar";




@NgModule({
  declarations: [],
  imports: [
    CommonModule,

  ],
  exports: [
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    InputNumberModule,
    InputSwitchModule,
    MultiSelectModule,
    CardModule,
    DropdownModule,
    CalendarModule
  ]

})
export class PrimeModule { }
