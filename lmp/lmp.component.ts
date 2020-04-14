import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import {MatTableDataSource} from '@angular/material/table';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  FormArray
} from "@angular/forms";

export interface Lmp {
  lmp: number;
  rtdTimestamp: Date;
  intervalEnding: Date;
  settlementPoint: string;
  settlementPointType: string;
}

export interface Label {
  upper: string;
  lower: string;
}

@Component({
  selector: 'app-lmp',
  templateUrl: './lmp.component.html',
  styleUrls: ['./lmp.component.scss'],
    animations: [

      trigger('flyInOut', [
        state('in', style({ transform: 'translateX(0) ' })),
        transition('void => *', [
          style({ transform: 'translateX(-100%)'  }),
          animate(300)
        ]),
        transition('* => void', [
          animate(300, style({ transform: 'translateX(100%) ' }))
        ])
      ]),

      trigger('openClose', [     
        state('open', style({
          width: '250px',
          opacity: 1,
          backgroundColor: 'yellow'
        })),
        state('closed', style({
          width: '100px',
          opacity: 0.5,
          backgroundColor: 'green'
        })),
        transition('* => *', [
          animate('1s')
        ]),
      ]),
    ]
})
export class LmpComponent implements OnInit {

  dataSource: MatTableDataSource<Lmp>;
  isOpen = true;
  isShown = false;
  checked_rtd_date = false;
  checked_rtd_time = false;
  checked_end_date = false;
  checked_end_time = false;
  showInit = true;

  filterFormGroup = this.fb.group({
    filters: this.fb.array([this.newFilterFormGroup()]),
  });

  newFilterFormGroup(): FormGroup {
    return this.fb.group({
      filter: [""],
    });
  }

  stopPropagation(event){
    event.stopPropagation();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  toggle() {
   this.showInit = !this.showInit;
    this.isShown = !this.isShown;
  }

  addFilter(event): void {
    event.stopPropagation();
    this.filters.push(this.newFilterFormGroup());
    console.log(this.filterFormGroup);
  }

  deleteFilter(i){
    event.stopPropagation();
    this.filters.removeAt(i);
  }
  

  get filters() {
    return this.filterFormGroup.get("filters") as FormArray;
  }

  opened: boolean = true;

  tables: Label[] = [
    {
      upper:'RTD Indicative',
      lower:'LMP'
    },
    {
      upper:'Wind Power',
      lower:'Production'
    },
    {
      upper:'Forecast Solar',
      lower:'Payload'
    }
  ]

  strs: String[] = [
    'RTD Indicative LMP', 
    'Wind Power Production',
    'Ancillary Service Plan',
    'Aggregated Solar Forecast',
    'Hourly Outage Capacity',
    'Load Forecast by Model & Weather',
    'Load Forecast by Study Area',
    'Load Resource Capacity',
    'RTD Price Adder ORDC',
    'System Wide Demand'
  ]

  lmps: Lmp[];

  header: string[] = [
    'Filter',
    
  ]

  displayedColumns: string[] = [ 
  'rtdTimestamp', 
  'intervalEnding',
  'settlementPoint',
  'settlementPointType',
  'lmp'
  ]

  constructor(private httpClient: HttpClient, private fb: FormBuilder) {}
  
  ngOnInit(): void {
    this.getJSON().subscribe(
      x => {
        this.lmps = x;
        console.log(this.lmps);
        this.dataSource = new MatTableDataSource(this.lmps);
      },
      err => {
        console.error(err);
      }
    );

  }

   getJSON(): Observable<Array<Lmp>> {
    console.log("call getjson");
    return this.httpClient.get<Array<Lmp>>(
      "https://localhost:44360/api/lmp"
    );
  } 

}
