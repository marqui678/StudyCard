function StudyCardView(data, answerIndex, selectedAnswer) {
    var StudyExplainView = require('ui/StudyExplainView');

    var self = Ti.UI.createView();

    var cardView = Ti.UI.createView({
        top: 10, bottom: 30, left: 10, right: 10,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 3,
        borderColor: '#111'
    });
    self.add(cardView);

    // ScrollView
    var scrollView = Ti.UI.createScrollView({
        layout: 'vertical',
        backgroundColor: '#fff',
        showVerticalScrollIndicator: true
    });
    cardView.add(scrollView);

    // Question
    var questionPrefixLabel = Ti.UI.createLabel({
        top: 20,
        text: L('question'),
        font: {fontSize: 20, fontWeight: 'bold'},
        color: '#333'
    });
    scrollView.add(questionPrefixLabel);

    var questionLabel = Ti.UI.createLabel({
        top: 20, left: 10, right: 10,
        text: data.question,
        font: {fontSize: 16},
        color: '#333'
    });
    scrollView.add(questionLabel);

    // Rule
    var rule = Ti.UI.createView({
        top: 40, left: 10, right: 10,
        height: 1,
        backgroundColor: '#ccc'
    });
    scrollView.add(rule);

    // Answer
    var answerPrefixLabel = Ti.UI.createLabel({
        top: 40,
        text: L('answer'),
        font: {fontSize: 20, fontWeight: 'bold'},
        color: '#333'
    });
    scrollView.add(answerPrefixLabel);

    var answerSelections = [];
    for (var i=0; i<data.answers.length; i++) {
        var view = Ti.UI.createView({
            top: 20, left: 10, right: 10,
            height: Ti.UI.SIZE,
            backgroundColor: '#eee',
            borderWidth: 1,
            borderRadius: 3,
            borderColor: '#ccc'
        });

        view.mark = Ti.UI.createLabel({
            left: 10,
            width: 16, height: Ti.UI.SIZE,
            text: '・',
            font: {fontSize: 16},
            color: '#333',
            textAlign: 'center'
        });
        view.add(view.mark);

        view.label = Ti.UI.createLabel({
            top: 10, bottom: 10, left: 36, right: 10,
            width: Ti.UI.SIZE, height: Ti.UI.SIZE,
            text: data.answers[answerIndex[i]],
            font: {fontSize: 16},
            color: '#333'
        });
        view.add(view.label);

        scrollView.add(view);
        answerSelections.push(view);
    }

    // InfoButton
    var infoButton = Ti.UI.createButton({
        top: 20, right: 10,
        width: 24, height: 24,
        backgroundImage: '/images/info.png'
    });
    infoButton.opacity = 0;
    scrollView.add(infoButton);

    var animateResult = function(duration) {
        var correctAnimation = Ti.UI.createAnimation({
            backgroundColor: '#dff0d8',
            duration: duration
        });

        var incorrectAnimation = Ti.UI.createAnimation({
            backgroundColor: '#f2dede',
            duration: duration
        });

        var infoAnimation = Ti.UI.createAnimation({
            opacity: 1,
            duration: duration
        });

        answerSelections.map(function(e, i) {
            if (answerIndex[i] === 0) {
                e.mark.text  = '○';
                e.mark.color = '#468847';
                e.animate(correctAnimation);
            } else {
                e.mark.text  = '×';
                e.mark.color = '#b94a48';
                e.animate(incorrectAnimation);
            }
        });

        if (data.explain != null) {
            infoButton.animate(infoAnimation);
        }
    };

    answerSelections.map(function(e, i) {
        if (answerIndex[i] === selectedAnswer) {
            e.borderColor = '#222';
            animateResult(0);
        }

        e.addEventListener('singletap', function() {
            if (selectedAnswer < 0) {
                selectedAnswer = answerIndex[i];
                e.borderColor = '#222';
                animateResult(500);
                Ti.App.fireEvent('resultAnswer', {index: answerIndex[i]});
            }
        });
    });

    // ExplainView
    var explainView = new StudyExplainView(data.explain);
    explainView.visible = false;
    cardView.add(explainView);

    // InfoButton click event
    infoButton.addEventListener('click', function() {
        explainView.opacity = 0;
        explainView.visible = true;
        explainView.animate({
            opacity: 1,
            duration: 500
        });
    });

    // CloseButton click event
    explainView.closeButton.addEventListener('click', function() {
        var hideAnimation = Ti.UI.createAnimation({
            opacity: 0,
            duration: 500
        });
        hideAnimation.addEventListener('complete', function() {
            explainView.visible = false;
        });
        explainView.animate(hideAnimation);
    });

    // Spacer
    var spacer = Ti.UI.createView({
        height: 10
    });
    scrollView.add(spacer);

    return self;
}

module.exports = StudyCardView;
