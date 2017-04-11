import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {SymbolActions} from "../../actions/symbol.actions";
import {select} from "ng2-redux";
import {Observable} from "rxjs";
import {CommentSymbol} from "../../classes/comment";


@Component({
  selector: 'app-symbol',
  templateUrl: './symbol.component.html',
  styleUrls: ['./symbol.component.sass'],
  providers: [SymbolActions]
})
export class SymbolComponent implements OnInit {

  private id;
  private symbol;
  private comment;
  private comments = [];

  private symbolsList = [];
  @select() symbols: Observable<any>;

  constructor(private route: ActivatedRoute, private symbolActions: SymbolActions) {
    this.symbols.subscribe(symbols => {
      const {symbolsList, symbol} = symbols.toJS();
      this.symbol = symbol;
      this.symbolsList = symbolsList;
      if (symbol.prices.length > 0) {
        this.prepareChart(symbol.prices);
        this.comments = this.symbolActions.getComments(this.symbol);
      }
    });
    this.comment = "";
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.getDetailData(this.id);
    });
    if (this.symbolsList.length == 0) {
      this.symbolActions._fetch();
    }
  }

  private getDetailData(id) {
    this.symbolActions._fetchDetail(id).subscribe(result =>
      this.setData(result.json())
    );
  }

  private setData(_symbol) {
    _symbol.regionForm = this.formRegion(_symbol.region);
    _symbol.riskFamilyForm = this.formRiskFamily(_symbol.risk_family);
    _symbol.sectorForm = this.formSector(_symbol.sector);
    this.symbolActions.setSymbol(_symbol);
  }

  private formRegion(region) {

  }

  private formRiskFamily(riskFamily) {

  }

  private formSector(sector) {

  }

  // lineChart
  public lineChartData: Array<any> = [
    { data: [], label: 'Precio' },
  ];
  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "rgba(75,192,192,1)",
      pointRadius: 0,
      pointHoverRadius: 6,
      pointHoverBackgroundColor: "rgba(0,0,0,0.7)",
      pointHoverBorderColor: "rgba(255,255,255,1)",
      pointHoverBorderWidth: 3
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  public prepareChart(dataSet) {
    let arrayData = [];
    let arrayLabels = [];
    for (let data of dataSet) {
      let date = new Date(data['date']);
      let formatDate = date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear();
      arrayData.push(data['value']);
      arrayLabels.push(formatDate);
    }
    this.lineChartData[0].data = arrayData;
    this.lineChartLabels = arrayLabels;
  }

  public sendComment() {
    let comment = new CommentSymbol(this.symbol.id, new Date(), this.comment);
    this.symbolActions.addComment(comment);
    this.comments = this.symbolActions.getComments(this.symbol);

  }

}
