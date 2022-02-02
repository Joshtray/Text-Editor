# Text-Editor
A Python-based text editor algorithm that allows the user to edit and format lines of text or text documents as in a word processor.  

Functionalities:

TYPE:
  Type a string of text into the document at a particular position
  
SELECT:
  Select a substring of the text in the document (accesed by the start and end points of the substring in the document). This selection can be copied (COPY), deleted (DELETE) or replaced (PASTE or TYPE)
  
MOVE CURSOR:
  Move the cursor to a different position in the document. Unselects selected text and changes where text would be inserted into the document when TYPE or PASTE is called.
  
COPY:
  Copy selected text if it exists. Add it to the clipboard
  
PASTE:
  Paste the first string in the clipboard at the current position of the cursor or replace the currently selected text. 
 
DELETE:
  Delete a selected substring of text from the document
