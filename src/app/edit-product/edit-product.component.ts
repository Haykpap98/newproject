import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUpload } from '../models/file-upload.model';
import { ProductService } from '../product.service';
import { FileUploadService } from '../services/file-upload.service';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent {
  public editForm!: FormGroup;
  productRef: any;
  selectedFiles?: any;
  currentFileUpload?: FileUpload;
  constructor(
    public productService: ProductService,
    public formBuilder: FormBuilder,
    private act: ActivatedRoute,
    private router: Router,
    private uploadService: FileUploadService
  ) {
    this.editForm = this.formBuilder.group({
      productName: [''],
      file: [''],
      price: [''],
      description: [''],
    });
  }

  ngOnInit(): void {
    const id: any = this.act.snapshot.paramMap.get('id');

    this.productService.getProductDoc(id).subscribe((res) => {
      this.productRef = res;
      this.editForm = this.formBuilder.group({
        productName: [this.productRef?.productName],
        file: [this.productRef?.file],
        price: [this.productRef?.price],
        description: [this.productRef?.description],
      });
    });
  }

  onSubmit1() {
    // this.productService.updateProduct(this.editForm.value, id);
    // this.router.navigate(['/dashboard/product']);

    if (this.selectedFiles) {
      const id = this.act.snapshot.paramMap.get('id');

      this.currentFileUpload = new FileUpload(this.selectedFiles);
      this.uploadService
        .pushFileToStorage(this.currentFileUpload)
        .then((res) => {
          res.pipe(take(1)).subscribe((res) => {
            this.editForm.get('file')?.patchValue(res);
            this.productService
              .updateProduct(this.editForm.value, id)
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
