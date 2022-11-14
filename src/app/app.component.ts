import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ListPaymentDTO } from './payment.model';
import { PaymentService } from './app.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'dataTable';
  displayedColumns: string[] = ['document', 'email', 'description', 'definitive', 'status', 'createdDate', 'dateStart', 'dateEnd', 'actions'];
  dataSource: any;
  listPayment: ListPaymentDTO | any | undefined;

  isLoading = false;
  totalRows = 0;
  currentPage = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  
  constructor(private paymentService: PaymentService) {
    
  }
  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }

  ngOnInit(): void {
    this.getByPagination();
    //this.GetAll();
  }

  getByPagination() {
    this.isLoading = true;

    this.paymentService.getByPagination(this.currentPage + 1, this.pageSize).subscribe(result => {
      this.listPayment = result.allowListRegisters;

      this.dataSource = new MatTableDataSource<ListPaymentDTO>(this.listPayment)      
      this.dataSource.paginator = this.paginator;

      setTimeout(() => {
        this.paginator.pageIndex = this.currentPage;
        this.paginator.length = result.totalCount;
      });

      this.isLoading = false;
    }, error => {
      this.isLoading = false;
    });
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getByPagination();
  }

  GetAll() {
    this.paymentService.getAll()
      .subscribe(result => {
        this.listPayment = result;

        this.dataSource = new MatTableDataSource<ListPaymentDTO>(this.listPayment)
        //this.dataSource.paginator = this.paginator;
        //this.dataSource.sort = this.sort;
      });
  }

  Filterchage(event: Event) {
    const filvalue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filvalue;
  }
  
  FunctionEdit(arg0: any) {
    throw new Error('Method not implemented.');
  }
}
