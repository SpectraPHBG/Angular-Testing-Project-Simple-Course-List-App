import {browser, by, element, ElementArrayFinder, ElementFinder} from 'protractor';

export class CourseListPage {

  async navigateTo(): Promise<unknown>{
    return browser.get(browser.baseUrl);
  }

  async getPageTitleText(): Promise<string> {
    return element(by.css('[data-test-selector=course-list-headline]')).getText();
  }

  async getAddButtonText(): Promise<string>{
    return element(by.css('[data-test-selector=button-add]')).getText(); // намиране по data selector
  }

  async getAddButton(): Promise<ElementFinder> { // връща самия html element
    return element(by.css('[data-test-selector=button-add]'));
  }

  async getListElements(): Promise<ElementArrayFinder> {
    return element.all(by.tagName('app-course-item'));
  }

  async getListElementMarkFavoriteButton(id: number): Promise<ElementFinder> {
    return element.all(by.tagName('app-course-item')).get(id).element(by.css('data-test-selector=mark-favorite-button'));
  }

  async getListElementMarkFavoriteButtonText(id: number): Promise<string> {
    return element.all(by.tagName('app-course-item')).get(id).element(by.css('data-test-selector=mark-favorite-button')).getText();
  }

  async getListElementDeleteButton(id: number): Promise<ElementFinder> {
    return element.all(by.tagName('app-course-item')).get(id).element(by.css('data-test-selector=delete-button'));
  }

  async getListElementDeleteButtonText(id: number): Promise<string> {
    return element.all(by.tagName('app-course-item')).get(id).element(by.css('data-test-selector=delete-button')).getText();
  }

  async getSelectedCourseText(): Promise<string> {
    return element(by.css('[data-test-selector=selected-course]')).getText();
  }
}
