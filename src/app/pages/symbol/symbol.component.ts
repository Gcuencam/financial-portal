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

  private id: Number;
  private symbol;
  private comment: String;
  private comments: Array<Comment>;
  public loading: Boolean;

  public lineChartData: Array<any> = [
    { data: [], label: 'Precio' },
  ];
  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    {
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
        this.loading = !this.loading;
      }
    });
    this.comment = "";
  }

  ngOnInit() {
    this.loading = false;
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.getDetailData(this.id);
      this.loading = !this.loading;
    });
    if (this.symbolsList.length == 0) {
      this.symbolActions._fetch();
    }
  }

  /**
   * private getDetailData - Gets the symbol detail.
   *
   * @param  {Number} id description
   */
  private getDetailData(id) {
    this.symbolActions._fetchDetail(id).subscribe(result =>
      this.setData(result.json())
    );
  }

  /**
   * private setData - Formats the data.
   *
   * @param  {} _symbol description
   */
  private setData(_symbol) {
    _symbol.regionForm =  this.formRegion(_symbol.region);
    _symbol.riskFamilyForm = this.formRiskFamily(_symbol.risk_family);
    _symbol.sectorForm = this.formSector(_symbol.sector);
    this.symbolActions.setSymbol(_symbol);
  }

  /**
   * private formRegion - Formats the region.
   *
   * @param  {} region description
   * @return {string}
   */
  private formRegion(region) {
      return region['name'] + "/" + region['region_level2']['name'] + "/" + region['region_level2']['region_level3']['name'];
  }

  /**
   * private formRiskFamily - Formats the risk family.
   *
   * @param  {} riskFamily description
   * @return {string}
   */
  private formRiskFamily(riskFamily) {
    return riskFamily['name'] + "/" + riskFamily['sub_family']['name'];
  }

  /**
   * private formSector - Formats the sector.
   *
   * @param  {} sector description
   * @return {string}
   */
  private formSector(sector) {
    if(sector) {
      if(sector.hasOwnProperty('sector_level2') && sector['sector_level2'] !== null){
        if(sector['sector_level2'].hasOwnProperty('sector_level3') && sector['sector_level2']['sector_level3'] !== null) {
          return sector['name'] + "/" + sector['sector_level2']['name'] + "/" + sector['sector_level2']['sector_level3']['name'];
        }
        return sector['name'] + "/" + sector['sector_level2']['name'];
      }
      return sector['name'];
    }
    return "No sector";
  }

  public chartClicked(e: any): void {

  }

  public chartHovered(e: any): void {

  }

  /**
   * public prepareChart - Prepares the data for the chart.
   *
   * @param  {Array} dataSet description
   */
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

  /**
   * public sendComment - Generates a Comment.
   *
   */
  public sendComment() {
    let comment = new CommentSymbol(this.symbol.id, new Date(), this.comment);
    this.symbolActions.addComment(comment);
    this.comments = this.symbolActions.getComments(this.symbol);

  }

  /**
   * public deleteComment - Deletes a Comment.
   *
   */
  public deleteComment(commentId) {
    this.symbolActions.removeComment(commentId);
    this.comments = this.symbolActions.getComments(this.symbol);
  }

  /**
   * public enableEdit - Enable disable texarea and edit a Comment.
   *
   */
  public enableEdit(comment){
    if(!comment._disabled){
      this.symbolActions.setComments(comment);
    }
    comment._disabled = !comment._disabled;
  }

}
