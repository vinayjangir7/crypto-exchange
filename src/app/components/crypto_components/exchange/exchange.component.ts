import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Asset } from 'src/app/shared/models/crypto_models/asset.model';
import { Rate } from 'src/app/shared/models/crypto_models/rate.model';
import { AssetService } from 'src/app/shared/services/crypto-services/asset.service';
import { RateService } from 'src/app/shared/services/crypto-services/rate.service';
import { ThemeService } from 'src/app/shared/services/theme/theme.service';
import { TableDataSource } from './table-datasource';

export interface IColumn {
  key: string;
  value: string;
}
@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss'],
})
export class ExchangeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Asset>;
  dataSource!: TableDataSource;
  cachedAssets: Asset[] = [];

  columns!: IColumn[];
  displayedColumns!: string[];
  iconColor!: string;
  defaultIcon!: string;
  subscriptions: Subscription[] = [];

  rates!: Rate[];
  selectedRate!: BehaviorSubject<Rate | undefined>;
  filteredRates!: Observable<Rate[]>;
  currencyForm = new FormControl();

  constructor(
    private assetService: AssetService,
    private themeService: ThemeService,
    private rateService: RateService
  ) {
    this.iconColor = themeService.isDarkMode ? 'color' : 'black';
    this.defaultIcon = `./assets/crypto-icons/svg/${this.iconColor}/generic.svg`;
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.subscriptions.push(
      this.rateService.getRates().subscribe((ratesArray) => {
        /* Sorting in ascending order based on rate id's */
        ratesArray.sort((r1: Rate, r2: Rate) => r1.id.localeCompare(r2.id));
        this.rates = ratesArray.map((rateObj: Rate) => {
          // To convert id into PascalCase
          rateObj.id = rateObj.id.replace(/(\w)(\w*)/g, (g0, g1, g2) => {
            return g1.toUpperCase() + g2.toLowerCase();
          });
          return rateObj;
        });
        /* Initializing currency autocomplete */
        this.filteredRates = this.currencyForm.valueChanges.pipe(
          startWith(''),
          map((value: string | Rate) =>
            typeof value === 'string' ? value : value.id
          ),
          map((name) => (name ? this.filterRate(name) : this.rates.slice()))
        );
        /* Initializing the default currency */
        const rate = this.rates.find(
          (rateObj: Rate) => rateObj.symbol == 'USD'
        );
        this.selectedRate = new BehaviorSubject(rate);
      })
    );
  }

  ngAfterViewInit(): void {
    this.subscriptions.push(
      this.assetService.getAssets().subscribe((assets: Asset[]) => {
        const assetsWithIcon = this.addIcon(assets);
        this.dataSource = new TableDataSource(assetsWithIcon);
        if (this.cachedAssets.length == 0) {
          this.cachedAssets = assetsWithIcon;
          console.log(this.cachedAssets);
        }

        this.columns = [
          { key: 'symbol', value: 'Symbol' },
          { key: 'name', value: 'Name' },
          {
            key: 'priceUsd',
            value: `Price (${
              this.selectedRate && this.selectedRate?.value?.currencySymbol
                ? this.selectedRate?.value?.currencySymbol
                : this.selectedRate?.value?.symbol
            })`,
          },
          { key: 'changePercent24Hr', value: '24H Change' },
        ];
        this.displayedColumns = this.columns.map((col) => col.key);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
      })
    );
  }
  /**
   * Add crypto currency icons to the assets
   *
   * @param {Asset[]} assets
   * @return {*}  {Asset[]}
   * @memberof ExchangeComponent
   */
  addIcon(assets: Asset[]): Asset[] {
    return assets.map((asset: Asset) => {
      asset.icon = `./assets/crypto-icons/svg/${this.iconColor}/${asset.symbol
        .toLowerCase()
        .trim()}.svg`;
      return asset;
    });
  }

  /**
   *Filter table data
   *
   * @param {Event} event
   * @memberof ExchangeComponent
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.dataBS = this.dataSource.filteredData;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   *Loads a default image on img elements onError event.
   *
   * @param {*} event
   * @memberof ExchangeComponent
   */
  onImgError(event: any): void {
    event.target.src = this.defaultIcon;
  }

  /**
   *Function to filter the rates based on user input in currency autocomplete
   *
   * @param {string} filterStr
   * @return {*}  {Rate[]}
   * @memberof ExchangeComponent
   */
  private filterRate(filterStr: string): Rate[] {
    const value = filterStr?.trim().toLowerCase();
    return this.rates.filter(
      (rate: Rate) =>
        rate.id.toLowerCase().includes(value) ||
        rate.symbol.toLowerCase().includes(value)
    );
  }

  /**
   *Function which will provide readable rate in the UI
   *
   * @param {Rate} rate
   * @return {*}  {string}
   * @memberof ExchangeComponent
   */
  displayReadableRate(rate: Rate): string {
    return rate && rate.id && rate.symbol ? `${rate.id} (${rate.symbol})` : '';
  }

  /**
   *Function to get selected currency from auto complete
   *
   * @param {MatAutocompleteSelectedEvent} event
   * @memberof ExchangeComponent
   */
  getSelectedCurrency(event: MatAutocompleteSelectedEvent): void {
    this.selectedRate.next(event.option.value);
    this.columns = this.updateHeaders(this.columns);
    this.dataSource.dataBS = this.updateRates();
  }

  /**
   *Function to update rates based on selected currency
   *
   * @private
   * @return {*}  {Asset[]}
   * @memberof ExchangeComponent
   */
  private updateRates(): Asset[] {
    const assetsArray: Asset[] = JSON.parse(JSON.stringify(this.cachedAssets));
    return assetsArray.map((asset: Asset) => {
      asset.priceUsd = this.selectedRate.value
        ? (
            parseFloat(asset.priceUsd) /
            parseFloat(this.selectedRate.value?.rateUsd)
          ).toString()
        : asset.priceUsd;
      return asset;
    });
  }

  /**
   *Function to update currency symbol in table header
   *
   * @param {IColumn[]} columns
   * @return {*}  {IColumn[]}
   * @memberof ExchangeComponent
   */
  updateHeaders(columns: IColumn[]): IColumn[] {
    let cols: IColumn[] = [];
    this.subscriptions.push(
      this.selectedRate.subscribe((rate: Rate | undefined) => {
        if (rate) {
          cols = columns.map((col: IColumn) => {
            if (col.key == 'priceUsd') {
              col.value = `Price (${
                rate.currencySymbol ? rate.currencySymbol : rate.symbol
              })`;
            }
            return col;
          });
        }
      })
    );
    return cols;
  }

  ngOnDestroy(): void {
    if (this.subscriptions.length > 0) {
      this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
    }
  }
}
