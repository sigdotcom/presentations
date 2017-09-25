# Python
Python is a interperter, general use, dynamically typed programming language
with automatic memory management and support for multiple programming
paradigms.

## Biographical Information
### What is Python used for
1. Web Development: Django, Pyramid, Bottle, Tornado, Flask, web2py
2. GUI Development: tkInter, PyGObject, PyQt, PySide, Kivy, wxPython
3  Scientific and Numeric: SciPy, Pandas, IPython
4. Software Development: Buildbot, Trac, Roundup
5. System Administration: Ansible, Salt, OpenStack

### Why use it?
1. Easy to read
2. Easy to write
3. Rapid Prototyping

## Interpreter
Python is interpreted instead of complied. The fundamental difference between
these execution strategies are that python reads the code line by line and
executes it automagically. `C++` on the other hand, first converts the program
into an executable binary and essentially created a `package` to run. While
this makes the code run slower, it does have some nice benefits which will be
show throughout the talk.

+ Whitespace delimited
+ The interperter pays special attention to whitespace instead of curly braces in c++
+ 4 spaces per indentation


## Assignment
### What does dynamically typed mean?
Dynamically typed refers to a property of python that types are determined
during runtime. So what that means is that during assignment or re-assignment,
python automatically figures out what type the variable is and provisions
memory based on that.
```c
int x = 1;
```
The python equivalent to this statement is:
```python
x = 1
```
In python, we do not need to explicitly define the type of the variable which
leads to some interesting interactions:
```python
x = 1
x = "test"
x = []
```
During runtime, the type of variable x can be changed to anything we want.
But this also leads to caution, just because you can reassigned the variable to
anything you want, doesn't mean you should.
## Built-in Types
### int
```python
x = 2
x = 3
```

### float
```python
x = 2.0
x = 3.0
```

### String
No such thing as a `char` in python, only strings

### Bool
`True` and `False` instead of `true` and `false`.

### List
Lists conceptually work like they do in c++ with some dynamically typed spins. 
Mutable sequence of elements.
```python
x = []
x = list()
```
Lists can grow indefinitely (with an indefinite amount of ram) without needing
to first define the size.
```python
x = []
for i in range(10000)
    x.append("test")
```

Lists can have multiple types within it
```python
x = ["test", 1, True]
```
#### Indexing
+ Indexing into a list must be an integer
```python
x = ["test"]
x[0]
```
+ Negative - start counting from the back
```python
x = ["test", 1, 2]
x[-1] # 2
```

### Tuple
Iterable, Immutable sequence of elements.
```
x = tuple()
x = (1,) # Note ','
```

### Dictionary
### 
## Conditionals

## Flow control
## Functions
## Class
