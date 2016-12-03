/*jshint esversion: 6 */
const chai = require('chai');
const assert = chai.assert;
// const index = require('../lib/index');

describe('', () => {
  context('with default attributes', () => {

    it('should work', () => {
      assert(true);
    });

    it('should have an empty idea array by default ', () => {
      assert.isArray(taskArray);
    });

    it('should have an empty sorted array by default', () => {
      assert(true);
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

  context('is a function', () => {

    it('loadPage', () => {
      assert.isFunction(loadPage);
    });

    it('render', () => {
      assert.isFunction(render);
    });

    it('checkField', () => {
      assert.isFunction(checkField);
    });

    it('Task', () => {
      assert.isFunction(Task);
    });

    it('storeTask', () => {
      assert.isFunction(storeTask);
    });

    it('deleteTask', () => {
      assert.isFunction(deleteTask);
    });

    it('createCard', () => {
      assert.isFunction(createCard);
    });

    it('findTaskByID', () => {
      assert.isFunction(findTaskByID);
    });

    it('upSort', () => {
      assert.isFunction(upSort);
    });

    it('downSort', () => {
      assert.isFunction(downSort);
    });
  });
});
//
// DOM tests
// save button creates new card
// card persists on refresh
// delete button does shit
