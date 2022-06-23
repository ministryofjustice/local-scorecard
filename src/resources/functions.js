import { debug } from "./debug";
let app = {
    viz: null,
    width: 1225,
    initViz: () => {
        // debug?
        debug.active = true; // todo; use an environment flag; dev = true, prod = false.

        // launch app...
        debug.log("*** DYNAMIC IFRAME RESIZER ***", null, 'info');
        debug.log("Application initialising...", null, 'lighter');
        let containerDiv = document.getElementById('cjsData'),
            url = 'https://prod-uk-a.online.tableau.com/t/localcjsscorecard/views/TestforDamien/Introduction',
            options = {
                width: app.width,
                device: 'desktop',
                onFirstInteractive: () => {
                    debug.log("Loaded!", null, 'success')
                    app.interact.tab(); // resize frame for initial loaded tab
                    app.listen.tab(); // listen for tab switches
                }
            };

        app.viz = new tableau.Viz(containerDiv, url, options);
    },
    current: {
        sheet: {
            name: null,
            height: 0
        }
    },
    get: {
        sheet: () => app.viz.getWorkbook().getActiveSheet(),
        name: () => app.get.sheet().getName(),
        height: () => app.get.sheet().getSize().maxSize.height
    },
    set: {
        name: (name) => app.current.sheet.name = name,
        height: (height) => {
            app.viz.setFrameSize(app.width + 50, height);
            app.current.sheet.height = height;
        }
    },
    listen: {
        tab: () => {
            app.viz.addEventListener('tabswitch', app.interact.tab);
        }
    },
    interact: {
        tab: () => {
            // drop console output
            debug.resize(app);

            // adjust the interface
            app.set.height(app.get.height() + 100);
            app.set.name(app.get.name());
        }
    }
};

export { app };
