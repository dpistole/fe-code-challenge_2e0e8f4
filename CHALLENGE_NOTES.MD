NOTES FOR FOLLOWUP INTERVIEW (while fresh in mind)

- I probably spent a little too much time refactoring the ShipmentsPage challenge :X at KUBRA we don't move as quickly, which gives me a fair amount of time for refactoring. I value that time as I learn a lot, however I am aware of the balance between delivering business value and appeasing my inner-developer. It's something I've spent some time working on (usually by putting "refactor" tickets in the backlog for later, rather than ignoring the opportunity)

- Given that this was a coding challenge I took a little more liberty with refactors that I otherwise would stepping into a new codebase on a new team. I understand the importance of doing things the-existing-way, at the very least until you understand why they're done that way, before suggesting changes in coding style or architecture. In a real world scenario I would probably approach team members with my subjective opinions and listen/discuss feedback with them before implementing anything.

- Having not used material UI (beyond looking through the API years ago), I spent a fair amount of time in the docs for the hooks (useStyle/useTheme) and components (DataGrid/Box)

- I don't love my static-pixel-math that I'm using for determining the height available for the rows. Alternative solutions might include using a ref to the DataGrid to determine it's size dynamically, or using a selector to get the different elements (and associated sizing) from the page/document.

- There is a bug when resizing the page of shipments where you end up with the inability to navigate to the next page (despite the pagination control indicating there are records remaining), additionally if you are on the last page and resize you get an error re: ` The page prop of a TablePagination is out of range (0 to 3, but page is 4)`. I imagine there is some material-ui digging I'd do to solve this, but I did not want to get jammed up so long that I couldn't attempt the Dashboard page challenge. Potential resolutions might include making the current page a controlled variable (vs letting material ui deal with it) and then either a) calculating the page myself based on the number of records shown, or b) resetting the current page to 0 on resize

- Time breakdown was probably ~2 hours on Shipments page and ~1 hour (+20 over limit) on the dashboards page

- In hindsight I'd probably focus more on just getting something working to leave more time for styling the components. Not having sass/styled components in the mix (and wanting to adhere to existing styling system) left me a little slower on the styling piece, and admittedly I spent long enough on the logic to where I hit the time limit before I could really take much time to make things "look nice". I do have a pretty minimal website up with heavier stylings, and I could probably get some screenshots or access to the apps I've been building at KUBRA if my CSS abilities are a point of concern.

...some additional refactoring for my own knowledge on branch after-the-buzzer

- :\ looks like I leveled myself on the time crunch, turns out there is a prop for autoSizing the data-grid, refactored my original approach from static sizing to using refs, then deleted it all in favor of the built in prop. I take full responsibility for missing that in the docs, though I do believe in normal circumstances I would be more apt to take my time and ingest all of the information vs trying to quickly extract just enough to get things going to meet the time crunch.

- I added some styles to the ArrivingShipments component, it bothered me how plain it looked haha
