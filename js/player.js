function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "–:––";
  const wholeSeconds = Math.floor(seconds);
  const minutes = Math.floor(wholeSeconds / 60);
  return `${minutes}:${String(wholeSeconds % 60).padStart(2, "0")}`;
}

export function mountPlayer(container, source) {
  container.innerHTML = `
    <h2>Listen to the Episode</h2>
    <p class="player-status" id="audio-status" role="status">Coming Soon. The episode recording will appear here when it’s available.</p>
    <audio preload="metadata"></audio>
    <fieldset disabled aria-describedby="audio-status">
      <legend>Playback controls</legend>
      <div class="player-progress">
        <input type="range" aria-label="Playback position" min="0" max="1" value="0" step="0.1" disabled>
        <output aria-live="off">0:00 / –:––</output>
      </div>
      <div class="player-controls">
        <button type="button" class="button">Play</button>
        <label>Volume <input type="range" min="0" max="1" step="0.05" value="1"></label>
        <label>Speed <select><option value="0.75">0.75×</option><option value="1" selected>1×</option><option value="1.25">1.25×</option><option value="1.5">1.5×</option><option value="2">2×</option></select></label>
      </div>
    </fieldset>`;

  if (!source) return;

  const audio = container.querySelector("audio");
  const status = container.querySelector(".player-status");
  const controls = container.querySelector("fieldset");
  const play = container.querySelector("button");
  const position = container.querySelector(".player-progress input");
  const time = container.querySelector("output");
  const volume = container.querySelector(".player-controls input");
  const speed = container.querySelector("select");

  function updateTime() {
    const hasDuration = Number.isFinite(audio.duration) && audio.duration > 0;
    position.disabled = !hasDuration;
    position.max = hasDuration ? audio.duration : 1;
    position.value = audio.currentTime;
    position.setAttribute("aria-valuetext", `${formatTime(audio.currentTime)} of ${formatTime(audio.duration)}`);
    time.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
  }

  function updatePlayButton() {
    play.textContent = audio.paused || audio.ended ? "Play" : "Pause";
  }

  status.textContent = "Loading episode information…";
  audio.addEventListener("loadedmetadata", () => {
    status.textContent = "";
    controls.disabled = false;
    updateTime();
  });
  audio.addEventListener("error", () => {
    status.textContent = "The audio could not be loaded. Refresh the page to try again.";
    controls.disabled = true;
    updatePlayButton();
  });

  for (const event of ["durationchange", "timeupdate"]) audio.addEventListener(event, updateTime);
  for (const event of ["play", "pause", "ended"]) audio.addEventListener(event, updatePlayButton);

  play.addEventListener("click", async () => {
    if (!audio.paused) {
      audio.pause();
      return;
    }
    try {
      await audio.play();
      status.textContent = "";
    } catch {
      if (!audio.error) status.textContent = "Playback couldn’t start. Try pressing Play again.";
      updatePlayButton();
    }
  });
  position.addEventListener("input", () => { audio.currentTime = Number(position.value); });
  volume.addEventListener("input", () => { audio.volume = Number(volume.value); });
  speed.addEventListener("change", () => { audio.playbackRate = Number(speed.value); });

  audio.src = source;
}
