import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product, Options } from '../model/product.model';
import { NgForm } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  selectedProduct:Product;
  showProductDetails:boolean = false;
  products:Product[];
  addImage:boolean = false;
  selectedProductImages:string[];
  showError:boolean = false;

  totalInventory = [1,2,3,4,5,6,7,8,9,10];

  constructor(private productService:ProductService) {}
  ngOnInit() {
    this.productService.getData().subscribe(
      (data:any) => {
        this.products= data.products;
        this.products.map(product => product.selectedImage = product.images[0]);
      }
    )
  }

  onSelectProduct(product:Product){
    this.selectedProduct = product;
    this.selectedProductImages = product.images.filter(image => image != this.selectedProduct.selectedImage);
    this.showProductDetails = !this.showProductDetails;
  }

  closeSelectProduct(){
    this.showProductDetails = false;
    this.selectedProduct = null;
    if(this.addImage === true){
      this.addImage = false;
    }
  }

  addMoreOptions(){
    let newOption = new Options('',['']);
    this.selectedProduct.options.push(newOption);
  }
  
  addOptionValues(id:number){
    this.selectedProduct.options[id].optionValues.push('');
  }

  onSelectInventory(number:number){
    this.selectedProduct.totalInventory = number;
  }

  updateProductDetails(form:NgForm){
    if(form.value.productTitle === '' || form.value.productTitle.length <0 ||
       form.value.productPrice === '' || form.value.productPrice.length <0 ||
       form.value.productDescription === '' || form.value.productDescription.length <0 ||
       form.value.productOfferPrice === '' || form.value.productOfferPrice.length <0 ||
       form.value.shippingCost === '' || form.value.shippingCost.length <0){
        this.showError = true;
    } else{
      this.showError =false;
      this.showProductDetails = false;
      this.selectedProduct.productTitle = form.value.productTitle;
      this.selectedProduct.productPrice = form.value.productPrice;
      this.selectedProduct.productDescription = form.value.productDescription;
      this.selectedProduct.productOfferPrice = form.value.productOfferPrice;
      this.selectedProduct.shippingCost = form.value.shippingCost;
    }
  }
  uploadImage(){
    this.addImage = !this.addImage;
    if(this.showError === true){
      this.showError = false;
    }
  }
  onAddNewImage(form:NgForm){
    let url = form.value.imageURL;
    let jpeg = 'jpeg'; 
    let png = 'png';
    let tif = 'tif';
    let gif = 'gif';
    if(url.includes(jpeg) || url.includes(png) || url.includes(tif) || url.includes(gif)){
      this.addImage = false;
      this.selectedProduct.images.push(url);
      this.selectedProductImages = this.selectedProduct.images.filter(image => image != this.selectedProduct.selectedImage);
      this.showError = false;
    } else{
      this.showError = true;
    }
  }
  onSelectImage(image:string) {
    this.selectedProduct.selectedImage = image;
    this.selectedProductImages = this.selectedProduct.images.filter(image => image != this.selectedProduct.selectedImage);
  }

}
