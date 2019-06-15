import {
    Component,
    OnInit,
	ViewChild,
	ElementRef
} from '@angular/core';
import {
    ProductService
} from '../services/product.service';
import {
    Product,
    Options,
	OptionValue
} from '../model/product.model';
import {
    NgForm
} from '@angular/forms';
import { NgxFileDropEntry, FileSystemDirectoryEntry, FileSystemFileEntry} from 'ngx-file-drop';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
	
    selectedProduct: Product;
	products: Product[];
	selectedProductImages: string[];
	totalHeight:number;
	totalWidth:number;
	@ViewChild('prodDetails') prodDetails: ElementRef;
	
	constructor(private productService: ProductService) {}
    ngOnInit() {
		this.totalHeight = this.prodDetails.nativeElement.offsetHeight;
		this.totalWidth =this.prodDetails.nativeElement.offsetWidth;
        this.productService.getData().subscribe(
            (data: any) => {
                this.products = data.products;
                this.products.map(product => product.selectedImage = product.images[0]);
            }
        )
    }

    onSelectProduct(product: Product) {
		this.selectedProduct = product;
		this.selectedProductImages = product.images.filter(image => this.selectedProduct && image != this.selectedProduct.selectedImage);

    }


}
