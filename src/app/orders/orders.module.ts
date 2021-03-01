import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryComponent } from './summary/summary.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { FullCalendarModule } from 'ng-fullcalendar';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxSpinnerModule } from 'ngx-spinner';
import { routing } from '../admin/admin.routing';
import { ApplicationsModule } from '../applications/applications.module';
import { BlogsModule } from '../blogs/blogs.module';
import { ChartsModule } from '../charts/charts.module';
import { CommonElementsModule } from '../common-elements/common-elements.module';
import { FileManagerModule } from '../file-manager/file-manager.module';
import { FormModule } from '../form/form.module';
import { LayoutModule } from '../layout/layout.module';
import { MapsModule } from '../maps/maps.module';
import { PagesModule } from '../pages/pages.module';
import { TablesModule } from '../tables/tables.module';
import { UiElementsModule } from '../ui-elements/ui-elements.module';
import { WidgetsModule } from '../widgets/widgets.module';

@NgModule({
  declarations: [SummaryComponent],
  imports: [
    CommonModule,
		routing,
		NgxEchartsModule,
		LayoutModule,
		RichTextEditorAllModule,
		NgbModule,
		FullCalendarModule,
		ApplicationsModule,
		ChartsModule,
		FileManagerModule,
		PagesModule,
		RouterModule,
		CommonElementsModule,
		TablesModule,
		UiElementsModule,
		FormModule,
		BlogsModule,
    WidgetsModule,
		MapsModule,
		Ng2SmartTableModule,
		ReactiveFormsModule,
		FormsModule,
		NgxSpinnerModule
  ]
})
export class OrdersModule { }
