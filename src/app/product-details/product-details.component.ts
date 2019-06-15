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
    showProductDetails: boolean = false;
    products: Product[];
    addImage: boolean = false;
    selectedProductImages: string[];
    showError: boolean = false;
    errorMessage: string;
    totalInventory = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	files: NgxFileDropEntry[] = [];
	constructor(private productService: ProductService) {}
    ngOnInit() {
		
        this.productService.getData().subscribe(
            (data: any) => {
                this.products = data.products;
                this.products.map(product => product.selectedImage = product.images[0]);
            }
        )
    }

    onSelectProduct(product: Product) {
		this.selectedProduct = product;
        this.selectedProductImages = product.images.filter(image => image != this.selectedProduct.selectedImage);
        this.showProductDetails = !this.showProductDetails;
    }

    closeSelectProduct() {
        this.showProductDetails = false;
        this.selectedProduct = null;
        if (this.addImage === true) {
            this.addImage = false;
        }
    }

    addMoreOptions() {
		let newOption = new Options();
		newOption.optionName = '';
		newOption.optionValues = [];
        this.selectedProduct.options.push(newOption);
    }

    addOptionValues(id: number) {
        this.selectedProduct.options[id].optionValues.push(new OptionValue());
    }

    onSelectInventory(number: number) {
        this.selectedProduct.totalInventory = number;
    }

    updateProductDetails(form: NgForm) {
        if (form.value.productTitle === '' || form.value.productTitle.length < 0) {
            this.showError = true;
			this.errorMessage = 'PRODUCT TITLE CANNOT BE EMPTY';
        } else if (form.value.productDescription === '' || form.value.productDescription.length < 0) {
            this.showError = true;
            this.errorMessage = 'PRODUCT DESCRIPTION CANNOT BE EMPTY';
        } else if (form.value.productPrice === null || form.value.productPrice < 0) {
            this.showError = true;
            if (form.value.productPrice === null) {
                this.errorMessage = 'PRODUCT PRICE CANNOT BE EMPTY';
            } else if (form.value.productPrice < 0) {
                this.errorMessage = 'PRODUCT PRICE CANNOT BE NEGATIVE';
            }
        } else if (form.value.productOfferPrice === null || form.value.productOfferPrice < 0) {
            this.showError = true;
            if (form.value.productOfferPrice === null) {
                this.errorMessage = 'PRODUCT OFFER PRICE CANNOT BE EMPTY';
            } else if (form.value.productOfferPrice < 0) {
                this.errorMessage = 'PRODUCT OFFER PRICE CANNOT BE NEGATIVE';
            }
        } else if (form.value.shippingCost === null || form.value.shippingCost < 0) {
            this.showError = true;
            if (form.value.shippingCost === null) {
                this.errorMessage = 'PRODUCT SHIPPING COST CANNOT BE EMPTY';
            } else if (form.value.shippingCost < 0) {
                this.errorMessage = 'PRODUCT SHIPPING COST CANNOT BE NEGATIVE';
            }
        } else {
            this.showError = false;
            this.showProductDetails = false;
            this.selectedProduct.productTitle = form.value.productTitle;
            this.selectedProduct.productPrice = form.value.productPrice;
            this.selectedProduct.productDescription = form.value.productDescription;
            this.selectedProduct.productOfferPrice = form.value.productOfferPrice;
			this.selectedProduct.shippingCost = form.value.shippingCost;
			this.selectedProduct.totalInventory = form.value.totalInventory;
        }
	}
	getOptionValues(e,i,j) {
		this.selectedProduct.options[i].optionValues[j]= e.target.value;
	}
    uploadImage() {
        this.addImage = !this.addImage;
        if (this.showError === true) {
            this.showError = false;
        }
    }
    onAddNewImage(form: NgForm) {
        let url = form.value.imageURL;
        if (url.includes('jpeg') || url.includes('png') || url.includes('tif') || url.includes('gif')) {
            this.addImage = false;
            this.selectedProduct.images.push(url);
            this.selectedProductImages = this.selectedProduct.images.filter(image => image != this.selectedProduct.selectedImage);
            this.showError = false;
        } else {
			this.showError = true;
			form.reset();
        }
    }
    onSelectImage(image: string) {
        this.selectedProduct.selectedImage = image;
        this.selectedProductImages = this.selectedProduct.images.filter(image => image != this.selectedProduct.selectedImage);
	}

	dropped(files: NgxFileDropEntry[]) {
		this.files = files;
		for (const droppedFile of files) {
	 
		  // Is it a file?
		  if (droppedFile.fileEntry.isFile) {
			const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        	fileEntry.file((file: File) => {
				var myReader: FileReader = new FileReader();

				myReader.onloadend = (e) => {
				let fileContent: string = myReader.result as string;;
				this.selectedProduct.images.push(fileContent);
            	this.selectedProductImages = this.selectedProduct.images.filter(image => image != this.selectedProduct.selectedImage);
				}
				myReader.readAsDataURL(file);
			})
			
		  } else {
			// It was a directory (empty directories are added, otherwise only files)
			const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
			
		  }
		}
	  }
	 
	  public fileOver(event){
	  }
	 
	  public fileLeave(event){
	  }

}
