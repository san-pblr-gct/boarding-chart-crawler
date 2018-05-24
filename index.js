var stringify = require('csv-stringify');
var fs = require('fs');

var file = fs.readFileSync('data.json', 'utf8');
var data = JSON.parse(file);
var chart = data.templateData.boardingchart;
var serviceid = data.templateData.serviceId;
var tripDate = data.templateData.DOJ.split(",")[0];
var tripDay = data.templateData.DOJ.split(",")[1];
var list = [];
var googleContactList = [];
googleContactList.push({ "Name": "Name", "Phone 1 - Value": "Phone 1 - Value" });
Object.keys(chart).forEach(key => {
    for (var i = 0; i < chart[key].length; i++) {
        chart[key][i].tripDate = tripDate;
        chart[key][i].tripDay = tripDay;
        list.push(chart[key][i]);
        googleContactList.push({ "Name": formatDate(tripDate) + getTripCode() + " " + chart[key][i].passengerName, "Phone 1 - Value": "+91 " + chart[key][i].passengerContact });
    }
}
);

function getTripCode() {
    if (serviceid === "99389")
        return "ck";
    else if (serviceid === "99386");
    return "kc";
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('');
}

stringify(googleContactList, function (err, output) {
    fs.writeFile('contact.csv', output, 'utf8', function (err) {
        if (err) {
            console.log('Some error occured - file either not saved or corrupted file saved.');
        } else {
            console.log(googleContactList.length);
        }
    });
});
stringify(list, function (err, output) {
    fs.appendFile('boardingchart.csv', output, 'utf8', function (err) {
        if (err) {
            console.log('Some error occured - file either not saved or corrupted file saved.');
        } else {
            console.log(list.length);
        }
    });
});

