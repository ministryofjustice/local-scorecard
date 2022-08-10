let debug = {
    active: true,
    log: (msg, value, type) => {
        if (!debug.active) {
            return;
        }

        let color = 'black';

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
            case 'lighter':
                color = 'Grey';
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
    initialised: false,
    init: () => {
        if (!debug.active) {
            return;
        }
        if (!debug.initialised && window.console) {
            let css = {
                all: 'color: #616161;background: #bababa;text-shadow: #e0e0e0 1px 1px 0;color: #616161;background: #bababa;',
                top: 'font-size:20px;line-height:30px;padding:12px 30px 6px 20px;margin:0 0 -4px -20px',
                bottom: 'font-size:18px;line-height:40px;padding:10px 30px 10px 20px;margin:-4px 0 0 -20px'
            };

            console.log('%cMinistry %s', css.all + css.top, 'of Justice');
            console.log('%cCJS %s', css.all + css.bottom, 'Delivery Data Dashboard - Debug Console');

            debug.initialised = true;
        }
    },
    resize: (app) => {
        let arrow = '';
        if (app.current.sheet.name) {
            arrow = '--> ';
            debug.log('------------', null, 'lighter');
            debug.log(
                arrow + 'We switched tabs from ' + app.current.sheet.name + ' to ' + app.get.name(),
                null,
                'success'
            );
        }

        debug.log(
            arrow + 'Setting iframe height to:',
            app.get.height()
        );
    }
};

export { debug };
