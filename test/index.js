/*jshint esversion: 6 */
const chai = require('chai');
const assert = chai.assert;
const Task = require('../lib/task');

describe('Task', () => {
  context('with default attributes', () => {
    let newTask = new Task (5, 'New Title', 'New Body');

    it('should work', () => {
      assert(true);
    });

    it('should be a function', () => {
      assert.isFunction(Task);
    });

    it('should have an ID property', () => {
      assert.equal(newTask.id, 5);
    });

    it('should have a title property', () => {
      assert.equal(newTask.title, 'New Title');
    });

    it('should have a body property', () => {
      assert.equal(newTask.body, 'New Body');
    });

    it('should have a quality property', () => {
      assert.equal(newTask.quality, 'normal');
    });

    it('should have a completed property', () => {
      assert.equal(newTask.completed, false);
    });
  });
});

  context('when changing quality', () => {

    it('should have an quality of critical when passed as an argument', () => {
      let newTask = new Task (5, 'New Title', 'New Body', 'critical');
      assert.equal(newTask.quality, 'critical');
    });

    it('should have an quality of high when passed as an argument', () => {
      let newTask = new Task (5, 'New Title', 'New Body', 'high');
      assert.equal(newTask.quality, 'high');
    });

    it('should have an quality of normal when passed as an argument', () => {
      let newTask = new Task (5, 'New Title', 'New Body', 'normal');
      assert.equal(newTask.quality, 'normal');
    });

    it('should have an quality of low when passed as an argument', () => {
      let newTask = new Task (5, 'New Title', 'New Body', 'low');
      assert.equal(newTask.quality, 'low');
    });

    it('should have an quality of none when passed as an argument', () => {
      let newTask = new Task (5, 'New Title', 'New Body', 'none');
      assert.equal(newTask.quality, 'none');
    });
  });
//
//     it('should have an empty idea array by default ', () => {
//       assert.isArray(taskArray);
//     });
//
//     it('should have an empty sorted array by default', () => {
//       assert(true);
//     });
//
//     it('if ideas exist in local storage they are rendered to the page', () => {
//       assert(true);
//     });
//
//     it('should store ideas in local storage', () => {
//       assert(true);
//     });
//
//     it('should delete ideas from local storage', () => {
//       assert(true);
//     });
//   });
//
//   context('is a function', () => {
//
//     it('loadPage', () => {
//       assert.isFunction(loadPage);
//     });
//
//     it('render', () => {
//       assert.isFunction(render);
//     });
//

//
//     it('Task', () => {
//       assert.isFunction(Task);
//     });
//
//     it('storeTask', () => {
//       assert.isFunction(storeTask);
//     });
//
//     it('deleteTask', () => {
//       assert.isFunction(deleteTask);
//     });
//
//     it('createCard', () => {
//       assert.isFunction(createCard);
//     });
//
//     it('findTaskByID', () => {
//       assert.isFunction(findTaskByID);
//     });
//
//     it('upSort', () => {
//       assert.isFunction(upSort);
//     });
//
//     it('downSort', () => {
//       assert.isFunction(downSort);
//     });

// DOM tests
// save button creates new card
// card persists on refresh
// delete button does shit
