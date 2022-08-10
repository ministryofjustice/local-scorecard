import { debug } from './debug';

let app = {
    viz: null,
    option: { // set for default production
        debug: false,
        resize: false
    },
    width: 1225,
    maxHeight: 10050,
    urlParams: {},
    initViz: () => {
        // store a hash of url query params
        app.set.params();

        // debug?
        debug.active = app.get.param("debug") || app.option.debug;
        debug.init();

        // can we run the resize feature?
        app.option.resize = app.get.param("resize") || app.option.resize

        // launch app...
        if (app.option.resize) {
            debug.log('*** DYNAMIC IFRAME RESIZER ***', null, 'info');
            debug.log('Application initialising...', null, 'lighter');
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
        height: () => app.get.sheet().getSize().maxSize.height,
        /**
         * By default this function will attempt to return a boolean value by looking for true, yes or 1. All other
         * values will return false.
         * The second parameter [realValue] forces return of the passed value. For instance; pass any truthy value
         * as the second parameter to get the params value as a string.
         *
         * @default
         *      ?foo=bar&thuthy=yes&falsey=no |
         *      param("foo") = false |
         *      param("foo", true) = bar |
         *      param("truthy") = true |
         *      param("falsy") = false |
         * @param key
         * @param realValue
         * @return {null|boolean}
         */
        param: (key, realValue) => {
            if (!realValue) {
                switch(app.urlParams[key]?.toLowerCase()?.trim()) {
                    case "true":
                    case "yes":
                    case "1":
                        return true;
                    default:
                        return false;
                }
            }

            return app.urlParams[key] || null;
        }
    },
    set: {
        name: name => app.current.sheet.name = name,
        height: height => {
            app.viz.setFrameSize(app.width + 50, height);
            app.current.sheet.height = height;
        },
        params: () => {
            app.urlParams = new Proxy(new URLSearchParams(window.location.search), {
                get: (searchParams, prop) => searchParams.get(prop),
            })
        }
    },
    listen: {
        tab: () => {
            app.viz.addEventListener('tabswitch', app.interact.tab);
        }
    },
    interact: {
        first: () => {
            debug.log('Viz loaded.', null, 'success');

            if (app.option.resize) {
                app.interact.tab(); // resize frame for initial loaded tab
                app.listen.tab(); // listen for tab switches
            } else {
                // activate scrolling in iframe for full screen viewing
                document.querySelector('iframe').setAttribute('scrolling', 'yes');
                app.set.height(app.maxHeight);
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
