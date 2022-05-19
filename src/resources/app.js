import { scorecard } from "./functions";

// load tableau...
scorecard.init();

// listen for stuff...
scorecard.listen.firstVizSizeKnown();
scorecard.listen.firstInteractive();
