let app = {
    viz: null,
    width: 1225,
    initViz: () => {
        let containerDiv = document.getElementById('cjsData'),
            url = 'https://prod-uk-a.online.tableau.com/t/localcjsscorecard/views/TestforDamien/Introduction',
            options = {
                width: app.width,
                device: 'desktop',
                onFirstInteractive: () => {
                    app.interact.tab(); // resize frame for initial loaded tab
                    app.listen.tab(); // listen for tab switches
                }
            };

        app.viz = new tableau.Viz(containerDiv, url, options);
    },
    log: (msg, value, type) => {
        let color = 'black'
        switch (type) {
            case 'success':
                color = 'Green';
                break;
            case 'info':
                color = 'DodgerBlue';
                break;
            case 'error':
                color = 'Red';
                break;
            case 'warning':
                color = 'Orange';
                break;
        }

        if (window.console) {
            if (!value) {
                console.log('%c' + msg, 'color:' + color);
            } else {
                console.log(msg, value);
            }
        }
    },
    debug: {
        resize: () => {
            let arrow = '';
            if (app.current.sheet.name) {
                arrow = '--> ';
                app.log('------------');
                app.log(
                    arrow + 'We switched tabs from ' + app.current.sheet.name + ' to ' + app.get.name(),
                    null,
                    'success'
                );
            }

            app.log(
                arrow + 'Setting iframe height to:',
                app.get.height()
            )
        }
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
            app.viz.addEventListener("tabswitch", app.interact.tab);
        }
    },
    interact: {
        tab: () => {
            // drop console output
            app.debug.resize();

            //
            app.set.height( app.get.height() + 100 );
            app.set.name( app.get.name() );
        }
    }
};

export { app };
