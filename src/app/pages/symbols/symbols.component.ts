import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-symbols',
  templateUrl: './symbols.component.html',
  styleUrls: ['./symbols.component.sass']
})
export class SymbolsComponent implements OnInit {

  private settings = {
    columns: {
      id: {
        title: 'ID',
        class: 'th_column_table',
        type: 'html',
        valuePrepareFunction: (cell,row) => {return '<a href="' + cell + '">' + cell + '</a>'}
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
  private data = [
    {
      "id": 2,
      "name": "Jpmorgan Investment Funds - Global Macro Opportunities Fund A Acc",
      "currency": "EUR",
      "risk_family": "Balanced",
    },
    {
      "id": 2,
      "name": "Allianz Fondsvorsorge 1977-1996 A Acc",
      "currency": "EUR",
      "risk_family": "Balanced"
    },
    {
      "id": 2,
      "name": "JB MP Konwave Gold Equity Fund B Acc",
      "currency": "USD",
      "risk_family": "Equity"
    },
    {
      "id": 2,
      "name": "Invesco Pan European Structured Equity Fund A Acc",
      "currency": "EUR",
      "risk_family": "Equity"
    },
    {
      "id": 2,
      "name": "Invesco Pan European High Income Fund E Acc",
      "currency": "EUR",
      "risk_family": "Balanced"
    },
    {
      "id": 2,
      "name": "Henderson Horizon Pan European Property Equities Fund A2 Acc",
      "currency": "JPY",
      "risk_family": "Equity"
    },
    {
      "id": 2,
      "name": "Carmignac Patrimoine A Acc",
      "currency": "EUR",
      "risk_family": "Balanced"
    },
    {
      "id": 2,
      "name": "Global Stable Equity Fund BI Acc",
      "currency": "EUR",
      "risk_family": "Equity"
    },
    {
      "id": 2,
      "name": "Stable Return Fund BP Acc",
      "currency": "JPY",
      "risk_family": "Balanced"
    },
    {
      "id": 2,
      "name": "Janus Global Life Sciences Fund I (acc.) Acc",
      "currency": "USD",
      "risk_family": "Equity"
    }
  ];

  public symbolsCurrencyChart:string[] = ['USD', 'JPY', 'EUR'];
  public symbolsCurrencyChartData:number[] = [];
  public symbolsCurrencyChartType:string = 'doughnut';

  public symbolsRiskChart:string[] = ['Equity', 'Balanced'];
  public symbolsRiskChartData:number[] = [];
  public symbolsRiskChartType:string = 'doughnut';

  constructor() { }

  ngOnInit() {
    this.getCurrencyLength();
    this.getRiskLength();
  }

  // events
  public chartClicked(e:any):void {
    //console.log(e);
  }

  public chartHovered(e:any):void {
    //console.log(e);
  }

  private getCurrencyLength() {

    let symbolsUSD = this.data.filter(symbol =>{
      return symbol.currency == "USD";
    });

    let symbolsJPY = this.data.filter(symbol =>{
      return symbol.currency == "JPY";
    });

    let symbolsEUR = this.data.filter(symbol =>{
      return symbol.currency == "EUR";
    });

    let lengthUSD = symbolsUSD.length;
    let lengthJPY = symbolsJPY.length;
    let lengthEUR = symbolsEUR.length;

    this.symbolsCurrencyChartData = [lengthUSD, lengthJPY, lengthEUR];
  }

  private getRiskLength() {

    let symbolsEquity = this.data.filter(symbol =>{
      return symbol.risk_family == "Equity";
    });

    let symbolsBalanced = this.data.filter(symbol =>{
      return symbol.risk_family == "Balanced";
    });

    let lengthEquity = symbolsEquity.length;
    let lengthBalanced = symbolsBalanced.length;

    this.symbolsRiskChartData = [lengthEquity, lengthBalanced];
  }

  private prepareHTML() {
   return '<a href="value"></a>';
  }

}
