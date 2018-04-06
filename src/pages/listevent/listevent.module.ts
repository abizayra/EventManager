import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListeventPage } from './listevent';

@NgModule({
  declarations: [
    ListeventPage,
  ],
  imports: [
    IonicPageModule.forChild(ListeventPage),
  ],
})
export class ListeventPageModule {}
