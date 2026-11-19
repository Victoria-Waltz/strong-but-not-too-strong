import { mountPlayer } from "./player.js";

// Add an audio path here when an episode is ready, for example
// audio: "assets/audio/episode-01.mp3"
const episodes = [
  {
    id: "finding-your-place",
    title: "Finding Your Place in the Weight Room",
    summary: "First experiences, gym intimidation, and what it feels like to walk into the weight room for the first time.",
    description: "A first trip to the weight room can raise a lot of questions. Where do I start? What if I use the equipment wrong? This episode explores what can make those first visits intimidating and what can make it easier to go back.",
    audio: "",
  },
  {
    id: "history-of-women-and-strength",
    title: "A History of Women and Strength",
    summary: "How expectations about women’s fitness and strength have changed over time.",
    description: "This episode traces how ideas about appearance, femininity, and strength have influenced which kinds of exercise women were encouraged to pursue. It asks how that history still shows up in gyms today.",
    audio: "",
  },
  {
    id: "more-than-physical-strength",
    title: "More Than Physical Strength",
    summary: "The connections between lifting, confidence, mental health, and personal growth.",
    description: "What changes when you focus on what your body can do? This episode looks at how lifting can shape confidence and self-image, and how those experiences can carry beyond the gym.",
    audio: "",
  },
  {
    id: "social-media-effect",
    title: "The Social Media Effect",
    summary: "Fitness influencers, body standards, and comparison in the age of the fitness feed.",
    description: "Fitness content can help people learn new movements and find encouragement. It can also make it easy to compare our bodies or progress to someone else’s highlight reel. This episode considers how both experiences shape what people bring into the gym.",
    audio: "",
  },
  {
    id: "stronger-together",
    title: "Stronger Together",
    summary: "The role of community, support, and belonging in fitness spaces.",
    description: "A lifting partner, a welcoming coach, or seeing someone like you on the gym floor can change how a space feels. This episode explores what support and representation can mean in the weight room.",
    audio: "",
  },
  {
    id: "redefining-strong",
    title: "Redefining Strong",
    summary: "Challenging stereotypes and reflecting on what it means to be a strong woman.",
    description: "The final episode brings together the series’ questions about identity, expectations, and belonging. It considers how women can define strength for themselves.",
    audio: "",
  },
];

function createCard(episode, index) {
  const card = document.createElement("article");
  card.className = "episode-card";
  card.innerHTML = `
    <div class="card-art"><img src="assets/icons/waveform.svg" alt="" loading="lazy"></div>
    <div class="card-body">
      <div class="card-meta"><p class="eyebrow"></p><span class="badge"></span></div>
      <h3></h3><p class="summary"></p><p class="duration"></p>
      <a class="text-link">View Details <span aria-hidden="true">→</span></a>
    </div>`;
  card.querySelector(".eyebrow").textContent = `Episode ${String(index + 1).padStart(2, "0")}`;
  card.querySelector(".badge").textContent = episode.audio ? "Available" : "Coming Soon";
  card.querySelector("h3").textContent = episode.title;
  card.querySelector(".summary").textContent = episode.summary;
  card.querySelector(".duration").textContent = episode.audio ? "Runtime shown in player" : "Estimated runtime to be announced";
  const link = card.querySelector("a");
  link.href = `episode.html?id=${encodeURIComponent(episode.id)}`;
  link.setAttribute("aria-label", `View Details for ${episode.title}`);
  return card;
}

function renderDetails(container) {
  const id = new URLSearchParams(location.search).get("id");
  const index = episodes.findIndex((episode) => episode.id === id);
  const episode = episodes[index];
  container.innerHTML = `
    <section class="page-banner"><div class="wrap">
      <a class="back-link" href="episodes.html"><span aria-hidden="true">←</span> All Episodes</a>
      <p class="eyebrow" hidden></p><h1></h1><p class="episode-summary"></p>
    </div></section>
    <section class="section wrap player-wrap" hidden>
      <div class="prose"><h2>In This Episode</h2><p class="episode-description"></p></div>
      <div class="panel player"></div>
    </section>`;

  const heading = container.querySelector("h1");
  const summary = container.querySelector(".episode-summary");
  if (!episode) {
    heading.textContent = "Episode unavailable";
    summary.textContent = "Return to All Episodes to find the episode you’re looking for.";
    document.title = "Episode unavailable | Strong, But Not ‘Too Strong’";
    return;
  }

  const eyebrow = container.querySelector(".eyebrow");
  eyebrow.hidden = false;
  eyebrow.textContent = `Episode ${String(index + 1).padStart(2, "0")}`;
  heading.textContent = episode.title;
  document.title = `${episode.title} | Strong, But Not ‘Too Strong’`;
  summary.textContent = episode.summary;
  container.querySelector(".episode-description").textContent = episode.description;
  container.querySelector(".player-wrap").hidden = false;
  mountPlayer(container.querySelector(".player"), episode.audio);
}

for (const grid of document.querySelectorAll("[data-episodes]")) {
  const visibleEpisodes = grid.dataset.episodes === "featured" ? episodes.slice(0, 3) : episodes;
  grid.replaceChildren(...visibleEpisodes.map(createCard));
}

const detail = document.querySelector("[data-episode-detail]");
if (detail) renderDetails(detail);
