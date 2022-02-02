class TextEditor {
    constructor () { 
        this.cursor = 0 
        this.clipboard = [] 
        this.text = "" 
        this.selected = [0, -1] 
        this.undo_count = 0
        this.state_array = []
    }


    type_text(text) {
        console.log(text)
        if (this.selected[0] == 0 && this.selected[1] == -1) {
            this.text = this.text.slice(0, this.cursor) + text + this.text.slice(this.cursor)
            this.cursor += text.length
        }
        else {
            this.delete()
            this.cursor = this.selected[0]
            this.selected = [0, -1]
            this.type_text(text)
        }
        console.log(this.text) 
    }

    select(start, end) {
        this.selected[0] = start 
        this.selected[1] = end 
        this.cursor = end + 1 
        console.log(this.text) 
    }
    move_cursor(offset) { 
        this.cursor += offset 
        if (this.cursor > this.text.length) { 
            this.cursor = this.text.length 
        }
        else if (this.cursor < 0) {
            this.cursor = 0 
        }
        this.selected[0] = 0 
        this.selected[1] = -1 
        console.log(this.cursor) 
    }

    copy() {
        if (this.selected[0] != 0 || this.selected[1] != -1) { 
            this.clipboard.push(this.text.slice(this.selected[0], this.selected[1] + 1))
        }
        console.log(this.clipboard) 
    }

    paste(steps_back=1) { 
        if (this.clipboard.length == 0) {
            return 0 
        }
        else if (this.selected[0] == 0 && this.selected[1] == -1) {
            if (this.cursor == 0) { 
                this.text = this.clipboard[this.clipboard.length-steps_back] + this.text 
                this.cursor += this.clipboard[this.clipboard.length-steps_back].length
                this.clipboard.pop(this.clipboard.length-steps_back) 
            }
            else if (this.cursor == this.text.length) { 
                this.text += this.clipboard[this.clipboard.length-steps_back] 
                this.cursor += this.clipboard[this.clipboard.length-steps_back].length 
                this.clipboard.pop(this.clipboard.length-steps_back)
            } 
            else {
                this.text = this.text.slice(0, this.cursor) + this.clipboard[this.clipboard.length-steps_back] + this.text.slice(self.cursor)
                this.cursor += this.clipboard[this.clipboard.length-steps_back].length
                this.clipboard.pop(this.clipboard.length-steps_back) 
            }
        }
        else {
            this.delete()
            this.selected = [0, -1]
            this.type_text(this.clipboard[this.clipboard.length-steps_back])
        }
        console.log("Current clipboard", this.clipboard)
        console.log(this.text)
    }
    delete() { 
        if (this.selected[0] != 0 || this.selected[1] != -1) { 
            this.text = this.text.slice(0, this.selected[0]) + this.text.slice(this.selected[1] + 1)
        }
    }

    undo() {
        this.undo_count += 1
        this.text = this.state_array[this.state_array.length-1-this.undo_count]
        this.move_cursor(this.text.length-this.state_array[this.state_array.length-1-this.undo_count+1].length)
    }
    redo() {
        if (this.undo_count > 0) {
            this.undo_count -= 1
            this.text = this.state_array[this.state_array.length-1-this.undo_count]
            this.move_cursor(this.text.length-this.state_array[this.state_array.length-1-this.undo_count-1].length)
        }
    }
    cut() {
        this.copy()
        this.delete()
    }
}

const implementTextEditor2 = (operations) => {
    text = new TextEditor() 
    console.log(text.text) 
    for (const i in operations)  { 
        const operation = operations[i]
        console.log(operation)
        if (operation[0] == "T") { 
            text.type_text(operation.split(" ").slice(1).join(" "))
        }
        else if (operation[0] == "S") {
            text.select(parseInt(operation.split(" ")[1]), parseInt(operation.split(" ")[2])) 
        }
        else if (operation[0] == "M") {
            text.move_cursor(parseInt(operation.split(" ")[1])) 
        }
        else if (operation[0] == "C") {
            if (operation[1] == "O") {
                text.copy()
            }
            else if (operation[1] = "U") {
                text.cut()
            }
        }
        else if (operation[0] = "U") {
            text.undo()
        }
        else if (operation[0] = "R") {
            text.redo()
        }
        else if (operation[0] == "P") { 
            if (operation.length == 5){ 
                text.paste() 
            }
            else {
                text.paste(int(operation.split(" ")[1]))
            }
        }
    }
    return text

}

const operations = ["TYPE I am a boy", "SELECT 0 3", "COPY", "TYPE Not", "MOVE_CURSOR 9", "TYPE  ", "PASTE", "PASTE", "TYPE . My name is Jessey Uche-Nwichi"]
console.log("Text: |" + implementTextEditor2(operations).text + "|")