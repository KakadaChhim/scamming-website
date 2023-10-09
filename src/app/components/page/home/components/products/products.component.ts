import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Product} from "../../../../../model/product.model";

@Component({
    selector: 'app-products',
    template: `
        <mat-card [ngClass]="{'text-center': !fullWidthMode}">
            <div [ngClass]="{'flex':fullWidthMode}">
                <img [ngClass]="{'h-200px': !fullWidthMode, 'h-360px': fullWidthMode}"
                        class="mb-1 mx-auto h-[200px]"
                        src="https://via.placeholder.com/150" alt="">
                <div class="w-full"
                [ngClass]="{'px-8 flex flex-col justify-between': fullWidthMode}">
                    <div>
                        <h5>Shoes</h5>
                        <p class="truncate hover:whitespace-normal">Nike</p>
                        <p *ngIf="fullWidthMode">Description</p>
                    </div>
                    <div class="flex justify-between px-2">
                        <span class="text-red-400">{{ '120' | currency }}</span>
                        <button>
                            <mat-icon (click)="onAddToCart()">shopping_cart</mat-icon>
                        </button>
                    </div>
                </div>
            </div>
        </mat-card>
    `
})

export class ProductsComponent{
    @Input() fullWidthMode = false;
    product: Product = {
        id: 1,
        title: "Dunk Low Panda",
        price: 150,
        category: "shoes",
        description: "the best quality",
        image: "https://via.placeholder.com/150"
    };
    @Output() addToCart = new EventEmitter<Product>();
    onAddToCart(){
        this.addToCart.emit(this.product);
    }
}