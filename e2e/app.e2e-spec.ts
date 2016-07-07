import { AfekafacePage } from './app.po';

describe('afekaface App', function() {
  let page: AfekafacePage;

  beforeEach(() => {
    page = new AfekafacePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
