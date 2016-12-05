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

    task.sendKeys('this is a task').then( ()=>{
      return task.getAttribute('value');
    }).then( (value)=>{
      assert.equal(value, 'this is a task');
    });
});

test.it('should be able to save a complete task', ()=>{
  const title = driver.findElement({name: 'title input field'});
  const task = driver.findElement({name: 'task input field'});
  const save = driver.findElement({name: 'save button'});

  title.sendKeys('title');
  task.sendKeys('task');
  save.click().then(()=>{
    const cardTitle = driver.findElement({name: 'task-title'});
    return cardTitle.getText();
  }).then((text)=>{
    assert.equal(text, 'title');
  }).then(()=>{
    const cardTask = driver.findElement({name: 'task-body'});
    return cardTask.getText();
  }).then((text)=>{
    assert.equal(text, 'task');
  });
});

test.it('clicking the up button increases a tasks importance', ()=>{
  const title = driver.findElement({name: 'title input field'});
  const task = driver.findElement({name: 'task input field'});
  const save = driver.findElement({name: 'save button'});

  title.sendKeys('title');
  task.sendKeys('task');
  save.click().then(()=>{
    const upButton = driver.findElement({name: 'up-button'});
    const importance = driver.findElement({name: 'quality'});
    upButton.click();
    return importance.getText();
  }).then((text)=>{
    assert.equal(text, 'quality: High');
  });
});

test.it('clicking the down button decreases a tasks importance', ()=>{
  const title = driver.findElement({name: 'title input field'});
  const task = driver.findElement({name: 'task input field'});
  const save = driver.findElement({name: 'save button'});

  title.sendKeys('title');
  task.sendKeys('task');
  save.click().then(()=>{
    const downButton = driver.findElement({name: 'down-button'});
    const importance = driver.findElement({name: 'quality'});
    downButton.click();
    return importance.getText();
  }).then((text)=>{
    assert.equal(text, 'quality: Low');
  });
});


});
