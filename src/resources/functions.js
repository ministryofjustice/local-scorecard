import { TableauViz, TableauEventType } from "./tableau-embedding-3";

const viz = new TableauViz();

const scorecard = {
    init: () => {
        viz.src = 'https://prod-uk-a.online.tableau.com/t/localcjsscorecard/views/TestforDamien/Introduction';
        viz.toolbar = 'hidden';

        document.getElementById('scorecard').appendChild(viz);
    },
    get: {
        height: () => viz.height
    },
    listen: {
        firstInteractive: () => {
            viz.addEventListener(
                TableauEventType.FirstInteractive,
                () => {
                    console.log("FirstInteractive = fired!")
                }
            );
        },
        firstVizSizeKnown: () => {
            viz.addEventListener(
                TableauEventType.FirstVizSizeKnown,
                () => {
                    console.log("FirstVizSizeKnown = fired!")
                    console.log(scorecard.get.height())
                    scorecard.interact.resize();
                }
            );
        }
    },
    interact: {
        resize: () => {
            console.log("I am resizing! :o)");

        }
    }
}

export { scorecard };
