import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesativarProdutoComponent } from './desativar-produto.component';

describe('DesativarProdutoComponent', () => {
  let component: DesativarProdutoComponent;
  let fixture: ComponentFixture<DesativarProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesativarProdutoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DesativarProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
