import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { SharedSandbox } from './shared.sandbox';
import { SharedApiClientService } from './shared-api-client.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, FlexLayoutModule, RouterModule],
  exports: [FlexLayoutModule],
  providers: [SharedSandbox, SharedApiClientService],
})
export class SharedModule {}
