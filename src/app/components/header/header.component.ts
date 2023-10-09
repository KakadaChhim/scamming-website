import {Component, Input} from "@angular/core";
import {Cart, CartItem} from "../../model/cart.model";
import {CartService} from "../../services/cart.service";

@Component({
    selector: 'app-header',
    template: `
        <mat-toolbar class="w-full mx-auto border-0 justify-between fixed top-0 z-10">
            <a routerLink="home">Logo</a>
            <button mat-icon-button [matMenuTriggerFor]="menu">
                <mat-icon
                        [matBadge]="itemsQuantity"
                        [matBadgeHidden]="!itemsQuantity"
                        matBadgeColor="warn"
                >
                    shopping_cart</mat-icon>
            </button>
            <mat-menu #menu="matMenu">
                <div class="p-3 divide-y divide-solid">
                    <div class="pb-3 flex justify-between">
                        <span class="mr-16">{{itemsQuantity}} Items</span>
                        <a routerLink="cart">View Cart</a>
                    </div>
                    <div *ngIf="cart.items.length" class="py-3 ">
                        <div *ngFor="let item of cart.items"
                                class="flex justify-between font-light mb-2">
                            {{item.name}} x {{item.quantity}}
                            <span class="font-bold">{{ item.price | currency }}</span>
                        </div>
                    </div>
                    <div class="py-3 flex justify-between">
                        Total: 
                        <span>{{ getTotal(cart.items) | currency }}</span>
                    </div>
                    <div class="pt-3 flex justify-between">
                        <button (click)="onClearCart()"
                                type="reset" class="bg-rose-600 text-white rounded-full w-9 h-9">
                            <mat-icon>remove_shopping_cart</mat-icon>
                        </button>
                        <button type="reset" class="bg-green-600 text-white rounded-full w-9 h-9">
                            <mat-icon>shopping_cart</mat-icon>
                        </button>
                    </div>
                </div>
            </mat-menu>
        </mat-toolbar>
    `,
})

export class HeaderComponent{
    private _cart: Cart = {items: []};
    itemsQuantity = 0;

    constructor(private cartService: CartService) {
    }

    @Input()
    get cart(): Cart{
        return this._cart;
    }

    set cart(cart: Cart){
        this._cart = cart;
        this.itemsQuantity = cart.items // transform items array to item array
            .map((item) => item.quantity) //and it has only quantity
            .reduce((prev, current) => prev+current, 0); //find final amount of item by add prev and current
    }

    getTotal(item: Array<CartItem>){
        return this.cartService.getTotal(item);
    }

    onClearCart(){
        this.cartService.onClearCart();
    }
}