import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Asset } from 'src/app/shared/models/crypto_models/asset.model';
import { AssetService } from 'src/app/shared/services/crypto-services/asset.service';
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
export class ExchangeComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Asset>;
  dataSource!: TableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  columns!: IColumn[];
  displayedColumns!: string[];

  constructor(private assetService: AssetService) {}

  ngAfterViewInit(): void {
    this.assetService.getAssets().subscribe((assets: Asset[]) => {
      this.dataSource = new TableDataSource(assets);
      console.log(this.dataSource);
      this.columns = [
        { key: 'name', value: 'Name' },
        { key: 'symbol', value: 'Symbol' },
        { key: 'priceUsd', value: 'Price($)' },
        { key: 'changePercent24Hr', value: 'Change in 24 Hrs' },
      ];
      this.displayedColumns = this.columns.map((col) => col.key);
      console.log(this.displayedColumns);

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
