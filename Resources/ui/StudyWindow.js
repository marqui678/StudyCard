function StudyWindow(file) {
    var path = 'lib/Array.js';
    if (Ti.App.isAndroid) path = '../' + path;
    Ti.include(path);

    var StudyView    = require('ui/StudyView');
    var StatusWindow = require('ui/StatusWindow');

    // Window
    var self = Ti.UI.createWindow({
        title: file.name,
        barColor: '#111'
    });

    // StatusButton
    var statusButton;
    if (Ti.App.isIphone) {
        statusButton = Ti.UI.createButton({
            image: '/images/gear.png'
        });
        self.rightNavButton = statusButton;
        statusButton.addEventListener('click', function() {
            saveState();
            var statusWindow = new StatusWindow(file.name);
            statusWindow.open({modal: true});
        });
    } else if (Ti.App.isAndroid) {
        var activity = self.activity;
        activity.onCreateOptionsMenu = function(e) {
            var menu = e.menu;
            statusButton = menu.add({
                title: L('status')
            });
            statusButton.setIcon(Ti.Android.R.drawable.ic_menu_preferences);
            statusButton.addEventListener('click', function() {
                saveState();
                var statusWindow = new StatusWindow(file.name);
                statusWindow.open({modal: true});
            });
        };
    }

    // Load data
    var json = file.read();
    var data = JSON.parse(json);

    var questionIndex, answersIndex, selectedIndex, cardId;
    var loadIndex = function() {
        // Cache
        var md5 = Ti.Utils.md5HexDigest(json);
        if (md5 !== Ti.App.Properties.getString(file.name+'.md5')) {
            Ti.App.Properties.setList(file.name+'.qi', null);
            Ti.App.Properties.setList(file.name+'.ai', null);
            Ti.App.Properties.setList(file.name+'.si', null);
            Ti.App.Properties.setInt(file.name+'.id', null);
            Ti.App.Properties.setString(file.name+'.md5', md5);
        }

        // Question
        questionIndex = Ti.App.Properties.getList(file.name+'.qi');
        if (questionIndex == null) {
            questionIndex = new Array(data.length);
            for (var i=0; i<questionIndex.length; i++) {
                questionIndex[i] = i;
            }
            questionIndex.shuffle();
            Ti.App.Properties.setList(file.name+'.qi', questionIndex);
        }

        // Answers
        answersIndex = Ti.App.Properties.getList(file.name+'.ai');
        if (answersIndex == null) {
            answersIndex = new Array(data.length);
            for (var i=0; i<answersIndex.length; i++) {
                var dataIndex = questionIndex[i];
                answersIndex[dataIndex] = new Array(data[dataIndex].answers.length);
                for (var j=0; j<answersIndex[dataIndex].length; j++) {
                    answersIndex[dataIndex][j] = j;
                }
                answersIndex[dataIndex].shuffle();
            }
            Ti.App.Properties.setList(file.name+'.ai', answersIndex);
        }

        // Selected
        selectedIndex = Ti.App.Properties.getList(file.name+'.si');
        if (selectedIndex == null) {
            selectedIndex = new Array(data.length);
            for (var i=0; i<selectedIndex.length; i++) {
                selectedIndex[i] = -1;
            }
            Ti.App.Properties.setList(file.name+'.si', selectedIndex);
        }

        // Card ID
        cardId = Ti.App.Properties.getInt(file.name+'.id');
        if (cardId == null || cardId == 0) {
            cardId = 1;
            Ti.App.Properties.setInt(file.name+'.id', cardId);
        }
    }
    loadIndex();

    // View
    var studyView = new StudyView(data, questionIndex, answersIndex, selectedIndex, cardId);
    self.add(studyView);

    // Window open event
    self.addEventListener('open', function() {
        Ti.App.addEventListener('pause', saveState);
    });

    // Window close event
    self.addEventListener('close', function() {
        Ti.App.removeEventListener('pause', saveState);
        saveState();
    });

    // Window focus event
    self.addEventListener('focus', function() {
        var md5 = Ti.App.Properties.getString(file.name+'.md5');
        if (md5 == null) {
            self.remove(studyView);
            loadIndex();
            studyView = new StudyView(data, questionIndex, answersIndex, selectedIndex, cardId);
            self.add(studyView);
        }

        Ti.App.addEventListener('resultAnswer', resultAnswer);
    });

    // Window blur event
    self.addEventListener('blur', function() {
        Ti.App.removeEventListener('resultAnswer', resultAnswer);
    });

    var saveState = function() {
        Ti.App.Properties.setList(file.name+'.si', selectedIndex);
        Ti.App.Properties.setInt(file.name+'.id', studyView.currentCardId);
    };

    var resultAnswer = function(e) {
        var dataIndex = questionIndex[studyView.currentCardId-1];
        selectedIndex[dataIndex] = e.index;
    };

    return self;
}

module.exports = StudyWindow;
