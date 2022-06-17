let synth = window.speechSynthesis;
const speechSettings = {
  lang: "BE-nl",
  pitch: 1,
  rate: 0.75,
  volume: 0.7,
};
const SpeechSynthesisUtterance =
  window.webkitSpeechSynthesisUtterance ||
  window.mozSpeechSynthesisUtterance ||
  window.msSpeechSynthesisUtterance ||
  window.oSpeechSynthesisUtterance ||
  window.SpeechSynthesisUtterance;

export { synth, speechSettings, SpeechSynthesisUtterance };
