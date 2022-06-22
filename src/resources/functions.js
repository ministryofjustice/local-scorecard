let viz;
const appWidth = 1225;
let arrow = '';

let app = {
    initViz: () => {
        let containerDiv = document.getElementById('cjsData'),
            url = 'https://prod-uk-a.online.tableau.com/t/localcjsscorecard/views/TestforDamien/Introduction',
            options = {
                width: appWidth,
                device: 'desktop',
                onFirstInteractive: () => {
                    app.interact.tab(); // resize frame for the initial loaded tab
                    app.listen.tab(); // listen for tab switches
                }
            };

        viz = new tableau.Viz(containerDiv, url, options);
    },
    current: {
        sheet: {
            name: null,
            height: 0
        }
    },
    get: {
        height: () => viz.height
    },
    set: {
        name: (name) => app.current.sheet.name = name,
        height: (height) => {
            viz.setFrameSize(appWidth + 50, height);
            app.current.sheet.height = height;
        }
    },
    log: (msg, value, color) => {
        color = color || 'black';

        switch (color) {
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
    listen: {
        tab: () => {
            viz.addEventListener(tableau.TableauEventName.TAB_SWITCH, app.interact.tab);
        }
    },
    interact: {
        tab: () => {
            let sheet = viz.getWorkbook().getActiveSheet();
            let name = sheet.getName();
            let size = sheet.getSize().maxSize;

            if (app.current.sheet.name) {
                arrow = '--> ';
                app.log('------------');
                app.log(arrow + 'We switched tabs from ' + app.current.sheet.name + ' to ' + name, null, 'success');
            }

            app.log(
                arrow + 'Setting iframe height to:',
                size.height
            );

            app.set.height(size.height + 100);
            app.set.name(name);
        }
    }
};

export { app };
