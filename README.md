[![License: GPL v2](https://img.shields.io/badge/License-GPL%20v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)
[![Actions Status](https://github.com/raz0red/js7800/workflows/Build/badge.svg)](https://github.com/raz0red/js7800/actions)

# JS7800

Ported by raz0red

JS7800 is an enhanced JavaScript port of the ProSystem Atari 7800 emulator developed by Greg Stanton packaged as a JavaScript module.
Portions of the Pokey code were adapted from the MAME implementation.

A complete site using the JS7800 module can be found at the following location:

http://js7800.org

[![JS7800](https://github.com/raz0red/js7800/raw/master/screenshots/screenshot.png)](http://js7800.org)

## JavaScript Module

This particular repository contains the JS7800 JavaScript Module. A JavaScript Module is a self-contained reusable component that can be utilized as part of a larger application. The JS7800 module is distributed as a single JavaScript file that contains all of the required JavaScript code, CSS, and images for the emulator to execute. 

Packaging the emulator as a JavaScript module allows the component to be easily embedded for different devices and form factors (web, mobile, tablet, etc.). A separate repository is currently being developed that will embed the module and provide many additional features such as settings dialogs, persistence between sessions, and the ability to save and restore states. This README will be updated to reflect the various other related repositories once they become available.

## Loading Cartridges (ROMs)

The method for loading cartridges will vary based on the application that is embedding the JS7800 module.

## Controls

The following section contains the "default" controller mappings for JS7800. It is important to note that the default mappings may be modified by a particular application that is embedding the JS7800 module (globally or via user-defined values). 

### General:
  
    F2 : Select                   (Atari 7800 Console)
    F3 : Reset                    (Atari 7800 Console)
    F4 : Pause                    (Atari 7800 Console)
    F5 : Left difficulty switch   (Atari 7800 Console)
    F6 : Right difficulty switch  (Atari 7800 Console)

    F9 : Switch to "Full Screen" display
                    
### Joysticks:

The following input methods are available for games that require joysticks.
    
##### Gamepads:

JS7800 supports the use of up to two gamepads for joystick-based games. Gamepad testing has been extremely limited (Chrome and Edge on Windows with Switch, Xbox 360, PS3, and PS4 controllers).

     Controller 1:
     
         D-pad              : Move
         Left analog        : Move
         B (or equivalent)  : Left button
         A (or equivalent)  : Right button
         Right analog       : Move/controller 2 (directional fire for Robotron and TiME Salvo)
       
     Controller 2:
     
         D-pad              : Move
         Left analog        : Move
         B (or equivalent)  : Left button
         A (or equivalent)  : Right button
    
##### Keyboard:

JS7800 also supports keyboard input for joystick-based games.
    
     Controller 1:
     
         Arrow keys    : Move
         Z             : Left button
         X             : Right button
       
     Controller 2:
     
         I, J, K, L    : Move
         N             : Left button
         M             : Right button

### Lightgun:

For games that support the use of a light gun (Alien Brigade, Crossbow, etc.), JS7800 provides the ability to use a mouse for input.

     Mouse              : Move crosshairs
     Left mouse button  : Fire gun
