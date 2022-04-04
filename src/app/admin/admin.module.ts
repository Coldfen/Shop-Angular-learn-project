import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthGuard } from "../shared/auth.guard";
import { AddPageComponent } from "./add-page/add-page.component";
import { DashboardPageComponent } from "./dashboard-page/dashboard-page.component";
import { EditPageComponent } from "./edit-page/edit-page.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { OrdersPageComponent } from "./orders-page/orders-page.component";
import { AdminLayoutComponent } from './shared/admin-layout/admin-layout.component';
import { QuillModule } from 'ngx-quill'
import { SearchPipe } from "../shared/search.pipe";


@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    QuillModule.forRoot(),
    RouterModule.forChild([
    {
      path: '', component: AdminLayoutComponent, children: [
        {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
        {path: 'login', component: LoginPageComponent},
        {path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard]},
        {path: 'add', component: AddPageComponent, canActivate: [AuthGuard]},
        {path: 'orders', component: OrdersPageComponent, canActivate: [AuthGuard]},
        {path: 'product/:id/edit', component: EditPageComponent, canActivate: [AuthGuard]}
      ]  
    }
  ])
  ],
  exports: [RouterModule],
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    DashboardPageComponent,
    AddPageComponent,
    EditPageComponent,
    OrdersPageComponent,
    SearchPipe
  ]
})

export class AdminModule {

}