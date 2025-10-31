import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { CriarUsuarioComponent } from './admin/criar-usuario/criar-usuario.component';
import { CriarProdutoComponent } from './admin/criar-produto/criar-produto.component';
import { EditarProdutoComponent } from './admin/editar-produto/editar-produto.component';
import { DesativarProdutoComponent } from './admin/desativar-produto/desativar-produto.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AdminComponent,
    UserManagementComponent,
    CriarUsuarioComponent,
    CriarProdutoComponent,
    EditarProdutoComponent,
    DesativarProdutoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
