import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    ViewChild,
    ElementRef
} from '@angular/core';
import {
    Product,
    Options,
    OptionValue
} from 'src/app/model/product.model';
import {
    NgForm
} from '@angular/forms';
import { NgxFileDropEntry, FileSystemDirectoryEntry, FileSystemFileEntry } from 'ngx-file-drop';
import { ProductService } from 'src/app/services/product.service';

@Component({
    selector: 'app-card-tile',
    templateUrl: './card-tile.component.html',
    styleUrls: ['./card-tile.component.scss']
})
export class CardTileComponent implements OnInit {

    constructor(private productService: ProductService) {}
    @Input() product: Product;
	@Input() selectedProduct: Product;
	@Output() onSelectProduct = new EventEmitter<Product>();
	@Input() selectedProductImages:string[];
	@ViewChild('card') card: ElementRef;
	@Input() totalHeight:number;
	@Input() totalWidth:number;

    showBigDiv: boolean = false;
    
    showError: boolean = false;
    errorMessage: string;
    showProductDetails: boolean = false;
	totalInventory = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	files: NgxFileDropEntry[] = [];
	ngOnInit() {
		console.log(this.card);
	}	
	getCss() {
		console.log(this.card.nativeElement.getBoundingClientRect());
		const y = this.card.nativeElement.getBoundingClientRect().left;
		if(y+250 < this.totalWidth) {
			return {
				top:this.card.nativeElement.getBoundingClientRect().top,
				left:y,
				transformOrigin: 'top left'
			}
		} else if( y+250 > this.totalWidth) {
			return {
				top:this.card.nativeElement.getBoundingClientRect().top,
				right: 0,
				//left:0,
				transformOrigin: 'top right'
			}
		}
		
	}
    getTop() {
        return this.card.nativeElement.getBoundingClientRect().top;
    }
    getLeft() {
        return this.card.nativeElement.getBoundingClientRect().left;
    }
    onEditCard() {
		this.showBigDiv = !this.showBigDiv;
		this.onSelectProduct.emit(this.product);
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
			this.showBigDiv = false;
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
