import {HttpClient} from '@angular/common/http'
import { Product } from '../model/product.model';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductService{
    products:Product[];
    constructor(private http:HttpClient) {
    }
    getAllProducts(){

    }
    getData() {
        return this.http.get('../../assets/data.json');
    }
}