import {Component} from "@angular/core";
import {CartService} from "../../../services/cart.service";
import {Product} from "../../../model/product.model";

@Component({
    selector: 'app-home',
    template: `
        <mat-drawer-container
                [autosize]="true"
                class="min-h-full mx-auto max-w-7xl border-x mt-[60px]"
        >
            <mat-drawer mode="side" opened class="">
                <div class="p-6">
                    <app-filters (showCategory)="onShowCategory($event)"></app-filters>
                </div>
            </mat-drawer>
            <mat-drawer-content class="p-6">
                <app-product-header (columnsCountChange)="onColumnsCountChange($event)"></app-product-header>
                <mat-grid-list 
                        gutterSize="16"
                        [cols]="cols"
                        [rowHeight]="rowHeight"
                >
                    <mat-grid-tile>
                        <app-products (addToCart)="onAddToCart($event)"
                                class="w-full" [fullWidthMode]="cols === 1"></app-products>
                    </mat-grid-tile>
                </mat-grid-list>
            </mat-drawer-content>
        </mat-drawer-container>
    `
})

export class HomeComponent{
    constructor(private cartService: CartService) {
    }
    ROW_HEIGHT: {[id: number]: number} = {1:400, 3:335, 4:350};
    cols = 3;
    rowHeight = (this.ROW_HEIGHT[this.cols]);
    category!: string;
    onColumnsCountChange(colNum: number){
        this.cols = colNum;
    }
    onShowCategory(newCategory: any){
        this.category = newCategory;
        // console.log(this.category)
    }

    onAddToCart(product: Product){
        this.cartService.addToCart({
            product: product.image,
            name: product.title,
            price: product.price,
            quantity: 1,
            id: product.id
        });
    }
}