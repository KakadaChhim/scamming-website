import {Component, EventEmitter, Output} from "@angular/core";

@Component({
    selector: 'app-product-header',
    template: `
        <mat-card class="mb-4">
            <div class="flex justify-between">
               <div class="p-5">
                   <button mat-button [matMenuTriggerFor]="sortByMenu">
                       sort by {{sort}}
                   </button>
                   <mat-menu #sortByMenu="matMenu">
                       <button (click)="onSortUpdate('desc')" mat-menu-item>desc</button>
                       <button (click)="onSortUpdate('asc')" mat-menu-item>asc</button>
                   </mat-menu>
               </div>
                <div class="flex items-center p-5">
                    <div>
                        <button mat-button [matMenuTriggerFor]="menu">
                            show {{showItemCount}}
                            <mat-icon>expand_more</mat-icon>
                        </button>
                        <mat-menu #menu="matMenu">
                            <button (click)="onItemUpdate('12')" mat-menu-item>12</button>
                            <button (click)="onItemUpdate('24')" mat-menu-item>24</button>
                            <button (click)="onItemUpdate('36')" mat-menu-item>36</button>
                        </mat-menu>
                    </div>
                    <div>
                        <button (click)="onColumnsUpdate(1)">
                            <mat-icon>view_list</mat-icon>
                        </button>
                        <button (click)="onColumnsUpdate(3)">
                            <mat-icon>view_module</mat-icon>
                        </button>
                        <button (click)="onColumnsUpdate(4)">
                            <mat-icon>view_comfy</mat-icon>
                        </button>
                    </div>
                </div>
            </div>
        </mat-card>
    `
})

export class ProductHeaderComponent{
    sort: string = 'desc';
    showItemCount: string = '12';
    @Output() columnsCountChange = new EventEmitter<number>();
    onSortUpdate(newSort: string){
        this.sort = newSort;
    }
    onItemUpdate(newShowItemCount: string){
        this.showItemCount = newShowItemCount;
    }

    onColumnsUpdate(colNum: number){
        this.columnsCountChange.emit(colNum);
    }
}