function RootWindow() {
    var RootView    = require('ui/RootView');
    var StudyWindow = require('ui/StudyWindow');

    // Window
    var self = Ti.UI.createWindow({
        title: L('appname'),
        barColor: '#111'
    });

    // View
    var rootView = new RootView();
    self.add(rootView);

    // TableViewRow load
    var rows = [];
    var dir = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'data');
    var list = dir.getDirectoryListing();
    list.map(function(e) {
        var file = Ti.Filesystem.getFile(dir.nativePath, e);
        if (file.extension() === 'json') {
            var row = rootView.createTableViewRow({
                title: file.name
            });
            row.file = file;
            rows.push(row);
        }
    });
    rootView.tableView.setData(rows);

    // TableView click event
    rootView.tableView.addEventListener('click', function(e) {
        var row = e.row;
        if (row) {
            var studyWindow = new StudyWindow(row.file);
            if (Ti.App.isIphone) {
                Ti.App.navigationGroup.open(studyWindow);
            } else {
                if (Ti.App.isAndroid) studyWindow.windowSoftInputMode = Ti.UI.Android.SOFT_INPUT_ADJUST_UNSPECIFIED;
                studyWindow.open();
            }
        }
    });

    return self;
}

module.exports = RootWindow;
