import {Component, OnInit} from "@angular/core";
import {Cart, CartItem} from "../../../model/cart.model";
import {CartService} from "../../../services/cart.service";

@Component({
    selector: 'app-cart',
    template: `
        <mat-card *ngIf="cart.items.length" class="max-w-7xl mx-auto m-5 mt-[65px]">
            <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">

                <!--- Note that these columns can be defined in any order.
                      The actual rendered columns are set as a property on the row definition" -->

                <!-- product Column -->
                <ng-container matColumnDef="product">
                    <th mat-header-cell *matHeaderCellDef> Product </th>
                    <td mat-cell *matCellDef="let element">
                        <img src="{{element.product}}" alt="product" class="w-[100px] my-5"> 
                    </td>
                    <td mat-footer-cell *matFooterCellDef>
                        <button mat-raised-button routerLink="/home">
                            Continue Your Shopping
                        </button>
                    </td>
                </ng-container>

                <!-- Name Column -->
                <ng-container matColumnDef="name">
                    <th mat-header-cell *matHeaderCellDef> Name </th>
                    <td mat-cell *matCellDef="let element"> 
                        <span class="truncate max-w-xs block">{{element.name}}</span> 
                    </td>
                    <td mat-footer-cell *matFooterCellDef></td>
                </ng-container>

                <!-- Weight Column -->
                <ng-container matColumnDef="price">
                    <th mat-header-cell *matHeaderCellDef> Price </th>
                    <td mat-cell *matCellDef="let element"> {{element.price | currency}} </td>
                    <td mat-footer-cell *matFooterCellDef></td>
                </ng-container>

                <!-- Quantity Column -->
                <ng-container matColumnDef="quantity">
                    <th mat-header-cell *matHeaderCellDef> Quantity </th>
                    <td mat-cell *matCellDef="let element" class="text-center">
                        <div class="flex items-center text-center">
                            <button
                                    (click)="onRemoveQuantity(element)"
                                    mat-icon-button>
                                <mat-icon>remove</mat-icon>
                            </button>
                            <span>{{element.quantity}}</span>
                            <button 
                                    (click)="onAddQuantity(element)" 
                                    mat-icon-button>
                                <mat-icon>add</mat-icon>
                            </button>
                        </div>
                    </td>
                    <td mat-footer-cell *matFooterCellDef></td>
                </ng-container>

                <!-- Quantity Column -->
                <ng-container matColumnDef="total">
                    <th mat-header-cell *matHeaderCellDef> Total </th>
                    <td mat-cell *matCellDef="let element"> {{element.price * element.quantity}} </td>
                    <td mat-footer-cell *matFooterCellDef>
                        <span class="font-bold ">{{getTotal(cart.items) | currency}}</span>
                    </td>
                </ng-container>

                <!-- Action Column -->
                <ng-container matColumnDef="action">
                    <th mat-header-cell *matHeaderCellDef> 
                        <button (click)="onClearCart()" mat-raised-button color="warn" class="float-right">Clear All</button>
                    </th>
                    <td mat-cell *matCellDef="let element">
                        <button 
                                (click)="onRemoveFromCart(element)" 
                                mat-mini-fab 
                                color="warn" class="float-right">
                            <mat-icon>close</mat-icon>
                        </button>
                    </td>
                    <td mat-footer-cell *matFooterCellDef>
                        <button mat-raised-button color="primary" class="float-left">
                            Proceed To Checkout
                        </button>
                    </td>
                </ng-container>
                <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
                <tr mat-row *matFooterRowDef="displayedColumns"></tr>
            </table>
        </mat-card>
        <mat-card *ngIf="!cart.items.length" class="p-5 max-w-7xl mx-auto mt-[65px]">
            <p>Your Card is empty.
                <button mat-raised-button routerLink="/home">Start Shopping</button>
            </p>
        </mat-card> 
    `
})

export class CartComponent implements OnInit{

    constructor(private cartService: CartService) {
    }
    cart: Cart = {items: [
        {
            product: "https://via.placeholder.com/150",
            name: "sneaker",
            price: 150,
            quantity: 1,
            id: 1
        },
        {
            product: "https://via.placeholder.com/150",
            name: "sport",
            price: 100,
            quantity: 2,
            id: 2
        }
    ]};

    dataSource: Array<CartItem> = [];

    displayedColumns: Array<string> = [
      'product',
      'name' ,
      'price',
      'quantity',
      'total',
      'action'
    ];

    ngOnInit(): void {
        this.cartService.cart.subscribe((_cart: Cart) =>{
            this.cart = _cart;
            this.dataSource = this.cart.items;
        })
    }

    getTotal(items: Array<CartItem>){
        return this.cartService.getTotal(items);
    }

    onClearCart(){
        this.cartService.onClearCart();
    }

    onRemoveFromCart(item: CartItem){
        this.cartService.removeFromCart(item);
    }

    onAddQuantity(item: CartItem){
        this.cartService.addToCart(item);
    }

    onRemoveQuantity(item: CartItem){
        this.cartService.removeQuantity(item);
    }

}