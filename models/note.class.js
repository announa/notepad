class Note {
 title;
 content;
 status = 'saved';
 id;

 constructor(noteTitle, noteContent){
  this.title = noteTitle;
  this.content = noteContent;
 }
}