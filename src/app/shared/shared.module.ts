import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { layoutComponents } from './layout';

@NgModule({
  declarations: [...layoutComponents],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [ReactiveFormsModule, ...layoutComponents],
})
export class SharedModule {}
