import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard.component";
import { CommonModule } from "@angular/common";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { RouterModule } from "@angular/router";
import { DashboardModuleRoutingModule } from "./dashboard.routes";

@NgModule({
    declarations: [
        DashboardComponent
    ],
    providers: [
        
    ],
    imports: [
        CommonModule,
         SidebarComponent,
         DashboardModuleRoutingModule
    ]
})
export class DashboardModule { }