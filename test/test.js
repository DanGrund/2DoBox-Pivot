/*jshint esversion: 6 */
const assert    = require('chai').assert;
const webdriver = require('selenium-webdriver');
const test      = require('selenium-webdriver/testing');


test.describe('testing todobox', ()=>{
   let driver;
  beforeEach(()=>{
    driver = new webdriver.Builder().forBrowser('chrome').build();
    driver.get('http://localhost:8080');
  });

  afterEach(()=>{
    driver.quit();
  });

  test.it('should allow me to enter a title and a task', ()=>{
    const title = driver.findElement({name: 'title input field'});
    const task = driver.findElement({name: 'task input field'});

    title.sendKeys('this is a title').then( ()=>{
      return title.getAttribute('value');
    }).then( (value)=> {
      assert.equal(value, 'this is a title');
    });
});

    // driver.findElement({class: 'task-title'}).then((task-title)=>{
    //   return task-title.getText()
    // }).((text)=> {
    //   assert.equal(text, 'this is a title')
    // })


});
