function setupDeck(deck) {
  const cards = Array.from(deck.children);

  function layout() {
    cards.forEach((card, i) => {
      card.classList.remove("is-front", "is-second", "is-third", "is-out");
      if (i === 0) card.classList.add("is-front");
      else if (i === 1) card.classList.add("is-second");
      else if (i === 2) card.classList.add("is-third");
      else card.style.visibility = "hidden";
      if (i < 3) card.style.visibility = "";
    });
  }

  function advance() {
    const front = cards[0];
    if (!front || front.classList.contains("is-out")) return;
    front.classList.add("is-out");
    function onEnd(e) {
      if (e.propertyName && e.propertyName !== "transform") return;
      front.removeEventListener("transitionend", onEnd);
      cards.push(cards.shift());
      layout();
    }
    front.addEventListener("transitionend", onEnd);
  }

  layout();

  let startX = 0;
  let swiped = false;
  deck.addEventListener("pointerdown", (e) => {
    startX = e.clientX;
    swiped = false;
  });
  deck.addEventListener("pointerup", (e) => {
    if (Math.abs(e.clientX - startX) > 50) {
      swiped = true;
      advance();
    }
  });
  deck.addEventListener("click", () => {
    if (swiped) {
      swiped = false;
      return;
    }
    advance();
  });
}

document.querySelectorAll(".card-deck").forEach(setupDeck);

const collectionButtons = document.querySelectorAll("#collections button[data-collection]");
const collectionPanels = document.querySelectorAll("#collections .collection-panel");
collectionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const panel = document.getElementById(button.getAttribute("data-collection"));
    if (!panel) return;
    collectionButtons.forEach((b) => {
      b.classList.remove("button");
      b.classList.add("buttonnotselected");
    });
    button.classList.remove("buttonnotselected");
    button.classList.add("button");
    collectionPanels.forEach((p) => { p.hidden = true; });
    panel.hidden = false;
  });
});