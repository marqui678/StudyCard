function StatusWindow(filename) {
    var StatusView = require('ui/StatusView');

    // Window
    var self = Ti.UI.createWindow({
        title: L('status'),
        barColor: '#111'
    });

    // CloseButton
    if (Ti.App.isIphone) {
        var closeButton = Ti.UI.createButton({
            title: L('close')
        });
        closeButton.addEventListener('click', function() {
            self.close();
        });
        self.rightNavButton = closeButton;
    }

    // View
    var statusView = new StatusView(filename);
    self.add(statusView);

    // ClearButton click event
    statusView.clearButton.addEventListener('click', function() {
        Ti.App.Properties.setString(filename+'.md5', null);
        self.close();
    });

    // Window focus event
    self.addEventListener('focus', function() {
        var si = Ti.App.Properties.getList(filename+'.si');
        if (si) {
            var correct = 0;
            for (var i=0; i<si.length; i++) {
                if (si[i] === 0) correct++;
            }
            statusView.setResult(correct, si.length);
        }
    });

    return self;
}

module.exports = StatusWindow;
