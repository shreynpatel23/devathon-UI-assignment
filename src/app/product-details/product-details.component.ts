import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  selectedProduct:Product;
  showProductDetails:boolean = false;
  products:Product[];
  constructor(private productService:ProductService) {}
  ngOnInit() {
    this.productService.getData().subscribe(
      (data:any) => {
        this.products= data.products;
        this.products.map(product => product.selectedImage = product.images[0]);
      }
    )
  }

  showSelectedProduct(product:Product){
    this.selectedProduct = product;
    this.showProductDetails = !this.showProductDetails;
  }

}
