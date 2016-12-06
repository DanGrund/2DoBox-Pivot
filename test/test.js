/*jshint esversion: 6 */
// const assert    = require('chai').assert;
// const webdriver = require('selenium-webdriver');
// const test      = require('selenium-webdriver/testing');
//
//
// test.describe('testing todobox', function(){
//     this.timeout(10000);
//     let driver;
//   beforeEach(()=>{
//     driver = new webdriver.Builder().forBrowser('chrome').build();
//     driver.get('http://localhost:8080');
//   });
//
//   afterEach(()=>{
//     driver.quit();
//   });
//
//   test.it('should allow me to enter a title and a task', ()=>{
//     const title = driver.findElement({name: 'title input field'});
//     const task = driver.findElement({name: 'task input field'});
//
//     title.sendKeys('this is a title').then( ()=>{
//       return title.getAttribute('value');
//     }).then( (value)=> {
//       assert.equal(value, 'this is a title');
//     });
//
//     task.sendKeys('this is a task').then( ()=>{
//       return task.getAttribute('value');
//     }).then( (value)=>{
//       assert.equal(value, 'this is a task');
//     });
// });
//
// test.it('should be able to save a complete task', ()=>{
//   const title = driver.findElement({name: 'title input field'});
//   const task = driver.findElement({name: 'task input field'});
//   const save = driver.findElement({name: 'save button'});
//
//   title.sendKeys('title');
//   task.sendKeys('task');
//   save.click().then(()=>{
//     const cardTitle = driver.findElement({name: 'task-title'});
//     return cardTitle.getText();
//   }).then((text)=>{
//     assert.equal(text, 'title');
//   }).then(()=>{
//     const cardTask = driver.findElement({name: 'task-body'});
//     return cardTask.getText();
//   }).then((text)=>{
//     assert.equal(text, 'task');
//   });
// });
//
// test.it('clicking the up button increases a tasks importance', ()=>{
//   const title = driver.findElement({name: 'title input field'});
//   const task = driver.findElement({name: 'task input field'});
//   const save = driver.findElement({name: 'save button'});
//
//   title.sendKeys('title');
//   task.sendKeys('task');
//   save.click().then(()=>{
//     const upButton = driver.findElement({name: 'up-button'});
//     const importance = driver.findElement({name: 'quality'});
//     upButton.click();
//     return importance.getText();
//   }).then((text)=>{
//     assert.equal(text, 'quality: High');
//   });
// });
//
// test.it('clicking the down button decreases a tasks importance', ()=>{
//   const title = driver.findElement({name: 'title input field'});
//   const task = driver.findElement({name: 'task input field'});
//   const save = driver.findElement({name: 'save button'});
//
//   title.sendKeys('title');
//   task.sendKeys('task');
//   save.click().then(()=>{
//     const downButton = driver.findElement({name: 'down-button'});
//     const importance = driver.findElement({name: 'quality'});
//     downButton.click();
//     return importance.getText();
//   }).then((text)=>{
//     assert.equal(text, 'quality: Low');
//   });
// });
//
// test.it('should have an editable title field on created cards that saves when focus shifts out', ()=>{
//   const title = driver.findElement({name: 'title input field'});
//   const task = driver.findElement({name: 'task input field'});
//   const save = driver.findElement({name: 'save button'});
//
//   title.sendKeys('title');
//   task.sendKeys('task');
//   save.click().then(()=>{
//     const cardTitle = driver.findElement({name: 'task-title'});
//     const cardTask = driver.findElement({name: 'task-body'});
//
//     cardTitle.sendKeys('edited ').then(()=>{
//       cardTask.click();
//       return cardTitle.getText();
//     }).then((text)=>{
//         assert.equal(text, 'edited title');
//     });
//   });
// });
//
// test.it('should have an editable task field on created cards that saves when focus shifts out', ()=>{
//   const title = driver.findElement({name: 'title input field'});
//   const task = driver.findElement({name: 'task input field'});
//   const save = driver.findElement({name: 'save button'});
//
//   title.sendKeys('title');
//   task.sendKeys('task');
//   save.click().then(()=>{
//     const cardTitle = driver.findElement({name: 'task-title'});
//     const cardTask = driver.findElement({name: 'task-body'});
//
//     cardTask.sendKeys('edited ').then(()=>{
//       cardTitle.click();
//       return cardTask.getText();
//     }).then((text)=>{
//         assert.equal(text, 'edited task');
//     });
//   });
// });
//
// test.it('edited title should persist on page refresh', ()=>{
//   const title = driver.findElement({name: 'title input field'});
//   const task = driver.findElement({name: 'task input field'});
//   const save = driver.findElement({name: 'save button'});
//
//   title.sendKeys('title');
//   task.sendKeys('task');
//   save.click().then(()=>{
//     let cardTitle = driver.findElement({name: 'task-title'});
//     let cardTask = driver.findElement({name: 'task-body'});
//
//     cardTitle.sendKeys('edited ');
//     cardTask.click();
//     driver.navigate().refresh().then(()=>{
//       let cardTitle = driver.findElement({name: 'task-title'});
//       let cardTask = driver.findElement({name: 'task-body'});
//       return cardTitle.getText();
//     }).then((text)=>{
//       assert.equal(text, 'edited title');
//     });
//   });
// });
//
// test.it('edited task should persist on page refresh', ()=>{
//   const title = driver.findElement({name: 'title input field'});
//   const task = driver.findElement({name: 'task input field'});
//   const save = driver.findElement({name: 'save button'});
//
//   title.sendKeys('title');
//   task.sendKeys('task');
//   save.click().then(()=>{
//     let cardTitle = driver.findElement({name: 'task-title'});
//     let cardTask = driver.findElement({name: 'task-body'});
//
//     cardTask.sendKeys('edited ');
//     cardTitle.click();
//     driver.navigate().refresh().then(()=>{
//       let cardTitle = driver.findElement({name: 'task-title'});
//       let cardTask = driver.findElement({name: 'task-body'});
//       return cardTask.getText();
//     }).then((text)=>{
//       assert.equal(text, 'edited task');
//     });
//   });
// });
//
// });
