var stringify = require('csv-stringify');
var fs = require('fs');

var file = fs.readFileSync('data.json', 'utf8');
var data = JSON.parse(file);
var chart = data.templateData.boardingchart;
var tripDate=data.templateData.DOJ.split(",")[0];
var tripDay=data.templateData.DOJ.split(",")[1];
var list = [];
Object.keys(chart).forEach(key => {
    for (var i = 0; i < chart[key].length; i++) {
        chart[key][i].tripDate=tripDate;
        chart[key][i].tripDay=tripDay;
        list.push(chart[key][i]);
    }
}
);
stringify(list, function (err, output) {
    fs.appendFile('boardingchart.csv', output, 'utf8', function (err) {
        if (err) {
            console.log('Some error occured - file either not saved or corrupted file saved.');
        } else {
            console.log(list.length);
        }
    });
});

