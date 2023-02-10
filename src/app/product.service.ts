import { Injectable } from '@angular/core';
import { Product } from './student.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productCollection = '/product';
  paginator: any;
  
  constructor(private angularFirestore: AngularFirestore) { }
  getProductDoc(id: string){
    return this.angularFirestore
    .collection(this.productCollection)
    .doc(id)
    .valueChanges()
  }
  getProductList(){
    return this.angularFirestore
    .collection(this.productCollection)
    .snapshotChanges()
  }
  createProduct(product: Product){
      return this.angularFirestore
      .collection(this.productCollection)
      .add(product)
      
  }
  deleteProduct(product: any){
    return this.angularFirestore
    .collection(this.productCollection)
    .doc(product.id)
    .delete()
  }
  updateProduct(product: Product, id: any){
    return this.angularFirestore
    .collection(this.productCollection)
    .doc(id)
    .update({
      productName: product.productName,
      description: product.description,
      price: product.price,
      file: product.file,
    })
  }
}
