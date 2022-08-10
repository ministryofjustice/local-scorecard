import { debug } from "./debug";
let app = {
    option: { // set for default production
        debug: false,
        resize: true
    },
    viz: null,
    width: 1225,
    maxHeight: 10050,
    initViz: () => {
        // debug?
        debug.active = app.option.debug;

        debug.init();

        // launch app...
        if (app.option.resize) {
            debug.log("*** DYNAMIC IFRAME RESIZER ***", null, 'info');
            debug.log("Application initialising...", null, 'lighter');
        }

        let containerDiv = document.getElementById('cjsData'),
            url = 'https://public.tableau.com/views/CJSDeliveryDataDashboard/Introduction',
            options = {
                width: app.width,
                height: app.maxHeight,
                device: 'desktop',
                onFirstInteractive: app.interact.first
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
        first: () => {
            debug.log("Viz loaded.", null, 'success')

            if (app.option.resize) {
                app.interact.tab(); // resize frame for initial loaded tab
                app.listen.tab(); // listen for tab switches
            }
            else {
                // activate scrolling in iframe for full screen viewing
                document.querySelector('iframe').setAttribute('scrolling', 'yes')
                app.set.height(app.maxHeight)
            }
        },
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
