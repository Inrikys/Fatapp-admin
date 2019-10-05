import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

// FontAwesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Headers
import { ModalHeaderComponent } from './headers/modal-header/modal-header.component';
import { PageHeaderComponent } from './headers/page-header/page-header.component';
import { MainHeaderComponent } from './headers/main-header/main-header.component';


// Exception
import { ExceptionComponent } from './exception/exception.component';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FontAwesomeModule
  ],
  declarations: [
    ModalHeaderComponent,
    PageHeaderComponent,
    ExceptionComponent,
    MainHeaderComponent,
  ],
  exports: [
    ModalHeaderComponent,
    PageHeaderComponent,
    ExceptionComponent,
    MainHeaderComponent,
  ],
})
export class ComponentsModule { }
