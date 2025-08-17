window.op =
  window.op ||
  function () {
    var args = Array.prototype.slice.call(arguments);
    (window.op.q = window.op.q || []).push(args);
  };
window.op("init", {
  clientId: "",
  trackScreenViews: true,
  trackOutgoingLinks: true,
  trackAttributes: true,
});
