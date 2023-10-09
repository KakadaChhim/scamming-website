import {Component, EventEmitter, Output} from "@angular/core";

@Component({
    selector: 'app-filters',
    template: `
        <mat-expansion-panel *ngIf="categories">
            <mat-expansion-panel-header>
                <mat-panel-title>Categories</mat-panel-title>
            </mat-expansion-panel-header>
            <mat-selection-list [multiple]="false">
                <mat-list-option (click)="onShowCategory(category)" *ngFor="let category of categories" [value]="category">
                    <button >{{category}}</button>
                </mat-list-option>
            </mat-selection-list>
        </mat-expansion-panel>
        {{favoriteSeason}}
    `
})

export class FiltersComponent{
    @Output() showCategory = new EventEmitter<string>();
    favoriteSeason!:string;
    categories = ['shoes', 'T-shirt', 'ball'];
    onShowCategory(category: string){
        this.showCategory.emit(category);
    }
}