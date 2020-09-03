from tkinter import *

window = Tk()

window.title("My Calculator")
entry = Entry(window, width=33, bg="yellow")
entry.grid(row=0, column=0, columnspan=5)


key_pads = ['7', '8', '9', '/', 'C',
            '4', '5', '6', '*', '',
            '1', '2', '3', '-', '',
            '0', '.', '=', '+', '']

rows = 1
cols = 0

for i in key_pads:
    Button(window, text=i, width=5).grid(row=rows, column=cols)
    cols += 1
    if cols > 4:
        rows += 1
        cols = 0

window.mainloop()