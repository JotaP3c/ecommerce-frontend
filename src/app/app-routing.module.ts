import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { AdminComponent } from './admin/admin.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { CriarUsuarioComponent } from './admin/criar-usuario/criar-usuario.component';
import { CriarProdutoComponent } from './admin/criar-produto/criar-produto.component';
import { EditarProdutoComponent } from './admin/editar-produto/editar-produto.component'; // 👈 novo import

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin/usuarios', component: UserManagementComponent },
  { path: 'admin/usuarios/novo', component: CriarUsuarioComponent },
  { path: 'admin/criar-produto', component: CriarProdutoComponent },
  { path: 'admin/editar-produto', component: EditarProdutoComponent },

  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
