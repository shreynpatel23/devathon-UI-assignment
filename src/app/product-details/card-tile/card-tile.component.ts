import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Product } from 'src/app/model/product.model';

@Component({
  selector: 'app-card-tile',
  templateUrl: './card-tile.component.html',
  styleUrls: ['./card-tile.component.scss']
})
export class CardTileComponent implements OnInit {

  constructor() { }
  @Input() product:Product;
  @Input() selectedProduct:Product;
  @Output() onSelectProduct = new EventEmitter<Product>();
  ngOnInit() {
  }
  onEditCard() {
    this.onSelectProduct.emit(this.product);
  }

}
