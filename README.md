# Web Development Project 6 - Pokémon Dashboard

Submitted by: **Jafrul Amin**

This web app: **A Pokemon dashboard that displays information about the first 151 Pokemon, including their types, stats, and detailed information. The app features interactive charts showing Pokemon type distribution and average base stats.**

Time spent: **9** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **Clicking on an item in the list view displays more details about it**
  - [x] Clicking on a Pokemon in the dashboard list navigates to a detail view for that Pokemon
  - [x] Detail view includes extra information about the Pokemon not included in the dashboard view (abilities, species info, capture rate, etc.)
  - [x] The same sidebar is displayed in detail view as in dashboard view
  - [x] Sidebar is consistently visible in both dashboard and detail views
- [x] **Each detail view of an item has a direct, unique URL link to that item's detail view page**
  - [x] Each Pokemon has a unique URL in the format `/detail/:id`
- [x] **The app includes at least two unique charts developed using the fetched data that tell an interesting story**
  - [x] Interactive pie chart showing Pokemon type distribution
  - [x] Bar chart displaying average base stats across all Pokemon

The following **optional** features are implemented:

- [x] The site's customized dashboard contains more content that explains what is interesting about the data
  - [x] Dashboard includes summary cards showing total Pokemon count, number of types, and average weight
  - [x] Type distribution chart includes a custom legend with color-coded circles
- [x] The site allows users to filter and search data
  - [x] Users can search Pokemon by name or type
  - [x] Users can filter Pokemon by type using a dropdown menu

The following **additional** features are implemented:

- [x] Responsive design that works on both desktop and mobile devices
- [x] Custom color scheme for Pokemon types
- [x] Interactive stat bars in detail view
- [x] Pixelated sprite images maintaining original Pokemon game aesthetic
- [x] Hover effects on Pokemon cards for better user interaction

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='VideoWalkthrough.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

GIF created with ScreenToGif

## Notes

Describe any challenges encountered while building the app:

- Implementing responsive charts that work well on different screen sizes
- Managing the complex state of Pokemon data and ensuring efficient data fetching
- Creating a custom legend for the type distribution chart
- Ensuring consistent styling across different Pokemon types and stats

## License

    Copyright [2024] [Jafrul Amin]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
