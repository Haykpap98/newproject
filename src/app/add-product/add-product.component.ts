import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { FileUpload } from '../models/file-upload.model';
import { ProductService } from '../product.service';
import { FileUploadService } from '../services/file-upload.service';
import { take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent {
  public productForm: FormGroup;
  selectedFiles?: any;
  currentFileUpload?: FileUpload;
  constructor(
    public productService: ProductService,
    public formBuilder: FormBuilder,
    public router: Router,
    private uploadService: FileUploadService,
    private authService: AuthService
  ) {
    this.productForm = this.formBuilder.group({
      productName: ['', [Validators.required, Validators.minLength(4)]],
      file: [null, Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      created_by: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService
      .getCurrentUser()
      .pipe(take(1))
      .subscribe((res) => {
        this.productForm.get('created_by')?.patchValue(res?.uid);
      });
  }

  onSubmit1() {
    if (this.selectedFiles) {
      this.currentFileUpload = new FileUpload(this.selectedFiles);
      this.uploadService
        .pushFileToStorage(this.currentFileUpload)
        .then((file$) => {
          file$.pipe(take(1)).subscribe((img) => {
            this.productForm.get('file')?.patchValue(img);
            console.log(this.productForm.get('file')?.value);
            this.productService
              .createProduct(this.productForm.value)
              .then(() => {
                this.router.navigate(['/dashboard/product']);
              });
          });
        });
    }
  }
  selectFile(event: any): void {
    this.selectedFiles = event.target.files[0];
  }
}
