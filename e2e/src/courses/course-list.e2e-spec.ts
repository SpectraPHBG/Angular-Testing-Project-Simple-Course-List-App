import {CourseListPage} from './course-list.po';
import {browser} from 'protractor';

describe('Courses list page ', () => {

  let page: CourseListPage;

  beforeEach(() => {
    page = new CourseListPage();
    browser.manage().window().maximize();
  });
  it('should be on the courses list page', () => {
    page.navigateTo().then(() => {
      page.getPageTitleText().then((titleText) => {
        expect(titleText).toEqual('Movies list');
      });
    });
  });

  it('should have the Add button loaded', () => {
    page.navigateTo().then(() => {
      page.getAddButtonText().then((addButtonText) => {
        expect(addButtonText).toEqual('Add new');
      });
    });
  });

  it('should have at least one course item', ()  => {
    page.navigateTo().then(() => {
      page.getListElements().then((courseListElements) => {
        expect(courseListElements.length).not.toBe(0);
      });
    });
  });

  it('should navigate to form page after add button is clicked', () => {
    page.navigateTo().then(() => {
      page.getAddButton().then((button) => {
        button.click();
        browser.getCurrentUrl().then((url) => {
        expect(url).toEqual(`${browser.baseUrl}courses/add`);
        });
      });
    });
  });

  it('should have the Mark as favorite button loaded for a course', () => {
    page.navigateTo().then(() => {
      page.getListElementMarkFavoriteButtonText(0).then((buttonText) => {
        expect(buttonText).toEqual('Mark as favorite');
      });
    });
  });

  it('should mark first movie as favorite', () => {
    page.navigateTo().then(() => {
      page.getListElementMarkFavoriteButton(0).then((button) => {
        button.click();
        page.getSelectedCourseText().then((selectedCourse) => {
            expect(selectedCourse).toEqual('Selected course: Course title 1');
          });
      });
    });
  });

  it('should have the Delete button loaded for the first course', () => {
    page.navigateTo().then(() => {
      page.getListElementDeleteButtonText(0).then((buttonText) => {
        expect(buttonText).toEqual('Delete');
      });
    });
  });

  it('should delete first course', () => {
    page.navigateTo().then(() => {
      page.getListElementDeleteButton(0).then((button) => {
        button.click();
        page.getListElements().then((elements) => {
          expect(elements.length).toBe(1);
        });
      });
    });
  });
});
