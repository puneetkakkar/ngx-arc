import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { SharedSandbox } from './shared.sandbox';

@NgModule({
  declarations: [],
  imports: [CommonModule, FlexLayoutModule, RouterModule],
  exports: [FlexLayoutModule],
  providers: [SharedSandbox],
})
export class SharedModule {}
