function Task(id, title, body, quality) {
  this.id = id;
  this.title = title;
  this.body = body;
  this.quality = quality || 'normal';
  this.completed = false;
}

module.exports = Task;
