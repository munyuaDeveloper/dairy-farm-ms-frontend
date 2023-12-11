Let's write a little component, orderedlist, which implements an alphabetically sorted list. The component will include a button to enable the user to sort either in ascending or descending order and a second button to permit the list to be cleared.

Your component should render specific elements for the testing suite to hook onto. The test suite will evaluate that the elements behave according to the following specifications:

An <input data-testid="add-item" /> element which the user can use to add items to the list. This button should listen for Enter keydown events to add the current contents to the list (if nonempty). After adding an item, the input box should be cleared.
A <button data-testid="sort-direction"> element which the user can click to change the direction of the sort. Initially, the button should display text such as the ⬇️ emoji or the text down. When changed to a descending sort, the button should change to a ⬆️ emoji (or text such as up). The test suite will only test that pushing the sort-direction button toggles between two nonempty strings when clicked rather than checking that the string matches something in particular, so pick a string or icon that carries the most semantic meaning to you.
A <button data-testid="clear-list"> element which the user can click to clear the list as well as any contents in the input box (essentially reverting to the component's default state). Use any text you'd like for this button.
A <ul data-testid="items-list"> element, which should contain a series of <li> elements that represent the sorted list contents.
You can assume all input typed into the box consists only of lowercase alphabetical characters for the purposes of this challenge.

There is no predetermined correct answer for style and CSS. Your solution need not look like the demo below but it should demonstrate understanding of basic CSS and user experience principles. Using angular