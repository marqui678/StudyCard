function StudyView(data, questionIndex, answersIndex, selectedIndex, cardId) {
    var StudyCardView = require('ui/StudyCardView');

    var self = Ti.UI.createView({
        width: Ti.Platform.displayCaps.platformWidth,
        backgroundColor: '#333'
    });
    self.currentCardId = cardId;

    // Card ID
    var cardIdLabel = Ti.UI.createLabel({
        bottom: 0, left: 0, right: 0,
        height: 30,
        text: self.currentCardId + ' / ' + data.length,
        font: {fontSize: 13},
        color: '#ccc',
        textAlign: 'center'
    });
    self.add(cardIdLabel);

    // StudyCardView
    var cards = new Array(3);
    for (var i=0; i<cards.length; i++) {
        var dataIndex = questionIndex[(self.currentCardId-1)+i-1];
        if (data[dataIndex]) {
            cards[i] = new StudyCardView(data[dataIndex], answersIndex[dataIndex], selectedIndex[dataIndex]);
            cards[i].width = self.width;
            cards[i].left  = self.width*i - self.width;
            self.add(cards[i]);
        }
    }

    // View swipe event
    self.addEventListener('swipe', function(e) {
        if (e.direction === 'left') {
            animateToLeft();
        } else if (e.direction === 'right') {
            animateToRight();
        }
    });

    // Animation
    var toLeftAnimation = Ti.UI.createAnimation({
        left: -self.width,
        duration: 300,
        curve: Ti.UI.ANIMATION_CURVE_EASE_OUT
    });
    toLeftAnimation.addEventListener('complete', function() {
        if (cards[0]) self.remove(cards[0]);
        cards[0] = cards[1];
        cards[1] = cards[2];

        self.currentCardId++;
        var dataIndex = questionIndex[(self.currentCardId-1)+1];
        if (data[dataIndex]) {
            cards[2] = new StudyCardView(data[dataIndex], answersIndex[dataIndex], selectedIndex[dataIndex]);
            cards[2].width = self.width;
            cards[2].left  = self.width;
            self.add(cards[2]);
        } else {
            cards[2] = null;
        }
        cardIdLabel.text = self.currentCardId + ' / ' + data.length;
    });

    var toCenterAnimation = Ti.UI.createAnimation({
        left: 0,
        duration: 300,
        curve: Ti.UI.ANIMATION_CURVE_EASE_OUT
    });

    var toRightAnimation = Ti.UI.createAnimation({
        left: self.width,
        duration: 300,
        curve: Ti.UI.ANIMATION_CURVE_EASE_OUT
    });
    toRightAnimation.addEventListener('complete', function() {
        if (cards[2]) self.remove(cards[2]);
        cards[2] = cards[1];
        cards[1] = cards[0];

        self.currentCardId--;
        var dataIndex = questionIndex[(self.currentCardId-1)-1];
        if (data[dataIndex]) {
            cards[0] = new StudyCardView(data[dataIndex], answersIndex[dataIndex], selectedIndex[dataIndex]);
            cards[0].width = self.width;
            cards[0].left  = -self.width;
            self.add(cards[0]);
        } else {
            cards[0] = null;
        }
        cardIdLabel.text = self.currentCardId + ' / ' + data.length;
    });

    var animateToLeft = function() {
        if (self.currentCardId < data.length) {
            cards[2].animate(toCenterAnimation);
            cards[1].animate(toLeftAnimation);
        }
    };

    var animateToRight = function() {
        if (self.currentCardId > 1) {
            cards[0].animate(toCenterAnimation);
            cards[1].animate(toRightAnimation);
        }
    };

    return self;
}

module.exports = StudyView;
