class TextEditor: 
    def __init__(self): 
        self.cursor = 0 
        self.clipboard = [] 
        self.text = "" 
        self.undo_count = 0
        self.selected = [0, -1] 
        self.state_array = []

    def __repr__(self): 
        return self.text 

    def type_text(self, text): 
        if self.selected == [0, -1]:
            self.text = self.text[:self.cursor] + text + self.text[self.cursor:] 
            self.cursor += len(text)
        else:
            self.delete()
            self.cursor = self.selected[0]
            self.selected = [0, -1]
            self.type_text(text)
        print(self.text)
        self.state_array.append(self.text) 
    
    def select(self, start, end): 
        self.selected[0] = start 
        self.selected[1] = end 
        self.cursor = end + 1 
        print(self.text) 

    def move_cursor(self, offset): 
        self.cursor += offset 
        if self.cursor > len(self.text): 
            self.cursor = len(self.text) 
        elif self.cursor < 0: 
            self.cursor = 0 
        self.selected[0] = 0 
        self.selected[1] = -1 
        print(self.cursor) 

    def copy(self): 
        if self.selected != [0, -1]: 
            self.clipboard.append(self.text[self.selected[0]:self.selected[1] + 1]) 
        print(self.clipboard) 

    def paste(self, steps_back=1): 
        if not self.clipboard: 
            return 0 
        elif self.selected == [0, -1]: 
            if self.cursor == 0: 
                self.text = self.clipboard[-steps_back] + self.text 
                self.cursor += len(self.clipboard[-steps_back]) 
                self.clipboard.pop(-steps_back) 
            elif self.cursor == len(self.text): 
                self.text += self.clipboard[-steps_back] 
                self.cursor += len(self.clipboard[-steps_back]) 
                self.clipboard.pop(-steps_back) 
            else: 
                self.text = self.text[:self.cursor] + self.clipboard[-steps_back] + self.text[self.cursor:] 
                self.cursor += len(self.clipboard[-steps_back]) 
                self.clipboard.pop(-steps_back) 
        else: 
            self.delete()
            self.selected = [0, -1]
            self.type_text(self.clipboard[-steps_back])
        print(self.text)
        self.state_array.append(self.text) 
        
    def delete(self): 
        if self.selected != [0, -1]: 
            self.text = self.text[:self.selected[0]] + self.text[self.selected[1] + 1:]
        self.state_array.append(self.text) 
    
    def undo(self):
        self.undo_count+=1
        self.text = self.state_array[-1-self.undo_count]
        self.move_cursor(len(self.text)-len(self.state_array[-1-self.undo_count+1]))
    
    def redo(self):
        if self.undo_count > 0:
            self.undo_count -= 1
            self.text = self.state_array[-1-self.undo_count]
            self.move_cursor(len(self.text)-len(self.state_array[-1-self.undo_count-1]))
        
    def cut(self):
        self.copy()
        self.delete()
        
    
        
            
def implementTextEditor2(operations): 
    text = TextEditor() 
    print(text.text) 
    for operation in operations: 
        if operation[0] == "T": 
            text.type_text(" ".join(operation.split(" ")[1:]))
        elif operation[0] == "S":  
            text.select(int(operation.split(" ")[1]), int(operation.split(" ")[2])) 
        elif operation[0] == "M": 
            text.move_cursor(int(operation.split(" ")[1])) 
        elif operation[0] == "C": 
            text.copy() 
        elif operation[0] == "P": 
            if len(operation) == 5: 
                text.paste() 
            else: 
                text.paste(int(operation.split(" ")[1])) 
    return text


operations = ["TYPE I am a boy", "SELECT 0 3", "COPY", "TYPE Not", "MOVE_CURSOR 9", "TYPE  ", "PASTE", "PASTE", "TYPE . My name is Jessey Uche-Nwichi"]
print("Text: |" + implementTextEditor2(operations).text + "|")