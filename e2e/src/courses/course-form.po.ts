import {browser, by, element, ElementFinder} from 'protractor';

export class CourseFormPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(`${browser.baseUrl}courses/add`);
  }

  async navigateToPageInEditMode(): Promise<unknown> {
    return browser.get(`${browser.baseUrl}courses/edit/1`);
  }

  async getPageTitleText(): Promise<string> {
    return element(by.css('[data-test-selector=form-title]')).getText();
  }

  async getPageTitle(): Promise<ElementFinder> {
    return element(by.css('[data-test-selector=form-title]'));
  }

  async getSubmitButtonText(): Promise<string> {
    return element(by.css('[data-test-selector=button-save]')).getText();
  }

  async getBackButtonText(): Promise<string> {
    return element(by.css('[data-test-selector=button-back]')).getText();
  }

  async getBackButton(): Promise<ElementFinder> {
    return element(by.css('[data-test-selector=button-back]'));
  }

  async getSubmitButton(): Promise<ElementFinder> {
    return element(by.css('[data-test-selector=button-save]'));
  }

  async populateForm(title: string, description: string): Promise<void> {
    if (title != null){
      element(by.name('title')).sendKeys(title);
    }
    element(by.name('description')).sendKeys(description);
  }
}
