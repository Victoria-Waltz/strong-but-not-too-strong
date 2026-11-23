# Strong, But Not ‘Too Strong’

Victoria Waltz’s Temple University Honors Senior Project is a podcast mini-series about women, strength, and the weight room. This website uses HTML, CSS, and vanilla JavaScript.

## Run locally

1. Clone the repository and open its folder in VS Code.
2. Open `index.html` with the Live Server extension. Alternatively, from the repository root, run `python -m http.server 8000` and visit `http://localhost:8000`.
3. Use the navigation to visit each section. Open an episode card to see its detail page and player.

## Add an episode recording

1. Place a recording in `assets/audio/`, for example `episode-01.mp3`.
2. Open `js/episodes.js`. Find the episode and set its `audio` property to `"assets/audio/episode-01.mp3"`. Match the file name and capitalization exactly.
3. Open the episode detail page through Live Server and test play, pause, seeking, volume, and speed. The player reads the actual runtime from the recording.

The same list controls episode titles, summaries, and detail text. An empty `audio` value displays Coming Soon and disables playback. Keep each episode’s `id` stable once you share its link.

## Update project information

- **Creator introduction** — Replace the placeholder in `about.html`.
- **Sources and interview material** — Update the two placeholders in `project.html` with finalized content.

## Publish with GitHub Pages

When you’re ready to publish, use **Settings → Pages** in a repository that supports GitHub Pages. Select **Deploy from a branch**, then choose **main** and **/ (root)**. The site uses relative paths so it also works at a project URL. Check your GitHub plan for Pages support on private repositories before changing visibility.

## Homepage artwork

The gym photograph in `assets/images/gym-hero.webp` is a text-free image edit of the supplied homepage mockup. The title, navigation, and buttons are live HTML.
