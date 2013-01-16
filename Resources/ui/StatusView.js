function StatusView(filename) {
    var self = Ti.UI.createView({
        backgroundColor: '#333'
    });

    // ScrollView
    var scrollView = Ti.UI.createScrollView({
        layout: 'vertical',
        showVerticalScrollIndicator: true
    });
    self.add(scrollView);

    // Title
    var titleLabel = Ti.UI.createLabel({
        top: 20, left: 20, right: 20,
        text: filename,
        font: {fontSize: 20},
        color: '#eee',
        textAlign: 'center'
    });
    scrollView.add(titleLabel);

    // Rule
    var ruleTop = Ti.UI.createView({
        top: 20, left: 20, right: 20,
        height: 1,
        backgroundColor: '#111',
    });
    scrollView.add(ruleTop);

    var ruleBottom = Ti.UI.createView({
        left: 20, right: 20,
        height: 1,
        backgroundColor: '#eee',
        opacity: 0.1
    });
    scrollView.add(ruleBottom);

    // Result
    var resultPrefixLabel = Ti.UI.createLabel({
        top: 20,
        text: L('result'),
        font: {fontSize: 20, fontWeight: 'bold'},
        color: '#eee'
    });
    scrollView.add(resultPrefixLabel);

    var resultLabel = Ti.UI.createLabel({
        top: 10, left: 20, right: 20,
        text: '/',
        font: {fontSize: 48},
        color: '#eee',
        textAlign: 'center'
    });
    scrollView.add(resultLabel);

    self.setResult = function(current, max) {
        resultLabel.text = current + ' / ' + max;
    };

    // Spacer
    var spacer = Ti.UI.createView({
        height: 60
    });
    scrollView.add(spacer);

    // ClearButton
    self.clearButton = Ti.UI.createButton({
        bottom: -2, left: 20, right: 20,
        height: 42,
        title: L('clear'),
        font: {fontSize: 20, fontWeight: 'bold'},
        color: '#eee',
        backgroundImage: '/images/red.png',
        borderWidth: 1,
        borderRadius: 3,
        borderColor: '#111'
    });
    self.add(self.clearButton);

    return self;
}

module.exports = StatusView;
