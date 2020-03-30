import { Routes, RouterModule } from "@angular/router";
import { UserInfoComponent } from "./user-info/user-info.component";
import { NgModule } from "@angular/core";

const routes: Routes = [{ path: "", component: UserInfoComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
