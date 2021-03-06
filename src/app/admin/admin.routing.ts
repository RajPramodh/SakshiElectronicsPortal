import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { IndexComponent } from './index/index.component';
import { InboxComponent } from '../applications/inbox/inbox.component';
import { ComposeComponent } from '../applications/compose/compose.component';
import { ContactGridComponent } from '../applications/contact-grid/contact-grid.component';
import { FileDocumentsComponent } from '../file-manager/file-documents/file-documents.component';
import { FileMediaComponent } from '../file-manager/file-media/file-media.component';
import { FileImagesComponent } from '../file-manager/file-images/file-images.component';
import { TypographyComponent } from '../ui-elements/typography/typography.component';
import { UiTabsComponent } from '../ui-elements/ui-tabs/ui-tabs.component';
import { UiButtonsComponent } from '../ui-elements/ui-buttons/ui-buttons.component';
import { UiBootstrapComponent } from '../ui-elements/ui-bootstrap/ui-bootstrap.component';
import { UiIconsComponent } from '../ui-elements/ui-icons/ui-icons.component';
import { UiColorsComponent } from '../ui-elements/ui-colors/ui-colors.component';
import { UiListGroupComponent } from '../ui-elements/ui-list-group/ui-list-group.component';
import { UiMediaObjectComponent } from '../ui-elements/ui-media-object/ui-media-object.component';
import { UiModalsComponent } from '../ui-elements/ui-modals/ui-modals.component';
import { UiProgressbarsComponent } from '../ui-elements/ui-progressbars/ui-progressbars.component';
import { UiNotificationsComponent } from '../ui-elements/ui-notifications/ui-notifications.component';
import { AppChatComponent } from '../applications/app-chat/app-chat.component';
import { TableNormalComponent } from '../tables/table-normal/table-normal.component';
import { PageBlankComponent } from '../pages/page-blank/page-blank.component';
import { PageProfileComponent } from '../pages/page-profile/page-profile.component';
import { PageProfileV2Component } from '../pages/page-profile-v2/page-profile-v2.component';
import { PageGalleryComponent } from '../pages/page-gallery/page-gallery.component';
import { PageTimelineComponent } from '../pages/page-timeline/page-timeline.component';
import { PagePricingComponent } from '../pages/page-pricing/page-pricing.component';
import { PageInvoicesComponent } from '../pages/page-invoices/page-invoices.component';
import { PageInvoicesV2Component } from '../pages/page-invoices-v2/page-invoices-v2.component';
import { PageSearchResultsComponent } from '../pages/page-search-results/page-search-results.component';
import { PageHelperClassComponent } from '../pages/page-helper-class/page-helper-class.component';
import { PageTeamsBoardComponent } from '../pages/page-teams-board/page-teams-board.component';
import { PageProjectsListComponent } from '../pages/page-projects-list/page-projects-list.component';
import { PageTestimonialsComponent } from '../pages/page-testimonials/page-testimonials.component';
import { PageFaqComponent } from '../pages/page-faq/page-faq.component';
import { AppCalendarComponent } from '../applications/app-calendar/app-calendar.component';
import { ChartEchartComponent } from '../charts/chart-echart/chart-echart.component';
import { FormsValidationComponent } from '../form/forms-validation/forms-validation.component';
import { BlogListComponent } from '../blogs/blog-list/blog-list.component';
import { BlogDetailsComponent } from '../blogs/blog-details/blog-details.component';
import { FormsBasicComponent } from '../form/forms-basic/forms-basic.component';
import { WidgetsEcommerceComponent } from '../widgets/widgets-ecommerce/widgets-ecommerce.component';
import { WidgetsBlogComponent } from '../widgets/widgets-blog/widgets-blog.component';
import { WidgetsWeatherComponent } from '../widgets/widgets-weather/widgets-weather.component';
import { WidgetsDataComponent } from '../widgets/widgets-data/widgets-data.component';
import { RolesComponent } from './roles/roles.component';
import { BlogPostComponent } from '../blogs/blog-post/blog-post.component';
import { PageLeafletComponent } from '../maps/page-leaflet/page-leaflet.component';
import { UserProfilesComponent } from './user-profiles/user-profiles.component';
import { AuthGuardService } from '../services/auth-guard.service';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SummaryComponent } from '../orders/summary/summary.component';

