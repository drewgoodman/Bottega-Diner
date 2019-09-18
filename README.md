# Bottega-Diner
created by Drew Goodman

## Description
Simulated diner menu using a combination of HTML, CSS, and basic Javascript as a learning exercise. User loads the page, selects from a choice of menus for Breakfast, Lunch, and Dinner. A new menu is then auto-populated which lets the user click on items and add them to a cart. Individual items can be deleted from the cart or wiped all at once. Pressing the checkout button disables the menu and generates feedback on total cost.

## Additional Features
* Scaling display - makes heavy use of CSS to create an interface that scales with browser window size (within reason; mobile screen widths not supported.)
* Commentary - a simulated waitress with a randomly assigned name will make comments through the experience, drawing from a bank of random responses based on the context of user input.
* Tag system - menu items are each given an array of tags which automatically defines which menus they'll be sorted into and which comment banks are chosen for waitress reactions. Additional properties like description and dinner price differences can also be optionally added to further customize that item's behavior.
