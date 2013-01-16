function StudyExplainView(explain) {
    var self = Ti.UI.createView();

    // ScrollView
    var scrollView = Ti.UI.createScrollView({
        layout: 'vertical',
        backgroundColor: '#fff',
        showVerticalScrollIndicator: true
    });
    self.add(scrollView);

    // Explain
    var explainPrefixLabel = Ti.UI.createLabel({
        top: 20,
        text: L('explain'),
        font: {fontSize: 20, fontWeight: 'bold'},
        color: '#333'
    });
    scrollView.add(explainPrefixLabel);

    var explainLabel = Ti.UI.createLabel({
        top: 20, left: 10, right: 10,
        text: explain,
        font: {fontSize: 16},
        color: '#333'
    });
    scrollView.add(explainLabel);

    // Spacer
    var spacer = Ti.UI.createView({
        height: 10
    });
    scrollView.add(spacer);

    // CloseButton
    self.closeButton = Ti.UI.createButton({
        top: 10, right: 10,
        width: 24, height: 24,
        backgroundImage: '/images/close.png'
    });
    self.add(self.closeButton);

    return self;
}

module.exports = StudyExplainView;
