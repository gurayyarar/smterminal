# smterminal
[![NPM Version](https://img.shields.io/npm/v/smterminal.svg)](https://npmjs.org/package/smterminal)

System monitoring for terminal on Linux, OSX and Windows

![Main Image](https://raw.githubusercontent.com/gurayyarar/smterminal/master/documentation/smterminal.gif)

## Requirements

* Linux, OSX and Windows
* Node.js >= v7.6

## Installation

```
npm install smterminal -g
```

## Usage
Start smterminal with the `smterminal` command
```
smterminal
```

For display help page
```
smterminal --help
```

### Command Flags
```
smterminal [-main|-proc|-file]
```
* `-main`: Show the main window
* `-proc`: Show the running processes window
* `-file`: Show the file types window

### Keyboard Shortcuts
* **F2** Main Screen
* **F3** File Types Screen
* **F4** Processes Screen

## Screens
There are 3 screens.

### 1) Main Screen (`F2`)
![Main Image](https://raw.githubusercontent.com/gurayyarar/smterminal/master/documentation/screens/main.jpg)

You can focus the table by pressing;
* `F6`: CPU Usage
* `F7`: Disk Usage


### 2) File Types Screen (`F3`)
![File Types Image](https://raw.githubusercontent.com/gurayyarar/smterminal/master/documentation/screens/file-system.jpg)

You can sort the process table by pressing;
* `d`: Device Name
* `t`: Type
* `s`: Size
* `a`: Available
* `u`: Used

**Note:** Shortcut key specified on table header cell with `(KEY)`
 
### 3) Processes Screen (`F4`)
![Processes Image](https://raw.githubusercontent.com/gurayyarar/smterminal/master/documentation/screens/process.jpg)

You can sort the process table by pressing;
* `p`: Process Id
* `o`: Command
* `c`: Cpu Usage Percent
* `m`: Memory Usage Percent
* `u`: User
* `r`: Priority

**Note:** Shortcut key specified on table header cell with `(KEY)`

You can kill the process;
Type `ENTER` after select the process which you want to kill.

## Troubleshooting

If you see question marks or other different characters, try to run it with these environment variables:

```
LANG=en_US.utf8 TERM=xterm-256color smterminal
```

If you use Windows Operation System and see the issue about the font view, please follow these instructions;

[Windows Command Prompt - Font Support](https://github.com/gurayyarar/smterminal/wiki/Windows-Command-Prompt---Font-Support)


## License
**smterminal** is an open source project that is licensed under the [MIT license](http://opensource.org/licenses/MIT).

## Donations
Donations are **greatly appreciated!**

**[BUY ME A COFFEE](http://bit.ly/2NcaKZS)**