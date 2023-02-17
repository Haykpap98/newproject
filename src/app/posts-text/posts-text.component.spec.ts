import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsTextComponent } from './posts-text.component';

describe('PostsTextComponent', () => {
  let component: PostsTextComponent;
  let fixture: ComponentFixture<PostsTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsTextComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
