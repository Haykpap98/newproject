import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogComponent } from '../mat-dialog/mat-dialog.component';
import { ProductService } from '../product.service';
import { AuthService } from '../services/auth.service';
import { Product } from '../student.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  Product!: Product[];
  currentUser: any;

  constructor(
    private productService: ProductService,
    public dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((res) => {
      this.currentUser = res;
    });
    this.productService.getProductList().subscribe((res) => {
      this.Product = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as {}),
        } as unknown as Product;
      });
    });
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    product: any
  ): void {
    const dialogRef = this.dialog.open(MatDialogComponent, {
      width: '350px',
      position: {
        top: '10%',
        left: '40%',
      },
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.productService.deleteProduct(product);
      }
    });
  }
  // //url; //Angular 8
  // url: any; //Angular 11, for stricter type
  // msg = "";

  // //selectFile(event) { //Angular 8
  // selectFile(event: any) { //Angular 11, for stricter type
  // 	if(!event.target.files[0] || event.target.files[0].length == 0) {
  // 		this.msg = 'You must select an image';
  // 		return;
  // 	}

  // 	var mimeType = event.target.files[0].type;

  // 	if (mimeType.match(/image\/*/) == null) {
  // 		this.msg = "Only images are supported";
  // 		return;
  // 	}

  // 	var reader = new FileReader();
  // 	reader.readAsDataURL(event.target.files[0]);

  // 	reader.onload = (_event) => {
  // 		this.msg = "";
  // 		this.url = reader.result;
  // 	}
  // }
}
