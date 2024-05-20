import { CommonModule as AngularCommon } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { CustomPaginatorIntl } from 'src/app/providers/CustomPaginatorIntl';
import { CommonModule } from '../../common/common.module';
import { ControlTablePanelComponent } from './control-table-panel/control-table-panel.component';
import { TableCardsComponent } from './table-cards/table-cards.component';
import { ExpansionPanelComponent } from './table-list/expansion-panel/expansion-panel.component';
import { TableListComponent } from './table-list/table-list.component';
import { TableComponent } from './table.component';

@NgModule({
  imports: [
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    CommonModule,
    MatDividerModule,
    FormsModule,
    MatExpansionModule,
    MatListModule,
    AngularCommon,
    MatButtonModule,
    MatInputModule,
    MatSortModule,
  ],
  declarations: [
    TableComponent,
    TableListComponent,
    TableCardsComponent,
    ControlTablePanelComponent,
    ExpansionPanelComponent,
  ],
  exports: [TableComponent],
  providers: [{ provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }],
})
export class TableModule {}
