/*jshint esversion: 6 */

const assert = require('chai').assert;


describe('our test bundle', () => {
  context('with default attributes', () => {

    it('should work', () => {
      assert(true);
    });

    it('should have an empty idea array by default ', () => {
      assert.isArray(ideaArray);
    });

    it('should have an empty sorted array by default', () => {
      assert(true);
    });

    it('should have a sort order of false by default', () => {
      assert.property(sortedArray, false );
    });

    it('if ideas exist in local storage they are rendered to the page', () => {
      assert(true);
    });

    it('should store ideas in local storage', () => {
      assert(true);
    });

    it('should delete ideas from local storage', () => {
      assert(true);
    });
  });
});
//
// DOM tests
// save button creates new card
// card persists on refresh
// delete button does shit
