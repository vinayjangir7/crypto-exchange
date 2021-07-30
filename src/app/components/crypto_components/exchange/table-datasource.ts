import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, merge, of as observableOf } from 'rxjs';
import { map } from 'rxjs/operators';
import { Asset } from 'src/app/shared/models/crypto_models/asset.model';

/**
 * Data source for the Table view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TableDataSource extends MatTableDataSource<Asset> {
  constructor(private assets: Asset[]) {
    super();
    this.data = assets;
  }

  filterData$ = new BehaviorSubject<Asset[]>([]);
  set fData(v: Asset[]) {
    this.filterData$.next(v);
  }
  get fData(): Asset[] {
    return this.filterData$.value;
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): BehaviorSubject<Asset[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      const bSub$ = new BehaviorSubject<Asset[]>([]);
      merge(
        observableOf(this.data),
        this.paginator.page,
        this.sort.sortChange,
        this.filterData$
      )
        .pipe(
          map(() => {
            return this.getPagedData(
              this.getSortedData([...this.filteredData])
            );
          })
        )
        .subscribe(bSub$);
      return bSub$;
    } else {
      throw Error(
        'Please set the paginator and sort on the data source before connecting.'
      );
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Asset[]): Asset[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Asset[]): Asset[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      const property: string = this.sort?.active ? this.sort?.active : '';
      return compare(a[property], b[property], isAsc);
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string, b: string, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
