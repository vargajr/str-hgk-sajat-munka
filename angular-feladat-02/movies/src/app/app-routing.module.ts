import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { EditorComponent } from './pages/editor/editor.component';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MovieEditorComponent } from './pages/movie-editor/movie-editor.component';
import { AuthGuardService } from './services/auth-guard.service';
import { RoleGuardService } from './services/role-guard.service';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "editor",
    component: EditorComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      expectedRole: 2,
    }
  },
  {
    path: "editor/movie/:id",
    component: MovieEditorComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      expectedRole: 2,
    }
  },
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      expectedRole: 3,
    }
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "forbidden",
    component: ForbiddenComponent,
  },
  {
    path: "**",
    redirectTo: "",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
