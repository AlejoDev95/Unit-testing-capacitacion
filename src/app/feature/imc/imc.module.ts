import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImcRoutingModule } from './imc-routing.module';
import { ImcService } from './service/imc.service';
import { MasterService } from './service/master.service';
import { ImcComponent } from './imc.component';
import { PersonComponent } from './components/person/person.component';

@NgModule({
  declarations: [ImcComponent, PersonComponent],
  imports: [CommonModule, ImcRoutingModule],
  providers: [ImcService, MasterService],
})
export class ImcModule {}
