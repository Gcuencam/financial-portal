import {Component, OnInit, ViewChild} from '@angular/core';
import { SymbolActions } from '../../actions/symbol.actions';
import {select} from "ng2-redux";
import {Observable} from "rxjs";
import { LocalDataSource } from 'ng2-smart-table';
import {BaseChartDirective} from "ng2-charts";
import {CustomRenderComponent} from "../../components/custom-render-component/custom-render-component.component";

@Component({
  selector: 'app-symbols',
  templateUrl: './symbols.component.html',
  styleUrls: ['./symbols.component.sass'],
  providers: [SymbolActions]
})
export class SymbolsComponent implements OnInit {

  @select() symbols: Observable<any>;

  private doughnutChartColours: any[] = [{
    backgroundColor: [
      "#FF6384",
      "#36A2EB",
      "#FFCE56"
    ],
    hoverBackgroundColor: [
      "#FF6384",
      "#36A2EB",
      "#FFCE56"
    ]
  }];

  private doughnutChartCurrencyOptions = {
    title: {
      display: true,
      text: 'Currency'
    }
  };

  private doughnutChartRiskOptions = {
    title: {
      display: true,
      text: 'Risk Family'
    }
  };

  private settings = {
    columns: {
      id: {
        title: 'ID',
        type: 'custom',
        renderComponent: CustomRenderComponent,
      },
      name: {
        title: 'Name'
      },
      currency: {
        title: 'Currency'
      },
      risk_family: {
        title: 'Risk Family'
      }
    },
    actions: {
      add: false,
      edit: false,
      delete: false
    },
    hideSubHeader: true
  };


  private symbolList: LocalDataSource;
  private symbolArrayList: Array<any>;

  public symbolsCurrencyChart: string[] = ['USD', 'JPY', 'EUR'];
  public symbolsCurrencyChartData: number[] = [];
  public symbolsCurrencyChartType: string = 'doughnut';

  public symbolsRiskChart: string[] = ['Equity', 'Balanced'];
  public symbolsRiskChartData: number[] = [];
  public symbolsRiskChartType: string = 'doughnut';

  constructor(private symbolActions: SymbolActions) {
    this.symbols.subscribe(symbols => {
      const {symbolsList, symbol} = symbols.toJS();
      this.symbolList = new LocalDataSource(symbolsList);
      this.symbolArrayList = symbolsList;
      if (this.symbolArrayList.length > 0) {
        this.getCurrencyLength();
        this.getRiskLength();
      }
    });

  }

  ngOnInit() {

  }

  /**
   * private getCurrencyLength - Calculates the length of the currencies.
   *
   */
  private getCurrencyLength() {

    let symbolsUSD = this.symbolArrayList.filter(symbol => {
      return symbol.currency == "USD";
    });

    let symbolsJPY = this.symbolArrayList.filter(symbol => {
      return symbol.currency == "JPY";
    });

    let symbolsEUR = this.symbolArrayList.filter(symbol => {
      return symbol.currency == "EUR";
    });

    let lengthUSD = symbolsUSD.length;
    let lengthJPY = symbolsJPY.length;
    let lengthEUR = symbolsEUR.length;

    this.symbolsCurrencyChartData = [lengthUSD, lengthJPY, lengthEUR];
  }

  /**
   * private getRiskLength - Calculates the length of the risks.
   *
   */
  private getRiskLength() {

    let symbolsEquity = this.symbolArrayList.filter(symbol => {
      return symbol.risk_family == "Equity";
    });

    let symbolsBalanced = this.symbolArrayList.filter(symbol => {
      return symbol.risk_family == "Balanced";
    });

    let lengthEquity = symbolsEquity.length;
    let lengthBalanced = symbolsBalanced.length;

    this.symbolsRiskChartData = [lengthEquity, lengthBalanced];
  }
}
