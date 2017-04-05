import { FinancialPortalPage } from './app.po';

describe('financial-portal App', () => {
  let page: FinancialPortalPage;

  beforeEach(() => {
    page = new FinancialPortalPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
