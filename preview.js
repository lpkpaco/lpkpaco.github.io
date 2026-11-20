$(function () {
  const $gadget32toggle = $("#gadget32-preview");
  const $gadget32panel = $("#gadget32-preview-content");

  $gadget32toggle.on("click", function (e) {
    e.preventDefault();
    if ($gadget32panel.is(":hidden")) {
      $gadget32panel.stop(true, true).fadeIn(250);
      $gadget32toggle.text("Quick Preview ▼");
    } else {
      $gadget32panel.stop(true, true).fadeOut(100);
      $gadget32toggle.text("Quick Preview ►");
    }
  });
});