function RootView() {
    var self = Ti.UI.createView();

    // TableView
    self.tableView = Ti.UI.createTableView({
        backgroundColor: '#333',
        separatorColor: '#333'
    });
    self.add(self.tableView);

    // createTableViewRow
    self.createTableViewRow = function(e) {
        var row = Ti.UI.createTableViewRow({
            height: 80,
            backgroundColor: '#eee',
            hasChild: true
        });

        var icon = Ti.UI.createImageView({
            left: 10,
            width: 25, height: 25,
            image: '/images/doc.png'
        });
        row.add(icon);

        var title = Ti.UI.createLabel({
            top: 10, bottom: 10, left: 45,
            text: e.title,
            font: {fontSize: 16, fontWeight: 'bold'},
            color: '#333'
        });
        row.add(title);

        return row;
    };

    return self;
}

module.exports = RootView;
