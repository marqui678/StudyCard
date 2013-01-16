// Bootstrap
(function() {
    // OS boolean
    Ti.App.isIphone  = (Ti.Platform.osname === 'iphone')  ? true : false;
    Ti.App.isAndroid = (Ti.Platform.osname === 'android') ? true : false;

    // Window open
    var RootWindow = require('ui/RootWindow');
    if (Ti.App.isIphone) {
        var navigationWindow = Ti.UI.createWindow();
        Ti.App.navigationGroup = Ti.UI.iPhone.createNavigationGroup({
            window: new RootWindow()
        });
        navigationWindow.add(Ti.App.navigationGroup);
        navigationWindow.open();
    } else {
        new RootWindow().open();
    }
})();