const routes: Routes = [   
    {
        path: '',
        component: AdminComponent,
        children: [
            { path: '', redirectTo:''},
            {
                path: '',
                children: [
                    { path: '', redirectTo: 'user-profiles', pathMatch: 'full' },
                    { path: 'user-profiles', component: UserProfilesComponent, data: { title: ':: Ultrasharp Electronics :: Profiles Management' },
                    canActivate: [AuthGuardService] },
                    { path: 'roles', component: RolesComponent, data: { title: ':: Ultrasharp Electronics :: Roles' }, 
                    canActivate: [AuthGuardService] },
                ]
            },
            { path: 'reset-password', component: ResetPasswordComponent, data: { title: ':: Ultrasharp Electronics :: Reset Password ::' } },
            { 
                path: 'orders',
                children: [
                    { path: 'summary', component: SummaryComponent, data: { title: ':: Ultrasharp Electronics :: Orders :: Summary ::' }, 
                        canActivate: [AuthGuardService] },
                    { path: 'app-chat', component: AppChatComponent, data: { title: ':: Ultrasharp Electronics :: App :: Chat ::' } },
                    { path: 'app-contact-grid', component: ContactGridComponent, data: { title: ':: Ultrasharp Electronics :: App :: Contacts ::' } },
                    { path: 'app-calendar', component: AppCalendarComponent, data: { title: ':: Ultrasharp Electronics :: App :: Calendar ::' } },
                    
                ]
            },
            {
                path: 'ui-elements',
                children: [
                    { path: '', redirectTo: 'typography', pathMatch: 'full' },
                    { path: 'typography', component: TypographyComponent, data: { title: ':: Ultrasharp Electronics :: UI Elements :: Typography ::' } },
                    { path: 'ui-tabs', component: UiTabsComponent, data: { title: ':: Ultrasharp Electronics :: UI Elements :: Tabs ::' } },
                    { path: 'ui-buttons', component: UiButtonsComponent, data: { title: ':: Ultrasharp Electronics :: UI Elements :: Buttons ::' } },
                    { path: 'ui-bootstrap', component: UiBootstrapComponent, data: { title: ':: Ultrasharp Electronics :: UI Elements :: Bootstrap ::' } },
                    { path: 'ui-icons', component: UiIconsComponent, data: { title: ':: Ultrasharp Electronics :: UI Elements :: Icons ::' } },
                    { path: 'ui-colors', component: UiColorsComponent, data: { title: ':: Ultrasharp Electronics :: UI Elements :: Colors ::' } },
                    { path: 'ui-list-group', component: UiListGroupComponent, data: { title: ':: Ultrasharp Electronics :: UI Elements :: Lists ::' } },
                    { path: 'ui-media-object', component: UiMediaObjectComponent, data: { title: ':: Ultrasharp Electronics :: UI Elements :: Media ::' } },
                    { path: 'ui-modal', component: UiModalsComponent, data: { title: ':: Ultrasharp Electronics :: UI Elements :: Modal ::' } },
                    { path: 'ui-progressbars', component: UiProgressbarsComponent, data: { title: ':: Ultrasharp Electronics :: UI Elements :: Prograssbars ::' } },
                    { path: 'ui-notifications', component: UiNotificationsComponent, data: { title: ':: Ultrasharp Electronics :: UI Elements :: Notifications ::' } },
                ]
            },
            {
                path: 'file-manager',
                children: [
                    { path: '', redirectTo: 'file-documents', pathMatch: 'full' },
                    { path: 'file-documents', component: FileDocumentsComponent, data: { title: ':: Ultrasharp Electronics :: File Manager :: Documents ::' } },
                    { path: 'file-media', component: FileMediaComponent, data: { title: ':: Ultrasharp Electronics :: File Manager :: Media ::' } },
                    { path: 'file-images', component: FileImagesComponent, data: { title: ':: Ultrasharp Electronics :: File Manager :: Images ::' } }
                ]
            },
            {
                path: 'tables',
                children: [
                    { path: '', redirectTo: 'table-normal', pathMatch: 'full' },
                    { path: 'table-normal', component: TableNormalComponent, data: { title: ':: Ultrasharp Electronics :: Tables :: Normal Tables ::' }  },
                ]
            },
            {
                path: 'pages',
                children: [
                    { path: '', redirectTo: 'page-blank', pathMatch: 'full' },
                    { path: 'page-blank', component: PageBlankComponent, data: { title: ':: Ultrasharp Electronics :: Pages :: Blank ::' }  },
                    { path: 'page-profile', component: PageProfileComponent, data: { title: ':: Ultrasharp Electronics :: Pages :: Profile ::' } ,
                    canActivate: [AuthGuardService]},
                    { path: 'page-profile2', component: PageProfileV2Component, data: { title: ':: Ultrasharp Electronics :: Pages :: Profile - V2 ::' },
                    canActivate: [AuthGuardService] },
                    { path: 'page-gallery', component: PageGalleryComponent, data: { title: ':: Ultrasharp Electronics :: Pages :: Gallery ::' } },
                    { path: 'page-timeline', component: PageTimelineComponent, data: { title: ':: Ultrasharp Electronics :: Pages :: Timeline ::' } },
                    { path: 'page-pricing', component: PagePricingComponent, data: { title: ':: Ultrasharp Electronics :: Pages :: Pricing ::' } },
                    { path: 'page-invoices', component: PageInvoicesComponent, data: { title: ':: Ultrasharp Electronics :: Pages :: Invoices ::' } },
                    { path: 'page-invoices2', component: PageInvoicesV2Component, data: { title: ':: Ultrasharp Electronics :: Pages :: Invoices - V2 ::' } },
                    { path: 'page-search-results', component: PageSearchResultsComponent, data: { title: ':: Ultrasharp Electronics :: Pages :: Search Results ::' } },
                    { path: 'page-helper-class', component: PageHelperClassComponent, data: { title: ':: Ultrasharp Electronics :: Pages :: Classes ::' } },
                    { path: 'page-teams-board', component: PageTeamsBoardComponent, data: { title: ':: Ultrasharp Electronics :: Pages :: Team ::' } },
                    { path: 'page-projects-list', component: PageProjectsListComponent, data: { title: ':: Ultrasharp Electronics :: Pages :: Projects ::' } },
                    { path: 'page-maintenance', component: PageProjectsListComponent, data: { title: ':: Ultrasharp Electronics :: Pages :: Maintenance ::' } },
                    { path: 'page-testimonials', component: PageTestimonialsComponent, data: { title: ':: Ultrasharp Electronics :: Pages :: Testimonials ::' } },
                    { path: 'page-faq', component: PageFaqComponent, data: { title: ':: Ultrasharp Electronics :: Pages :: Faq ::' } },
                    
                ]
            },
            {
                path: 'charts',
                children: [
                    { path: '', redirectTo: 'chart-echarts', pathMatch: 'full' },
                    { path: 'chart-echarts', component: ChartEchartComponent, data: { title: ':: Ultrasharp Electronics :: Charts :: E-Charts ::' } },
                ]
            },
            {
                path: 'forms',
                children: [
                    { path: '', redirectTo: 'forms-validation', pathMatch: 'full' },
                    { path: 'forms-validation', component: FormsValidationComponent, data: { title: ':: Ultrasharp Electronics :: Form Validations :: Forms ::' } },
                    { path: 'forms-basic', component: FormsBasicComponent, data: { title: ':: Ultrasharp Electronics :: Form Basic :: Forms ::' } }
                ]
            },
            {
                path: 'blogs',
                children: [
                    { path: '', redirectTo: 'blog-post', pathMatch: 'full' },
                    { path: 'blog-post', component: BlogPostComponent, data: { title: ':: Ultrasharp Electronics :: Blog Post :: Blog ::' } },
                    { path: 'blog-list', component: BlogListComponent, data: { title: ':: Ultrasharp Electronics :: Blog List :: Blog ::' } },
                    { path: 'blog-details', component: BlogDetailsComponent, data: { title: ':: Ultrasharp Electronics :: Blog Details :: Blog ::' } }
                ]
            },
            {
                path: 'widgets',
                children: [
                    { path: '', redirectTo: 'widgets-data', pathMatch: 'full' },
                    { path: 'widgets-data', component: WidgetsDataComponent, data: { title: ':: Ultrasharp Electronics :: Widgets Data :: Widgets ::' } },
                    { path: 'widgets-weather', component: WidgetsWeatherComponent, data: { title: ':: Ultrasharp Electronics :: Widgets Weather :: Widgets ::' } },
                    { path: 'widgets-blog', component: WidgetsBlogComponent, data: { title: ':: Ultrasharp Electronics :: Widgets Blog :: Widgets ::' } },
                    { path: 'widgets-ecommerce', component: WidgetsEcommerceComponent, data: { title: ':: Ultrasharp Electronics :: Widgets eCommerce :: Widgets ::' } }
                ]
            },
            {
                path: 'maps',
                children: [
                    { path: '', redirectTo: 'leaflet', pathMatch: 'full' },
                    { path: 'leaflet', component: PageLeafletComponent, data: { title: ':: Ultrasharp Electronics :: Maps :: Leaflet ::' } },
                ]
            }
        ]
    },
    
];

export const routing = RouterModule.forChild(routes);