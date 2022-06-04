
import {browser} from 'protractor';
import {CourseFormPage} from './course-form.po';
import {CourseListPage} from './course-list.po';

describe('Course Add Edit Page', () => {

  let page: CourseFormPage;

  beforeEach(() => {
    page = new CourseFormPage();
  });

  it('should have proper labeling when it is loaded in create mode', () => {
    page.navigateTo().then(() => {
      page.getPageTitleText().then((pageTitleText) => {
        expect(pageTitleText).toEqual('Add course');

        page.getSubmitButtonText().then((submitButtonText) => {
          expect(submitButtonText).toEqual('Save');

          page.getBackButtonText().then((backButtonText) => {
            expect(backButtonText).toEqual('Back to list');
          });
        });
      });
    });
  });

  it('should have proper labeling when it is loaded in edit mode', () => {
    page.navigateToPageInEditMode().then(() => {
      page.getPageTitle().then((title) => {
        browser.ExpectedConditions.visibilityOf(title);
        browser.ExpectedConditions.visibilityOf(title);

        title.getText().then((text) => {
          expect(text).toEqual('Update course');
        });
      });
    });
  });

  it('should navigate to course list when Back button is clicked', () => {
    page.navigateTo().then(() => {
      page.getBackButton().then((button) => {
        browser.ExpectedConditions.visibilityOf(button);
        button.click();

        browser.getCurrentUrl().then((url) => {
          expect(url).toEqual(browser.baseUrl);
        });
      });
    });
  });

  it('should add new course and navigate back to list', () => {
    const courseListPage = new CourseListPage();

    page.navigateTo().then(() => {
      page.getSubmitButton().then((submitButton) => {
        browser.ExpectedConditions.visibilityOf(submitButton);
        page.populateForm('testing course', 'testing course').then(() => {
          submitButton.click();

          browser.getCurrentUrl().then((url) => {
            expect(url).toEqual(browser.baseUrl);

            courseListPage.getAddButton().then((addButton) => {
              browser.ExpectedConditions.presenceOf(addButton);
              courseListPage.getListElements().then((elements) => {
                elements.count().then((coursesCount) => {
                  expect(coursesCount).toEqual(3);
                });
              });
            });
          });
        });
      });
    });
  });

  it('should not add new course if the title field is blank', () => {
    const courseListPage = new CourseListPage();

    page.navigateTo().then(() => {
      page.getSubmitButton().then((submitButton) => {
        browser.ExpectedConditions.visibilityOf(submitButton);
        page.populateForm(null, 'testing course').then(() => {
          submitButton.click();

          courseListPage.navigateTo().then(() => {
            courseListPage.getAddButton().then((addButton) => {
              browser.ExpectedConditions.presenceOf(addButton);
              courseListPage.getListElements().then((elements) => {
                elements.count().then((coursesCount) => {
                  expect(coursesCount).toEqual(2);
                });
              });
            });
          });
        });
      });
    });
  });

  it('should not navigate to list page if the title field is blank', () => {
    const courseListPage = new CourseListPage();

    page.navigateTo().then(() => {
      page.getSubmitButton().then((submitButton) => {
        browser.ExpectedConditions.visibilityOf(submitButton);
        submitButton.click();

        browser.getCurrentUrl().then((url) => {
          expect(url).toEqual(`${browser.baseUrl}courses/add`);
        });
      });
    });
  });
});
